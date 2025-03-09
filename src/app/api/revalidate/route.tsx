import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { env } from "@/env.mjs";

export async function POST(request: NextRequest) {
  try {
    const { path, token } = await request.json();

    // Validate the token
    if (!token || token !== env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (!path) {
      return NextResponse.json(
        { message: "Path is required" },
        { status: 400 },
      );
    }

    revalidatePath(path);

    return NextResponse.json(
      {
        revalidated: true,
        message: `Path ${path} revalidated`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error revalidating:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
