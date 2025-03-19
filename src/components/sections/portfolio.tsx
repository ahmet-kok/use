import { Suspense } from "react";
import { useTranslations } from "next-intl";

import type { Portfolio } from "@/lib/airtable";
import { getPortfolio } from "@/lib/airtable";
import PortfolioList from "@/components/sections/portfolio-list";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Section } from "@/components/shared/section";

interface PortfolioProps {
  view: "all" | "featured";
  category?: boolean;
  link?: string;
  linkText?: string;
  main?: boolean;
}

export default function Portfolio({
  view,
  category = false,
  link,
  linkText,
  main,
}: PortfolioProps) {
  const t = useTranslations("Portfolio");
  return (
    <Section
      title="Our journey"
      link={link}
      linkText={linkText}
      tag={main ? "h1" : "h2"}
    >
      <Suspense fallback={<PortfolioSkeleton />}>
        <PortfolioListWrapper view={view} category={category} />
      </Suspense>
    </Section>
  );
}

export async function PortfolioListWrapper({
  view,
  category = false,
}: PortfolioProps) {
  const portfolio = await getPortfolio(view);
  return <PortfolioList portfolio={portfolio} category={category} />;
}
function PortfolioSkeleton() {
  return (
    <div className="space-y-16">
      {/* Tags Skeleton */}
      <div className="flex flex-wrap gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="dark:bg-dark-800 h-8 animate-pulse rounded-lg bg-gray-300 px-3 py-1"
            style={{ width: "100px" }}
          />
        ))}
      </div>

      {/* Projects Skeleton */}
      <div className="divide-dark-200 dark:divide-dark-800 divide-y">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="py-12 first:pt-0 last:pb-0">
            <div className="relative flex flex-col items-start gap-6 md:flex-row">
              {/* Image */}
              <div className="dark:bg-dark-800 aspect-video w-60 max-w-full shrink-0 animate-pulse overflow-hidden rounded-lg bg-gray-300" />

              {/* Content */}
              <div className="min-w-0 flex-1 space-y-4">
                <div className="dark:bg-dark-800 h-4 w-24 animate-pulse rounded bg-gray-300" />
                <div className="dark:bg-dark-800 h-6 w-48 animate-pulse rounded bg-gray-300" />
                <div className="dark:bg-dark-800 mb-4 h-4 w-full animate-pulse rounded bg-gray-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface PortfolioListProps {
  portfolio: Portfolio[];
  category: boolean;
}
