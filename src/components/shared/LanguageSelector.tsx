'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Globe, Check } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
];

const LanguageSelector = () => {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = useTranslations('common'); // Use the common namespace for translations
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Language {
    code: string;
    name: string;
    flag: string;
}

const handleLanguageChange = (langCode: string): void => {
    // Change the locale by updating the URL
    window.location.href = `/${langCode}`; // Redirect to the new locale
    setIsOpen(false);
    localStorage.setItem('NEXT_LOCALE', langCode); // Store the selected language in local storage
};

  if (!mounted) {
    return null;
  }

  const currentLanguage = languages.find(lang => lang.code === window.location.pathname.split('/')[1]) || languages[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4 text-gray-500 mr-2" aria-hidden="true" />
        <span className="text-sm mr-2">{currentLanguage.flag}</span>
        <span>{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 z-10 mt-1 w-full bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
        >
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`flex items-center w-full px-3 py-2 text-sm ${
                  currentLanguage.code === language.code
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                role="menuitem"
              >
                <span className="text-base mr-2">{language.flag}</span>
                <span>{language.name}</span>
                {currentLanguage.code === language.code && (
                  <Check className="w-4 h-4 ml-auto" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;