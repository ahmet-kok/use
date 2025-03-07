import { getTranslations, setRequestLocale } from "next-intl/server";

import BentoGrid from "@/components/sections/bentogrid";
import Blog from "@/components/sections/blog";
import Companies from "@/components/sections/companies";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Powered from "@/components/sections/powered";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";

// Type for page params
type HomePageParams = {
  locale: string;
};

export default async function HomePage(props: {
  params: Promise<HomePageParams>;
}) {
  const params = await props.params;
  setRequestLocale(params.locale);
  const t = await getTranslations("HomePage");

  return (
    <main>
      <HeroLanding locale={params.locale} />
      <Companies locale={params.locale} />
      {/* <HeroLanding locale={params.locale} />
      <PreviewLanding /> 
      <Powered locale={params.locale} /> 
      <BentoGrid locale={params.locale} /> 
      <InfoLanding locale={params.locale} /> 
      <Features />  */}
      <Testimonials locale={params.locale} />
      <Blog view="featured" link="/blog" linkText="View All" />
    </main>
  );
}
