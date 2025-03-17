import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // Make sure we're using the actual locale from the request
  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});