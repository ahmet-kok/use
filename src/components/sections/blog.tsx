import { Suspense } from "react";
import { useTranslations } from "next-intl";

import type { Blog } from "@/lib/airtable";
import { getBlog } from "@/lib/airtable";
import { Section } from "@/components/shared/section";

import BlogList from "./blog-list";

interface BlogProps {
  view: "all" | "featured";
  category?: boolean;
  link?: string;
  linkText?: string;
  main?: boolean;
}

export default function Blog({
  view,
  category = false,
  link,
  linkText,
  main,
}: BlogProps) {
  const t = useTranslations("Blog");
  return (
    <Section
      title="Our journey"
      link={link}
      linkText={linkText}
      tag={main ? "h1" : "h2"}
    >
      <Suspense fallback={<BlogSkeleton />}>
        <BlogListWrapper view={view} category={category} />
      </Suspense>
    </Section>
  );
}

export async function BlogListWrapper({ view, category = false }: BlogProps) {
  const blog = await getBlog(view);
  return <BlogList blog={blog} category={category} />;
}
export function BlogSkeleton() {
  return (
    <div className="size-full space-y-16">
      {/* Tag Skeleton */}
      <div className="flex flex-wrap gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="dark:bg-dark-800 h-8 animate-pulse rounded-lg bg-gray-300 px-3 py-1"
            style={{ width: "100px" }}
          />
        ))}
      </div>

      {/* Posts Skeleton */}
      <div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="py-12 first:pt-0 last:pb-0">
            <div className="relative flex flex-col items-start gap-6 md:flex-row">
              {/* Image */}
              <div className="dark:bg-dark-800 aspect-video w-60 max-w-full shrink-0 animate-pulse overflow-hidden rounded-lg bg-gray-300" />

              {/* Content */}
              <div className="min-w-0 flex-1">
                {/* Meta */}
                <div className="mb-2 flex items-baseline gap-4">
                  <div className="dark:bg-dark-800 h-4 w-16 animate-pulse rounded bg-gray-300" />
                  <div className="dark:bg-dark-800 h-4 w-1 animate-pulse rounded bg-gray-300" />
                  <div className="dark:bg-dark-800 h-4 w-16 animate-pulse rounded bg-gray-300" />
                  <div className="dark:bg-dark-800 h-4 w-1 animate-pulse rounded bg-gray-300" />
                  <div className="dark:bg-dark-800 h-4 w-16 animate-pulse rounded bg-gray-300" />
                </div>

                {/* Title */}
                <div className="dark:bg-dark-800 mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-300" />

                {/* Description */}
                <div className="dark:bg-dark-800 h-4 w-full animate-pulse rounded bg-gray-300" />
              </div>

              {/* Read Post Button */}
              <div className="absolute bottom-0 right-0 md:static md:flex md:items-center">
                <div className="flex items-center gap-2">
                  <div className="dark:bg-dark-800 h-4 w-16 animate-pulse rounded bg-gray-300" />
                  <div className="dark:bg-dark-800 size-4 animate-pulse rounded bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface BlogListProps {
  blog: Blog[];
  category: boolean;
}
