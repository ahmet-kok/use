import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

import { getBlog, getSingleBlog } from "@/lib/airtable";
import { Mdx } from "@/components/content/mdx-components";

import "@/styles/mdx.css";

import { Metadata } from "next";
import { Mail } from "lucide-react";
import { SiLinkedin, SiX } from "react-icons/si";

import { BLOG_CATEGORIES } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { generateArticleSchema } from "@/lib/structured-data";
import { getTableOfContents } from "@/lib/toc";
import {
  cn,
  constructCanonicalUrl,
  constructMetadata,
  formatDate,
  getBlurDataURL,
  placeholderBlurhash,
} from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumb } from "@/components/breadcrumb";
import Author from "@/components/content/author";
import BlurImage from "@/components/shared/blur-image";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import ShareButton from "@/components/shared/ShareButton";
import { DashboardTableOfContents } from "@/components/shared/toc";

// Type for static params generation (without Promise)
type BlogPostPageParams = {
  slug: string;
  locale?: string;
};

export async function generateStaticParams(): Promise<BlogPostPageParams[]> {
  const posts = await getBlog("all");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<BlogPostPageParams>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const post = await getSingleBlog(params.slug);
  if (!post) {
    return;
  }

  const { title, description, image, category, date, authorName } = post;
  const canonicalUrl = constructCanonicalUrl(
    `/${params.locale}/blog/${params.slug}`,
  );

  // Find related keywords based on category or content
  const keywords = [
    "blog",
    category,
    "article",
    ...title.split(" ").slice(0, 3),
  ].filter(Boolean);

  return constructMetadata({
    title: `${title} – UseEfficiently`,
    description: description,
    image: image || "/api/og?type=Blog&heading=" + title,
    canonical: canonicalUrl,
    keywords,
    type: "article",
    publishedTime: date,
    authors: [authorName || "UseEfficiently Team"],
    hreflangPath: `/blog/${params.slug}`,
  });
}

export default async function PostPage(props: {
  params: Promise<BlogPostPageParams>;
}) {
  const params = await props.params;
  const post = await getSingleBlog(params.slug);
  if (!post) {
    notFound();
  }

  const category = BLOG_CATEGORIES.find(
    (category) => category.slug === post.category,
  )!;

  const toc = await getTableOfContents(post.content);
  const thumbnailBlurhash = await getBlurDataURL(post.image);

  // Generate article structured data
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    url: constructCanonicalUrl(`/${params.locale}/blog/${params.slug}`),
    authorName: post.authorName || "UseEfficiently Team",
  });

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <MaxWidthWrapper className="pt-6 md:pt-10">
{/*         <Breadcrumb title={post.title} />
 */}        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <time
              dateTime={post.date}
              className="text-sm font-medium text-muted-foreground"
            >
              {formatDate(post.date)}
            </time>
          </div>
          <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {post.description}
          </p>
          <div className="flex flex-nowrap items-center space-x-5 pt-1 md:space-x-8">
            <Author
              name={post.authorName}
              title={post.authorRole}
              image={post.authorImage}
              key={post.id + post.authorName}
            />
          </div>
        </div>
      </MaxWidthWrapper>

      <div className="relative">
        <div className="absolute top-52 w-full border-t" />

        <MaxWidthWrapper className="grid grid-cols-4 gap-10 pt-8 max-md:px-0">
          <div className="relative col-span-4 mb-10 flex flex-col space-y-8 border-y bg-background md:rounded-xl md:border lg:col-span-3">
            <BlurImage
              alt={post.title}
              blurDataURL={thumbnailBlurhash ?? placeholderBlurhash}
              className="aspect-[1200/630] border-b object-cover md:rounded-t-xl"
              width={1200}
              height={630}
              loading="lazy"
              placeholder="blur"
              src={post.image}
              sizes="(max-width: 768px) 770px, 1000px"
            />
            <div className="px-[.8rem] pb-10 md:px-6">
              <Mdx code={post.content} />
            </div>
          </div>

          <div className="sticky top-20 col-span-1 mt-52 hidden flex-col divide-y divide-muted self-start pb-24 lg:flex">
            <ShareButton
              title={post.title}
              description={post.description}
              link={`${siteConfig.url}/${params.locale}/blog/${params.slug}`}
              imageUrl={post.image}
            />
            <DashboardTableOfContents toc={toc} />
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
