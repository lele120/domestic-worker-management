'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Plus, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CreateEmployer } from '@/types/employer.types';
import { CreateWorkerResponse } from '@/types/worker.types';
import Image from 'next/image';

interface SelectedEmployerWorkerProps {
  employer: CreateEmployer | null;
  worker: CreateWorkerResponse | null;
  onSelectEmployer: () => void;
  onSelectWorker: () => void;
}

const SelectedEmployerWorker: React.FC<SelectedEmployerWorkerProps> = ({
  employer,
  worker,
  onSelectEmployer,
  onSelectWorker
}) => {
  const  t  = useTranslations();
  const router = useRouter();

  return (
    <div className="mb-8 grid grid-cols-2 gap-6">
      {/* Employer Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">{t('contract.association.employer')}</h2>
          <button
            onClick={() => router.push('/dashboard/employers/create')}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            {t('contract.association.addNew')}
          </button>
        </div>
        {employer ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={employer.image || '/default-avatar-512.png'}
                  alt={employer.firstName + ' ' + employer.lastName}
                  width={32}
                  height={32}
                  className="w-12 h-12 rounded-full object-cover"
                  />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{employer.firstName + " " + employer.lastName}</h3>
                </div>
              </div>
              <button
                onClick={onSelectEmployer}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {t('common.change')}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onSelectEmployer}
            className="w-full h-24 flex flex-col items-center justify-center bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          >
            <Plus className="w-6 h-6 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">{t('contract.association.selectEmployer')}</span>
          </button>
        )}
      </div>

      {/* Worker Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">{t('contract.association.worker')}</h2>
          <button
            onClick={() => router.push('/dashboard/workers/create')}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            {t('contract.association.addNew')}
          </button>
        </div>
        {worker ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src={worker.image || '/default-avatar-512.png'}
                  alt={`${worker.firstName} ${worker.lastName}`}
                  width={32}
                  height={32}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {worker.firstName} {worker.lastName}
                  </h3>
                </div>
              </div>
              <button
                onClick={onSelectWorker}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {t('common.change')}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onSelectWorker}
            disabled={!employer}
            className={`w-full h-24 flex flex-col items-center justify-center bg-white rounded-lg border-2 border-dashed
              ${employer 
                ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50' 
                : 'border-gray-200 bg-gray-50 cursor-not-allowed'}`}
          >
            <Plus className="w-6 h-6 text-gray-400" />
            <div className="mt-2 text-sm text-center">
              <p className="text-gray-500">
                {employer 
                  ? t('contract.association.selectWorker')
                  : t('contract.association.selectEmployerFirst')}
              </p>
              {!employer && (
                <p className="text-xs text-gray-400 mt-1">
                  {t('contract.association.employerRequired')}
                </p>
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectedEmployerWorker;