'use client';

import React, { useState, useEffect} from 'react';
//import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, Filter, MoreVertical, FileText, Download, Plus, Calendar, DollarSign } from 'lucide-react';
import { useSession } from 'next-auth/react';
import {listContractColf} from  '@/app/api/auth/contractColf.service';
import { ContractColf } from '@/types/contractColf.type';

  const ContractList: React.FC = () => {
    
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { data: session } = useSession();
  const [contracts, setContracts] = useState<ContractColf[]>();

  useEffect(() => {
    const fetchContracts = async () => {
      const token = session?.user.accessToken; 
      const response = await listContractColf(token!);
      setContracts(response);
    };
    if (session) {
      fetchContracts();
    }
  }, [session]);

  const filteredContracts = (contracts || []).filter(contract => {
    const matchesSearch = 
      contract.worker.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.worker.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.employer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.employer.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || contract.status.name.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expiring soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contracts</h1>
          <p className="text-gray-500 mt-1">Manage all employment contracts</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
          onClick={() => router.push('/dashboard/contracts/create')} 
          className="flex items-center px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Contract
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contracts..."
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
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expiring soon">Expiring Soon</option>
            <option value="expired">Expired</option>
          </select>
          <Filter className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Contracts List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredContracts.map((contract) => (
          <div key={contract.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-6">
                {/* Employer & Worker */}
                <div className="flex items-center space-x-10">
                  <div className="relative">
                    <Image
                      src={contract.employer.image || '/default-avatar-512.png'}
                      alt={contract.employer.firstName + ' ' + contract.employer.lastName}
                      className="w-12 h-12 rounded-full object-cover"
                      width={50}
                      height={50}
                    />
                    <Image
                      src={contract.worker.image || '/default-avatar-512.png'}
                      alt={contract.worker.firstName + ' ' + contract.worker.lastName}
                      className="w-12 h-12 rounded-full object-cover absolute -right-10 top-0 border-2 border-white"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {contract.employer.firstName + ' ' + contract.employer.lastName} & {contract.worker.firstName + ' ' + contract.worker.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{contract.type} Contract</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status.name)}`}>
                  {contract.status.name}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Start Contract</p>
                  <p className="text-sm font-medium">
                    {contract.startDate}  {contract.endDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Monthly Salary</p>
                  <p className="text-sm font-medium">€{contract.totalValue}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Contract ID</p>
                  <p className="text-sm font-medium">#{contract.id.toString().padStart(5, '0')}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
                Download PDF
              </button>
              <button className="px-4 py-2 bg-blue-50 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-100">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredContracts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No contracts found</p>
        </div>
      )}
    </div>
  );
}

export default ContractList;