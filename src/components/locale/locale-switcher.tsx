"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";

import { AppConfig, usePathname, useRouter } from "@/lib/locales";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LocaleSwitcher({ dropdown }: { dropdown: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "tr" : "en";
    router.push(pathname, { locale: newLocale });
    router.refresh();
  };

  return dropdown ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-2 focus-visible:ring-offset-0" variant="ghost">
          <Languages className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={locale} onValueChange={handleChange}>
          {AppConfig.locales.map((elt) => (
            <DropdownMenuRadioItem key={elt.id} value={elt.id}>
              {elt.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button
      onClick={toggleLocale}
      variant="ghost"
      size="icon"
      className="flex items-center gap-1 p-1 px-2"
    >
      <span className="text-base font-medium">
        {locale === "en" ? "TR" : "EN"}
      </span>
    </Button>
  );
}
