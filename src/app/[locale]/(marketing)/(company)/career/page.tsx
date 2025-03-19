import { Suspense } from "react";
import { ArrowRightIcon, CalendarIcon, MailIcon } from "lucide-react";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { getCareer } from "@/lib/airtable";
import { constructMetadata } from "@/lib/utils";
import CustomButton from "@/components/shared/custom-button";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Section } from "@/components/shared/section";

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

  const t = await getTranslations("CareerPage");
  const messages = await getMessages({ locale });

  return (
    <MaxWidthWrapper page>
      <Section
        tag="h1"
        title="Join Our Team"
        text="We're looking for passionate individuals who share our commitment to creating meaningful digital experiences through minimalist design."
      />

      {/* Open Positions */}
      <Section tag="h2" title="Open Positions">
        <Suspense fallback={<CareerSkeleton />}>
          <CareerListWrapper />
        </Suspense>
      </Section>

      {/* Quick Contact */}
      <Section
        title="Quick Contact"
        tag="h2"
        text="Don't see a position that matches your skills? We're always
          interested in meeting talented individuals."
        link="/schedule-meeting/career"
        linkText="Schedule a 15-minute call"
        border
      >
        <CustomButton
          link="mailto:career@useefficiently.com"
          text="career@useefficiently.com"
          icon={<MailIcon className="size-5" />}
        />
      </Section>

      {/* Values Section */}
      <Section title="Our Values" tag="h2" grid="3">
        <Section
          tag="h3"
          title="Less, but better"
          text="We believe in the power of reduction and focus on what truly matters."
        />
        <Section
          tag="h3"
          title="Innovation with purpose"
          text="We push boundaries while staying true to fundamental design principles."
        />
        <Section
          tag="h3"
          title="Continuous learning"
          text="We foster an environment of growth and knowledge sharing."
        />
      </Section>
      {/* Others Section */}
      <Section title="More about us" tag="h2" grid="2">
        <Section
          title="Meet the team"
          tag="h3"
          text="Meet the team behind our design agency. We're a small team of designers and developers who are passionate about creating beautiful and functional digital experiences."
          link="/team"
          linkText="Meet the team"
          border
          button
        />
        <Section
          title="Our Mission"
          tag="h3"
          text="Learn about our mission to create meaningful digital experiences through minimalist design principles."
          link="/about"
          linkText="About us"
          border
          button
        />
      </Section>
    </MaxWidthWrapper>
  );
}

async function CareerListWrapper() {
  const career = await getCareer();
  return <CareerList career={career} />;
}
