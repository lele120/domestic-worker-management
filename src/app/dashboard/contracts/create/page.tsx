'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import WorkflowSteps from '@/components/shared/WorkflowSteps';
import ContractForm from '@/components/features/contracts/ContractForm';
import ScheduleForm from '@/components/features/contracts/ScheduleForm';
import SalaryForm from '@/components/features/contracts/SalaryForm';
import AdvancedSettingsForm from '@/components/features/contracts/AdvancedSettingsForm';
import ReviewForm from '@/components/features/contracts/ReviewForm';
import EmployerWorkerSelector from '@/components/features/contracts/EmployerWorkerSelector';
import SelectedEmployerWorker from '@/components/features/contracts/SelectedEmployerWorker';
import { getWorkers } from '@/app/api/auth/worker.service';
import { getEmployers } from '@/app/api/auth/employer.service';
import { useSession } from 'next-auth/react';
import { CreateEmployer } from '@/types/employer.types';
import {CreateWorkerResponse} from '@/types/worker.types';
import { ContractColfValidation, CreateContractColf } from '@/types/contract.types';

interface WorkplaceLocation {
  careOf: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  province: string;
  isEmployerAddress: boolean;
}

interface WorkplaceLocationErrors {
  careOf?: string;
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  province?: string;
}

const CreateContract: React.FC = () => {
  const  t  = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);
  const { data: session } = useSession();
  const [selectedEmployer, setSelectedEmployer] = useState<CreateEmployer | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<CreateWorkerResponse | null>(null);
  const [showSelector, setShowSelector] = useState(false);
  const [employers, setEmployers] = useState<CreateEmployer[]>([]);
  const [workers, setWorkers] = useState<CreateWorkerResponse[]>([]);
  const [workplaceLocation, setWorkplaceLocation] = useState<WorkplaceLocation>({
    careOf: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    province: '',
    isEmployerAddress: false
  });
  const [workplaceLocationErrors, setWorkplaceLocationErrors] = useState<WorkplaceLocationErrors>({});

  useEffect(() => {
    const fetchData = async () => {
      const token = session?.user.accessToken as string;
      const result  = await getEmployers(token);
      if (result != undefined) {
        setEmployers(result);
      }
      const workers = await getWorkers(token);
      if (workers != undefined) {
        setWorkers(workers);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  const [formData, setFormData] = useState<CreateContractColf>({
    // Contract Information
    contractColf: {
      startDate: '',
      endDate: '',
      isTerminated: false,
      terminationReason: '',
      subCategory: '',
      level: '',
      qualityCertification: false,
      isLivingWithEmployer: false,
      isFixedTerm: false,
      fixedTermEndDate: '',
      fixedTermReason: '',
      inpsCode: '',
      paymentMethod: '',
      iban: ''
    },
    // Schedule Information
    workSchedule:{
      weeklyHours: 40,
      schedule: {
        monday: { enabled: true, startTime: '09:00', endTime: '17:00', breaks: [] },
        tuesday: { enabled: true, startTime: '09:00', endTime: '17:00', breaks: [] },
        wednesday: { enabled: true, startTime: '09:00', endTime: '17:00', breaks: [] },
        thursday: { enabled: true, startTime: '09:00', endTime: '17:00', breaks: [] },
        friday: { enabled: true, startTime: '09:00', endTime: '17:00', breaks: [] },
        saturday: { enabled: false, startTime: '09:00', endTime: '17:00', breaks: [] },
        sunday: { enabled: false, startTime: '09:00', endTime: '17:00', breaks: [] }
      },
      holidayWork: false,
      holidayCompensation: '',
      nightShift: false,
      nightShiftStartTime: '',
      nightShiftEndTime: '',
      holidayAccrualType: 'hours',
      patronSaintDay: '',
      manualSeniorityManagement: false,
      accruedSeniority: 0,
      lastSeniorityDate: '',
      nextSeniorityDate: '',
      trialPeriodEnabled: false,
      trialPeriodDays: 8,
      includeNoticePeriod: false,
      includeSpecialNotice: false
    },
    // Salary Information
    salary: {
      basePay: 0,
      functionAllowance: 0,
      customItems: [],
      overtimeAllowance: 0,
      nonAutomaticAllowance: 0,
      futureIncrements: 0,
      childrenAllowance: 0,
      includeHolidayPay: true,
      include13thMonth: true,
      includeSeverancePay: true,
      mealAllowance: {
        breakfast: 0,
        lunch: 0,
        dinner: 0
      },
      accommodationAllowance: 0,
      inKindBenefits: false
    },

    // Advanced Settings
    advancedSettings: {
      payHolidaysMonthly: true,
      pay13thMonthly: true,
      payTFRMonthly: true,
      monthlyPayment: false,
      monthlyBonus: false,
      noWorkerContributions: false,
      noCassaColf: false
    }
  });

  const [errors, setErrors] = useState<Partial<ContractColfValidation>>({});

  function validateForm() : boolean {
    const newErrors: Partial<ContractColfValidation> = {};
    
    if (!selectedEmployer) newErrors.employerId = t('contract.create.validation.employerId.required');
    if (!selectedWorker) newErrors.workerId = t('contract.create.validation.workerId.required');
    
    if (!workplaceLocation.isEmployerAddress) {
        if (!workplaceLocation.streetAddress) newErrors.streetAddress = t('contract.create.validation.workplaceLocation.streetAddress.required');
        if (!workplaceLocation.city) newErrors.city = t('contract.create.validation.workplaceLocation.city.required');
        if (!workplaceLocation.postalCode) newErrors.postalCode = t('contract.create.validation.workplaceLocation.postalCode.required');
        if (!workplaceLocation.province) newErrors.province = t('contract.create.validation.workplaceLocation.province.required');
    }
    
    if (!formData.contractColf.startDate) newErrors.startDate = t('contract.create.validation.contractColf.startDate.required');
    if (formData.contractColf.isTerminated && !formData.contractColf.endDate) newErrors.endDate = t('contract.create.validation.contractColf.endDate.required');
    if (formData.contractColf.isTerminated && !formData.contractColf.terminationReason) newErrors.terminationReason = t('contract.create.validation.contractColf.terminationReason.required');
    if (!formData.contractColf.subCategory) newErrors.subCategory = t('contract.create.validation.contractColf.subCategory.required');
    if (!formData.contractColf.level) newErrors.level = t('contract.create.validation.contractColf.level.required');
    
    if (!formData.workSchedule.weeklyHours) newErrors.weeklyHours = t('contract.create.validation.workSchedule.weeklyHours.required');
    if (formData.workSchedule.nightShift && !formData.workSchedule.nightShiftStartTime) newErrors.nightShiftStartTime = t('contract.create.validation.workSchedule.nightShiftStartTime.required');
    if (formData.workSchedule.nightShift && !formData.workSchedule.nightShiftEndTime) newErrors.nightShiftEndTime = t('contract.create.validation.workSchedule.nightShiftEndTime.required');

    if (formData.salary.basePay === undefined || formData.salary.basePay === null || formData.salary.basePay < 0) 
        newErrors.basePay = t('contract.create.validation.salary.basePay.required');
    if (formData.salary.functionAllowance === undefined || formData.salary.functionAllowance === null || formData.salary.functionAllowance < 0) 
        newErrors.functionAllowance = t('contract.create.validation.salary.functionAllowance.required');
    if (formData.salary.overtimeAllowance === undefined || formData.salary.overtimeAllowance === null || formData.salary.overtimeAllowance < 0) 
        newErrors.overtimeAllowance = t('contract.create.validation.salary.overtimeAllowance.required');
    if (formData.salary.nonAutomaticAllowance === undefined || formData.salary.nonAutomaticAllowance === null || formData.salary.nonAutomaticAllowance < 0) 
        newErrors.nonAutomaticAllowance = t('contract.create.validation.salary.nonAutomaticAllowance.required');
    if (formData.salary.futureIncrements === undefined || formData.salary.futureIncrements === null || formData.salary.futureIncrements < 0) 
        newErrors.futureIncrements = t('contract.create.validation.salary.futureIncrements.required');
    if (formData.salary.childrenAllowance === undefined || formData.salary.childrenAllowance === null || formData.salary.childrenAllowance < 0) 
        newErrors.childrenAllowance = t('contract.create.validation.salary.childrenAllowance.required');
    
    if (formData.salary.mealAllowance.breakfast === undefined || formData.salary.mealAllowance.breakfast === null || formData.salary.mealAllowance.breakfast < 0) 
        newErrors.breakfast = t('contract.create.validation.salary.mealAllowance.breakfast.required');
    if (formData.salary.mealAllowance.lunch === undefined || formData.salary.mealAllowance.lunch === null || formData.salary.mealAllowance.lunch < 0) 
        newErrors.lunch = t('contract.create.validation.salary.mealAllowance.lunch.required');
    if (formData.salary.mealAllowance.dinner === undefined || formData.salary.mealAllowance.dinner === null || formData.salary.mealAllowance.dinner < 0) 
        newErrors.dinner = t('contract.create.validation.salary.mealAllowance.dinner.required');
    
    if (formData.salary.accommodationAllowance === undefined || formData.salary.accommodationAllowance === null || formData.salary.accommodationAllowance < 0) 
        newErrors.accommodationAllowance = t('contract.create.validation.salary.accommodationAllowance.required');
    
    if (!formData.advancedSettings.payHolidaysMonthly) newErrors.payHolidaysMonthly = t('contract.create.validation.advancedSettings.payHolidaysMonthly.required');
    if (!formData.advancedSettings.pay13thMonthly) newErrors.pay13thMonthly = t('contract.create.validation.advancedSettings.pay13thMonthly.required');
    if (!formData.advancedSettings.payTFRMonthly) newErrors.payTFRMonthly = t('contract.create.validation.advancedSettings.payTFRMonthly.required');
    
    if (formData.workSchedule.holidayWork && !formData.workSchedule.holidayCompensation) 
        newErrors.holidayCompensation = t('contract.create.validation.workSchedule.holidayCompensation.required');
    
    if (formData.workSchedule.manualSeniorityManagement) {
        if (!formData.workSchedule.accruedSeniority) 
            newErrors.accruedSeniority = t('contract.create.validation.workSchedule.accruedSeniority.required');
        if (!formData.workSchedule.lastSeniorityDate) 
            newErrors.lastSeniorityDate = t('contract.create.validation.workSchedule.lastSeniorityDate.required');
        if (!formData.workSchedule.nextSeniorityDate) 
            newErrors.nextSeniorityDate = t('contract.create.validation.workSchedule.nextSeniorityDate.required');
    }

    if (formData.workSchedule.trialPeriodEnabled && !formData.workSchedule.trialPeriodDays) 
        newErrors.trialPeriodDays = t('contract.create.validation.workSchedule.trialPeriodDays.required');

    setErrors(newErrors);
    console.log('Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleChange = (name: string, value: string | number | boolean | object) => {
    setFormData(prev => {
      if (name.includes('.')) {
        const [parent, child, third] = name.split('.');
        // Type guard to ensure parent is a valid key
        if (parent && child && parent in prev) {
          const parentKey = parent as keyof CreateContractColf;
          if (third) {
            return {
              ...prev,
              [parentKey]: {
                ...(typeof prev[parentKey] === 'object' ? prev[parentKey] : {}),
                [child]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ...(prev[parentKey] as any)[child],
                  [third]: value
                }
              }
            };
          }
          return {
            ...prev,
            [parentKey]: {
              ...(typeof prev[parentKey] === 'object' ? prev[parentKey] : {}),
              [child]: value
            }
          };
        }
      }
      // For top-level properties
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSelectEmployer = () => {
    setShowSelector(true);
  };

  const handleSelectWorker = () => {
    if (selectedEmployer) {
      setShowSelector(true);
    }
  };

  const handleEmployerSelection = (employerId: number) => {
    const employer = employers.find(emp => emp.id === employerId);
    if (employer) {
      setSelectedEmployer(employer);
    }
    setSelectedWorker(null);
  };

  const handleWorkerSelection = (workerId: number) => {
    if (selectedEmployer) {
      const worker = workers.find((w) => w.id === workerId);
      if (worker) {
        setSelectedWorker(worker);
      }
    }
  };

  const validateWorkplaceLocation = () => {
    if (workplaceLocation.isEmployerAddress) {
      setWorkplaceLocationErrors({});
      return true;
    }

    const newErrors: WorkplaceLocationErrors = {};
    
    if (!workplaceLocation.streetAddress) {
      newErrors.streetAddress = t('validation.required');
    }
    if (!workplaceLocation.city) {
      newErrors.city = t('validation.required');
    }
    if (!workplaceLocation.postalCode) {
      newErrors.postalCode = t('validation.required');
    }
    if (!workplaceLocation.province) {
      newErrors.province = t('validation.required');
    }

    setWorkplaceLocationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWorkplaceLocationChange = (location: WorkplaceLocation) => {
    setWorkplaceLocation(location);
    if (!location.isEmployerAddress) {
      validateWorkplaceLocation();
    } else {
      setWorkplaceLocationErrors({});
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Close the selector if it's open when changing tabs
    if (showSelector) {
      setShowSelector(false);
    }
    setCurrentStep(stepIndex);
  };

  const steps = [
    { id: 'association', title: t('contract.steps.association') },
    { id: 'contract', title: t('contract.steps.contract') },
    { id: 'schedule', title: t('contract.steps.schedule') },
    { id: 'salary', title: t('contract.steps.salary') },
    { id: 'advanced', title: t('contract.steps.advanced') },
    { id: 'review', title: t('contract.steps.review') }
  ];

  const renderStepContent = () => {
    if (showSelector) {
      return (
        <EmployerWorkerSelector
          employers={employers}
          workers={workers}
          selectedEmployerId={selectedEmployer?.id ?? null}
          selectedWorkerId={selectedWorker ? selectedWorker.id : null}
          onEmployerSelect={handleEmployerSelection}
          onWorkerSelect={handleWorkerSelection}
          onClose={() => setShowSelector(false)}
          workplaceLocation={workplaceLocation}
          onWorkplaceLocationChange={handleWorkplaceLocationChange}
        />
      );
    }

    switch (currentStep) {
      case 0:
        return (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.association.title')}</h2>
            <p className="text-gray-500 mb-6">{t('contract.association.subtitle')}</p>
            
            <div className="space-y-8">
              <SelectedEmployerWorker
                employer={selectedEmployer}
                worker={selectedWorker}
                onSelectEmployer={handleSelectEmployer}
                onSelectWorker={handleSelectWorker}
              />

              {/* Workplace Location Section */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {t('contract.workplace.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isEmployerAddress"
                      name="isEmployerAddress"
                      checked={workplaceLocation.isEmployerAddress}
                      onChange={(e) => handleWorkplaceLocationChange({
                        ...workplaceLocation,
                        isEmployerAddress: e.target.checked,
                        ...(e.target.checked && selectedEmployer ? {
                          careOf: selectedEmployer.company || '',
                          streetAddress: selectedEmployer.address || '',
                          city: selectedEmployer.city || '',
                          postalCode: selectedEmployer.zipCode || '',
                          province: selectedEmployer.province || ''
                        } : {})
                      })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isEmployerAddress" className="ml-2 block text-sm text-gray-900">
                      {workplaceLocation.isEmployerAddress 
                        ? "In busta paga utilizza l'indirizzo del datore di lavoro"
                        : "In busta paga utilizza l'informazione mostrata di seguito"}
                    </label>
                  </div>

                  {!workplaceLocation.isEmployerAddress && (
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="careOf" className="block text-sm font-medium text-gray-700">
                          {t('contract.workplace.careOf')}
                        </label>
                        <input
                          type="text"
                          name="careOf"
                          id="careOf"
                          value={workplaceLocation.careOf}
                          onChange={(e) => handleWorkplaceLocationChange({
                            ...workplaceLocation,
                            careOf: e.target.value
                          })}
                          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                            workplaceLocationErrors.careOf ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {workplaceLocationErrors.careOf && (
                          <p className="mt-1 text-sm text-red-600">{workplaceLocationErrors.careOf}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                          {t('contract.workplace.streetAddress')} *
                        </label>
                        <input
                          type="text"
                          name="streetAddress"
                          id="streetAddress"
                          value={workplaceLocation.streetAddress}
                          onChange={(e) => handleWorkplaceLocationChange({
                            ...workplaceLocation,
                            streetAddress: e.target.value
                          })}
                          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                            workplaceLocationErrors.streetAddress ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {workplaceLocationErrors.streetAddress && (
                          <p className="mt-1 text-sm text-red-600">{workplaceLocationErrors.streetAddress}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            {t('contract.workplace.city')} *
                          </label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            value={workplaceLocation.city}
                            onChange={(e) => handleWorkplaceLocationChange({
                              ...workplaceLocation,
                              city: e.target.value
                            })}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                              workplaceLocationErrors.city ? 'border-red-300' : 'border-gray-300'
                            }`}
                          />
                          {workplaceLocationErrors.city && (
                            <p className="mt-1 text-sm text-red-600">{workplaceLocationErrors.city}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                            {t('contract.workplace.postalCode')} *
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            value={workplaceLocation.postalCode}
                            onChange={(e) => handleWorkplaceLocationChange({
                              ...workplaceLocation,
                              postalCode: e.target.value
                            })}
                            className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                              workplaceLocationErrors.postalCode ? 'border-red-300' : 'border-gray-300'
                            }`}
                          />
                          {workplaceLocationErrors.postalCode && (
                            <p className="mt-1 text-sm text-red-600">{workplaceLocationErrors.postalCode}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                          {t('contract.workplace.province')} *
                        </label>
                        <input
                          type="text"
                          name="province"
                          id="province"
                          value={workplaceLocation.province}
                          onChange={(e) => handleWorkplaceLocationChange({
                            ...workplaceLocation,
                            province: e.target.value
                          })}
                          maxLength={2}
                          className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                            workplaceLocationErrors.province ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {workplaceLocationErrors.province && (
                          <p className="mt-1 text-sm text-red-600">{workplaceLocationErrors.province}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <ContractForm
            formData={formData}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <ScheduleForm
            formData={formData}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <SalaryForm
            formData={formData}
            onChange={handleChange}
          />
        );
      case 4:
        return (
          <AdvancedSettingsForm
            formData={formData}
            onChange={handleChange}
          />
        );
      case 5:
        return (
          <ReviewForm
            formData={{
                ...formData,
                workplaceLocation: workplaceLocation.isEmployerAddress ? {
                    careOf: selectedEmployer?.company || '',
                    streetAddress: selectedEmployer?.address || '',
                    city: selectedEmployer?.city || '',
                    postalCode: selectedEmployer?.zipCode || '',
                    province: selectedEmployer?.province || '',
                    isEmployerAddress: true
                } : workplaceLocation
            }}
            validateForm={validateForm}
            errors={errors}
            employer={selectedEmployer}
            worker={selectedWorker}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('contract.title')}</h1>
        <p className="mt-1 text-gray-500">{t('contract.subtitle')}</p>
      </div>

      <div className="mb-8">
        <WorkflowSteps
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-6">
          {renderStepContent()}
        </div>

        {!showSelector && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg flex justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={currentStep === 0}
            >
              {t('common.previous')}
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              {currentStep === steps.length - 1 ? t('common.submit') : t('common.next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateContract;