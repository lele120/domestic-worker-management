// src/middleware.ts

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es', 'it'], // Supported languages
  defaultLocale: 'it', // Default language
  localePrefix: 'never', // Disable locale prefixing
});

export const config = {
  matcher: ['/((?!api|_next).*)'], // Match all paths except API routes and Next.js internal paths
};