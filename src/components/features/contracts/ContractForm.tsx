'use client'

import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { HelpCircle } from 'lucide-react'
import InputField from '@/components/shared/forms/InputField'
import SelectField from '@/components/shared/forms/SelectField'
import { getSubCategories, SubCategory, getTerminationReasons, TerminationReason,
  getContractLevel, ContractLevel, getContractDeterminateReason,ContractDeterminateReason
} from '@/app/api/auth/contract.configuration.service'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface ContractFormProps {
  formData: {
    contractColf: {
    startDate: string
    endDate: string
    terminationReason: string
    isFixedTerm: boolean
    fixedTermEndDate: string
    fixedTermReason: string
    isLivingWithEmployer: boolean
    subCategory: string
    level: string
    qualityCertification: boolean
    isTerminated: boolean
    }
  }
  onChange: (name: string, value: string | boolean | Date) => void
}

const ContractForm: React.FC<ContractFormProps> = ({ formData, onChange }) => {
  const  t  = useTranslations()
  const { data: session } = useSession();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [terminationReasons, setTerminationReasons] = useState<TerminationReason[]>([]);
  const [contractLevels, setContractLevels] = useState<ContractLevel[]>([]);
  const [contractDeterminateReasons, setContractDeterminateReasons] = useState<ContractDeterminateReason[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = session?.user.accessToken as string;
      let resSubCategories : SubCategory[] = [];
      let resTerminationReasons : TerminationReason[] = [];
      let resContractLevels : ContractLevel[] = [];
      let resContractDeterminateReasons : ContractDeterminateReason[] = [];

      resContractLevels = await getContractLevel({"category": "COLF"}, token);
      resSubCategories = await getSubCategories(token);
      resTerminationReasons = await getTerminationReasons(token);
      resContractDeterminateReasons = await getContractDeterminateReason({"category": "COLF"}, token);

      if (resContractDeterminateReasons != undefined) {
        setContractDeterminateReasons(resContractDeterminateReasons);
      }
      if (resContractLevels != undefined) {
        setContractLevels(resContractLevels);
      }
      if (resSubCategories != undefined) {
        setSubCategories(resSubCategories);
      }
      if (resTerminationReasons != undefined) {
        setTerminationReasons(resTerminationReasons);
      }
    };
  
    if (session) {
      fetchData();
    }
  }, []);

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
            name="contractColf.startDate"
            type="date"
            value={formData.contractColf.startDate}
            onChange={handleInputChange}
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="contractColf.isTerminated"
              checked={formData.contractColf.isTerminated}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.contract.fields.isTerminated')}</span>
          </label>
          
          {
            formData.contractColf.isTerminated && (
              <InputField
              label={t('contract.contract.fields.endDate')}
              name="contractColf.endDate"
              type="date"
              value={formData.contractColf.endDate}
              onChange={handleInputChange}
              required={false}
            />
            )
          }
          {formData.contractColf.isTerminated && (
            <SelectField
              label={t('contract.contract.fields.terminationReason')}
              name="contractColf.terminationReason"
              value={formData.contractColf.terminationReason}
              onChange={handleInputChange}
              options={terminationReasons.map((terminationReason) => ({
                value: terminationReason.value,
                label: t(`contract.contract.options.terminationReasons.${terminationReason.name}`)
              }))
              }
            />
          )}
        </div>
      </div>

      {/* SubCategory Type */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.sections.type')}</h2>
        <SelectField
          label={t('contract.contract.fields.subCategory')}
          name="contractColf.subCategory"
          value={formData.contractColf.subCategory}
          onChange={handleInputChange}
          options={subCategories.map((subCategory) => ({
            value: subCategory.value,
            label: t(`contract.contract.options.subCategory.${subCategory.name}`)
          }))
          }
        />
      </div>

      {/* Level */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.contract.sections.level')}</h2>
        <div className="relative">
          <SelectField
            label={t('contract.contract.fields.level')}
            name="contractColf.level"
            value={formData.contractColf.level}
            onChange={handleInputChange}
            options={contractLevels.map((contractLevel) => ({
              value: contractLevel.subcategory,
              label: t(`contract.contract.options.levels.${contractLevel.subcategory}`)
            }))
            }
          />
          {formData.contractColf.level && (
            <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  {t(`contract.contract.options.levels.${formData.contractColf.level}Description`)}
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
              name="contractColf.isFixedTerm"
              checked={formData.contractColf.isFixedTerm}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.contract.fields.isFixedTerm')}</span>
          </label>

          {formData.contractColf.isFixedTerm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <InputField
                label={t('contract.contract.fields.fixedTermEndDate')}
                name="contractColf.fixedTermEndDate"
                type="date"
                value={formData.contractColf.fixedTermEndDate}
                onChange={handleInputChange}
              />
              <SelectField
                label={t('contract.contract.fields.fixedTermReason')}
                name="contractColf.fixedTermReason"
                value={formData.contractColf.fixedTermReason}
                onChange={handleInputChange}
                options={contractDeterminateReasons.map((contractDeterminateReason) => ({
                  value: contractDeterminateReason.subcategory,
                  label: t(`contract.contract.options.fixedTermReasons.${contractDeterminateReason.subcategory}`)
                }
                ))
                }
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
              name="contractColf.qualityCertification"
              checked={formData.contractColf.qualityCertification}
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