import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { env } from "@/env.mjs";

export async function POST(request: NextRequest) {
  // Optional: Add security check
  const { secret } = await request.json();

  if (secret !== env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Revalidate the blog path
    const path = request.nextUrl.pathname;
    console.log("Revalidating", path);
    revalidatePath(path);
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 },
    );
  }
}
