'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import InputField from '@/components/shared/forms/InputField'
import SelectField from '@/components/shared/forms/SelectField'

interface SalaryFormProps {
  formData: {
    basePay: number
    functionAllowance: number
    customItems: Array<{ name: string; amount: number }>
    overtimeAllowance: number
    nonAutomaticAllowance: number
    futureIncrements: number
    nonAutomaticPersonalAllowance: number
    childrenAllowance: number
    qualityCertificationAllowance: number
    includeHolidayPay: boolean
    include13thMonth: boolean
    includeSeverancePay: boolean
    mealAllowance: {
      breakfast: number
      lunch: number
      dinner: number
    }
    accommodationAllowance: number
    inKindBenefits: boolean
  }
  onChange: (name: string, value: any) => void
}

const SalaryForm: React.FC<SalaryFormProps> = ({ formData, onChange }) => {
  const  t  = useTranslations()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      onChange(name, e.target.checked)
    } else if (type === 'number') {
      onChange(name, parseFloat(value))
    } else {
      onChange(name, value)
    }
  }

  return (
    <div className="space-y-8">
      {/* Salary Configuration */}
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-900">{t('contract.salary.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label={t('contract.salary.fields.basePay')}
            name="basePay"
            type="number"
            value={formData.basePay.toString()}
            onChange={handleInputChange}
          />

          <InputField
            label={t('contract.salary.fields.functionAllowance')}
            name="functionAllowance"
            type="number"
            value={formData.functionAllowance.toString()}
            onChange={handleInputChange}
          />

          <InputField
            label={t('contract.salary.fields.overtimeAllowance')}
            name="overtimeAllowance"
            type="number"
            value={formData.overtimeAllowance.toString()}
            onChange={handleInputChange}
          />

          <InputField
            label={t('contract.salary.fields.nonAutomaticAllowance')}
            name="nonAutomaticAllowance"
            type="number"
            value={formData.nonAutomaticAllowance.toString()}
            onChange={handleInputChange}
          />

          <InputField
            label={t('contract.salary.fields.futureIncrements')}
            name="futureIncrements"
            type="number"
            value={formData.futureIncrements.toString()}
            onChange={handleInputChange}
          />

          <InputField
            label={t('contract.salary.fields.childrenAllowance')}
            name="childrenAllowance"
            type="number"
            value={formData.childrenAllowance.toString()}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="includeHolidayPay"
              checked={formData.includeHolidayPay}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.salary.fields.includeHolidayPay')}</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="include13thMonth"
              checked={formData.include13thMonth}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.salary.fields.include13thMonth')}</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="includeSeverancePay"
              checked={formData.includeSeverancePay}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.salary.fields.includeSeverancePay')}</span>
          </label>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">{t('contract.salary.sections.allowances')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label={t('contract.salary.fields.mealAllowance.breakfast')}
              name="mealAllowance.breakfast"
              type="number"
              value={formData.mealAllowance.breakfast.toString()}
              onChange={handleInputChange}
            />
            <InputField
              label={t('contract.salary.fields.mealAllowance.lunch')}
              name="mealAllowance.lunch"
              type="number"
              value={formData.mealAllowance.lunch.toString()}
              onChange={handleInputChange}
            />
            <InputField
              label={t('contract.salary.fields.mealAllowance.dinner')}
              name="mealAllowance.dinner"
              type="number"
              value={formData.mealAllowance.dinner.toString()}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <InputField
            label={t('contract.salary.fields.accommodationAllowance')}
            name="accommodationAllowance"
            type="number"
            value={formData.accommodationAllowance.toString()}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="inKindBenefits"
              checked={formData.inKindBenefits}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.salary.fields.inKindBenefits')}</span>
          </label>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">{t('contract.salary.sections.summary')}</h3>
        
        <div className="space-y-6">
          {/* Employee Costs */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">{t('contract.salary.sections.employeeCosts')}:</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <span className="text-sm text-gray-600">{t('common.description')}</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="text-sm text-gray-600">{t('common.hourly')}</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="text-sm text-gray-600">{t('common.monthly')}</span>
              </div>
            </div>
          </div>

          {/* Employer Costs */}
          <div className="pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-700 mb-4">{t('contract.salary.sections.employerCosts')}:</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <span className="text-sm text-gray-600">{t('common.description')}</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="text-sm text-gray-600">{t('common.hourly')}</span>
              </div>
              <div className="col-span-1 text-right">
                <span className="text-sm text-gray-600">{t('common.monthly')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryForm