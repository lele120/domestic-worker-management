// src/middleware.ts

import { isTokenExpired } from '@/utils/generic';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default createMiddleware({
  locales: ['en', 'es', 'it'], // Supported languages
  defaultLocale: 'it', // Default language
  localePrefix: 'never', // Disable locale prefixing
  
});

export const config = {
  matcher: ['/dashboard/:path*'], // Match all routes
};


export async function middleware(request: NextRequest) {
  // Check protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = await getToken({ req: request });

    if (!token || isTokenExpired(token.accessToken as string)) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}


