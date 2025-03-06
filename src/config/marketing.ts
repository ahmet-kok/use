import { MarketingConfig } from "@/types";

export const getMarketingConfig = (
  t: (key: string) => string,
): MarketingConfig => ({
  mainNav: [
    {
      title: t("Marketing.nav.portfolio"),
      href: `/portfolio`,
    },
    {
      title: t("Marketing.nav.blog"),
      href: `/blog`,
    },
    {
      title: t("Marketing.nav.company"),
      href: `/company`,
    },
    {
      title: t("Marketing.nav.contact"),
      href: `/contact`,
    },
  ],
});
