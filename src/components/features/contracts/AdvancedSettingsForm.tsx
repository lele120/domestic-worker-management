'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { AlertCircle } from 'lucide-react'

interface AdvancedSettingsFormProps {
  formData: {
    payHolidaysMonthly: boolean
    pay13thMonthly: boolean
    payTFRMonthly: boolean
    monthlyPayment: boolean
    monthlyBonus: boolean
    noWorkerContributions: boolean
    noCassaColf: boolean
  }
  onChange: (name: string, value: boolean) => void
}

const AdvancedSettingsForm: React.FC<AdvancedSettingsFormProps> = ({ formData, onChange }) => {
  const  t  = useTranslations()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    onChange(name, checked)
  }

  return (
    <div className="space-y-6">
      {/* Configuration Section */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.advanced.title')}</h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="payHolidaysMonthly"
              name="payHolidaysMonthly"
              checked={formData.payHolidaysMonthly}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="payHolidaysMonthly" className="block text-sm font-medium text-gray-700">
                {t('contract.advanced.fields.payHolidaysMonthly')}
              </label>
              <p className="mt-1 text-sm text-gray-500">
                {t('contract.advanced.descriptions.payHolidaysMonthly')}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="pay13thMonthly"
              name="pay13thMonthly"
              checked={formData.pay13thMonthly}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="pay13thMonthly" className="block text-sm font-medium text-gray-700">
                {t('contract.advanced.fields.pay13thMonthly')}
              </label>
              <p className="mt-1 text-sm text-gray-500">
                {t('contract.advanced.descriptions.pay13thMonthly')}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="payTFRMonthly"
              name="payTFRMonthly"
              checked={formData.payTFRMonthly}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="payTFRMonthly" className="block text-sm font-medium text-gray-700">
                {t('contract.advanced.fields.payTFRMonthly')}
              </label>
              <p className="mt-1 text-sm text-gray-500">
                {t('contract.advanced.descriptions.payTFRMonthly')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Economic Treatment Section */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.advanced.sections.paymentConfig')}</h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="monthlyPayment"
              name="monthlyPayment"
              checked={formData.monthlyPayment}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="monthlyPayment" className="block text-sm font-medium text-gray-700">
                {t('contract.advanced.fields.monthlyPayment')}
              </label>
              <p className="mt-1 text-sm text-gray-500">
                {t('contract.advanced.descriptions.monthlyPayment')}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="monthlyBonus"
              name="monthlyBonus"
              checked={formData.monthlyBonus}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="monthlyBonus" className="block text-sm font-medium text-gray-700">
                {t('contract.advanced.fields.monthlyBonus')}
              </label>
              <p className="mt-1 text-sm text-gray-500">
                {t('contract.advanced.descriptions.monthlyBonus')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contributions Section */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.advanced.sections.contributions')}</h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="noWorkerContributions"
              name="noWorkerContributions"
              checked={formData.noWorkerContributions}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="noWorkerContributions" className="block text-sm font-medium text-gray-700">
                {t('contract.advanced.fields.noWorkerContributions')}
              </label>
              <p className="mt-1 text-sm text-gray-500">
                {t('contract.advanced.descriptions.noWorkerContributions')}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="noCassaColf"
              name="noCassaColf"
              checked={formData.noCassaColf}
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="noCassaColf" className="block text-sm font-medium text-gray-700">
                {t('contract.advanced.fields.noCassaColf')}
              </label>
              <p className="mt-1 text-sm text-gray-500">
                {t('contract.advanced.descriptions.noCassaColf')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">{t('contract.advanced.warnings.title')}</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>{t('contract.advanced.warnings.message')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedSettingsForm