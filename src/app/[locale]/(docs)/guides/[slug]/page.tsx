import { allGuides } from "contentlayer/generated";
import Link from "@/components/link/link";
import { notFound } from "next/navigation";

import { Mdx } from "@/components/content/mdx-components";
import { DocsPageHeader } from "@/components/docs/page-header";
import { Icons } from "@/components/shared/icons";
import { DashboardTableOfContents } from "@/components/shared/toc";
import { getTableOfContents } from "@/lib/toc";

import "@/styles/mdx.css";

import { Metadata } from "next";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn, constructMetadata } from "@/lib/utils";

// Type for static params generation (without Promise)
type GuidePageParams = {
  slug: string;
  locale: string;
};

async function getGuideFromParams(params: GuidePageParams) {
  const slug = params.slug
    ? params.locale + "/" + params.slug
    : params.locale;

  const guide = allGuides.find((guide) => {
    return guide.slugAsParams === slug;
  });

  if (!guide) return null;
  
  return guide;
}

export async function generateStaticParams(): Promise<GuidePageParams[]> {
  return allGuides.map((guide) => {
    // Assuming the slugAsParams has format "locale/slug"
    const slugParts = guide.slugAsParams.split("/");
    return {
      locale: slugParts[0] || "",
      slug: slugParts[1] || slugParts[0] || "",
    };
  });
}

export async function generateMetadata(props: {
  params: Promise<GuidePageParams>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const guide = await getGuideFromParams(params);
  
  if (!guide) {
    return;
  }

  const { title, description } = guide;

  return constructMetadata({
    title: `${title} – UseEfficiently`,
    description: description,
  });
}

export default async function GuidePage(props: {
  params: Promise<GuidePageParams>;
}) {
  const params = await props.params;
  const guide = await getGuideFromParams(params);

  if (!guide) {
    notFound();
  }

  const toc = await getTableOfContents(guide.body.raw);

  return (
    <MaxWidthWrapper>
      <div className="relative py-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:py-10 xl:gap-20">
        <div>
          <DocsPageHeader heading={guide.title} text={guide.description} />
          <Mdx code={guide.body.raw} />
          <hr className="my-4" />
          <div className="flex justify-center py-6 lg:py-10">
            <Link
              href="/guides"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Icons.chevronLeft className="mr-2 size-4" />
              See all guides
            </Link>
          </div>
        </div>
        <div className="hidden text-sm lg:block">
          <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
            <DashboardTableOfContents toc={toc} />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
