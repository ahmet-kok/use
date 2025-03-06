import { createNavigation } from "next-intl/navigation";

import { defaultLocale, localePrefix, locales } from ".";

// Define the common pathnames for all locales
export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale: defaultLocale,
  localePrefix: localePrefix,
});
