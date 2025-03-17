import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

// Define the supported locales
export const locales = ['en', 'es', 'it'] as const;
export type Locale = (typeof locales)[number];

// Define the default locale
export const defaultLocale: Locale = 'it';

// Function to validate if a locale is supported
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Basic message loading function
export function getMessages(locale: string) {
  const safeLocale = isValidLocale(locale) ? locale : defaultLocale;
  try {
    return require(`../messages/${safeLocale}.json`);
  } catch (error) {
    console.error(`Could not load messages for locale: ${safeLocale}`, error);
    return require(`../messages/${defaultLocale}.json`);
  }
}

// This is used in internationalized routes to validate the locale
export function validateLocale(locale: string): void {
  if (!isValidLocale(locale)) {
    notFound();
  }
}

// Configuration for next-intl - critical to use requestLocale properly
export default getRequestConfig(async ({requestLocale}) => {
  // Properly await the requestLocale
  const locale = await requestLocale || defaultLocale;
  const safeLocale = isValidLocale(locale) ? locale : defaultLocale;
  
  try {
    return {
      locale: safeLocale,
      messages: (await import(`../messages/${safeLocale}.json`)).default
    };
  } catch (error) {
    console.error(`Failed to load messages for ${safeLocale}`, error);
    // Fallback to default locale
    return {
      locale: defaultLocale,
      messages: (await import(`../messages/${defaultLocale}.json`)).default
    };
  }
}); 