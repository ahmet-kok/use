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
      // Root page with locale
      revalidatePath(`/${locale}`);
      revalidated.push(`path: /${locale}`);
      
      // Locale-specific content paths
      revalidatePath(`/${locale}/blog`);
      revalidated.push(`path: /${locale}/blog`);
      
      revalidatePath(`/${locale}/portfolio`);
      revalidated.push(`path: /${locale}/portfolio`);
      
      // Dynamic routes with locale
      revalidatePath(`/${locale}/blog/[slug]`, "page");
      revalidated.push(`path: /${locale}/blog/[slug]`);
      
      revalidatePath(`/${locale}/portfolio/[slug]`, "page");
      revalidated.push(`path: /${locale}/portfolio/[slug]`);
    }

    // If no specific path or locale, revalidate everything
    if (!path && !locale) {
      revalidatePath("/");
      revalidated.push("path: /");
      
      // Revalidate all locales
      revalidatePath("/[locale]", "page");
      revalidated.push("path: /[locale]");
      
      // All content paths across all locales
      revalidatePath("/[locale]/blog", "page");
      revalidated.push("path: /[locale]/blog");
      
      revalidatePath("/[locale]/portfolio", "page");
      revalidated.push("path: /[locale]/portfolio");
      
      // All dynamic routes across all locales
      revalidatePath("/[locale]/blog/[slug]", "page");
      revalidated.push("path: /[locale]/blog/[slug]");
      
      revalidatePath("/[locale]/portfolio/[slug]", "page");
      revalidated.push("path: /[locale]/portfolio/[slug]");
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
