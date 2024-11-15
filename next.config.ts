import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  i18n: {
    locales: ['en', 'es', 'it'],
    defaultLocale: 'en',
  },
}

export default nextConfig;
