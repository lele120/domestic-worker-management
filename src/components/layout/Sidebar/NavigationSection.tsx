'use client';

import React, { useState } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
//import { useTranslations } from 'next-intl';
//import { useRouter } from 'next/navigation'
import SubMenuItem from './SubMenuItem';
//import MenuItem from './MenuItem';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  title: string;
  link: string;
}

interface NavigationSectionProps {
  title: string;
  icon: LucideIcon;
  items?: NavigationItem[];
  sendToPage: (link: string) => void;
}


const NavigationSection = ({
  title,
  icon: Icon,
  items = [],
  sendToPage,
}: NavigationSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  //const  t  = useTranslations();
  //const router = useRouter()
  const pathName = usePathname();
  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg"
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 mr-3" />
          <span>{title}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && items && items.length > 0 && (
        <div className="mt-2">
          {items.map((item, index) => (
            <SubMenuItem
              key={index}
              href="#"
              text={item.title}
              active={pathName == `/${item.link}`}
              onClick={() => {sendToPage(item.link)}}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationSection;