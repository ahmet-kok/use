import { LocalePrefix } from "next-intl/dist/types/src/routing/types";

import { createSharedPathnamesNavigation } from 'next-intl/navigation';

const localePrefix: LocalePrefix = 'as-needed';
// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'FFlow Next',
  locales: [
    {
      id: 'en',
      name: 'English',
    },
    { id: 'zh', name: '中文' },
    { id: 'tr', name: 'Türkçe' },
  ],
  defaultLocale: 'en',
  localePrefix,
};

export const AllLocales = AppConfig.locales.map((locale) => locale.id);

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
});
