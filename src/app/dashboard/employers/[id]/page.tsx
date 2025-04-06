'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { getEmployerById } from '@/app/api/auth/employer.service';
import { CreateEmployer } from '@/types/employer.types';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users,
  FileText,
  Edit,
} from 'lucide-react';

const EmployerProfile = () => {
  const t = useTranslations();
  const { id } = useParams();
  const { data: session } = useSession();
  const [employer, setEmployer] = useState<CreateEmployer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployer = async () => {
      if (!session?.user?.accessToken || !id) return;
      
      try {
        const employerData = await getEmployerById(Number(id), session.user.accessToken);
        if (employerData) {
          setEmployer(employerData);
        } else {
          setError('Employer not found');
        }
      } catch (err) {
        setError('Error loading employer data');
        console.error('Error fetching employer:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployer();
  }, [id, session?.user?.accessToken]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-8">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-8">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !employer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Employer not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center">
          <Image
            src={employer.image || employer.imageUrl || '/default-avatar-512.png'}
            alt={`${employer.firstName} ${employer.lastName}`}
            className="w-20 h-20 rounded-full object-cover"
            width={80}
            height={80}
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-gray-900">{`${employer.firstName} ${employer.lastName}`}</h1>
            <div className="flex items-center mt-2">
              <Building className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-gray-600">{employer.company}</span>
              <span className={`ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium
                ${employer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {employer.status}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {return null}}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Edit className="w-4 h-4 mr-2" />
          {t('common.edit')}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="col-span-2 space-y-8">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('employers.create.sections.contact')}</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{employer.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{employer.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  {employer.address}, {employer.city}, {employer.province} {employer.zipCode}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{t('employers.fields.dateOfBirth')}: {employer.dateOfBirth}</span>
              </div>
            </div>
          </div>

          {/* Document Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('employers.create.sections.document')}</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{t('employers.fields.documentType')}: {employer.documentType}</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{t('employers.fields.documentNumber')}: {employer.documentNumber}</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{t('employers.fields.documentIssuer')}: {employer.documentIssuer}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{t('employers.fields.documentExpiration')}: {employer.documentExpiration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('employers.fields.profile')}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">{t('employers.fields.workersCount')}</span>
                </div>
                <span className="font-semibold text-gray-900">{employer.workersCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">{t('employers.fields.job')}</span>
                </div>
                <span className="font-semibold text-gray-900">{employer.job}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">{t('employers.fields.employmentType')}</span>
                </div>
                <span className="font-semibold text-gray-900">{employer.employmentType}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {employer.notes && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('employers.fields.notes')}</h2>
              <p className="text-gray-600">{employer.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;