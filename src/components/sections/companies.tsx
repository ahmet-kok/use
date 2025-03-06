import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Company, getCompanies } from "@/lib/airtable";
import { HeaderSection } from "@/components/shared/header-section";

import CustomButton from "../shared/custom-button";

export default async function Companies({ locale }) {
  const t = useTranslations("Companies");
  return (
    <section>
      <HeaderSection title={"Companies We've Worked With"} />

      <Suspense fallback={<CompanySkeleton />}>
        <CompanyListWrapper />
      </Suspense>
    </section>
  );
}

async function CompanyListWrapper() {
  const companies = await getCompanies();
  return <CompanyList companies={companies} />;
}

function CompanySkeleton() {
  return (
    <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex h-12">
          <div className="relative h-full w-12 flex-shrink-0">
            <div className="bg-dark-100 dark:bg-dark-800 absolute inset-0 animate-pulse rounded-lg" />
          </div>
          <div className="border-dark-200 ml-6 flex w-full items-center justify-between border-b dark:border-gray-800">
            <div className="bg-dark-100 dark:bg-dark-800 h-4 w-32 animate-pulse rounded" />
            <div className="flex items-center">
              <div className="bg-dark-100 dark:bg-dark-800 h-4 w-20 animate-pulse rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface CompanyListProps {
  companies: Company[];
}

export function CompanyList({ companies }: CompanyListProps) {
  return (
    <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
      {companies.map((item) => (
        <Link
          prefetch={true}
          key={item.id}
          href={item.slug ? `/portfolio/${item.slug}` : item.url}
          target={item.slug ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="group flex h-12"
        >
          <div className="relative h-full w-12 flex-shrink-0">
            <Image
              src={item.logo[0]?.thumbnails?.large?.url || item.logo[0]?.url}
              alt={item.name}
              width={100}
              height={100}
              className="size-full object-contain"
              placeholder="blur"
              blurDataURL={item.logo[0]?.thumbnails?.small?.url}
              loading="lazy"
            />
          </div>
          <div className="ml-6 flex w-full items-center justify-between border-b">
            <span className="pr-3 text-base">{item.name}</span>
            <CustomButton text="View project" />
          </div>
        </Link>
      ))}
    </div>
  );
}
