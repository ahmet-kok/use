import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { contactInfo, meetingTypes } from "@/config/site";
import { constructMetadata } from "@/lib/utils";
import { ContactForm } from "@/components/forms/contact-form";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Section } from "@/components/shared/section";

export const metadata = constructMetadata({
  title: "Contact",
  description: "Contact us for more information.",
  image: "/api/og?heading=Contact",
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
    <MaxWidthWrapper page>
      {/* Contact Info */}
      <Section
        title="Contact Us"
        tag="h1"
        text="Let's discuss your project and explore how we can create something meaningful together."
        grid="2"
      >
        <Section>
          <Section title="Contact Info" tag="h2" grid="2">
            {contactInfo.map((info) => (
              <Section
                key={info.label}
                title={info.label}
                tag="h3"
                text={info.value}
              />
            ))}
          </Section>
          <Section title="Meeting Scheduling Options" tag="h2">
            {meetingTypes.map((type) => (
              <Section
                button
                key={type.slug}
                title={type.title}
                tag="h3"
                text={type.description}
                linkText={type.duration}
                link={type.slug}
                border
              />
            ))}
          </Section>
        </Section>
        <Section>
          <Section
            title="Send a Message"
            tag="h2"
            text="Share detailed information about your project through our form"
          />
          <ContactForm />
        </Section>
      </Section>
    </MaxWidthWrapper>
  );
}
