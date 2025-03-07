import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { TailwindIndicator } from "./tailwind-indicator";

export function Settings() {
  return (
    <>
      <VercelAnalytics />
      <GoogleAnalytics gaId="G-MS4ZQ0JQQD" />
      <SpeedInsights />
      <TailwindIndicator />
    </>
  );
}
