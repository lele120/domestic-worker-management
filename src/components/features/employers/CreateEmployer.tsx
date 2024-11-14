'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Save, X } from 'lucide-react';
import InputField from '@/components/shared/forms/InputField';
import SelectField from '@/components/shared/forms/SelectField';

interface CreateEmployerProps {
  onNavigate?: (page: string) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  sex: 'male' | 'female' | 'other';
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  taxNumber: string;
  job: string;
  documentType: string;
  documentNumber: string;
  documentIssuer: string;
  documentExpiration: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  province: string;
  zipCode: string;
  preferredContact: 'email' | 'phone';
  employmentType: 'full-time' | 'part-time' | 'temporary';
  notes: string;
}

const CreateEmployer: React.FC<CreateEmployerProps> = ({ onNavigate }) => {
  const  t  = useTranslations();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    sex: 'male',
    dateOfBirth: '',
    placeOfBirth: '',
    nationality: '',
    taxNumber: '',
    job: '',
    documentType: 'passport',
    documentNumber: '',
    documentIssuer: '',
    documentExpiration: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    province: '',
    zipCode: '',
    preferredContact: 'email',
    employmentType: 'full-time',
    notes: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = t('employers.create.validation.required');
    if (!formData.lastName.trim()) newErrors.lastName = t('employers.create.validation.required');
    if (!formData.dateOfBirth) newErrors.dateOfBirth = t('employers.create.validation.required');
    if (!formData.placeOfBirth.trim()) newErrors.placeOfBirth = t('employers.create.validation.required');
    if (!formData.nationality.trim()) newErrors.nationality = t('employers.create.validation.required');
    if (!formData.taxNumber.trim()) newErrors.taxNumber = t('employers.create.validation.required');
    if (!formData.job.trim()) newErrors.job = t('employers.create.validation.required');
    
    if (!formData.documentNumber.trim()) newErrors.documentNumber = t('employers.create.validation.required');
    if (!formData.documentIssuer.trim()) newErrors.documentIssuer = t('employers.create.validation.required');
    if (!formData.documentExpiration) newErrors.documentExpiration = t('employers.create.validation.required');
    
    if (!formData.email.trim()) {
      newErrors.email = t('employers.create.validation.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('employers.create.validation.email');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('employers.create.validation.required');
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = t('employers.create.validation.phone');
    }
    
    if (!formData.address.trim()) newErrors.address = t('employers.create.validation.required');
    if (!formData.city.trim()) newErrors.city = t('employers.create.validation.required');
    if (!formData.state.trim()) newErrors.state = t('employers.create.validation.required');
    if (!formData.province.trim()) newErrors.province = t('employers.create.validation.required');
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = t('employers.create.validation.required');
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = t('employers.create.validation.zipCode');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      onNavigate?.('employers-list');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('employers.create.title')}</h1>
        <p className="mt-1 text-gray-500">{t('employers.create.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t('employers.create.sections.personal')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label={t('employers.fields.firstName')}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <InputField 
                label={t('employers.fields.lastName')}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
              <SelectField 
                label={t('employers.fields.sex')}
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                options={[
                  { value: 'male', label: t('common.gender.male') },
                  { value: 'female', label: t('common.gender.female') },
                  { value: 'other', label: t('common.gender.other') }
                ]}
                error={errors.sex}
              />
              <InputField 
                label={t('employers.fields.dateOfBirth')}
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
              />
              <InputField 
                label={t('employers.fields.placeOfBirth')}
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                error={errors.placeOfBirth}
              />
              <InputField 
                label={t('employers.fields.nationality')}
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                error={errors.nationality}
              />
              <InputField 
                label={t('employers.fields.taxNumber')}
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                error={errors.taxNumber}
              />
              <InputField 
                label={t('employers.fields.job')}
                name="job"
                value={formData.job}
                onChange={handleChange}
                error={errors.job}
              />
            </div>
          </div>

          {/* Document Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t('employers.create.sections.document')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField 
                label={t('employers.fields.documentType')}
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                options={[
                  { value: 'passport', label: t('common.documents.passport') },
                  { value: 'national_id', label: t('common.documents.nationalId') },
                  { value: 'drivers_license', label: t('common.documents.driversLicense') },
                  { value: 'residence_permit', label: t('common.documents.residencePermit') }
                ]}
                error={errors.documentType}
              />
              <InputField 
                label={t('employers.fields.documentNumber')}
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                error={errors.documentNumber}
              />
              <InputField 
                label={t('employers.fields.documentIssuer')}
                name="documentIssuer"
                value={formData.documentIssuer}
                onChange={handleChange}
                error={errors.documentIssuer}
              />
              <InputField 
                label={t('employers.fields.documentExpiration')}
                name="documentExpiration"
                type="date"
                value={formData.documentExpiration}
                onChange={handleChange}
                error={errors.documentExpiration}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t('employers.create.sections.contact')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label={t('employers.fields.email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <InputField 
                label={t('employers.fields.phone')}
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t('employers.create.sections.address')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <InputField 
                  label={t('employers.fields.address')}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                />
              </div>
              <InputField 
                label={t('employers.fields.city')}
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
              />
              <InputField 
                label={t('employers.fields.state')}
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
              />
              <InputField 
                label={t('employers.fields.province')}
                name="province"
                value={formData.province}
                onChange={handleChange}
                error={errors.province}
              />
              <InputField 
                label={t('employers.fields.zipCode')}
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                error={errors.zipCode}
              />
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t('employers.create.sections.preferences')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField 
                label={t('employers.fields.preferredContact')}
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleChange}
                options={[
                  { value: 'email', label: t('common.contact.email') },
                  { value: 'phone', label: t('common.contact.phone') }
                ]}
                error={errors.preferredContact}
              />
              <SelectField 
                label={t('employers.fields.employmentType')}
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                options={[
                  { value: 'full-time', label: t('common.employment.fullTime') },
                  { value: 'part-time', label: t('common.employment.partTime') },
                  { value: 'temporary', label: t('common.employment.temporary') }
                ]}
                error={errors.employmentType}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              {t('employers.fields.notes')}
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder={t('employers.create.placeholders.notes')}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => onNavigate?.('employers-list')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <X className="w-4 h-4 mr-2" />
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="w-4 h-4 mr-2" />
            {t('employers.create.submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployer;