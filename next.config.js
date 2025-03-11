// const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev");
// const { withContentlayer } = require("next-contentlayer2");
const createNextIntlPlugin = require("next-intl/plugin");

// Use the built-in default path or specify the path explicitly
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

import("./env.mjs");

// Setup the Cloudflare dev platform if in development mode
// if (env.NODE_ENV === 'development') {
//   setupDevPlatform().then(() => {
//     console.log('Cloudflare dev platform setup complete');
//   }).catch((err) => {
//     console.error('Failed to set up Cloudflare dev platform', err);
//   });
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_APP_URL,
      },
    ],
  },
  serverExternalPackages: ["@prisma/client"],
};

// Ensure withContentlayer is applied first, then withNextIntl
//const configWithContentlayer = withContentlayer(nextConfig);
module.exports = withNextIntl(nextConfig);
