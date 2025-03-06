
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/lib/utils";
import { SiAirtable as Airtable } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import Link from "@/components/link/link";
import { Icons } from "@/components/shared/icons";

interface HeroLandingProps {
  locale: string;
}

export default async function HeroLanding({ locale }: HeroLandingProps) {
  const t = await getTranslations("HeroLanding");
  return (
    <section className="mt-16">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.links.airtable}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
                rounded: "lg",
              }),
              "group px-5",
            )}
          >
            <Airtable className="mr-2 size-5" />
            <span>Airtable Services Partner</span>
            <Icons.arrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <h1 className="text-balance text-4xl font-medium mb-0">
          We create meaningful digital experiences through minimalist design
          principles.
        </h1>

        <p className=" max-w-lg text-base">
          Our approach is guided by Dieter Rams&apos; principles of good design,
          focusing on innovation, usefulness, and environmental consciousness.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={`/pricing`}
            prefetch={true}
            className={cn(
              buttonVariants({
                size: "lg",
                rounded: "lg",
              }),
              "group",
            )}
          >
            <span>Book a free discovery call</span>
            <Icons.arrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={`/about`}
            prefetch={true}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                rounded: "lg",
              }),
            )}
          >
            <span>About us</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
