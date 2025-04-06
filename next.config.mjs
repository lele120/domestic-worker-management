import createNextIntlPlugin from 'next-intl/plugin';

// Configure the next-intl plugin
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'staffwise-static.s3.us-east-2.amazonaws.com'],
  }
};

export default withNextIntl(nextConfig); 