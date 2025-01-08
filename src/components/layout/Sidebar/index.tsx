'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import React from 'react';
import {
  Building,
  Users,
  Calculator,
  FileText,
  Calendar,
  Settings,
  File,
  LogOut
} from 'lucide-react';
import {useTranslations} from 'next-intl';

import SidebarHeader from './SidebarHeader';
import NavigationSection from './NavigationSection';



interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Sidebar = ({ onNavigate, currentPage }: SidebarProps) => {
  const  t  = useTranslations();
  const router = useRouter();

  const sendToPage = (link: string) => {
    onNavigate(link);
    router.push(`/${link}`);
  };

  const navigationSections = [
    {
      title: t('navigation.employers.title'),
      icon: Building,
      items: [
        { title: t('navigation.employers.list'), link: 'dashboard/employers' },
        { title: t('navigation.employers.new'), link: 'dashboard/employers/create' },
      ],
    },
    {
      title: t('navigation.worker.title'),
      icon: Users,
      items: [
        { title: t('navigation.worker.list'), link: 'workers-list' },
        { title: t('navigation.worker.new'), link: 'new-worker' },
      ],
    },
    {
      title: t('navigation.contracts.title'),
      icon: File,
      items: [
        { title: t('navigation.contracts.list'), link: 'contracts-list' },
        { title: t('navigation.contracts.new'), link: 'create-contract' },
      ],
    },
    {
      title: t('navigation.payroll.title'),
      icon: Calculator,
      items: [
        { title: t('navigation.payroll.attendance'), link: 'attendance' },
        { title: t('navigation.payroll.payslips'), link: 'payslips' },
        { title: t('navigation.payroll.payments'), link: 'payments' },
      ],
    },
    {
      title: t('navigation.documents.title'),
      icon: FileText,
      link: 'documents',
      standalone: true,
    },
    {
      title: t('navigation.leave.title'),
      icon: Calendar,
      link: 'leave',
      standalone: true,
    },
    {
      title: t('navigation.settings.title'),
      icon: Settings,
      link: 'settings',
      standalone: true,
    },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 overflow-y-auto">
      <SidebarHeader />
      <div className="space-y-6 mt-6 p-4">
        {navigationSections.map((section, index) => (
          <NavigationSection
            key={index}
            {...section}
            //onNavigate={onNavigate}
            currentPage={currentPage}
            sendToPage={sendToPage}
          />
        ))}
      </div>
      <div className="mt-4">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center justify-center px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
          >
            <LogOut className="mr-2" />
            {t('navigation.logout')}
          </button>
        </div>
    </div>
  );
};

export default Sidebar;