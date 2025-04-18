import { GoogleAnalytics } from "@next/third-parties/google";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { env } from "@/env.mjs";
import { getDocsConfig } from "@/config/docs";
import { getMarketingConfig } from "@/config/marketing";
import { NavMobile } from "@/components/layout/mobile-nav";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";

// Type for layout params
type MarketingLayoutParams = {
  locale: string;
};

interface MarketingLayoutProps {
  children: React.ReactNode;
  params: Promise<MarketingLayoutParams>;
}

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  const t = await getTranslations();
  const marketingConfig = getMarketingConfig(t);
  const docsConfig = getDocsConfig(t);

  const translations = {
    adminPanel: t("Dashboard.sidebar.adminPanel"),
    dashboard: t("Dashboard.sidebar.dashboard"),
    login: t("Marketing.login"),
    signUp: t("Marketing.signUp"),
  };

  return (
    <div className="flex min-h-screen flex-col">
      {env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      )}
      <NavMobile
        marketingConfig={marketingConfig}
        docsConfig={docsConfig}
        translations={translations}
      />
      <NavBar
        scroll={true}
        marketingConfig={marketingConfig}
        docsConfig={docsConfig}
        translations={translations}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
