import { Metadata, Viewport } from "next";
import { clsx, type ClassValue } from "clsx";
import ms from "ms";
import { twMerge } from "tailwind-merge";
import { headers } from "next/headers";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Define theme colors for light and dark modes
export const lightThemeColor = "#ffffff"; // Light theme color
export const darkThemeColor = "#18181b"; // Dark theme color

/**
 * Generate alternates object with hreflang links for all locales
 * @param path Path without locale prefix
 */
export function generateHreflangAlternates(path: string) {
  const alternates: Record<string, string> = {};
  
  // Map locales to their hreflang tags
  const hreflangMap: Record<string, string> = {
    en: "en-US",
    tr: "tr-TR",
    // Add more locale mappings as needed
  };
  
  // Generate alternates for each locale
  Object.entries(hreflangMap).forEach(([locale, hreflang]) => {
    alternates[hreflang] = constructCanonicalUrl(`/${locale}${path}`);
  });
  
  return alternates;
}

// Update constructMetadata to include hreflang alternates
export function constructMetadata({
  title = siteConfig.name,
  titleTemplate = `%s | ${siteConfig.name}`,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
  noIndex = false,
  keywords = [],
  canonical,
  type = "website",
  publishedTime,
  authors = ["UseEfficiently"],
  hreflangPath,
}: {
  title?: string;
  titleTemplate?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  keywords?: string[];
  canonical?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  hreflangPath?: string;
} = {}): Metadata {
  // Make sure we have a valid URL for metadataBase
  const url = siteConfig.url;

  // Default SEO keywords for the site - updated with targeted keywords
  const defaultKeywords = [
    "Airtable",
    "Project Management",
    "Youth Programs",
    "Design Agency",
    "Digital Experience",
    "Dieter Rams",
    "Minimalist Design",
    "API Integration",
    "LinkedIn API",
    "Workflow Automation",
    "Next.js",
    "React",
    "Web Development",
    "Innovation",
    "Custom Solutions",
  ];

  // Combine default and page-specific keywords
  const allKeywords = [...defaultKeywords, ...keywords];
  
  // Generate hreflang alternates if path is provided
  const languageAlternates = hreflangPath 
    ? { languages: generateHreflangAlternates(hreflangPath) }
    : undefined;

  return {
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
    keywords: allKeywords,
    authors: authors.map(author => ({
      name: author,
    })),
    creator: "UseEfficiently",
    openGraph: {
      type,
      locale: "en_US",
      url: canonical || url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { 
        publishedTime,
        authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@useefficiently",
      site: "@useefficiently",
    },
    icons,
    metadataBase: new URL(url),
    manifest: `${url}/site.webmanifest`,
    alternates: {
      ...(canonical && { canonical }),
      ...(languageAlternates?.languages && { languages: languageAlternates.languages }),
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

// Create a viewport configuration function with theme-responsive colors
export function constructViewport(): Viewport {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: lightThemeColor },
      { media: "(prefers-color-scheme: dark)", color: darkThemeColor },
    ],
  };
}

/**
 * Format a date string for display
 * @param dateString Date string to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatDateWithLocale(
  locale: string,
  input: string | number,
): string {
  const date = new Date(input);
  return date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

// Utils from precedent.dev
export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const getBlurDataURL = async (url: string | null) => {
  if (!url) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }

  if (url.startsWith("/_static/")) {
    url = `${siteConfig.url}${url}`;
  }

  try {
    const response = await fetch(
      `https://wsrv.nl/?url=${url}&w=50&h=50&blur=5`,
    );
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
};

export const placeholderBlurhash =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoJJREFUWEfFl4lu4zAMRO3cx/9/au6reMaOdkxTTl0grQFCRoqaT+SQotq2bV9N8rRt28xms87m83l553eZ/9vr9Wpkz+ezkT0ej+6dv1X81AFw7M4FBACPVn2c1Z3zLgDeJwHgeLFYdAARYioAEAKJEG2WAjl3gCwNYymQQ9b7/V4spmIAwO6Wy2VnAMikBWlDURBELf8CuN1uHQSrPwMAHK5WqwFELQ01AIXdAa7XawfAb3p6AOwK5+v1ugAoEq4FRSFLgavfQ49jAGQpAE5wjgGCeRrGdBArwHOPcwFcLpcGU1X0IsBuN5tNgYhaiFFwHTiAwq8I+O5xfj6fOz38K+X/fYAdb7fbAgFAjIJ6Aav3AYlQ6nfnDoDz0+lUxNiLALvf7XaDNGQ6GANQBKR85V27B4D3QQRw7hGIYlQKWGM79hSweyCUe1blXhEAogfABwHAXAcqSYkxCtHLUK3XBajSc4Dj8dilAeiSAgD2+30BAEKV4GKcAuDqB4TdYwBgPQByCgApUBoE4EJUGvxUjF3Q69/zLw3g/HA45ABKgdIQu+JPIyDnisCfAxAFNFM0EFNQ64gfS0EUoQP8ighrZSjn3oziZEQpauyKbfjbZchHUL/3AS/Dd30gAkxuRACgfO+EWQW8qwI1o+wseNuKcQiESjALvwNoMI0TcRzD4lFcPYwIM+JTF5x6HOs8yI7jeB5oKhpMRFH9UwaSCDB2Jmg4rc6E2TT0biIaG0rQhNqyhpHBcayTTSXH6vcDL7/sdqRK8LkwTsU499E8vRcAojHcZ4AxABdilgrp4lsXk8oVqgwh7+6H3phqd8J0Kk4vbx/+sZqCD/vNLya/5dT9fAH8g1WdNGgwbQAAAABJRU5ErkJggg==";

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export class ApiResponse<T> {
  code: number;
  message: string;
  data: T;

  constructor(code: number, message: string, data: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static success<T>(data: T): string {
    return JSON.stringify(new ApiResponse(200, "success", data));
  }

  static successWithoutData<T>(): string {
    return JSON.stringify(new ApiResponse(200, "success", null));
  }

  static successWithMessage<T>(message: string, data: T): string {
    return JSON.stringify(new ApiResponse(200, message, data));
  }

  static error<T>(code: number, message: string): string {
    return JSON.stringify(new ApiResponse(code, message, null));
  }
}

/**
 * Constructs canonical URL for the current page
 * @param path - Current path including locale
 */
export function constructCanonicalUrl(path: string): string {
  // Use siteConfig URL as the base
  const url = siteConfig.url;
  
  // Normalize path to not have trailing slash
  const normalizedPath = path.endsWith('/') && path !== '/' 
    ? path.slice(0, -1) 
    : path;
  
  // Return full canonical URL
  return `${url}${normalizedPath}`;
}
