import * as React from "react";
import { useTranslations } from "next-intl";

import { footerLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "@/components/link/link";

import { NewsletterForm } from "../forms/newsletter-form";
import MaxWidthWrapper from "../shared/max-width-wrapper";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("Footer");

  return (
    <footer className={cn("mt-32 border-t", className)}>
      <MaxWidthWrapper>
        <div className="grid grid-cols-2 gap-6 py-14 md:grid-cols-5">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <span className="text-sm font-medium text-foreground">
                {t(`sections.${section.title}.title`)}
              </span>
              <ul className="mt-4 list-inside space-y-3">
                {section.items?.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {t(`sections.${section.title}.items.${link.title}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-full flex flex-col items-end sm:col-span-1 md:col-span-2">
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-16 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm">
              © {new Date().getFullYear()} UseEfficiently. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                prefetch={true}
                href="/privacy"
                className="hover:text-dark-900 text-sm dark:hover:text-white"
              >
                Privacy Policy
              </Link>
              <span className="text-dark-300 dark:text-gray-700">•</span>
              <Link
                prefetch={true}
                href="/terms"
                className="hover:text-dark-900 text-sm dark:hover:text-white"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
