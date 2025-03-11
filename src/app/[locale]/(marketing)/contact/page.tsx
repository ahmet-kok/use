import { CalendarIcon } from "lucide-react";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { contactInfo, meetingTypes, siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";
import { Header } from "@/components/ui/header";
import { ContactForm } from "@/components/forms/contact-form";
import Link from "@/components/link/link";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

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
    <>
      <MaxWidthWrapper className="grid gap-16 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-16">
          <Header
            title="Contact Us"
            description="Let's discuss your project and explore how we can create something meaningful together."
            topMargin="mt-0"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {contactInfo.map((info) => (
              <div key={info.label} className="inline-block">
                <p className="text-sm font-medium">{info.label}</p>
                <p className="text-base text-primary">{info.value}</p>
              </div>
            ))}
          </div>

          {/* Meeting Scheduling Options */}
          <div className="pt-8">
            <div className="mb-6 flex items-center gap-3">
              <CalendarIcon className="size-6" />
              <h3>Schedule a Meeting</h3>
            </div>

            <div className="space-y-4">
              {meetingTypes.map((type) => (
                <Link
                  key={type.slug}
                  href={`/schedule-meeting/${type.slug}`}
                  className="group block rounded-lg border p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4>{type.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{type.duration}</span>
                    </div>
                  </div>
                  <p>{type.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-4 rounded-lg border p-4 transition-colors">
          <div className="flex items-center gap-3">
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <h3>Send a Message</h3>
          </div>
          <p>Share detailed information about your project through our form</p>
          <ContactForm />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
