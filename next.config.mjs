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
const nextConfig = {};
 
export default withNextIntl(nextConfig);