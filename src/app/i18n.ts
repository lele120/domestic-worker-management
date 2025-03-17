import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale, isValidLocale} from '../i18n';

export default getRequestConfig(async ({requestLocale}) => {
  // Must properly await the requestLocale
  const locale = await requestLocale || defaultLocale;
  // Validate the locale
  const safeLocale = isValidLocale(locale) ? locale : defaultLocale;
  
  try {
    return {
      locale: safeLocale,
      messages: (await import(`../../messages/${safeLocale}.json`)).default
    };
  } catch (error) {
    console.error(`Failed to load messages for ${safeLocale}`, error);
    // Fallback to default locale
    try {
      return {
        locale: defaultLocale,
        messages: (await import(`../../messages/${defaultLocale}.json`)).default
      };
    } catch (fallbackError) {
      console.error(`Failed to load fallback messages:`, fallbackError);
      return {
        locale: defaultLocale,
        messages: {}
      };
    }
  }
}); 