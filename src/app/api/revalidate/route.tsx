import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { secret, tag, path, locale } = await request.json();

    // Check for secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Track what was revalidated
    let revalidated: string[] = [];

    // Revalidate by tag if provided (more efficient)
    if (tag) {
      revalidateTag(tag);
      revalidated.push(`tag: ${tag}`);
    }

    // Revalidate by path if provided
    if (path) {
      revalidatePath(path);
      revalidated.push(`path: ${path}`);
    }

    // Revalidate locale-specific paths
    if (locale) {
      revalidatePath(`/${locale}`);
      revalidated.push(`path: /${locale}`);
    }

    // Always revalidate home
    if (!path && !tag) {
      revalidatePath("/");
      revalidated.push("path: /");
    }

    return NextResponse.json({
      revalidated: true,
      details: revalidated.join(", "),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        error: "Revalidation failed",
        details: String(error),
      },
      { status: 500 },
    );
  }
}
