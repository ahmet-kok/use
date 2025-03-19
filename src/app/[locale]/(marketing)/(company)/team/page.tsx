import { Suspense } from "react";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { getTeam } from "@/lib/airtable";
import { constructMetadata } from "@/lib/utils";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Section } from "@/components/shared/section";

import TeamList, { TeamSkeleton } from "./TeamList";

export const metadata = constructMetadata({
  title: "Team",
  description: "Meet our team of designers and developers.",
  image: "/api/og?heading=Team",
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
        title="Our Team"
        text="A collective of designers and developers dedicated to creating
          meaningful digital experiences through minimalist design."
      >
        <Suspense fallback={<TeamSkeleton />}>
          <TeamListWrapper />
        </Suspense>
      </Section>

      {/* Values Section */}
      <Section title="Our Values" tag="h2" grid="3">
        <Section
          tag="h3"
          title="Less, but better"
          text="We believe in the power of reduction and focus on what truly matters in every project we undertake."
        />
        <Section
          tag="h3"
          title="Form follows function"
          text="Every design decision is driven by purpose and functionality, creating meaningful user experiences."
        />

        <Section
          tag="h3"
          title="Continuous learning"
          text="We foster an environment of growth and knowledge sharing."
        />
      </Section>
      {/* Join Us Section */}

      <Section title="More about us" tag="h2" grid="2">
        <Section
          tag="h3"
          title="Join Our Team"
          text="We're always looking for talented individuals who share our passion for minimalist design and meaningful digital experiences."
          link="/career"
          linkText="View Open Positions"
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

async function TeamListWrapper() {
  const team = await getTeam();
  return <TeamList team={team} />;
}
