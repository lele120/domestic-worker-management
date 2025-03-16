import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: false,
  // Add domain configuration
  async rewrites() {
    return {
      beforeFiles: [
        // Handle root path explicitly
        {
          source: '/',
          destination: '/app/page',
        },
      ],
    };
  },
  // Ensure proper domain handling
  async redirects() {
    return [
      // Redirect from non-www to www in production
      process.env.NODE_ENV === 'production' ? {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'staffwise.it',
          },
        ],
        destination: 'https://www.staffwise.it/',
        permanent: true,
      } : null,
    ].filter(Boolean);
  },
};
 
export default withNextIntl(nextConfig);