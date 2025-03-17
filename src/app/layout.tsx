import './globals.css'
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { defaultLocale } from '@/i18n';

// Import default messages directly as a fallback
import itMessages from '../../messages/it.json';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Use default locale and messages for simplicity
  // This avoids the async context issues with getLocale() and getMessages()
  const locale = defaultLocale;
  const messages = itMessages;
  
  return (
    <html lang={locale}>
      <body>
        <SessionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}