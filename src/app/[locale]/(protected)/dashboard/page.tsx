import { redirect } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";

import { getCurrentUser } from "@/lib/session";
import { UpgradeCard } from "@/components/dashboard/upgrade-card";

import DashboardPageClient from "./page-client";

type DashboardPageParams = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: DashboardPageParams) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const messages = await getMessages({ locale });
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(`/${locale}/login`);
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <DashboardPageClient locale={locale} user={currentUser} />
    </NextIntlClientProvider>
  );
}
