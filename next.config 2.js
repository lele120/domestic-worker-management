import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  // These are all the locales you want to support
  locales: ['en', 'es', 'it'],
  // This is the default locale you want to be used when visiting
  // a non-locale prefixed path e.g. `/hello`
  defaultLocale: 'it'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Add rewrites for the root path
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/app/page',
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig); 