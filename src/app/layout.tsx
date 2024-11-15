import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import { use } from 'react';


 
export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  
 const locale = "en";
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}