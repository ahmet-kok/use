import { NextRequest, NextResponse } from "next/server";

import { postMessage } from "@/lib/airtable";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    /* const response = await fetch(process.env.AIRTABLE_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        message: body.message,
        timestamp: new Date().toISOString(),
      }),
    }); */

    await postMessage(
      body.name,
      body.email,
      body.companyName,
      body.companyWebsite,
      body.message,
    );

    /* if (!response.ok) {
      throw new Error("Failed to submit to Airtable");
    } */

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "Failed to submit form" },
      { status: 500 },
    );
  }
}
