'use client'

import { useTranslations } from 'next-intl'
import { Check, AlertCircle } from 'lucide-react'
import { ContractColfValidation } from '@/types/contract.types'
import { CreateContractColf } from '@/types/contract.types'
import { CreateEmployer } from '@/types/employer.types'
import { CreateWorkerResponse } from '@/types/worker.types'
import { createContractColf } from '@/app/api/auth/contractColf.service'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getContractLevel, getSubCategories } from '@/app/api/auth/contract.configuration.service'

interface ReviewFormProps {
  errors: Partial<ContractColfValidation>;
  validateForm: () => boolean;
  formData: CreateContractColf
  employer: CreateEmployer | null;
  worker: CreateWorkerResponse | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, errors, validateForm, employer, worker }) => {
  const t = useTranslations();
  const { data: session } = useSession();
  const [contractLevelsDict, setContractLevelsDict] = useState<{ [key: string]: string }>({});
  const [contractSubCategoryDict, setContractSubCategoryDict] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchContractConfiguration = async () => {
      const token = session?.user.accessToken as string;
      const resContractLevels = await getContractLevel({"category": "COLF"}, token);
      const resSubCategories = await getSubCategories(token);
      

      if (resContractLevels) {
        const levelsDict = resContractLevels.reduce((acc: { [key: string]: string }, level) => {
          acc[level.id] = level.name;
          return acc;
        }, {});
        setContractLevelsDict(levelsDict);
      }

      if (resSubCategories) {
        const subCategoriesDict = resSubCategories.reduce((acc: { [key: string]: string }, subCategory) => {
          acc[subCategory.id] = subCategory.name;
          return acc;
        }, {});
        setContractSubCategoryDict(subCategoriesDict);
      }
    };

    if (session) {
      fetchContractConfiguration();
    }
  }, [session]);
 
  const hasErrors = (obj: object) => {
    return obj && Object.keys(obj).length > 0;
  };

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

  const onClick = async () => {
    const validated = validateForm();
    console.log('Validated', validated);
    if (validated) {
      const contractData = {
        ...formData,
        employerId: employer?.id ?? undefined,
        workerId: worker?.id,
        workplaceLocation: formData.workplaceLocation
      };
      
      const token = session?.user.accessToken;
      if (token) {
        const result = await createContractColf(contractData, token);
        if (result) {
          console.log('Contract created', result);
        }
      } else {
        console.error('Token is undefined');
      }
    }
  };

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
      {hasErrors(errors) && (<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800"></h3>
            {hasErrors(errors) && (
              <div className="mt-4">
                {Object.keys(errors).map((key) => {
                  const errorValue = errors[key as keyof ContractColfValidation];
                    return (
                      <div key={key} className="text-red-600">
                        {errorValue}
                      </div>
                    );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      <Section title={t('contract.review.sections.contract')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label={t('contract.contract.fields.startDate')} value={formatDate(formData.contractColf.startDate)} />
          <Field label={t('contract.contract.fields.endDate')} value={formatDate(formData.contractColf.endDate)} />
          <Field label={t('contract.contract.fields.subCategory')} value={t(`contract.contract.options.subCategory.${contractSubCategoryDict[formData.contractColf.subCategory]}`)} />
          <Field label={t('contract.contract.fields.level')} value={t(`contract.contract.options.levels.${contractLevelsDict[formData.contractColf.level]}`)} />
          <Field label={t('contract.contract.fields.qualityCertification')} value={formData.contractColf.qualityCertification} />
          <Field label={t('contract.contract.fields.isFixedTerm')} value={formData.contractColf.isFixedTerm} />
          {formData.contractColf.isFixedTerm && (
            <>
              <Field label={t('contract.contract.fields.fixedTermEndDate')} value={formatDate(formData.contractColf.fixedTermEndDate)} />
              <Field label={t('contract.contract.fields.fixedTermReason')} value={formData.contractColf.fixedTermReason} />
            </>
          )}
          <Field label={t('contract.contract.fields.inpsCode')} value={formData.contractColf.inpsCode  || ''} />
          <Field label={t('contract.contract.fields.paymentMethod')} value={formData.contractColf.paymentMethod} />
          {formData.contractColf.iban && (
            <Field label={t('contract.contract.fields.iban')} value={formData.contractColf.iban} />
          )}
        </div>
      </Section>

      <Section title={t('contract.review.sections.schedule')}>
        <div className="space-y-4">
          <Field label={t('contract.schedule.fields.totalWeeklyHours')} value={formData.workSchedule.weeklyHours} />
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">{t('contract.schedule.sections.dailySchedule')}</h3>
            {Object.entries(formData.workSchedule.schedule).map(([day, schedule]) => (
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
                            {breakItem.startTime} - {breakItem.endTime}
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
            <Field label={t('contract.schedule.fields.holidayWork')} value={formData.workSchedule.holidayWork} />
            {formData.workSchedule.holidayWork && (
              <Field label={t('contract.schedule.fields.holidayCompensation')} value={formData.workSchedule.holidayCompensation} />
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <Field label={t('contract.schedule.fields.nightShift')} value={formData.workSchedule.nightShift} />
            {formData.workSchedule.nightShift && (
              <div className="grid grid-cols-2 gap-4">
                <Field label={t('contract.schedule.fields.nightShiftStart')} value={formData.workSchedule.nightShiftStartTime} />
                <Field label={t('contract.schedule.fields.nightShiftEnd')} value={formData.workSchedule.nightShiftEndTime} />
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
            <h3 className="text-sm font-medium text-gray-900 mb-3">{t('contract.salary.fields.mealAllowance.title')}</h3>
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

      {/* Workplace Location Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {t('contract.workplace.title')}
        </h3>
        <div className="bg-white shadow rounded-lg p-6">
          {formData.workplaceLocation?.isEmployerAddress ? (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                {t('contract.workplace.useEmployerAddress')}
              </p>
              <Field
                label={t('contract.workplace.careOf')}
                value={formData.workplaceLocation.careOf}
              />
              <Field
                label={t('contract.workplace.streetAddress')}
                value={formData.workplaceLocation.streetAddress}
              />
              <Field
                label={t('contract.workplace.city')}
                value={formData.workplaceLocation.city}
              />
              <Field
                label={t('contract.workplace.postalCode')}
                value={formData.workplaceLocation.postalCode}
              />
              <Field
                label={t('contract.workplace.province')}
                value={formData.workplaceLocation.province}
              />
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                {t('contract.workplace.usingCustomAddress')}
              </p>
              <Field
                label={t('contract.workplace.careOf')}
                value={formData.workplaceLocation?.careOf || ''}
              />
              <Field
                label={t('contract.workplace.streetAddress')}
                value={formData.workplaceLocation?.streetAddress || ''}
              />
              <Field
                label={t('contract.workplace.city')}
                value={formData.workplaceLocation?.city || ''}
              />
              <Field
                label={t('contract.workplace.postalCode')}
                value={formData.workplaceLocation?.postalCode || ''}
              />
              <Field
                label={t('contract.workplace.province')}
                value={formData.workplaceLocation?.province || ''}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={onClick}
        >
          <Check
          className="w-4 h-4 mr-2" />
          {t('contract.review.actions.submitContract')}
        </button>
      </div>
    </div>
  )
}

export default ReviewForm