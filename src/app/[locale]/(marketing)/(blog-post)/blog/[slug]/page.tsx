import { notFound } from "next/navigation";

import { getBlog, getSingleBlog } from "@/lib/airtable";
import { Mdx } from "@/components/content/mdx-components";

import "@/styles/mdx.css";

import { Metadata } from "next";

import { BLOG_CATEGORIES } from "@/config/blog";
import { getTableOfContents } from "@/lib/toc";
import {
  cn,
  constructMetadata,
  formatDate,
  getBlurDataURL,
  placeholderBlurhash,
} from "@/lib/utils";
import { Breadcrumb } from "@/components/breadcrumb";
import Author from "@/components/content/author";
import BlurImage from "@/components/shared/blur-image";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
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

  const { title, description, image } = post;

  return constructMetadata({
    title: `${title} – UseEfficiently`,
    description: description,
    image: image[0].url,
  });
}

export default async function PostPage(props: {
  params: Promise<BlogPostPageParams>;
}) {
  const params = await props.params;
  // get the first item from the array
  let post = await getSingleBlog(params.slug);

  if (!post) {
    notFound();
  }

  const category = BLOG_CATEGORIES.find(
    (category) => category.slug === post.category,
  )!;

  /* const relatedArticles =
    (post.related &&
      post.related.map(
        (slug) => allPosts.find((post) => post.slugAsParams === slug)!,
      )) ||
    []; */

  const toc = await getTableOfContents(post.content);

  /* const [thumbnailBlurhash, images] = await Promise.all([
    getBlurDataURL(post.image),
    await Promise.all(
      post.images.map(async (src: string) => ({
        src,
        blurDataURL: await getBlurDataURL(src),
      })),
    ),
  ]);
 */
  const thumbnailBlurhash = await getBlurDataURL(post.image[0].url);

  return (
    <>
      <MaxWidthWrapper className="pt-6 md:pt-10">
        <Breadcrumb />
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            {/* <Link
              href={`/blog/category/${category.slug}`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                  rounded: "lg",
                }),
                "h-8",
              )}
            >
              {category.title}
            </Link> */}
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
              image={post.authorImage[0].url}
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
              src={post.image[0].url}
              sizes="(max-width: 768px) 770px, 1000px"
            />
            <div className="px-[.8rem] pb-10 md:px-6">
              <Mdx code={post.content} />
            </div>
          </div>

          <div className="sticky top-20 col-span-1 mt-52 hidden flex-col divide-y divide-muted self-start pb-24 lg:flex">
            <DashboardTableOfContents toc={toc} />
          </div>
        </MaxWidthWrapper>
      </div>

      {/* <MaxWidthWrapper>
        {relatedArticles.length > 0 && (
          <div className="flex flex-col space-y-4 pb-16">
            <p className="font-heading text-2xl text-foreground">
              More Articles
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-6">
              {relatedArticles.map((post) => (
                <Link
                  key={post.slug}
                  href={post.slug}
                  className="flex flex-col space-y-2 rounded-xl border p-5 transition-colors duration-300 hover:bg-muted/80"
                >
                  <h3 className="font-heading text-xl text-foreground">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-[15px] text-muted-foreground">
                    {post.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </MaxWidthWrapper> */}
    </>
  );
}
