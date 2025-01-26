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
import { _CreateEmployer } from '@/types/employer.types';
import {CreateWorkerResponse} from '@/types/worker.types';
import { ContractColfValidation, CreateContractColf } from '@/types/contract.types';
import { set } from 'zod';

const CreateContract: React.FC = () => {
  const  t  = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);
  const { data: session } = useSession();
  const [selectedEmployer, setSelectedEmployer] = useState<_CreateEmployer | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<CreateWorkerResponse | null>(null);
  const [showSelector, setShowSelector] = useState(false);
  const [employers, setEmployers] = useState<_CreateEmployer[]>([]);
  const [workers, setWorkers] = useState<CreateWorkerResponse[]>([]);

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
    },
    // Salary Information
    salary: {
      basePay: 0,
      functionAllowance: 0,
      customItems: [],
      overtimeAllowance: 0,
      nonAutomaticAllowance: 0,
      futureIncrements: 0,
      nonAutomaticPersonalAllowance: 0,
      childrenAllowance: 0,
      qualityCertificationAllowance: 0,
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

  function validateForm() {
     const newErrors: Partial<ContractColfValidation> = {};
        
        if (!formData.employerId) newErrors.employerId = t('contract.create.validation.employerId.required');
        if (!formData.workerId) newErrors.workerId = t('contract.create.validation.workerId.required');
        
        if (!formData.contractColf.startDate) newErrors.startDate = t('contract.create.validation.contractColf.startDate.required')
        if (formData.contractColf.isTerminated && !formData.contractColf.endDate) newErrors.endDate = t('contract.create.validation.contractColf.endDate.required')
        if (formData.contractColf.isTerminated && !formData.contractColf.terminationReason) newErrors.terminationReason = t('contract.create.validation.contractColf.terminationReason.required')
        if (!formData.contractColf.subCategory) newErrors.subCategory = t('contract.create.validation.contractColf.subCategory.required')
        if (!formData.contractColf.level) newErrors.level = t('contract.create.validation.contractColf.level.required')
        
        if (!formData.workSchedule.weeklyHours) newErrors.weeklyHours = t('contract.create.validation.workSchedule.weeklyHours.required')
        if (formData.workSchedule.nightShift && !formData.workSchedule.nightShiftStartTime) newErrors.nightShiftStartTime = t('contract.create.validation.workSchedule.nightShiftStartTime.required')
        if (formData.workSchedule.nightShift && !formData.workSchedule.nightShiftEndTime) newErrors.nightShiftEndTime = t('contract.create.validation.workSchedule.nightShiftEndTime.required')

        if (!formData.salary.basePay) newErrors.basePay = t('contract.create.validation.salary.basePay.required')
        if (!formData.salary.functionAllowance) newErrors.functionAllowance = t('contract.create.validation.salary.functionAllowance.required')
        if (!formData.salary.overtimeAllowance) newErrors.overtimeAllowance = t('contract.create.validation.salary.overtimeAllowance.required')
        if (!formData.salary.nonAutomaticAllowance) newErrors.nonAutomaticAllowance = t('contract.create.validation.salary.nonAutomaticAllowance.required')
        if (!formData.salary.futureIncrements) newErrors.futureIncrements = t('contract.create.validation.salary.futureIncrements.required')
        if (!formData.salary.nonAutomaticPersonalAllowance) newErrors.nonAutomaticPersonalAllowance = t('contract.create.validation.salary.nonAutomaticPersonalAllowance.required')
        if (!formData.salary.childrenAllowance) newErrors.childrenAllowance = t('contract.create.validation.salary.childrenAllowance.required')
        if (!formData.salary.qualityCertificationAllowance) newErrors.qualityCertificationAllowance = t('contract.create.validation.salary.qualityCertificationAllowance.required')
        
        if (!formData.salary.mealAllowance.breakfast) newErrors.breakfast = t('contract.create.validation.salary.mealAllowance.breakfast.required')
        if (!formData.salary.mealAllowance.lunch) newErrors.lunch = t('contract.create.validation.salary.mealAllowance.lunch.required')
        if (!formData.salary.mealAllowance.dinner) newErrors.dinner = t('contract.create.validation.salary.mealAllowance.dinner.required')
        if (!formData.salary.accommodationAllowance) newErrors.accommodationAllowance = t('contract.create.validation.salary.accommodationAllowance.required')
        
        if (!formData.advancedSettings.payHolidaysMonthly) newErrors.payHolidaysMonthly = t('contract.create.validation.advancedSettings.payHolidaysMonthly.required')
        if (!formData.advancedSettings.pay13thMonthly) newErrors.pay13thMonthly = t('contract.create.validation.advancedSettings.pay13thMonthly.required')
        if (!formData.advancedSettings.payTFRMonthly) newErrors.payTFRMonthly = t('contract.create.validation.advancedSettings.payTFRMonthly.required')
        if (!formData.advancedSettings.monthlyPayment) newErrors.monthlyPayment = t('contract.create.validation.advancedSettings.monthlyPayment.required')
        if (!formData.advancedSettings.monthlyBonus) newErrors.monthlyBonus = t('contract.create.validation.advancedSettings.monthlyBonus.required')
        if (!formData.advancedSettings.noWorkerContributions) newErrors.noWorkerContributions = t('contract.create.validation.advancedSettings.noWorkerContributions.required')
        if (!formData.advancedSettings.noCassaColf) newErrors.noCassaColf = t('contract.create.validation.advancedSettings.noCassaColf.required')
        
        setErrors(newErrors);
  }

  const handleChange = (name: string, value: string | number | boolean | object) => {
    setFormData(prev => {
      // If the name includes a dot, it means it's a nested property
      console.log(name, value);
      if (name.includes('.')) {
        const [parent, child, third] = name.split('.');
        if (third) {
          return {
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: {
                ...prev[parent][child],
                [third]: value
              }
            }
          };
        }
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
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
        />
      );
    }

    switch (currentStep) {
      case 0:
        return (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t('contract.association.title')}</h2>
            <p className="text-gray-500 mb-6">{t('contract.association.subtitle')}</p>
            <SelectedEmployerWorker
              employer={selectedEmployer}
              worker={selectedWorker}
              onSelectEmployer={handleSelectEmployer}
              onSelectWorker={handleSelectWorker}
            />
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
            formData={formData}
            validateForm={validateForm}
            errors={errors}
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
          onStepClick={setCurrentStep}
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