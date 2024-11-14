'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface Employer {
  id: number;
  name: string;
  company: string;
  image: string;
}

interface EmployerSelectorProps {
  selectedEmployerId: number | null;
  onSelect: (employerId: number) => void;
}

// Mock data - in a real app, this would come from an API
const mockEmployers: Employer[] = [
  {
    id: 1,
    name: "Robert Anderson",
    company: "Anderson Enterprises",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 2,
    name: "Elena Martinez",
    company: "Martinez Family Office",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 3,
    name: "James Wilson",
    company: "Wilson Holdings",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const EmployerSelector: React.FC<EmployerSelectorProps> = ({
  selectedEmployerId,
  onSelect
}) => {
  const  t  = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  const selectedEmployer = mockEmployers.find(emp => emp.id === selectedEmployerId);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t('worker.fields.employer')}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white rounded-lg border border-gray-300 px-4 py-2.5 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {selectedEmployer ? (
            <div className="flex items-center">
              <img
                src={selectedEmployer.image}
                alt={selectedEmployer.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{selectedEmployer.name}</div>
                <div className="text-sm text-gray-500">{selectedEmployer.company}</div>
              </div>
            </div>
          ) : (
            <span className="text-sm text-gray-500">{t('worker.options.selectEmployer')}</span>
          )}
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-lg border border-gray-200 shadow-lg">
            <div className="py-1 max-h-60 overflow-auto">
              {mockEmployers.map((employer) => (
                <button
                  key={employer.id}
                  type="button"
                  onClick={() => {
                    onSelect(employer.id);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 flex items-center hover:bg-gray-50"
                >
                  <img
                    src={employer.image}
                    alt={employer.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{employer.name}</div>
                    <div className="text-sm text-gray-500">{employer.company}</div>
                  </div>
                  {selectedEmployerId === employer.id && (
                    <Check className="w-4 h-4 text-blue-600 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerSelector;


