import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'export',
//     images: {
//       unoptimized: true,
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'images.unsplash.com',
//         },
//       ],
//     },
//   }
/** @type {import('next').NextConfig} */
const nextConfig = {reactStrictMode: true,
    images: {
      domains: ['images.unsplash.com'],
    },
    i18n: {
      locales: ['en', 'es', 'it'],
      defaultLocale: 'en',
    },};
 
export default withNextIntl(nextConfig);