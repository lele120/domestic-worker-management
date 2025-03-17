import createNextIntlPlugin from 'next-intl/plugin';

// Correctly point to the i18n configuration file
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Disable the Next.js font system to avoid module loading issues
  experimental: {
    fontLoaders: [],
  }
};

export default withNextIntl(nextConfig); 