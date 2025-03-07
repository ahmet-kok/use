import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { locales } from "@/i18n";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import { cn, constructMetadata, constructViewport } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/modals/providers";
import { Settings } from "@/components/settings";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata = constructMetadata();
export const viewport = constructViewport();

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

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />

      <body
        className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}
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
