import { SidebarNavItem, SiteConfig } from "@/types";

import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "UseEfficiently: Airtable Project & Solutions",
  description:
    "UseEfficiently: Airtable projects & youth programs by a design agency following Dieter Rams' principles. We create innovative, useful, and environmentally friendly digital experiences.",
  url: site_url,
  ogImage: `${site_url}/api/og?heading=Airtable Services Partner`,

  links: {
    twitter: "https://x.com/useefficiently",
    github: "",
    airtable: "https://ecosystem.airtable.com/consultants/useefficiently",
  },
  mailSupport: "support@useefficiently.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Team", href: "/team" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Blog", href: "/blog" },
      { title: "Portfolio", href: "/portfolio" },
      {
        title: "Our Airtable Course (Turkish)",
        href: "https://youtube.com/playlist?list=PLyq1-Tl4KTG9uc0w6wSmBE-QNKZpuKOzP&feature=shared",
      },
    ],
  },
  {
    title: "Social",
    items: [
      {
        title: "Airtable Partner Directory",
        href: "https://ecosystem.airtable.com/consultants/useefficiently",
      },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/company/useefficiently",
      },
      { title: "X", href: "https://x.com/useefficiently" },
      { title: "WhatsApp", href: "https://wa.me/message/EXPEJSVJRRMIH1" },
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
    slug: "/discovery",
    formId: "21rvTSZqjUus",
    title: "Discovery Call",
    description: "30-minute introductory call to discuss your project needs",
    duration: "30 min",
  } /* ,
    {
      slug: "consultation",
      title: "Design Consultation",
      description: "60-minute in-depth discussion about your system design requirements",
      duration: "60 min",
    }, */,
];
