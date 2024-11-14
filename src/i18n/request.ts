import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  //read from `cookies()`, `headers()`, etc.

const cookieStore = await cookies();
const localeCookie = cookieStore.get('NEXT_LOCALE');
const locale = localeCookie ? localeCookie.value : 'it';
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});