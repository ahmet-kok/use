import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { secret, path, locale } = await request.json();

    // Check for secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Track what was revalidated
    let revalidated: string[] = [];

    console.log('API route: Revalidating Next.js cache paths');

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
    if (!path) {
      revalidatePath("/");
      revalidated.push("path: /");
      
      // Also revalidate key content paths
      revalidatePath("/blog");
      revalidated.push("path: /blog");
      
      // Revalidate dynamic blog pages
      revalidatePath("/blog/[slug]", "page");
      revalidated.push("path: /blog/[slug]");
      
      revalidatePath("/portfolio");
      revalidated.push("path: /portfolio");
      
      // Revalidate dynamic portfolio pages
      revalidatePath("/portfolio/[slug]", "page");
      revalidated.push("path: /portfolio/[slug]");
    }

    // Also revalidate the API routes for images
    revalidatePath("/api/images/[id]");
    revalidated.push("path: /api/images/[id]");

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
