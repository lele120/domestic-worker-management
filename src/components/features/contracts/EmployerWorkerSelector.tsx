import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import Image from 'next/image';
import { CreateEmployer } from '@/types/employer.types';
import { CreateWorkerResponse } from '@/types/worker.types';

interface WorkplaceLocation {
  careOf: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  province: string;
  isEmployerAddress: boolean;
}

interface EmployerWorkerSelectorProps {
  workers: CreateWorkerResponse[];
  employers: CreateEmployer[];
  selectedEmployerId: number | null;
  selectedWorkerId: number | null;
  onEmployerSelect: (id: number) => void;
  onWorkerSelect: (id: number) => void;
  onClose: () => void;
  onWorkplaceLocationChange: (location: WorkplaceLocation) => void;
  workplaceLocation: WorkplaceLocation;
}

const EmployerWorkerSelector: React.FC<EmployerWorkerSelectorProps> = ({
  workers,
  employers,
  selectedEmployerId,
  selectedWorkerId,
  onEmployerSelect,
  onWorkerSelect,
  onClose,
  onWorkplaceLocationChange,
  workplaceLocation
}) => {
  const t = useTranslations();
  const [isEmployerDropdownOpen, setIsEmployerDropdownOpen] = useState(false);
  const [isWorkerDropdownOpen, setIsWorkerDropdownOpen] = useState(false);

  const selectedEmployer = employers.find(emp => emp.id === selectedEmployerId);
  const selectedWorker = workers.find(w => w.id === selectedWorkerId);

  const handleWorkplaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    onWorkplaceLocationChange({
      ...workplaceLocation,
      [name]: newValue
    });

    // If using employer address is checked, copy employer address details
    if (name === 'isEmployerAddress' && checked && selectedEmployer) {
      onWorkplaceLocationChange({
        careOf: selectedEmployer.company || '',
        streetAddress: selectedEmployer.address || '',
        city: selectedEmployer.city || '',
        postalCode: selectedEmployer.zipCode || '',
        province: selectedEmployer.province || '',
        isEmployerAddress: true
      });
    }
  };

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

        {/* Workplace Location Section */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {t('contract.workplace.title')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isEmployerAddress"
                name="isEmployerAddress"
                checked={workplaceLocation.isEmployerAddress}
                onChange={handleWorkplaceChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isEmployerAddress" className="ml-2 block text-sm text-gray-900">
                {t('contract.workplace.useEmployerAddress')}
              </label>
            </div>

            {!workplaceLocation.isEmployerAddress && (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="careOf" className="block text-sm font-medium text-gray-700">
                    {t('contract.workplace.careOf')}
                  </label>
                  <input
                    type="text"
                    name="careOf"
                    id="careOf"
                    value={workplaceLocation.careOf}
                    onChange={handleWorkplaceChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                    {t('contract.workplace.streetAddress')}
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    id="streetAddress"
                    value={workplaceLocation.streetAddress}
                    onChange={handleWorkplaceChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      {t('contract.workplace.city')}
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={workplaceLocation.city}
                      onChange={handleWorkplaceChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                      {t('contract.workplace.postalCode')}
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      value={workplaceLocation.postalCode}
                      onChange={handleWorkplaceChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                    {t('contract.workplace.province')}
                  </label>
                  <input
                    type="text"
                    name="province"
                    id="province"
                    value={workplaceLocation.province}
                    onChange={handleWorkplaceChange}
                    maxLength={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
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