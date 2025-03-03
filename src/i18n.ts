import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
const locales = ['en', 'zh', 'tr'];
const defaultLocale = 'en';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`./locales/${locale}.json`)).default,
    // When a translation is missing in the active locale, this will fall back to English
    fallbackLocale: defaultLocale,
    // Enable nested keys for fallbacks
    formats: {
      // Other formats if any
    },
    onError: (error) => {
      // Only log missing translation errors in development
      if (process.env.NODE_ENV === 'development' && error.code === 'MISSING_MESSAGE') {
        console.warn('Missing translation:', error.originalMessage);
      }
    }
  };
});