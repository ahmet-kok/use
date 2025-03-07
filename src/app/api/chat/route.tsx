// @ts-nocheck
import { NextResponse } from "next/server";
import { UpstashVectorStore } from "@langchain/community/vectorstores/upstash";
import { AIMessage, ChatMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Index } from "@upstash/vector";
import { Message as VercelChatMessage, streamText } from "ai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { createRetrieverTool } from "langchain/tools/retriever";
import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth/lib";
import { ApiResponse } from "@/lib/utils";
import { env } from "@/env.mjs";
export const runtime = "edge";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, "10 s"),
});

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};

export async function POST(req: NextAuthRequest) {
  const session = await auth();
  
  if (!session) {
    return new Response(ApiResponse.error(401, "Not authenticated"), { 
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const user = session.user;

  if (!user) {
    return new Response(ApiResponse.error(401, "Not authenticated"), { 
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    const ip = req.ip ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      const stream = streamText({
        text: "Oops! It seems you've reached the rate limit. Please try again later."
      });
      
      return stream.toTextStreamResponse({
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    const body = await req.json();

    /**
     * We represent intermediate steps as system messages for display purposes,
     * but don't want them in the chat history.
     */
    const messages = (body.messages ?? []).filter(
      (message: VercelChatMessage) =>
        message.role === "user" || message.role === "assistant",
    );
    const returnIntermediateSteps = false;
    const previousMessages = messages
      .slice(0, -1)
      .map(convertVercelMessageToLangChainMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const chatModel = new ChatOpenAI({
      modelName: "gpt-4o",
      temperature: 0.2,
      // IMPORTANT: Must "streaming: true" on OpenAI to enable final output streaming below.
      streaming: true,
    });

    const embeddings = new OpenAIEmbeddings({});

    // Creating the index with the provided credentials.
    const indexWithCredentials = new Index({
      url: env.UPSTASH_VECTOR_REST_URL as string,
      token: env.UPSTASH_VECTOR_REST_TOKEN as string,
    });

    const vectorstore = new UpstashVectorStore(embeddings, {
      index: indexWithCredentials,
    });

    const retriever = vectorstore.asRetriever({
      k: 6,
      searchType: "mmr",
      searchKwargs: {
        fetchK: 5,
        lambda: 0.5,
      },
      verbose: false,
    });

    /**
     * Wrap the retriever in a tool to present it to the agent in a
     * usable form.
     */
    const tool = createRetrieverTool(retriever, {
      name: "search_latest_knowledge",
      description: "Searches and returns up-to-date general information.",
    });

    /**
     * Based on https://smith.langchain.com/hub/hwchase17/openai-functions-agent
     *
     * This default prompt for the OpenAI functions agent has a placeholder
     * where chat messages get inserted as "chat_history".
     *
     * You can customize this prompt yourself!
     */

    const AGENT_SYSTEM_TEMPLATE = `
    你是一位名为 FFlow 的咨询机器人，旨在以高度系统化和数据驱动的方式回应和背景信息相关的咨询。
    
    你的回答应当精确且事实准确，重点是使用提供的背景信息，并在可能的情况下提供来自背景的链接。
    
    即使背景信息中有重复的内容，也请不要重复回答。
    `;

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", AGENT_SYSTEM_TEMPLATE],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
      new MessagesPlaceholder("agent_scratchpad"),
    ]);

    const agent = await createOpenAIFunctionsAgent({
      llm: chatModel,
      tools: [tool],
      prompt,
    });

    const agentExecutor = new AgentExecutor({
      agent,
      tools: [tool],
      // Set this if you want to receive all intermediate steps in the output of .invoke().
      returnIntermediateSteps,
    });

    if (!returnIntermediateSteps) {
      /**
       * Agent executors also allow you to stream back all generated tokens and steps
       * from their runs.
       *
       * This contains a lot of data, so we do some filtering of the generated log chunks
       * and only stream back the final response.
       *
       * This filtering is easiest with the OpenAI functions or tools agents, since final outputs
       * are log chunk values from the model that contain a string instead of a function call object.
       *
       * See: https://js.langchain.com/docs/modules/agents/how_to/streaming#streaming-tokens
       */
      const logStream = await agentExecutor.streamLog({
        input: currentMessageContent,
        chat_history: previousMessages,
      });

      if (env.NODE_ENV === "development") {
        const stream = streamText({
          text: "Hello, I'm UseEfficiently Chat Bot. How can I help you today?"
        });
        
        return stream.toTextStreamResponse({
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        });
      }

      console.log("Streaming response...");
      
      // Create a TransformStream to process the log chunks
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      
      // Process log chunks in the background
      (async () => {
        try {
          for await (const chunk of logStream) {
            if (chunk.ops?.length > 0 && chunk.ops[0].op === "add") {
              const addOp = chunk.ops[0];
              if (
                addOp.path.startsWith("/logs/ChatOpenAI") &&
                typeof addOp.value === "string" &&
                addOp.value.length
              ) {
                // Write the value to the stream
                writer.write(new TextEncoder().encode(addOp.value));
              }
            }
          }
        } catch (error) {
          console.error("Error processing stream:", error);
        } finally {
          console.log("Streaming complete");
          writer.close();
        }
      })();
      
      // Return the readable stream as response
      return new Response(readable, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    } else {
      /**
       * Intermediate steps are the default outputs with the executor's `.stream()` method.
       * We could also pick them out from `streamLog` chunks.
       * They are generated as JSON objects, so streaming them is a bit more complicated.
       */
      const result = await agentExecutor.invoke({
        input: currentMessageContent,
        chat_history: previousMessages,
      });

      const urls = JSON.parse(
        `[${result.intermediateSteps[0]?.observation.replaceAll("}\n\n{", "}, {")}]`,
      ).map((source: { url: any }) => source.url);

      return NextResponse.json(
        {
          _no_streaming_response_: true,
          output: result.output,
          sources: urls,
        },
        { status: 200 },
      );
    }
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

