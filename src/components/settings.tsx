import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function Settings() {
  return (
    <>
      <VercelAnalytics />
      <GoogleAnalytics gaId="G-MS4ZQ0JQQD" />
      <SpeedInsights />
    </>
  );
}
