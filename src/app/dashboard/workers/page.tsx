'use client';

import React, { useEffect, useState } from 'react';
import {useTranslations} from 'next-intl';
import { Search, Filter, MoreVertical, UserPlus, Download } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CreateWorkerResponse } from '@/types/worker.types';
import { getWorkers } from '@/app/api/auth/worker.service';

const WorkersList: React.FC = () => {
  const  t  = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const router = useRouter();
  const defaultWorkers: CreateWorkerResponse[] = [];
  const [workers, setWorkers] = useState(defaultWorkers);
  const {data} = useSession();


  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || worker.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || worker.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAddWorker = () => {
    router.push('/dashboard/workers/create');
  };

  useEffect(() => {
      const fetchWorkers = async () => {
        try {
          const response = await getWorkers(data?.user.accessToken as string) 
          if (response != undefined) {
            setWorkers(response)
          }
        } catch (error) {
          console.error('Error fetching employers:', error)
        }
      }
  
      fetchWorkers()
    }, [data?.user.accessToken])

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('navigation.worker.title')}</h1>
          <p className="text-gray-500 mt-1">{t('navigation.worker.subtitle')}</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            {t('common.export')}
          </button>
          <button 
            onClick={handleAddWorker}
            className="flex items-center px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {t('navigation.worker.new')}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('worker.list.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">{t('worker.list.filters.allStatus')}</option>
            <option value="active">{t('worker.list.filters.active')}</option>
            <option value="on leave">{t('worker.list.filters.onLeave')}</option>
            <option value="inactive">{t('worker.list.filters.inactive')}</option>
          </select>
          <Filter className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((worker) => (
          <div key={worker.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                <Image
                  src={worker.image || worker.imageUrl || '/default-avatar-512.png'}
                  alt={worker.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{worker.firstName} {worker.lastName}</h3>
                    <p className="text-sm text-gray-500">TODO Position</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">{t('common.status')}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${worker.status === 'active' ? 'bg-green-100 text-green-800' : 
                      worker.status === 'terminated' ? 'bg-yellow-100 text-yellow-800' : 
                      worker.status === 'inactive' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {worker.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>{t('worker.list.fields.started')}: TODO Future StartDaate</p>
                  <p>{worker.phone}</p>
                  <p className="truncate">{worker.email}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                onClick={() => router.push(`/dashboard/workers/${worker.id}`)} 
                className="flex-1 px-4 py-2 bg-blue-50 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-100">
                  {t('common.view')} {t('worker.list.fields.profile')}
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
                  {t('worker.list.fields.schedule')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWorkers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('worker.list.noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default WorkersList;