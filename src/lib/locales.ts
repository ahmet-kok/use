import { defaultLocale, localePrefix } from "@/i18n";
import { createNavigation } from "next-intl/navigation";

// Define the type locally since the import is causing issues

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: "UseEfficiently",
  locales: [
    {
      id: "en",
      name: "English",
    },
    { id: "tr", name: "Türkçe" },
  ],
  defaultLocale,
  localePrefix,
};

export const AllLocales = AppConfig.locales.map((locale) => locale.id);

export const { usePathname, useRouter } = createNavigation({
  locales: AllLocales,
  defaultLocale: AppConfig.defaultLocale,
  localePrefix: AppConfig.localePrefix,
});
