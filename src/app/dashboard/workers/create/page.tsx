'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Save, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import EmployerSelector from '@/components/features/workers/EmployerSelector';
import PersonalInfoForm from '@/components/features/workers/PersonalInfoForm';
import { useSession } from 'next-auth/react';
import { createWorker } from '@/app/api/auth/worker.service';
import { CreateWorkerInput } from '@/types/worker.types';

const NewWorker: React.FC = () => {
  const  t  = useTranslations();
  const router = useRouter();
  const { data: session } = useSession();
  const [workerForm, setworkerForm] = useState<CreateWorkerInput>({
    employerId: null,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    nationality: '',
    sex: '',
    taxNumber: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    city: '',
    province: '',
    state: '',
    zipCode: '',
    documentType: '',
    documentNumber: '',
    documentIssuer: '',
    documentExpiration: '',
    status: 'active',
    image: null
  });

  const [errors, setErrors] = useState<Record<keyof CreateWorkerInput, string | undefined>>({} as Record<keyof CreateWorkerInput, string | undefined>);

  const validateForm = () => {
    const newErrors: Partial<CreateWorkerInput> = {};

    if (!workerForm.firstName.trim()) newErrors.firstName = t('worker.validation.required');
    if (!workerForm.lastName.trim()) newErrors.lastName = t('worker.validation.required');
    if (!workerForm.dateOfBirth) newErrors.dateOfBirth = t('worker.validation.required');
    if (!workerForm.placeOfBirth.trim()) newErrors.placeOfBirth = t('worker.validation.required');
    if (!workerForm.nationality) newErrors.nationality = t('worker.validation.required');
    if (!workerForm.sex) newErrors.sex = t('worker.validation.required');
    if (!workerForm.taxNumber.trim()) newErrors.taxNumber = t('worker.validation.required');

    if (workerForm.email && !/\S+@\S+\.\S+/.test(workerForm.email)) {
      newErrors.email = t('worker.validation.invalidEmail');
    }

    if (workerForm.phone && !/^\+?[\d\s-()]+$/.test(workerForm.phone)) {
      newErrors.phone = t('worker.validation.invalidPhone');
    }

    // Validate document fields only for Italian or EU citizens
    if (workerForm.nationality === 'IT' || workerForm.nationality === 'EU') {
      if (!workerForm.documentType) newErrors.documentType = t('worker.validation.required');
      if (!workerForm.documentNumber) newErrors.documentNumber = t('worker.validation.required');
      if (!workerForm.documentIssuer) newErrors.documentIssuer = t('worker.validation.required');
      if (!workerForm.documentExpiration) newErrors.documentExpiration = t('worker.validation.required');
    }

    // Validate permit fields only for Non-EU citizens
    if (workerForm.nationality === 'NON_EU') {
      if (!workerForm.permitType) newErrors.permitType = t('worker.validation.required');
      if (!workerForm.permitReason) newErrors.permitReason = t('worker.validation.required');
      if (!workerForm.questura) newErrors.questura = t('worker.validation.required');
      if (!workerForm.permitNumber) newErrors.permitNumber = t('worker.validation.required');
      if (!workerForm.permitIssueDate) newErrors.permitIssueDate = t('worker.validation.required');
      if (!workerForm.permitExpiryDate) newErrors.permitExpiryDate = t('worker.validation.required');
    }

    setErrors(newErrors as Record<keyof CreateWorkerInput, string | undefined>);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setworkerForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof CreateWorkerInput]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setworkerForm(prev => ({
          ...prev,
          image: reader.result as string
        }));
        if (errors.image) {
          setErrors(prev => ({ ...prev, image: undefined }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmployerSelect = (employerId: number | null |undefined) => {
    setworkerForm(prev => ({
      ...prev,
      employerId
    }));
    if (errors.employerId) {
      setErrors(prev => ({ ...prev, employerId: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const accessToken = session?.user.accessToken as string;
      const response = await createWorker(workerForm,accessToken);
      if (response !== null) {
        router.push('/dashboard/workers');
      }else {
        console.log('Error creating worker:', response);
      }
     
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/workers');
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
            selectedEmployerId={workerForm.employerId}
            onSelect={handleEmployerSelect}
          />
          {errors.employerId && (
            <p className="mt-1 text-sm text-red-600">{errors.employerId}</p>
          )}
          <PersonalInfoForm
            formData={workerForm}
            errors={errors}
            onChange={handleInputChange}
            onImageChange={handleImageChange}
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