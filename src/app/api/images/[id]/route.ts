import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

import { env } from "@/env.mjs";

// Initialize Airtable
const airtable = new Airtable({
  apiKey: env.AIRTABLE_API_KEY,
}).base(env.AIRTABLE_BASE_ID!);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const tableName = searchParams.get("table") || "testimonials";
  const fieldName = searchParams.get("field") || "image";
  const index = searchParams.get("index") || "0";
  const useThumb = searchParams.get("thumbnail") === "true";
  try {
    // Fetch the record directly from Airtable
    const record = await airtable(tableName).find(id);

    if (!record || !record.fields[fieldName]) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Get the image URL
    const attachments = record.fields[fieldName] as any[];
    if (!attachments || attachments.length === 0) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Get thumbnail if requested
    const imageUrl =
      useThumb && attachments[index].thumbnails?.large?.url
        ? attachments[index].thumbnails.large.url
        : attachments[index].url;

    // Add cache headers to reduce Airtable API calls
    //return image file itself
    const image = await fetch(imageUrl);
    return new NextResponse(image.body, {
      headers: {
        "Content-Type": image.headers.get("Content-Type") || "image/jpeg",
      },
    });
    return NextResponse.redirect(
      imageUrl /* , {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    } */,
    );
  } catch (error) {
    console.error("Error fetching image:", error);
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
