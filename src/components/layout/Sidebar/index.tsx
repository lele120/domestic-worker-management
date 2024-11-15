'use client';

import React from 'react';
import {
  Building,
  Users,
  Calculator,
  FileText,
  Calendar,
  Settings,
  File,
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

  const navigationSections = [
    {
      title: t('navigation.employers.title'),
      icon: Building,
      items: [
        { title: t('navigation.employers.list'), link: 'employers-list' },
        { title: t('navigation.employers.new'), link: 'create-employer' },
      ],
    },
    {
      title: t('navigation.workers.title'),
      icon: Users,
      items: [
        { title: t('navigation.workers.list'), link: 'workers-list' },
        { title: t('navigation.workers.new'), link: 'new-worker' },
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
            onNavigate={onNavigate}
            currentPage={currentPage}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;