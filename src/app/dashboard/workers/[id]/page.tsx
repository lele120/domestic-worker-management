'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  User,
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText,
  Download,
  Edit
} from 'lucide-react';
import { getWorkerById } from '@/app/api/auth/worker.service';
import { CreateWorkerResponse } from '@/types/worker.types';

export default function WorkerProfilePage() {
  const t = useTranslations();
  const params = useParams();
  const { data: session } = useSession();
  const [worker, setWorker] = useState<CreateWorkerResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorker = async () => {
      if (!session?.user?.accessToken || !params.id) return;
      
      try {
        const workerData = await getWorkerById(Number(params.id), session.user.accessToken);
        if (workerData) {
          setWorker(workerData);
        } else {
          setError('Worker not found');
        }
      } catch (err) {
        setError('Error fetching worker data');
        console.error('Error fetching worker:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [session?.user?.accessToken, params.id]);

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-4 bg-gray-200 rounded w-3/4"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-4">
                    {[1, 2].map((j) => (
                      <div key={j} className="h-4 bg-gray-200 rounded w-full"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !worker) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center py-12">
          <p className="text-red-500">{error || 'Worker not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center">
          <Image
            src={worker.image || worker.imageUrl || '/default-avatar-512.png'}
            alt={`${worker.firstName} ${worker.lastName}`}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {worker.firstName} {worker.lastName}
            </h1>
            <div className="flex items-center mt-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(worker.status)}`}>
                {worker.status}
              </span>
            </div>
          </div>
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Edit className="w-4 h-4 mr-2" />
          {t('common.edit')}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('worker.profile.personalInfo')}</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{t('worker.profile.nationality')}</p>
                    <p className="text-sm font-medium">{worker.nationality}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{t('worker.profile.dateOfBirth')}</p>
                    <p className="text-sm font-medium">{new Date(worker.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{t('worker.profile.taxNumber')}</p>
                    <p className="text-sm font-medium">{worker.taxNumber}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{t('worker.profile.documentType')}</p>
                    <p className="text-sm font-medium">{worker.documentType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('worker.profile.contactInfo')}</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{worker.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-600">{worker.phone} (Primary)</p>
                  <p className="text-gray-600">{worker.mobile} (Mobile)</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  {worker.address}, {worker.city}, {worker.state} {worker.zipCode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('worker.profile.documents')}</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{worker.documentType}</p>
                    <p className="text-xs text-gray-500">{t('worker.profile.documentNumber')}: {worker.documentNumber}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(worker.status)}`}>
                    {worker.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}