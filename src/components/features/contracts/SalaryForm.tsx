'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import InputField from '@/components/shared/forms/InputField'
import CostTable from './CostTable'
import { calculateContractCost, Response,ErrorCost, CostBreakdown } from '@/app/api/auth/contractCost.service'
import { useSession } from 'next-auth/react'
import { Calculator } from 'lucide-react'

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
    workSchedule: {
      weeklyHours: number
    }
    contractColf: {
      level: string
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (name: string, value: any) => void
}

const SalaryForm: React.FC<SalaryFormProps> = ({ formData, onChange }) => {
  const t = useTranslations()
  const { data: session, status } = useSession()
  const [costs, setCosts] = useState<CostBreakdown | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorCost | string | null>(null)

  const calculateCosts = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Check if user is authenticated
      if (status === 'loading') {
        setError(t('common.loading'))
        return
      }
      
      if (!session?.user.accessToken) {
        setError(t('common.error') + ': ' + t('auth.loginRequired'))
        return
      }

      // Map contract parameters from formData
      const contractParams = {
        numberOfHours: formData.workSchedule?.weeklyHours, // Default to 40 if not provided
        subcategory: formData.contractColf?.level, // Default to 'colf' as specified
        contractType: 'colf', // Always use 'colf' as specified
        basePay: formData.salary.basePay,
      }

      const result : Response = await calculateContractCost(
        contractParams,
        session?.user.accessToken
      )

      if (result.errors !== null) {
        setError(result.errors)
        setCosts(null)
      }

      if (result.costs !== null) {
        setCosts(result.costs)
        setError(null)
      }
    } catch (err) {
      console.error('Error calculating contract costs:', err)
      //setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    console.log(name, value, type)
    if (type === 'checkbox') {
      onChange(name, (e.target as HTMLInputElement).checked)
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
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">{t('contracts.costBreakdown')}</h3>
          <button
            onClick={calculateCosts}
            disabled={loading || status === 'loading'}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <Calculator className="w-4 h-4 mr-2" />
            {loading ? t('common.loading') : t('contracts.calculateCosts')}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-6">
            {typeof error === 'string' ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium text-red-600">{t('common.error')}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {Object.entries(error).map(([key, value]) => (
                    <li key={key} className="text-sm text-red-600">
                      <span className="font-medium">{t(key)}:</span> {t(value)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {costs && (
          <>
            <div className="space-y-1 mb-2 text-right text-sm text-gray-500">
              <div className="grid grid-cols-[1fr_12rem] gap-4">
                <div></div>
                <div className="grid grid-cols-2">
                  <span>{t('contracts.hourly')}</span>
                  <span>{t('contracts.monthly')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Worker's Costs */}
              <CostTable 
                title={t('contracts.worker')} 
                data={costs.worker} 
              />

              {/* Employer's Costs */}
              <div className="border-t border-gray-200 pt-6">
                <CostTable 
                  title={t('contracts.employer')} 
                  data={costs.employer}
                  showPositive
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SalaryForm