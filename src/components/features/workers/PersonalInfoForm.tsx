'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import InputField from '@/components/shared/forms/InputField';
import SelectField from '@/components/shared/forms/SelectField';

interface PersonalInfoFormProps {
  formData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    sex: string;
    taxNumber: string;
    email: string;
    phone: string;
    mobile: string;
    address: string;
    city: string;
    province: string;
    state: string;
    zipCode: string;
    documentType: string;
    documentNumber: string;
    documentIssuer: string;
    documentExpiration: string;
    permitType?: string;
    permitReason?: string;
    questura?: string;
    permitNumber?: string;
    permitIssueDate?: string;
    permitExpiryDate?: string;
  };
  errors: Partial<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    nationality: string;
    sex: string;
    taxNumber: string;
    email: string;
    phone: string;
    mobile: string;
    address: string;
    city: string;
    province: string;
    state: string;
    zipCode: string;
    documentType: string;
    documentNumber: string;
    documentIssuer: string;
    documentExpiration: string;
    permitType?: string;
    permitReason?: string;
    questura?: string;
    permitNumber?: string;
    permitIssueDate?: string;
    permitExpiryDate?: string;
  }>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  errors,
  onChange
}) => {
  const t = useTranslations();

  const isNonEU = formData.nationality === 'NON_EU';
  const isEUOrItalian = formData.nationality === 'IT' || formData.nationality === 'EU';

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
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={onChange}
            error={errors.dateOfBirth}
          />
          <InputField
            label={t('worker.fields.birthPlace')}
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={onChange}
            error={errors.placeOfBirth}
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
            name="sex"
            value={formData.sex}
            onChange={onChange}
            options={[
              { value: '', label: t('worker.options.selectGender') },
              { value: 'M', label: t('worker.options.male') },
              { value: 'F', label: t('worker.options.female') },
              { value: 'O', label: t('worker.options.other') }
            ]}
            error={errors.sex}
          />
          <InputField
            label={t('worker.fields.fiscalCode')}
            name="taxNumber"
            value={formData.taxNumber}
            onChange={onChange}
            error={errors.taxNumber}
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
            label={t('employers.fields.state')}
            name="state"
            value={formData.state}
            onChange={onChange}
            error={errors.state}
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
            name="zipCode"
            value={formData.zipCode}
            onChange={onChange}
            error={errors.zipCode}
          />
        </div>
      </div>

      {/* Document Information - Show only for Italian or EU citizens */}
      {isEUOrItalian && (
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
              name="documentExpiration"
              type="date"
              value={formData.documentExpiration}
              onChange={onChange}
              error={errors.documentExpiration}
            />
          </div>
        </div>
      )}

      {/* Document Permit Section - Show only for Non-EU citizens */}
      {isNonEU && (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {t('worker.sections.documentPermit')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label={t('worker.fields.permitType')}
              name="permitType"
              value={formData.permitType || ''}
              onChange={onChange}
              options={[
                { value: '', label: t('worker.options.selectPermitType') },
                { value: 'residencePermit', label: t('worker.options.residencePermit') },
                { value: 'residenceCard', label: t('worker.options.residenceCard') },
                { value: 'otherProvision', label: t('worker.options.otherProvision') },
                { value: 'pendingPermit', label: t('worker.options.pendingPermit') },
                { value: 'renewal', label: t('worker.options.renewal') },
                { value: 'permit', label: t('worker.options.permit') }
              ]}
              error={errors.permitType}
            />
            <SelectField
              label={t('worker.fields.permitReason')}
              name="permitReason"
              value={formData.permitReason || ''}
              onChange={onChange}
              options={[
                { value: '', label: t('worker.options.selectReason') },
                { value: 'childCare', label: t('worker.options.childCare') },
                { value: 'waitingEmployment', label: t('worker.options.waitingEmployment') },
                { value: 'sportsActivity', label: t('worker.options.sportsActivity') },
                { value: 'presenceDeclaration', label: t('worker.options.presenceDeclaration') },
                { value: 'familyMinor', label: t('worker.options.familyMinor') },
                { value: 'minorIntegration', label: t('worker.options.minorIntegration') },
                { value: 'particularWork', label: t('worker.options.particularWork') },
                { value: 'artisticWork', label: t('worker.options.artisticWork') },
                { value: 'seasonalWork', label: t('worker.options.seasonalWork') },
                { value: 'multiYearSeasonalWork', label: t('worker.options.multiYearSeasonalWork') },
                { value: 'subordinateWork', label: t('worker.options.subordinateWork') },
                { value: 'subordinateWorkWaiting', label: t('worker.options.subordinateWorkWaiting') },
                { value: 'volunteerMission', label: t('worker.options.volunteerMission') },
                { value: 'commercialReasons', label: t('worker.options.commercialReasons') },
                { value: 'studyReasons', label: t('worker.options.studyReasons') },
                { value: 'familyReasons', label: t('worker.options.familyReasons') },
                { value: 'humanitarianReasonsArt11', label: t('worker.options.humanitarianReasonsArt11') },
                { value: 'humanitarianReasonsArt18', label: t('worker.options.humanitarianReasonsArt18') },
                { value: 'humanitarianReasonsL155', label: t('worker.options.humanitarianReasonsL155') },
                { value: 'longTermResidence', label: t('worker.options.longTermResidence') },
                { value: 'subsidiaryProtection', label: t('worker.options.subsidiaryProtection') },
                { value: 'temporaryProtection', label: t('worker.options.temporaryProtection') },
                { value: 'scientificResearch', label: t('worker.options.scientificResearch') },
                { value: 'politicalAsylum', label: t('worker.options.politicalAsylum') },
                { value: 'statelessRecognition', label: t('worker.options.statelessRecognition') },
                { value: 'internship', label: t('worker.options.internship') },
                { value: 'workVacation', label: t('worker.options.workVacation') },
                { value: 'medicalCare', label: t('worker.options.medicalCare') },
                { value: 'specialProtection', label: t('worker.options.specialProtection') }
              ]}
              error={errors.permitReason}
            />
            <InputField
              label={t('worker.fields.questura')}
              name="questura"
              value={formData.questura || ''}
              onChange={onChange}
              error={errors.questura}
              placeholder={t('worker.placeholders.questura')}
            />
            <InputField
              label={t('worker.fields.permitNumber')}
              name="permitNumber"
              value={formData.permitNumber || ''}
              onChange={onChange}
              error={errors.permitNumber}
              placeholder={t('worker.placeholders.permitNumber')}
            />
            <InputField
              label={t('worker.fields.permitIssueDate')}
              name="permitIssueDate"
              type="date"
              value={formData.permitIssueDate || ''}
              onChange={onChange}
              error={errors.permitIssueDate}
            />
            <InputField
              label={t('worker.fields.permitExpiryDate')}
              name="permitExpiryDate"
              type="date"
              value={formData.permitExpiryDate || ''}
              onChange={onChange}
              error={errors.permitExpiryDate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoForm;