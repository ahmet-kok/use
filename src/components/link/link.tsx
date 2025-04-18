import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intl";

interface MultiLangLinkProps extends Omit<NextLinkProps, "href"> {
  href: string;
  className?: string;
  children?: React.ReactNode;
  target?: string;
  rel?: string;
}

const Link: React.FC<MultiLangLinkProps> = ({
  href,
  children,
  className,
  target,
  rel,
  ...props
}) => {
  const locale = useLocale();

  // Only add locale prefix for non-English locales (zh, tr)
  // For English (default locale), use the path as is
  const localizedHref = href.startsWith("/")
    ? locale === "en"
      ? href
      : `/${locale}${href}`
    : href;

  return (
    <NextLink
      href={localizedHref}
      className={className}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
