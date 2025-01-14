'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import Image from 'next/image';
import { getEmployers } from '@/app/api/auth/employer.service';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { _CreateEmployer } from '@/types/employer.types';

interface EmployerSelectorProps {
  selectedEmployerId: number | null | undefined;
  onSelect: (employerId: number | null | undefined) => void;
}

const EmployerSelector: React.FC<EmployerSelectorProps> = ({
  selectedEmployerId,
  onSelect
}) => {
  const  t  = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const {data} = useSession()
  const [employers, setEmployers] = useState<_CreateEmployer[]>([])

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await getEmployers(data?.user.accessToken as string) 
        if (response != undefined) {
          // Add a null option to the employers array
          const nullOption = {
            id: null,
            first_name: 'No',
            last_name: 'Employer',
            sex: 'other' as 'male' |'female' | 'other',
            date_of_birth: '',
            nationality: '',
            address: '',
            phone_number: '',
            email: '',
            company: '',
            created_at: '',
            updated_at: '',
            image: '/default-avatar-512.png',
            place_of_birth: '',
            tax_number: '',
            job: '',
            document_type: '',
            document_number: '',
            document_issuer: '',
            document_expiration: '',
            city: '',
            state: '',
            province: '',
            zip_code: '',
            preferred_contact: 'email' as 'email' | 'phone',
            employment_type: "full-time" as "full-time" | "part-time" | "temporary",
            phone: '',
            notes: '',
            status: 'active' as 'active' | 'inactive' | 'terminated',
            workers_count: 0,
            
          };
          setEmployers([nullOption, ...response]);
        }
      } catch (error) {
        console.error('Error fetching employers:', error)
      }
    }

    fetchEmployers()
  }, [data?.user.accessToken])

  const selectedEmployer = employers.find(emp => emp.id === selectedEmployerId);

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
              <Image 
                src={selectedEmployer.image || '/default-avatar-512.png'} 
                alt={`${selectedEmployer.first_name} ${selectedEmployer.last_name}`} 
                width={32} 
                height={32} 
                className="rounded-full" 
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{`${selectedEmployer.first_name} ${selectedEmployer.last_name}`} </div>
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
              {employers.map((employer) => (
                <button
                  key={employer.id}
                  type="button"
                  onClick={() => {
                    onSelect(employer.id);  
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 flex items-center hover:bg-gray-50"
                >
                  <Image 
                    src={employer.image || '/default-avatar-512.png'} 
                    alt={`${employer.first_name} ${employer.last_name}`} 
                    width={32} 
                    height={32} 
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{employer.first_name} {employer.last_name} </div>
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


