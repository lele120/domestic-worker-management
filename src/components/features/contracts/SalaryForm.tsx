'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import InputField from '@/components/shared/forms/InputField'
import CostTable from './CostTable'
import { useState } from 'react'

interface SalaryFormProps {
  formData: {
    salary:{
      basePay: number
      functionAllowance: number
      customItems: Array<{ name: string; amount: number }>
      overtimeAllowance: number
      nonAutomaticAllowance: number
      futureIncrements: number
      childrenAllowance: number
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
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (name: string, value: any) => void
}

const SalaryForm: React.FC<SalaryFormProps> = ({ formData, onChange }) => {
  const  t  = useTranslations()

   const [calculateSalary] = useState({
      "costs":{
         "worker":{
            "grossPay":{
               "hourly":7.0,
               "monthly":1213.352
            },
            "contributions":{
               "hourly":0.42,
               "monthly":72.80112
            },
            "cassaColf":{
               "hourly":0.02,
               "monthly":3.4667200000000005
            },
            "netPay":{
               "hourly":6.5600000000000005,
               "monthly":1137.08416
            }
         },
         "employer":{
            "grossPay":{
               "hourly":7.0,
               "monthly":1213.352
            },
            "roomBoard":{
               "hourly":0.0,
               "monthly":0.0
            },
            "contributions":{
               "hourly":1.37,
               "monthly":237.47032000000004
            },
            "cassaColf":{
               "hourly":0.04,
               "monthly":6.933440000000001
            },
            "holidays":{
               "hourly":0.62,
               "monthly":107.46832
            },
            "thirteenthMonth":{
               "hourly":0.62,
               "monthly":107.46832
            },
            "severancePay":{
               "hourly":0.59,
               "monthly":102.26824
            },
            "totalCost":{
               "hourly":10.239999999999998,
               "monthly":1774.9606399999998
            }
         }
      }
   });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    console.log(name, value, type)
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
            name="salary.basePay"
            type="number"
            value={formData.salary.basePay.toString()}
            onChange={handleInputChange}
          />

          <InputField
            label={t('contract.salary.fields.functionAllowance')}
            name="salary.functionAllowance"
            type="number"
            value={formData.salary.functionAllowance.toString()}
            onChange={handleInputChange}
          />

          <InputField
            label={t('contract.salary.fields.overtimeAllowance')}
            name="salary.overtimeAllowance"
            type="number"
            value={formData.salary.overtimeAllowance.toString()}
            onChange={handleInputChange}
          />

          <InputField
            label={t('contract.salary.fields.nonAutomaticAllowance')}
            name="salary.nonAutomaticAllowance"
            type="number"
            value={formData.salary.nonAutomaticAllowance.toString()}
            onChange={handleInputChange}
          />

          <InputField
            label={t('contract.salary.fields.futureIncrements')}
            name="salary.futureIncrements"
            type="number"
            value={formData.salary.futureIncrements.toString()}
            onChange={handleInputChange}
          />

          <InputField
            label={t('contract.salary.fields.childrenAllowance')}
            name="salary.childrenAllowance"
            type="number"
            value={formData.salary.childrenAllowance.toString()}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="salary.includeHolidayPay"
              checked={formData.salary.includeHolidayPay}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.salary.fields.includeHolidayPay')}</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="salary.include13thMonth"
              checked={formData.salary.include13thMonth}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.salary.fields.include13thMonth')}</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="salary.includeSeverancePay"
              checked={formData.salary.includeSeverancePay}
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
              name="salary.mealAllowance.breakfast"
              type="number"
              value={formData.salary.mealAllowance.breakfast.toString()}
              onChange={handleInputChange}
            />
            <InputField
              label={t('contract.salary.fields.mealAllowance.lunch')}
              name="salary.mealAllowance.lunch"
              type="number"
              value={formData.salary.mealAllowance.lunch.toString()}
              onChange={handleInputChange}
            />
            <InputField
              label={t('contract.salary.fields.mealAllowance.dinner')}
              name="salary.mealAllowance.dinner"
              type="number"
              value={formData.salary.mealAllowance.dinner.toString()}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <InputField
            label={t('contract.salary.fields.accommodationAllowance')}
            name="salary.accommodationAllowance"
            type="number"
            value={formData.salary.accommodationAllowance.toString()}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="salary.inKindBenefits"
              checked={formData.salary.inKindBenefits}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">{t('contract.salary.fields.inKindBenefits')}</span>
          </label>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-gray-50 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Cost Breakdown</h3>
        
        <div className="space-y-1 mb-2 text-right text-sm text-gray-500">
          <div className="grid grid-cols-[1fr_12rem] gap-4">
            <div></div>
            <div className="grid grid-cols-2">
              <span>Hourly</span>
              <span>Monthly</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Worker's Costs */}
          <CostTable 
            title="Worker" 
            data={calculateSalary.costs.worker} 
          />

          {/* Employer's Costs */}
          <div className="border-t border-gray-200 pt-6">
            <CostTable 
              title="Employer" 
              data={calculateSalary.costs.employer}
              showPositive
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryForm