import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import Image from 'next/image';
import { CreateEmployer } from '@/types/employer.types';
import {CreateWorkerResponse} from '@/types/worker.types';


interface EmployerWorkerSelectorProps {
  workers: CreateWorkerResponse[];
  employers: CreateEmployer[];
  selectedEmployerId: number | null;
  selectedWorkerId: number | null;
  onEmployerSelect: (id: number) => void;
  onWorkerSelect: (id: number) => void;
  onClose: () => void;
}

const EmployerWorkerSelector: React.FC<EmployerWorkerSelectorProps> = ({
  workers,
  employers,
  selectedEmployerId,
  selectedWorkerId,
  onEmployerSelect,
  onWorkerSelect,
  onClose
}) => {
  const  t  = useTranslations();
  const [isEmployerDropdownOpen, setIsEmployerDropdownOpen] = useState(false);
  const [isWorkerDropdownOpen, setIsWorkerDropdownOpen] = useState(false);

  const selectedEmployer = employers.find(emp => emp.id === selectedEmployerId);
  const selectedWorker = workers.find(w => w.id === selectedWorkerId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">
          {t('contract.association.title')}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Employer Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('contract.association.employer')}
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsEmployerDropdownOpen(!isEmployerDropdownOpen)}
              className="w-full bg-white rounded-lg border border-gray-200 px-4 py-2.5 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedEmployer ? (
                <div className="flex items-center">
                  <Image 
                    src={selectedEmployer.image || '/default-avatar-512.png'} 
                    alt={selectedEmployer.firstName + ' ' + selectedEmployer.lastName} 
                    width={32} 
                    height={32} 
                    className="rounded-full"
                  /> 
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{selectedEmployer.firstName + " " + selectedEmployer.lastName}</div>
                    <div className="text-sm text-gray-500">{selectedEmployer.company}</div>
                  </div>
                </div>
              ) : (
                <span className="text-sm text-gray-500">{t('contract.association.selectEmployer')}</span>
              )}
              {isEmployerDropdownOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {isEmployerDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg border border-gray-200 shadow-lg">
                <div className="py-1 max-h-60 overflow-auto">
                  {employers.map((employer) => (
                    <button
                      key={employer.id}
                      type="button"
                      onClick={() => {
                        if (employer.id !== undefined && employer.id !== null) {
                          onEmployerSelect(employer.id);
                        }
                        setIsEmployerDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 flex items-center hover:bg-gray-50"
                    >
                      <Image
                        src={employer.image || '/default-avatar-512.png'}
                        alt={employer.firstName + ' ' + employer.lastName}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{employer.firstName + " " + employer.lastName}</div>
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

        {/* Worker Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('contract.association.worker')}
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => selectedEmployer && setIsWorkerDropdownOpen(!isWorkerDropdownOpen)}
              disabled={!selectedEmployer}
              className={`w-full bg-white rounded-lg border px-4 py-2.5 text-left flex items-center justify-between
                ${selectedEmployer 
                  ? 'border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                  : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
            >
              {selectedWorker ? (
                <div className="flex items-center">
                  <Image
                    src={selectedWorker.image || '/default-avatar-512.png'}
                    alt={`${selectedWorker.firstName} ${selectedWorker.lastName}`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {selectedWorker.firstName} {selectedWorker.lastName}
                    </div>
                  </div>
                </div>
              ) : (
                <span className="text-sm text-gray-500">
                  {selectedEmployer ? t('contract.association.selectWorker') : t('contract.association.selectEmployerFirst')}
                </span>
              )}
              {selectedEmployer && (
                isWorkerDropdownOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )
              )}
            </button>

            {isWorkerDropdownOpen && selectedEmployer && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg border border-gray-200 shadow-lg">
                <div className="py-1 max-h-60 overflow-auto">
                  {workers.map((worker) => (
                    <button
                      key={worker.id}
                      type="button"
                      onClick={() => {
                        onWorkerSelect(worker.id);
                        setIsWorkerDropdownOpen(false);
                        onClose();
                      }}
                      className="w-full px-4 py-2 flex items-center hover:bg-gray-50"
                    >
                      <Image 
                        src={worker.image || '/default-avatar-512.png'} 
                        alt={`${worker.firstName} ${worker.lastName}`} 
                        width={32} 
                        height={32} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {worker.firstName} {worker.lastName}
                        </div>
                      </div>
                      {selectedWorkerId === worker.id && (
                        <Check className="w-4 h-4 text-blue-600 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerWorkerSelector;