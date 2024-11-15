import {notFound} from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const dynamic = 'force-dynamic';

const locales = ['en', 'es', 'it'];

export default getRequestConfig(async ({requestLocale}) => {
    const locale = await requestLocale;
    if (!locale || !locales.includes(locale)) notFound();
  return {
    locale: await Promise.resolve(locale),
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});