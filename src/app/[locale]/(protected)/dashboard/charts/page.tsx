import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import ChartsPageClient from './page-client';

type ChartsPageParams = {
  params: Promise<{ locale: string }>;
};

export default async function ChartsPage({ params }: ChartsPageParams) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <ChartsPageClient locale={locale} />
    </NextIntlClientProvider>
  );
}
