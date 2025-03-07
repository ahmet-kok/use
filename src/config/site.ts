import { SidebarNavItem, SiteConfig } from "@/types";

import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "UseEfficiently",
  description:
    "We are a design agency guided by Dieter Rams' principles. Our mission is to create digital experiences that are innovative, useful, and environmentally friendly.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "",
    github: "",
    airtable: "https://ecosystem.airtable.com/consultants/useefficiently",
  },
  mailSupport: "support@useefficiently.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Enterprise", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];

export const contactInfo = [
  {
    label: "Email",
    value: "hello@useefficiently.com",
  },
  {
    label: "Phone",
    value: "+1 (555) 123-4567",
  },
  {
    label: "Location",
    value: "Toronto, ON, Canada",
  },
  {
    label: "Hours",
    value: "Mon-Fri, 9am-6pm PST",
  },
];

export const meetingTypes = [
  {
    slug: "discovery",
    title: "Discovery Call",
    description: "25-minute introductory call to discuss your project needs",
    duration: "25 min",
  } /* ,
    {
      slug: "consultation",
      title: "Design Consultation",
      description: "60-minute in-depth discussion about your system design requirements",
      duration: "60 min",
    }, */,
];