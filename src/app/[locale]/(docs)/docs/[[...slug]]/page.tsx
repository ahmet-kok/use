import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/content/mdx-components";
import { DocsPageHeader } from "@/components/docs/page-header";
import { DocsPager } from "@/components/docs/pager";
import { DashboardTableOfContents } from "@/components/shared/toc";
import { getTableOfContents } from "@/lib/toc";

import "@/styles/mdx.css";

import { Metadata } from "next";

import { constructMetadata, getBlurDataURL } from "@/lib/utils";

// Type for static params generation (without Promise)
type DocPageParams = {
  slug: string[];
  locale: string;
};

async function getDocFromParams(params: DocPageParams) {
  const slug = params.slug
    ? params.locale + "/" + params.slug.join("/")
    : params.locale;
  const doc = allDocs.find((doc) => {
    return doc.slugAsParams === slug;
  });

  if (!doc) return null;

  return doc;
}

export async function generateMetadata(props: {
  params: Promise<DocPageParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const doc = await getDocFromParams(params);

  if (!doc) return {};

  const { title, description } = doc;

  return constructMetadata({
    title: `${title} – UseEfficiently`,
    description: description,
  });
}

export async function generateStaticParams(): Promise<DocPageParams[]> {
  return allDocs.map((doc) => {
    const slugParts = doc.slugAsParams.split("/");
    return {
      locale: slugParts[0],
      slug: slugParts.slice(1),
    };
  });
}

export default async function DocPage(props: {
  params: Promise<DocPageParams>;
}) {
  const params = await props.params;
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  const images = await Promise.all(
    doc.images.map(async (src: string) => ({
      src,
      blurDataURL: await getBlurDataURL(src),
    })),
  );

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <div className="pb-4 pt-11">
          <Mdx code={doc.body.raw} images={images} />
        </div>
        <hr className="my-4 md:my-6" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-8">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
