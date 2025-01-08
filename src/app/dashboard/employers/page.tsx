'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Search, Filter, MoreVertical, UserPlus, Download, Briefcase, Mail, Phone } from 'lucide-react'
import { getEmployers } from '@/app/api/auth/employer.service'
import { useSession } from 'next-auth/react'
import { _CreateEmployer } from '@/types/employer.types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


interface EmployersListProps {
  onNavigate?: (page: string) => void
}

export default function EmployersList({ onNavigate }: EmployersListProps) {
    const  t  = useTranslations()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const {data} = useSession()
    const defaultEmployer: _CreateEmployer[] = [] 
    const [employers, setEmployers] = useState(defaultEmployer)
    const router = useRouter()

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await getEmployers(data?.user.accessToken as string) 
        if (response != undefined) {
          setEmployers(response)
        }
      } catch (error) {
        console.error('Error fetching employers:', error)
      }
    }

    fetchEmployers()
  }, [data?.user.accessToken])

  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = employer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employer.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || employer.status.toLowerCase() === selectedStatus.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('employers.title')}</h1>
          <p className="text-gray-500 mt-1">{t('employers.subtitle')}</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            {t('common.export')}
          </button>
          <button 
            onClick={() => onNavigate?.('create-employer')}
            className="flex items-center px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {t('employers.addEmployer')}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('employers.searchPlaceholder')}
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
            <option value="all">{t('employers.filters.allStatus')}</option>
            <option value="active">{t('employers.filters.active')}</option>
            <option value="inactive">{t('employers.filters.inactive')}</option>
          </select>
          <Filter className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Employers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployers.map((employer) => (
          <div key={employer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Image className="w-12 h-12 rounded-full object-cover" 
                    alt={employer.first_name + ' ' + employer.last_name}
                    src={employer.image || '/default-avatar-512.png'}
                    width={150}
                    height={150}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{employer.first_name} {employer.last_name}</h3>
                    <p className="text-sm text-gray-500">{employer.company}</p>
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
                    ${employer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {employer.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>{employer.employment_type}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{employer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{employer.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button onClick={() => router.push(`/dashboard/employers/${employer.id}`)}
                  className="flex-1 px-4 py-2 bg-blue-50 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-100">
                  {t('common.view')} {t('employers.fields.profile')}
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
                  {t('common.manage')} {t('employers.fields.workersCount')} (QUI i lavoratori (TODO))
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('employers.noResults')}</p>
        </div>
      )}
    </div>
  )
}
