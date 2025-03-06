import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import APIKeysPageClient from './page-client';

type APIKeysPageParams = {
  params: Promise<{ locale: string }>;
};

export default async function APIKeysPage({ params }: APIKeysPageParams) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <APIKeysPageClient locale={locale} />
    </NextIntlClientProvider>
  );
}
