// src/middleware.ts

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es', 'it'], // Supported languages
  defaultLocale: 'it', // Default language
  localePrefix: 'never', // Disable locale prefixing
  
});

export const config = {
  matcher: ['/','/(en|es|it)/:path*'], // Match all routes
};