import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import './globals.css'
import { SessionProvider } from 'next-auth/react';
 
export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  
  const locale = await getLocale();
  const messages = await getMessages({locale});
 
  return (
    <html lang={locale}>
      <body>
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}