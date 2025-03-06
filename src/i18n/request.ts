import { getRequestConfig } from "next-intl/server";
import { env } from "@/env.mjs";
import { defaultLocale, isValidLocale, localePrefix } from ".";

// Updated to use requestLocale instead of locale parameter
export default getRequestConfig(async ({ requestLocale }) => {
  // Await the requestLocale and provide fallback
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !isValidLocale(locale)) {
    locale = defaultLocale;
  }

  return {
    locale, // Must return the locale
    messages: (await import(`../locales/${locale}.json`)).default,
    defaultLocale: defaultLocale,
    localePrefix: localePrefix,
    // When a translation is missing in the active locale, fall back to English
    fallbackLocale: defaultLocale,

    // Log missing translations in development
    onError: (error) => {
      if (
        env.NODE_ENV === "development" &&
        error.code === "MISSING_MESSAGE"
      ) {
        console.warn("Missing translation:", error.originalMessage);
      }
    },
  };
});
