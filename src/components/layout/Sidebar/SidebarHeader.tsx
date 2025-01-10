'use client';

//import { useTranslations } from 'next-intl';
//import { Suspense } from 'react';

//import { Building } from 'lucide-react';
import Image from 'next/image';
import LanguageSelector from '../../shared/LanguageSelector';

/* const HeaderTitle = () => {
  const  t  = useTranslations();
  return (
    <div className="flex items-center gap-2">
      <Building className="w-6 h-6 text-blue-600 flex-shrink-0" />
      <h1 className="text-lg font-bold text-gray-800 truncate" suppressHydrationWarning>
        {t('app.title')}
      </h1>
    </div>
  );
}; */

const SidebarHeader = () => {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-center">
        <Image
          src="/staffwise-logo.svg"
          alt="Logo"
          width={200} // Adjust the width as needed
          height={200} // Adjust the height as needed
          className="rounded-full"
        />
      </div>
      <div className="pl-8">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default SidebarHeader;