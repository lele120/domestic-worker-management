// src/middleware.ts

import { isTokenExpired } from '@/utils/generic';
import { getToken } from 'next-auth/jwt';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'es', 'it'], // Supported languages
  defaultLocale: 'it', // Default language
  localePrefix: 'never', // Disable locale prefixing
});

// Combined middleware function that handles both internationalization and authentication
export async function middleware(request: NextRequest) {
  // Check protected routes first
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = await getToken({ req: request });

    if (!token || isTokenExpired(token.accessToken as string)) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Apply internationalization middleware for all routes
  return intlMiddleware(request);
}

// Update matcher to include all relevant routes
export const config = {
  matcher: [
    // Match all paths except for:
    // - API routes (/api/*)
    // - Static files (/_next/*, /favicon.ico, etc.)
    '/((?!api|_next|_vercel|.*\\..*|favicon.ico).*)',
    // Explicitly include the root path
    '/'
  ]
};


