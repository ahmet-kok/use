import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import ChatPageClient from './page-client';

type ChatPageParams = {
  params: Promise<{ locale: string }>;
};

export default async function ChatPage({ params }: ChatPageParams) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <ChatPageClient locale={locale} />
    </NextIntlClientProvider>
  );
}
