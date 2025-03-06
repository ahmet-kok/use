import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import QuotaPageClient from './page-client';

type QuotaPageParams = {
  params: Promise<{ locale: string }>;
};

export default async function QuotaPage({ params }: QuotaPageParams) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <QuotaPageClient locale={locale} />
    </NextIntlClientProvider>
  );
}
