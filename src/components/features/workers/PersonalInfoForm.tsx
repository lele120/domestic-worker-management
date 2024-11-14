'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import InputField from '@/components/shared/forms/InputField';
import SelectField from '@/components/shared/forms/SelectField';

interface PersonalInfoFormProps {
  formData: {
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
  };
  errors: Partial<{
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
  }>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  errors,
  onChange
}) => {
  const  t  = useTranslations();

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t('worker.sections.personalInfo')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label={t('worker.fields.firstName')}
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            error={errors.firstName}
          />
          <InputField
            label={t('worker.fields.lastName')}
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            error={errors.lastName}
          />
          <InputField
            label={t('worker.fields.birthDate')}
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={onChange}
            error={errors.birthDate}
          />
          <InputField
            label={t('worker.fields.birthPlace')}
            name="birthPlace"
            value={formData.birthPlace}
            onChange={onChange}
            error={errors.birthPlace}
          />
          <SelectField
            label={t('worker.fields.nationality')}
            name="nationality"
            value={formData.nationality}
            onChange={onChange}
            options={[
              { value: '', label: t('worker.options.selectNationality') },
              { value: 'IT', label: t('worker.options.italian') },
              { value: 'EU', label: t('worker.options.eu') },
              { value: 'NON_EU', label: t('worker.options.nonEu') }
            ]}
            error={errors.nationality}
          />
          <SelectField
            label={t('worker.fields.gender')}
            name="gender"
            value={formData.gender}
            onChange={onChange}
            options={[
              { value: '', label: t('worker.options.selectGender') },
              { value: 'M', label: t('worker.options.male') },
              { value: 'F', label: t('worker.options.female') },
              { value: 'O', label: t('worker.options.other') }
            ]}
            error={errors.gender}
          />
          <InputField
            label={t('worker.fields.fiscalCode')}
            name="fiscalCode"
            value={formData.fiscalCode}
            onChange={onChange}
            error={errors.fiscalCode}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t('worker.sections.contactInfo')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label={t('worker.fields.email')}
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            error={errors.email}
            required={false}
          />
          <InputField
            label={t('worker.fields.phone')}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            error={errors.phone}
          />
          <InputField
            label={t('worker.fields.mobile')}
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={onChange}
            error={errors.mobile}
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t('worker.sections.address')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <InputField
              label={t('worker.fields.streetAddress')}
              name="address"
              value={formData.address}
              onChange={onChange}
              error={errors.address}
            />
          </div>
          <InputField
            label={t('worker.fields.city')}
            name="city"
            value={formData.city}
            onChange={onChange}
            error={errors.city}
          />
          <InputField
            label={t('worker.fields.province')}
            name="province"
            value={formData.province}
            onChange={onChange}
            error={errors.province}
          />
          <InputField
            label={t('worker.fields.postalCode')}
            name="postalCode"
            value={formData.postalCode}
            onChange={onChange}
            error={errors.postalCode}
          />
        </div>
      </div>

      {/* Document Information */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t('worker.sections.documentInfo')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label={t('worker.fields.documentType')}
            name="documentType"
            value={formData.documentType}
            onChange={onChange}
            options={[
              { value: '', label: t('worker.options.selectDocType') },
              { value: 'PASSPORT', label: t('worker.options.passport') },
              { value: 'ID_CARD', label: t('worker.options.idCard') },
              { value: 'DRIVERS_LICENSE', label: t('worker.options.driversLicense') }
            ]}
            error={errors.documentType}
          />
          <InputField
            label={t('worker.fields.documentNumber')}
            name="documentNumber"
            value={formData.documentNumber}
            onChange={onChange}
            error={errors.documentNumber}
          />
          <InputField
            label={t('worker.fields.documentIssuer')}
            name="documentIssuer"
            value={formData.documentIssuer}
            onChange={onChange}
            error={errors.documentIssuer}
          />
          <InputField
            label={t('worker.fields.documentExpiry')}
            name="documentExpiry"
            type="date"
            value={formData.documentExpiry}
            onChange={onChange}
            error={errors.documentExpiry}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;