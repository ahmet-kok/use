import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { locales } from "@/i18n";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import { cn, constructMetadata, constructViewport, constructCanonicalUrl } from "@/lib/utils";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/structured-data";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/modals/providers";
import { Settings } from "@/components/settings";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { siteConfig } from "@/config/site";
import Script from "next/script";

// Optimize font loading with display swap and preload
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

// Generate metadata with canonical URL
export const generateMetadata = ({ params }: { params: { locale: string } }) => {
  const canonicalUrl = constructCanonicalUrl(`/${params.locale}`);
  return constructMetadata({
    canonical: canonicalUrl,
  });
};

// Define viewport with improved SEO settings
export const viewport = {
  ...constructViewport(),
  themeColor: "#18181b",
  colorScheme: "light dark",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  // Set the locale for the request using the stable API
  setRequestLocale(locale);
  const messages = useMessages();

  // Generate structured data
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect to critical domains to speed up loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for third-party resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Structured data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          strategy="afterInteractive"
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
          strategy="afterInteractive"
        />
      </head>

      <body
        className={`${inter.variable} min-h-screen bg-background font-sans antialiased cursor-default`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              <ModalProvider locale={locale}>{children}</ModalProvider>
            </NextIntlClientProvider>
            <Toaster richColors closeButton />
            <Settings />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
