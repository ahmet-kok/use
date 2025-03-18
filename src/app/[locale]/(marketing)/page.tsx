import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";
import BentoGrid from "@/components/sections/bentogrid";
import Blog from "@/components/sections/blog";
import Companies from "@/components/sections/companies";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Powered from "@/components/sections/powered";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

// Type for page params
type HomePageParams = {
  locale: string;
};

export const metadata = constructMetadata();

export default async function HomePage(props: { params: HomePageParams }) {
  setRequestLocale(props.params.locale);
  const t = await getTranslations("HomePage");

  return (
    <MaxWidthWrapper>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteConfig.url}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <HeroLanding locale={props.params.locale} />
      <Companies locale={props.params.locale} />
      {/* <HeroLanding locale={params.locale} />
      <PreviewLanding /> 
      <Powered locale={params.locale} /> 
      <BentoGrid locale={params.locale} /> 
      <InfoLanding locale={params.locale} /> 
      <Features />  */}
      <Testimonials locale={props.params.locale} />
      <Blog view="featured" link="/blog" linkText="View All" />
    </MaxWidthWrapper>
  );
}
