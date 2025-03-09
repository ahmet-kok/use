import { Suspense } from "react";
import { ArrowRightIcon, CalendarIcon, MailIcon } from "lucide-react";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { getCareer } from "@/lib/airtable";
import { constructMetadata } from "@/lib/utils";
import { Header } from "@/components/ui/header";
import Link from "@/components/link/link";

import CareerList, { CareerSkeleton } from "./CareerList";

export const metadata = constructMetadata({
  title: "Career",
  description: "Explore our career opportunities.",
  image: "/api/og?heading=Career",
});

type PricingPageParams = {
  params: Promise<{ locale: string }>;
};

export default async function CareerPage({ params }: PricingPageParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("PricingPage");
  const messages = await getMessages({ locale });

  return (
    <>
      <Header
        title="Join Our Team"
        description="We're looking for passionate individuals who share our commitment to creating meaningful digital experiences through minimalist design."
      />

      <section>
        <h2>Open Positions</h2>
        <Suspense fallback={<CareerSkeleton />}>
          <CareerListWrapper />
        </Suspense>
      </section>

      {/* Quick Contact */}
      <section className="rounded-lg border p-8">
        <h2>Quick Contact</h2>
        <p className="mb-8 text-base">
          Don&apos;t see a position that matches your skills? We&apos;re always
          interested in meeting talented individuals.
        </p>

        <div className="flex flex-col gap-8 sm:flex-row">
          <a
            href="mailto:career@useefficiently.com"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
          >
            <MailIcon className="size-5" />
            <span>career@useefficiently.com</span>
          </a>

          <Link
            prefetch={true}
            href="/schedule-meeting/career"
            className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
          >
            <CalendarIcon className="size-5" />
            <span>Schedule a 15-minute call</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <h2>Our Values</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4">Less, but better</h3>
            <p>
              We believe in the power of reduction and focus on what truly
              matters.
            </p>
          </div>
          <div>
            <h3 className="mb-4">Innovation with purpose</h3>
            <p>
              We push boundaries while staying true to fundamental design
              principles.
            </p>
          </div>
          <div>
            <h3 className="mb-4">Continuous learning</h3>
            <p>We foster an environment of growth and knowledge sharing.</p>
          </div>
        </div>
      </section>
    </>
  );
}

async function CareerListWrapper() {
  const career = await getCareer();
  return <CareerList career={career} />;
}
