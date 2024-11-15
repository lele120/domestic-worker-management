import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locales = ['en', 'es', 'it'];
  let locale = await requestLocale;
  
  if (!locale || !locales.includes(locale)) {
    locale = 'it';
  }
   
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };

});