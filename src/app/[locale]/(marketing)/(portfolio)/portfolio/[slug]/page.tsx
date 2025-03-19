import { notFound } from "next/navigation";

import { getPortfolio, getSinglePortfolio } from "@/lib/airtable";

import "@/styles/mdx.css";

import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import {
  constructMetadata,
  getBlurDataURL,
  placeholderBlurhash,
} from "@/lib/utils";
import { Breadcrumb } from "@/components/breadcrumb";
import BlurImage from "@/components/shared/blur-image";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import ShareButton from "@/components/shared/ShareButton";
import { DashboardTableOfContents } from "@/components/shared/toc";

import { ProjectGallery } from "./ProjectGallery";

// Type for static params generation (without Promise)
type PortfolioPostPageParams = {
  slug: string;
  locale?: string;
};

export async function generateStaticParams(): Promise<
  PortfolioPostPageParams[]
> {
  const posts = await getPortfolio("all");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<PortfolioPostPageParams>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const post = await getSinglePortfolio(params.slug);
  if (!post) {
    return;
  }

  const { title, description, image } = post;

  return constructMetadata({
    title: `${title} – UseEfficiently`,
    description: description,
    /* image: image, */
    image: "/api/og?type=Portfolio&heading=" + title,
  });
}

export default async function PostPage(props: {
  params: Promise<PortfolioPostPageParams>;
}) {
  const params = await props.params;
  // get the first item from the array
  let post = await getSinglePortfolio(params.slug);

  if (!post) {
    notFound();
  }

  const items = [
    { title: "Challenge", url: "#challenge" },
    { title: "Solution", url: "#solution" },
    { title: "Outcome", url: "#outcome" },
  ];
  if (
    post.testimonialQuote &&
    post.testimonialAuthor &&
    post.testimonialRole &&
    post.testimonialImage
  ) {
    items.push({ title: "Testimonial", url: "#testimonial" });
  }

  const toc = { items };

  const thumbnailBlurhash = await getBlurDataURL(post.image);

  return (
    <>
      <MaxWidthWrapper className="pt-6 md:pt-10">
{/*         <Breadcrumb title={post.title} />
 */}        <div className="flex flex-col space-y-4">
          <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {post.description}
          </p>
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
            <div className="space-y-24 p-6">
              <dl className="grid grid-cols-2 gap-8">
                {post.client && (
                  <div>
                    <dt className="mb-1 text-sm">Client</dt>
                    <dd className="font-medium">{post.client}</dd>
                  </div>
                )}
                <div>
                  <dt className="mb-1 text-sm">Year</dt>
                  <dd className="font-medium">{post.year}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm">Category</dt>
                  <dd className="font-medium">{post.category}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-sm">Services</dt>
                  <dd className="font-medium">
                    {Array.isArray(post.services)
                      ? post.services.join(", ")
                      : post.services}
                  </dd>
                </div>
              </dl>

              {/* Challenge */}
              {post.challenge && (
                <section id="challenge">
                  <h2>Challenge</h2>

                  <p className="text-base">{post.challenge}</p>
                </section>
              )}

              {/* Solution */}
              {post.solution && (
                <section id="solution">
                  <h2>Solution</h2>

                  <p className="text-base">{post.solution}</p>
                </section>
              )}

              {/* post Images */}
              {post.images && post.images.length > 0 && (
                <ProjectGallery images={post.images} title={post.title} />
              )}

              {/* Outcome */}
              {post.outcome && (
                <section id="outcome">
                  <h2>Outcome</h2>

                  <p className="text-base">{post.outcome}</p>
                </section>
              )}

              {/* Testimonial */}
              {post.testimonialQuote &&
                post.testimonialAuthor &&
                post.testimonialRole &&
                post.testimonialImage && (
                  <section
                    id="testimonial"
                    className="border-dark-200 border-t pt-16 dark:border-gray-800"
                  >
                    <blockquote className="gap-16">
                      <div>
                        <p className="mb-6 text-lg font-medium">
                          &quot;{post.testimonialQuote}&quot;
                        </p>
                        <div className="flex items-center space-x-4">
                          {post.testimonialImage && (
                            <BlurImage
                              alt={post.title}
                              blurDataURL={placeholderBlurhash}
                              className="size-12 rounded-full"
                              width={48}
                              height={48}
                              loading="lazy"
                              placeholder="blur"
                              src={post.testimonialImage}
                            />
                          )}
                          <div>
                            <p className="font-medium text-primary">
                              {post.testimonialAuthor}
                            </p>
                            <p>{post.testimonialRole}</p>
                          </div>
                        </div>
                      </div>
                    </blockquote>
                  </section>
                )}
            </div>
          </div>

          <div className="sticky top-20 col-span-1 mt-52 hidden flex-col divide-y divide-muted self-start pb-24 lg:flex">
            <ShareButton
              title={post.title}
              description={post.description}
              link={`${siteConfig.url}/${params.locale}/portfolio/${params.slug}`}
              imageUrl={post.image}
            />
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
