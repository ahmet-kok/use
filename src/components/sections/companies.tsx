import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Company, getCompanies } from "@/lib/airtable";
import { placeholderBlurhash } from "@/lib/utils";
import BlurImage from "@/components/shared/blur-image";
import { Section } from "@/components/shared/section";

import CustomButton from "../shared/custom-button";

export default function Companies({ locale }) {
  const t = useTranslations("Companies");
  return (
    <Section tag="h2" title={"Companies We've Worked With"}>
      <Suspense fallback={<CompanySkeleton />}>
        <CompanyListWrapper />
      </Suspense>
    </Section>
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
          <div className="relative h-full w-12 shrink-0">
            <div className="dark:bg-dark-800 absolute inset-0 animate-pulse rounded-lg bg-gray-300" />
          </div>
          <div className="border-dark-200 ml-6 flex w-full items-center justify-between border-b dark:border-gray-800">
            <div className="dark:bg-dark-800 h-4 w-32 animate-pulse rounded bg-gray-300" />
            <div className="flex items-center">
              <div className="dark:bg-dark-800 h-4 w-20 animate-pulse rounded bg-gray-300" />
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
      {companies.map((item, index) => (
        <CompanyCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function CompanyCard({ item }: { item: Company }) {
  return (
    <Link
      prefetch={true}
      key={item.id}
      href={item.slug ? `/portfolio/${item.slug}` : item.url}
      target={item.slug ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="group flex h-16"
    >
      <BlurImage
        alt={item.name}
        blurDataURL={placeholderBlurhash}
        className="relative aspect-square h-full w-fit shrink-0 rounded-lg object-cover"
        width={100}
        height={100}
        priority
        placeholder="blur"
        src={item.logo}
        sizes="(max-width: 100px) 100px, 100px"
      />
      <div className="ml-6 flex w-full items-center justify-between border-b">
        <span className="pr-3 text-base">{item.name}</span>
        {item.slug && (
          <CustomButton
            text={"View project"}
            link={`/portfolio/${item.slug}`}
            button={false}
          />
        )}
      </div>
    </Link>
  );
}
