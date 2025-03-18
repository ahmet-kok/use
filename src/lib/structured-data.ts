import { siteConfig } from "@/config/site";

/**
 * Generate structured data for Organization schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicons/android-chrome-512x512.png`,
    sameAs: [
      siteConfig.links.airtable,
    ].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.mailSupport,
        contactType: "customer support",
      },
    ],
  };
}

/**
 * Generate structured data for WebSite schema
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate structured data for Article schema
 */
export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  url,
  authorName = "UseEfficiently Team",
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicons/android-chrome-512x512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/**
 * Generate structured data for BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const breadcrumbItems = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };
}

/**
 * Generate structured data for FAQPage schema
 */
export function generateFAQSchema(
  questions: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

/**
 * Generate structured data for LocalBusiness schema
 */
export function generateLocalBusinessSchema({
  name = siteConfig.name,
  description = siteConfig.description,
  url = siteConfig.url,
  telephone,
  address,
}: {
  name?: string;
  description?: string;
  url?: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    telephone,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    image: `${siteConfig.url}/favicons/android-chrome-512x512.png`,
  };
} 