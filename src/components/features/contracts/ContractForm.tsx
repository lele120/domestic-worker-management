'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { HelpCircle } from 'lucide-react'
import InputField from '@/components/shared/forms/InputField'
import SelectField from '@/components/shared/forms/SelectField'

interface ContractFormProps {
  formData: {
    startDate: string
    endDate: string
    terminationReason: string
    isFixedTerm: boolean
    fixedTermEndDate: string
    fixedTermReason: string
    isLivingWithEmployer: boolean
    contractType: string
    level: string
    qualityCertification: boolean
    isTerminated: boolean
  }
  onChange: (name: string, value: string | boolean) => void
}

const ContractForm: React.FC<ContractFormProps> = ({ formData, onChange }) => {
  const  t  = useTranslations()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    onChange(name, finalValue)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.title')}</h2>
        
        {/* Contract Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label={t('contract.contract.fields.startDate')}
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isTerminated"
              checked={formData.isTerminated}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.contract.fields.isTerminated')}</span>
          </label>
          
          {
            formData.isTerminated && (
              <InputField
              label={t('contract.contract.fields.endDate')}
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              required={false}
            />
            )
          }
          {formData.isTerminated && (
            <SelectField
              label={t('contract.contract.fields.terminationReason')}
              name="terminationReason"
              value={formData.terminationReason}
              onChange={handleInputChange}
              options={[
                { value: 'resignation', label: t('contract.contract.options.terminationReasons.resignation') },
                { value: 'mutual', label: t('contract.contract.options.terminationReasons.mutual') },
                { value: 'dismissal', label: t('contract.contract.options.terminationReasons.dismissal') },
                { value: 'retirement', label: t('contract.contract.options.terminationReasons.retirement') },
                { value: 'contractEnd', label: t('contract.contract.options.terminationReasons.contractEnd') },
                { value: 'death', label: t('contract.contract.options.terminationReasons.death') },
                { value: 'justCause', label: t('contract.contract.options.terminationReasons.justCause') }
              ]}
            />
          )}
        </div>
      </div>

      {/* Contract Type */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.sections.type')}</h2>
        <SelectField
          label={t('contract.contract.fields.contractType')}
          name="contractType"
          value={formData.contractType}
          onChange={handleInputChange}
          options={[
            { value: 'nonLiveIn', label: t('contract.contract.options.contractTypes.nonLiveIn') },
            { value: 'fullTimeLiveIn', label: t('contract.contract.options.contractTypes.fullTimeLiveIn') },
            { value: 'nightOnlyLiveIn', label: t('contract.contract.options.contractTypes.nightOnlyLiveIn') },
            { value: 'partTimeLiveIn', label: t('contract.contract.options.contractTypes.partTimeLiveIn') },
            { value: 'substitute', label: t('contract.contract.options.contractTypes.substitute') }
          ]}
        />
      </div>

      {/* Level */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.sections.level')}</h2>
        <div className="relative">
          <SelectField
            label={t('contract.contract.fields.level')}
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            options={[
              { value: 'dSuper', label: t('contract.contract.options.levels.dSuper') },
              { value: 'd', label: t('contract.contract.options.levels.d') },
              { value: 'cSuper', label: t('contract.contract.options.levels.cSuper') },
              { value: 'c', label: t('contract.contract.options.levels.c') },
              { value: 'bSuper', label: t('contract.contract.options.levels.bSuper') },
              { value: 'b', label: t('contract.contract.options.levels.b') },
              { value: 'aSuper', label: t('contract.contract.options.levels.aSuper') },
              { value: 'a', label: t('contract.contract.options.levels.a') }
            ]}
          />
          {formData.level && (
            <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  {t(`contract.contract.options.levels.${formData.level}Description`)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Term Contract */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.sections.fixedTerm')}</h2>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isFixedTerm"
              checked={formData.isFixedTerm}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.contract.fields.isFixedTerm')}</span>
          </label>

          {formData.isFixedTerm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <InputField
                label={t('contract.contract.fields.fixedTermEndDate')}
                name="fixedTermEndDate"
                type="date"
                value={formData.fixedTermEndDate}
                onChange={handleInputChange}
              />
              <SelectField
                label={t('contract.contract.fields.fixedTermReason')}
                name="fixedTermReason"
                value={formData.fixedTermReason}
                onChange={handleInputChange}
                options={[
                  { value: 'SUBSTITUTE_FAMILY', label: t('contract.contract.options.fixedTermReasons.substituteFamily') },
                  { value: 'SUBSTITUTE_MEDICAL', label: t('contract.contract.options.fixedTermReasons.substituteMedical') },
                  { value: 'SUBSTITUTE_VACATION', label: t('contract.contract.options.fixedTermReasons.substituteVacation') },
                  { value: 'SPECIFIC_PROJECT', label: t('contract.contract.options.fixedTermReasons.specificProject') },
                  { value: 'OTHER', label: t('contract.contract.options.fixedTermReasons.other') }
                ]}
              />
            </div>
          )}
        </div>
      </div>

      {/* Quality Certification */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.sections.certification')}</h2>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="qualityCertification"
              checked={formData.qualityCertification}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">
              {t('contract.contract.fields.qualityCertification')}
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ContractForm