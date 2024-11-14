'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Save, X } from 'lucide-react';

import EmployerSelector from './EmployerSelector';
import PersonalInfoForm from './PersonalInfoForm';

interface WorkerFormData {
  employerId: number | null;
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  gender: string;
  fiscalCode: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  documentType: string;
  documentNumber: string;
  documentIssuer: string;
  documentExpiry: string;
}

interface NewWorkerProps {
  onNavigate?: (page: string) => void;
}

const NewWorker: React.FC<NewWorkerProps> = ({ onNavigate }) => {
  const  t  = useTranslations();
  const [formData, setFormData] = useState<WorkerFormData>({
    employerId: null,
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    nationality: '',
    gender: '',
    fiscalCode: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    documentType: '',
    documentNumber: '',
    documentIssuer: '',
    documentExpiry: ''
  });

  const [errors, setErrors] = useState<Partial<WorkerFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<WorkerFormData> = {};

    if (!formData.employerId) newErrors.employerId = t('worker.validation.employerRequired') as unknown as number;
    if (!formData.firstName.trim()) newErrors.firstName = t('worker.validation.required');
    if (!formData.lastName.trim()) newErrors.lastName = t('worker.validation.required');
    if (!formData.birthDate) newErrors.birthDate = t('worker.validation.required');
    if (!formData.birthPlace.trim()) newErrors.birthPlace = t('worker.validation.required');
    if (!formData.nationality) newErrors.nationality = t('worker.validation.required');
    if (!formData.gender) newErrors.gender = t('worker.validation.required');
    if (!formData.fiscalCode.trim()) newErrors.fiscalCode = t('worker.validation.required');

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('worker.validation.invalidEmail');
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = t('worker.validation.invalidPhone');
    }

    if (!formData.documentType) newErrors.documentType = t('worker.validation.required');
    if (!formData.documentNumber.trim()) newErrors.documentNumber = t('worker.validation.required');
    if (!formData.documentIssuer.trim()) newErrors.documentIssuer = t('worker.validation.required');
    if (!formData.documentExpiry) newErrors.documentExpiry = t('worker.validation.required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof WorkerFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEmployerSelect = (employerId: number) => {
    setFormData(prev => ({
      ...prev,
      employerId
    }));
    if (errors.employerId) {
      setErrors(prev => ({ ...prev, employerId: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      onNavigate?.('workers-list');
    }
  };

  const handleCancel = () => {
    onNavigate?.('workers-list');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('worker.title')}</h1>
        <p className="mt-1 text-gray-500">{t('worker.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-6">
          <EmployerSelector
            selectedEmployerId={formData.employerId}
            onSelect={handleEmployerSelect}
          />
          {errors.employerId && (
            <p className="mt-1 text-sm text-red-600">{errors.employerId}</p>
          )}
          <PersonalInfoForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <X className="w-4 h-4 mr-2" />
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="w-4 h-4 mr-2" />
            {t('common.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewWorker;