"use client";

import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import ModalProvider from "@/components/modals/providers";

interface ClientProvidersProps {
  children: React.ReactNode;
  messages: any;
  locale: string;
}

export default function ClientProviders({
  children,
  messages,
  locale,
}: ClientProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextIntlClientProvider messages={messages}>
          <ModalProvider locale={locale}>
            {children}
          </ModalProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
} 