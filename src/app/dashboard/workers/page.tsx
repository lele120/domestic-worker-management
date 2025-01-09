'use client';

import React, { useState } from 'react';
import {useTranslations} from 'next-intl';
import { Search, Filter, MoreVertical, UserPlus, Download } from 'lucide-react';

// Mock data for demonstration
const mockWorkers = [
  {
    id: 1,
    name: "Sarah Johnson",
    status: "Active",
    position: "Full-time Nanny",
    startDate: "2023-01-15",
    phone: "+1 (555) 123-4567",
    email: "sarah.j@example.com",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 2,
    name: "Michael Chen",
    status: "Active",
    position: "House Keeper",
    startDate: "2023-03-20",
    phone: "+1 (555) 234-5678",
    email: "michael.c@example.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    status: "On Leave",
    position: "Elder Care",
    startDate: "2023-02-01",
    phone: "+1 (555) 345-6789",
    email: "emma.r@example.com",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

interface WorkersListProps {
  onNavigate?: (page: string) => void;
}

const WorkersList: React.FC<WorkersListProps> = ({ onNavigate }) => {
  const  t  = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || worker.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAddWorker = () => {
    if (onNavigate) {
      onNavigate('new-worker');
    }
  };

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
                  <img
                    src={worker.image}
                    alt={worker.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{worker.name}</h3>
                    <p className="text-sm text-gray-500">{worker.position}</p>
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
                    ${worker.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      worker.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {worker.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>{t('worker.list.fields.started')}: {new Date(worker.startDate).toLocaleDateString()}</p>
                  <p>{worker.phone}</p>
                  <p className="truncate">{worker.email}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-50 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-100">
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