import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { cn } from "@/lib/utils";
import { MdxCard } from "@/components/content/mdx-card";
import Link from "@/components/link/link";
import { Callout } from "@/components/shared/callout";
import { CopyButton } from "@/components/shared/copy-button";

const components = {
  h1: ({ className, children, ...props }) => {
    const id =
      children &&
      typeof children === "object" &&
      "props" in children &&
      children.props?.children
        ? String(children.props.children)
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
        : undefined;
    return (
      <h1
        id={id}
        className={cn(
          "mt-2 text-4xl font-bold tracking-tight",
          className,
        )}
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ className, children, ...props }) => {
    const id =
      children &&
      typeof children === "object" &&
      "props" in children &&
      children.props?.children
        ? String(children.props.children)
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
        : undefined;

    return (
      <h2
        id={id}
        className={cn(
          "mt-10 border-b pb-1 text-2xl font-semibold tracking-tight first:mt-0",
          className,
        )}
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ className, children, ...props }) => {
    const id =
      children &&
      typeof children === "object" &&
      "props" in children &&
      children.props?.children
        ? String(children.props.children)
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
        : undefined;

    return (
      <h3
        id={id}
        className={cn(
          "mt-8 text-xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ className, children, ...props }) => {
    const id =
      children &&
      typeof children === "object" &&
      "props" in children &&
      children.props?.children
        ? String(children.props.children)
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
        : undefined;
    return (
      <h4
        id={id}
        className={cn(
          "mt-8 text-lg font-semibold tracking-tight",
          className,
        )}
        {...props}
      >
        {children}
      </h4>
    );
  },
  h5: ({ className, children, ...props }) => {
    const id =
      children &&
      typeof children === "object" &&
      "props" in children &&
      children.props?.children
        ? String(children.props.children)
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
        : undefined;
    return (
      <h5
        id={id}
        className={cn(
          "mt-8 text-lg font-semibold tracking-tight",
          className,
        )}
        {...props}
      >
        {children}
      </h5>
    );
  },
  h6: ({ className, children, ...props }) => {
    const id =
      children &&
      typeof children === "object" &&
      "props" in children &&
      children.props?.children
        ? String(children.props.children)
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
        : undefined;

    return (
      <h6
        id={id}
        className={cn(
          "mt-8 text-base font-semibold tracking-tight",
          className,
        )}
        {...props}
      >
        {children}
      </h6>
    );
  },
  a: ({ className, ...props }) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    __rawString__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & { __rawString__?: string }) => (
    <div className="group relative mt-2 w-full overflow-hidden rounded-md bg-[#1e1e1e]">
      <pre className={cn(className)} {...props} />
      {__rawString__ && (
        <CopyButton
          value={__rawString__}
          className={cn(
            "absolute right-4 top-4 z-20",
            "duration-250 opacity-0 transition-all group-hover:opacity-100",
          )}
        />
      )}
    </div>
  ),
  code: ({ className, inline, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <div className="group relative">
        <CopyButton
          value={String(children).replace(/\n$/, "")}
          className={cn(
            "absolute right-4 top-4 z-20",
            "duration-250 opacity-0 transition-all group-hover:opacity-100",
          )}
        />
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code
        className={cn(
          "relative my-2 rounded-3xl border font-mono text-sm",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  Callout,
  Card: MdxCard,
  Step: ({ className, children, ...props }: React.ComponentProps<"h3">) => {
    const id =
      children &&
      typeof children === "object" &&
      "props" in children &&
      children.props?.children
        ? String(children.props.children)
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")
        : undefined;
    return (
      <h3
        id={id}
        className={cn(
          "mt-8 font-heading text-xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10",
        className,
      )}
      {...props}
    />
  ),
};

interface MdxProps {
  code: string;
  images?: { alt: string; src: string; blurDataURL: string }[];
}

export function Mdx({ code, images }: MdxProps) {
  return <ReactMarkdown components={components}>{code}</ReactMarkdown>;
}
