import { MetadataRoute } from "next";
import { allPosts, allPages } from "contentlayer/generated";
import { locales } from "@/i18n";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = siteConfig.url;

  // Base routes with locale prefix
  const baseRoutes = locales.flatMap((locale) => [
    {
      url: `${url}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${url}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${url}/${locale}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${url}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${url}/${locale}/career`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const, 
      priority: 0.7,
    },
  ]);

  // Blog posts routes
  const blogRoutes = allPosts.flatMap((post) => 
    locales.map((locale) => ({
      url: `${url}/${locale}/blog/${post.slugAsParams}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  // Content pages routes
  const pageRoutes = allPages.flatMap((page) => 
    locales.map((locale) => ({
      url: `${url}/${locale}/${page.slugAsParams}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  return [...baseRoutes, ...blogRoutes, ...pageRoutes];
} 