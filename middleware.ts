import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './src/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // If this locale is matched, pathnames work without a prefix
  defaultLocale: defaultLocale,
  // Don't add locale prefixes to URLs
  localePrefix: 'never'
});

// Matcher needs to include ALL paths that should be internationalized
export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
    // Ensure the root path is matched
    '/',
    // Explicitly include login path
    '/login'
  ]
}; 