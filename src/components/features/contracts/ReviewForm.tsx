'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Check, AlertCircle } from 'lucide-react'

interface ReviewFormProps {
  formData: {
    // Contract Information
    startDate: string
    endDate: string
    terminationReason: string
    contractType: string
    level: string
    qualityCertification: boolean
    isFixedTerm: boolean
    fixedTermEndDate: string
    fixedTermReason: string

    // Schedule Information
    weeklyHours: number
    schedule: {
      [key: string]: {
        enabled: boolean
        startTime: string
        endTime: string
        breaks: Array<{ startTime: string; duration: number }>
      }
    }
    holidayWork: boolean
    holidayCompensation: string
    nightShift: boolean
    nightShiftStartTime: string
    nightShiftEndTime: string

    // Salary Information
    salary: {
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

    // Advanced Settings
    advancedSettings: {
      payHolidaysMonthly: boolean
      pay13thMonthly: boolean
      payTFRMonthly: boolean
      monthlyPayment: boolean
      monthlyBonus: boolean
      noWorkerContributions: boolean
      noCassaColf: boolean
    }
  }
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData }) => {
  const  t  = useTranslations()

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {children}
      </div>
    </div>
  )

  const Field: React.FC<{ label: string; value: string | number | boolean }> = ({ label, value }) => (
    <div className="mb-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">
        {typeof value === 'boolean' ? (value ? t('common.yes') : t('common.no')) : value || '-'}
      </dd>
    </div>
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const formatDate = (date: string) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">{t('contract.review.warnings.title')}</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>{t('contract.review.warnings.reviewMessage')}</p>
            </div>
          </div>
        </div>
      </div>

      <Section title={t('contract.review.sections.contract')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label={t('contract.contract.fields.startDate')} value={formatDate(formData.startDate)} />
          <Field label={t('contract.contract.fields.endDate')} value={formatDate(formData.endDate)} />
          <Field label={t('contract.contract.fields.contractType')} value={formData.contractType} />
          <Field label={t('contract.contract.fields.level')} value={formData.level} />
          <Field label={t('contract.contract.fields.qualityCertification')} value={formData.qualityCertification} />
          <Field label={t('contract.contract.fields.isFixedTerm')} value={formData.isFixedTerm} />
          {formData.isFixedTerm && (
            <>
              <Field label={t('contract.contract.fields.fixedTermEndDate')} value={formatDate(formData.fixedTermEndDate)} />
              <Field label={t('contract.contract.fields.fixedTermReason')} value={formData.fixedTermReason} />
            </>
          )}
        </div>
      </Section>

      <Section title={t('contract.review.sections.schedule')}>
        <div className="space-y-4">
          <Field label={t('contract.schedule.fields.totalWeeklyHours')} value={formData.weeklyHours} />
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">{t('contract.schedule.sections.dailySchedule')}</h3>
            {Object.entries(formData.schedule).map(([day, schedule]) => (
              schedule.enabled && (
                <div key={day} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 capitalize mb-2">{t(`contract.schedule.days.${day}`)}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">{t('contract.schedule.fields.hours')}: </span>
                      <span className="text-sm text-gray-900">
                        {schedule.startTime} - {schedule.endTime}
                      </span>
                    </div>
                    {schedule.breaks.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-500">{t('contract.schedule.sections.breaks')}: </span>
                        {schedule.breaks.map((breakItem, index) => (
                          <span key={index} className="text-sm text-gray-900">
                            {breakItem.startTime} ({breakItem.duration} min)
                            {index < schedule.breaks.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <Field label={t('contract.schedule.fields.holidayWork')} value={formData.holidayWork} />
            {formData.holidayWork && (
              <Field label={t('contract.schedule.fields.holidayCompensation')} value={formData.holidayCompensation} />
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <Field label={t('contract.schedule.fields.nightShift')} value={formData.nightShift} />
            {formData.nightShift && (
              <div className="grid grid-cols-2 gap-4">
                <Field label={t('contract.schedule.fields.nightShiftStart')} value={formData.nightShiftStartTime} />
                <Field label={t('contract.schedule.fields.nightShiftEnd')} value={formData.nightShiftEndTime} />
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section title={t('contract.review.sections.salary')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label={t('contract.salary.fields.basePay')} value={formatCurrency(formData.salary.basePay)} />
          <Field label={t('contract.salary.fields.functionAllowance')} value={formatCurrency(formData.salary.functionAllowance)} />
          <Field label={t('contract.salary.fields.overtimeAllowance')} value={formatCurrency(formData.salary.overtimeAllowance)} />
          <Field label={t('contract.salary.fields.childrenAllowance')} value={formatCurrency(formData.salary.childrenAllowance)} />
          
          <div className="md:col-span-2 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">{t('contract.salary.sections.benefits')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label={t('contract.salary.fields.includeHolidayPay')} value={formData.salary.includeHolidayPay} />
              <Field label={t('contract.salary.fields.include13thMonth')} value={formData.salary.include13thMonth} />
              <Field label={t('contract.salary.fields.includeSeverancePay')} value={formData.salary.includeSeverancePay} />
            </div>
          </div>

          <div className="md:col-span-2 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">{t('contract.salary.fields.mealAllowance')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label={t('contract.salary.fields.mealAllowance.breakfast')} value={formatCurrency(formData.salary.mealAllowance.breakfast)} />
              <Field label={t('contract.salary.fields.mealAllowance.lunch')} value={formatCurrency(formData.salary.mealAllowance.lunch)} />
              <Field label={t('contract.salary.fields.mealAllowance.dinner')} value={formatCurrency(formData.salary.mealAllowance.dinner)} />
            </div>
          </div>

          <Field 
            label={t('contract.salary.fields.accommodationAllowance')}
            value={formatCurrency(formData.salary.accommodationAllowance)} 
          />
          <Field 
            label={t('contract.salary.fields.inKindBenefits')}
            value={formData.salary.inKindBenefits} 
          />
        </div>
      </Section>

      <Section title={t('contract.review.sections.advanced')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label={t('contract.advanced.fields.payHolidaysMonthly')} value={formData.advancedSettings.payHolidaysMonthly} />
          <Field label={t('contract.advanced.fields.pay13thMonthly')} value={formData.advancedSettings.pay13thMonthly} />
          <Field label={t('contract.advanced.fields.payTFRMonthly')} value={formData.advancedSettings.payTFRMonthly} />
          <Field label={t('contract.advanced.fields.monthlyPayment')} value={formData.advancedSettings.monthlyPayment} />
          <Field label={t('contract.advanced.fields.monthlyBonus')} value={formData.advancedSettings.monthlyBonus} />
          <Field label={t('contract.advanced.fields.noWorkerContributions')} value={formData.advancedSettings.noWorkerContributions} />
          <Field label={t('contract.advanced.fields.noCassaColf')} value={formData.advancedSettings.noCassaColf} />
        </div>
      </Section>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t('contract.review.actions.editInfo')}
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Check className="w-4 h-4 mr-2" />
          {t('contract.review.actions.submitContract')}
        </button>
      </div>
    </div>
  )
}

export default ReviewForm