import { revalidatePath, revalidateTag } from "next/cache";
import Airtable, { Attachment, FieldSet } from "airtable";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";

const url = siteConfig.url;

// Configure Airtable with environment variables
const airtableApiKey = env.AIRTABLE_API_KEY;
const airtableBaseId = env.AIRTABLE_BASE_ID;

// Initialize Airtable
const base = new Airtable({
  apiKey: airtableApiKey,
}).base(airtableBaseId!);

// Define table IDs from schema for easy reference
export const TABLES = {
  COMPANIES: "tbl5DOCi8g2mYuJuv",
  TEAM: "tblfUzj0AYm6sKFiM",
  BLOG: "tblYwmB04qyF05Uyl",
  PROJECTS: "tbloC3sSfJ4JEpus1",
  TESTIMONIALS: "tblnJWlul5lyYXao3",
  SERVICES: "tbl9rQL3ar1jlmPFp",
  career: "tbl3o6HcTGH6Oilmu",
};

// Define table names for easier reference
export const TABLE_NAMES = {
  COMPANIES: "companies",
  TEAM: "team",
  BLOG: "blog",
  PROJECTS: "projects",
  TESTIMONIALS: "testimonials",
  SERVICES: "services",
  career: "career",
};

// Utility function to get image URL from Airtable attachments
export function getImageUrl(
  recordId: string,
  fieldName = "image",
  tableName = "testimonials",
  index = "0",
  thumbnail = false,
): string {
  return thumbnail
    ? `${url}/api/images/${recordId}?table=${tableName}&field=${fieldName}&index=${index}&thumbnail=true`
    : `${url}/api/images/${recordId}?table=${tableName}&field=${fieldName}&index=${index}`;
}

// Keep the Image interface for backward compatibility
export interface Image {
  url: string;
  thumbnail: string;
  // Note: full Airtable.Attachment has more properties like id, filename, size, type, etc.
}

// Generic function to fetch data from Airtable with improved typing
export async function fetchFromAirtable<T>({
  tableName,
  view = "all",
  filterByFormula,
  sort = [],
  maxRecords,
  fields,
  transformer,
}: {
  tableName: string;
  view?: string;
  filterByFormula?: string;
  sort?: { field: string; direction: "asc" | "desc" }[];
  maxRecords?: number;
  fields?: string[];
  transformer?: (record: Airtable.Record<FieldSet>) => T;
}): Promise<T[]> {
  try {
    // Create select options
    const selectOptions: Record<string, any> = {};

    if (view) selectOptions.view = view;
    if (filterByFormula) selectOptions.filterByFormula = filterByFormula;
    if (sort.length > 0) selectOptions.sort = sort;
    if (maxRecords) selectOptions.maxRecords = maxRecords;
    if (fields && fields.length > 0) selectOptions.fields = fields;

    // Execute the query
    const query = base(tableName).select(selectOptions);
    const records = await query.all();

    // Transform records if transformer is provided
    if (transformer) {
      return records.map(transformer) as T[];
    }

    // Return raw records otherwise
    return records as T[];
  } catch (error) {
    console.error(`Error fetching from Airtable [${tableName}]:`, error);
    throw new Error(`Failed to fetch data from ${tableName}`);
  }
}

// Simplified wrapper for the generic fetch function
export async function fetchFromAirtableSimple<T>(
  tableName: string,
  options: {
    view?: string;
    filterByFormula?: string;
    sort?: { field: string; direction: "asc" | "desc" }[];
    maxRecords?: number;
    fields?: string[];
    transformer?: (record: Airtable.Record<FieldSet>) => T;
  },
): Promise<T[]> {
  return fetchFromAirtable({
    tableName,
    ...options,
  });
}
// Cache duration in milliseconds (6 hours)
const CACHE_DURATION = 6 * 60 * 60 * 1000;

// Cache storage with timestamps
type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const cache: { [key: string]: CacheEntry<any> } = {};

// Cache helper functions
function getCachedData<T>(key: string): T | null {
  const entry = cache[key];
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_DURATION;
  if (isExpired) {
    delete cache[key];
    return null;
  }

  return entry.data;
}
function setCachedData<T>(key: string, data: T): void {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}

// Define Career type based on the schema
export interface Career {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  url: string;
  order: number;
}

// Function to get career with caching
export const getCareer = async (view: "all" | "featured") => {
  const cacheKey = `career:${view}`;
  const cached = getCachedData<Career[]>(cacheKey);
  if (cached) return cached;

  const data = await fetchFromAirtableSimple<Career>("career", {
    view,
    sort: [{ field: "order", direction: "asc" }],
    transformer: (record: Airtable.Record<FieldSet>) => {
      const fields = record.fields;
      return {
        id: record.id,
        title: fields.title as string,
        description: fields.description as string,
        type: fields.type as string,
        location: fields.location as string,
        url: fields.url as string,
        order: (fields.order as number) || 0,
      };
    },
  });
  setCachedData(cacheKey, data);
  return data;
};

export interface singleBlog {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
}

export const getSingleBlog = async (slug: string) => {
  const cacheKey = `blog:${slug}`;
  const cached = getCachedData<singleBlog>(cacheKey);
  if (cached) return cached;
  try {
    const data = await fetchFromAirtableSimple<singleBlog>("blog", {
      filterByFormula: `{slug} = '${slug}'`,
      view: "single",
      transformer: (record: Airtable.Record<FieldSet>) => {
        const fields = record.fields;

        return {
          id: record.id,
          title: fields.title as string,
          slug: fields.slug as string,
          description: fields.description as string,
          content: fields.content as string,
          image: getImageUrl(record.id, "image", "blog"),
          category: fields.category as string,
          date: fields.date as string,
          readTime: fields.readTime as string,
          authorName: fields.authorName as string,
          authorRole: fields.authorRole as string,
          authorImage: getImageUrl(record.id, "authorImage", "blog"),
        };
      },
    }).then((res) => {
      return res[0];
    });
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw new Error("Failed to fetch blog");
  }
};

export interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
}

export const getBlog = async (view: "all" | "featured") => {
  const cacheKey = `blog:${view}`;
  const cached = getCachedData<Blog[]>(cacheKey);
  if (cached) return cached;
  try {
    const data = await fetchFromAirtableSimple<Blog>("blog", {
      view,
      sort: [{ field: "date", direction: "desc" }],
      transformer: (record: Airtable.Record<FieldSet>) => {
        const fields = record.fields;
        return {
          id: record.id,
          title: fields.title as string,
          slug: fields.slug as string,
          description: fields.description as string,
          image: getImageUrl(record.id, "image", "blog"),
          category: fields.category as string,
          date: fields.date as string,
          readTime: fields.readTime as string,
          authorName: fields.authorName as string,
          authorRole: fields.authorRole as string,
          authorImage: getImageUrl(record.id, "authorImage", "blog"),
        };
      },
    });
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw new Error("Failed to fetch blog");
  }
};

export interface singlePortfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  category: string;
  year: string;
  client: string;
  services: string;
  image: string;
  images: string[];
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialRole: string;
  testimonialCompany: string;
  testimonialImage: string;
}
export const getSinglePortfolio = async (slug: string) => {
  const cacheKey = `portfolio:${slug}`;
  const cached = getCachedData<singlePortfolio>(cacheKey);
  if (cached) return cached;
  try {
    const data = await fetchFromAirtableSimple<singlePortfolio>("portfolio", {
      filterByFormula: `{slug} = '${slug}'`,
      view: "single",
      transformer: (record: Airtable.Record<FieldSet>) => {
        const fields = record.fields;
        const images = fields.images as string[];
        return {
          id: record.id,
          title: fields.title as string,
          slug: fields.slug as string,
          description: fields.description as string,
          challenge: fields.challenge as string,
          solution: fields.solution as string,
          outcome: fields.outcome as string,
          category: fields.category as string,
          year: fields.year as string,
          client: fields.client as string,
          services: fields.services as string,
          image: getImageUrl(record.id, "image", "portfolio"),
          images: images.map((image, index) =>
            getImageUrl(record.id, "images", "portfolio", index.toString()),
          ),
          testimonialQuote: fields.testimonialQuote as string,
          testimonialAuthor: fields.testimonialAuthor as string,
          testimonialRole: fields.testimonialRole as string,
          testimonialCompany: fields.testimonialCompany as string,
          testimonialImage: getImageUrl(
            record.id,
            "testimonialImage",
            "portfolio",
          ),
        };
      },
    }).then((res) => {
      return res[0];
    });
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    throw new Error("Failed to fetch portfolio");
  }
};

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string;
}
export const getPortfolio = async (view: "all" | "featured") => {
  const cacheKey = `portfolio:${view}`;
  const cached = getCachedData<Portfolio[]>(cacheKey);
  if (cached) return cached;
  try {
    const data = await fetchFromAirtableSimple<Portfolio>("portfolio", {
      view,
      sort: [{ field: "order", direction: "asc" }],
      transformer: (record: Airtable.Record<FieldSet>) => {
        const fields = record.fields;

        return {
          id: record.id,
          title: fields.title as string,
          slug: fields.slug as string,
          description: fields.description as string,
          category: fields.category as string,
          image: getImageUrl(record.id, "image", "portfolio"),
        };
      },
    });
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    throw new Error("Failed to fetch portfolio");
  }
};

export interface Testimonial {
  id: string;
  quote: string;
  slug?: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

export const getTestimonials = async () => {
  const cacheKey = `testimonials`;
  const cached = getCachedData<Testimonial[]>(cacheKey);
  if (cached) return cached;
  try {
    const data = await fetchFromAirtableSimple<Testimonial>("testimonials", {
      view: "all",
      sort: [{ field: "order", direction: "desc" }],
      transformer: (record: Airtable.Record<FieldSet>) => {
        const fields = record.fields;

        return {
          id: record.id,
          quote: fields.quote as string,
          slug: fields.slug as string,
          author: fields.author as string,
          role: fields.role as string,
          company: fields.company as string,
          image: getImageUrl(record.id, "image", "testimonials"),
        };
      },
    });
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw new Error("Failed to fetch testimonials");
  }
};

export interface Company {
  id: string;
  name: string;
  logo: string;
  url: string;
  slug?: string;
}

export const getCompanies = async () => {
  const cacheKey = `companies`;
  const cached = getCachedData<Company[]>(cacheKey);
  if (cached) return cached;
  try {
    const data = await fetchFromAirtableSimple<Company>("companies", {
      view: "all",
      sort: [{ field: "order", direction: "asc" }],
      transformer: (record: Airtable.Record<FieldSet>) => {
        const fields = record.fields;

        return {
          id: record.id,
          name: fields.name as string,
          logo: getImageUrl(record.id, "logo", "companies"),
          url: fields.url as string,
          slug: fields.slug as string,
        };
      },
    });
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw new Error("Failed to fetch companies");
  }
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
}

export const getTeam = async () => {
  const cacheKey = `team`;
  const cached = getCachedData<TeamMember[]>(cacheKey);
  if (cached) return cached;
  try {
    const data = await fetchFromAirtableSimple<TeamMember>("team", {
      view: "all",
      sort: [{ field: "name", direction: "asc" }],
      transformer: (record: Airtable.Record<FieldSet>) => {
        const fields = record.fields;
        return {
          id: record.id,
          name: fields.name as string,
          role: fields.role as string,
          image: getImageUrl(record.id, "image", "team"),
          bio: fields.bio as string,
          linkedin: fields.linkedin as string,
        };
      },
    });
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching team:", error);
    throw new Error("Failed to fetch team");
  }
};

// send message to Airtable
export const postMessage = async (
  name: string,
  email: string,
  companyName: string,
  companyWebsite: string,
  message: string,
) => {
  if (!env.AIRTABLE_WEBHOOK_URL) {
    throw new Error("AIRTABLE_WEBHOOK_URL is not set");
  }
  if (!name || !email || !companyName || !companyWebsite || !message) {
    return {
      success: false,
      error: "All fields are required",
    };
  }
  if (!email.includes("@")) {
    return {
      success: false,
      error: "Invalid email",
    };
  }
  if (!companyName || !companyWebsite) {
    return {
      success: false,
      error: "Company name and website are required",
    };
  }
  if (!message) {
    return {
      success: false,
      error: "Message is required",
    };
  }
  if (!companyWebsite.includes("https")) {
    return {
      success: false,
      error: "Company website must include http or https",
    };
  }

  const response = await fetch(env.AIRTABLE_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify({ name, email, companyName, companyWebsite, message }),
  });
  if (!response.ok) {
    return {
      success: false,
      error: "Failed to send message",
    };
  }
  return { success: true };
};

export async function revalidateHomeCache(locale = "") {
  // Revalidate by path
  revalidatePath("/");
  if (locale) {
    revalidatePath(`/${locale}`);
  }

  // Revalidate by tag - more specific and efficient
  revalidateTag("testimonials");
  revalidateTag("blog");
  revalidateTag("portfolio:all");
  revalidateTag("projects:featured");
  revalidateTag("companies:all");
  revalidateTag("team:all");
  revalidateTag("career:all");

  // Also revalidate the API routes for images
  revalidatePath("/api/images/[id]");

  return { revalidated: true };
}
