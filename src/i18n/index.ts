// Define all supported locales
export const locales = ['en', 'tr'];
export const defaultLocale = 'en';

// Configure locale prefix strategy
export type LocalePrefix = 'always' | 'as-needed' | 'never';
export const localePrefix: LocalePrefix = 'as-needed';

// Create a type with all supported locales
export type Locale = (typeof locales)[number];

// Helper function to check if a locale is supported
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
} 