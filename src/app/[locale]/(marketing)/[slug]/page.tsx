import { notFound } from "next/navigation";
import { allPages } from "contentlayer/generated";

import { Mdx } from "@/components/content/mdx-components";

import "@/styles/mdx.css";

import { Metadata } from "next";

import { constructMetadata, getBlurDataURL } from "@/lib/utils";

// Type for static params generation (without Promise)
type MarketingPageParams = {
  slug: string;
  locale?: string;
};

export async function generateStaticParams(): Promise<MarketingPageParams[]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams,
  }));
}

export async function generateMetadata(props: {
  params: Promise<MarketingPageParams>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const page = allPages.find((page) => page.slugAsParams === params.slug);
  if (!page) {
    return;
  }

  const { title, description } = page;

  return constructMetadata({
    title: `${title} – FFlow Next`,
    description: description,
  });
}

export default async function PagePage(props: {
  params: Promise<MarketingPageParams>;
}) {
  const params = await props.params;
  const page = allPages.find((page) => page.slugAsParams === params.slug);

  if (!page) {
    notFound();
  }

  const images = await Promise.all(
    page.images.map(async (src: string) => ({
      src,
      blurDataURL: await getBlurDataURL(src),
    })),
  );

  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-xl text-muted-foreground">{page.description}</p>
        )}
      </div>
      <hr className="my-4" />
      <Mdx code={page.body.raw} images={images} />
    </article>
  );
}
