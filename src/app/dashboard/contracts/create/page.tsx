'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import WorkflowSteps from '@/components/shared/WorkflowSteps';
import ContractForm from '@/components/features/contracts/ContractForm';
import ScheduleForm from '@/components/features/contracts/ScheduleForm';
import SalaryForm from '@/components/features/contracts/SalaryForm';
import AdvancedSettingsForm from '@/components/features/contracts/AdvancedSettingsForm';
import ReviewForm from '@/components/features/contracts/ReviewForm';
import EmployerWorkerSelector from '@/components/features/contracts/EmployerWorkerSelector';
import SelectedEmployerWorker from '@/components/features/contracts/SelectedEmployerWorker';

// Mock data for demonstration
const mockEmployers = [
  {
    id: 1,
    name: "Robert Anderson",
    company: "Anderson Enterprises",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    workers: [
      {
        id: 1,
        firstName: "Sarah",
        lastName: "Johnson",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
      }
    ]
  },
  {
    id: 2,
    name: "Elena Martinez",
    company: "Martinez Family Office",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    workers: [
      {
        id: 2,
        firstName: "Michael",
        lastName: "Chen",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
      }
    ]
  }
];

interface CreateContractProps {
  onNavigate?: (page: string) => void;
}

const CreateContract: React.FC<CreateContractProps> = ({ onNavigate }) => {
  const  t  = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);
  interface Employer {
    id: number;
    name: string;
    company: string;
    image: string;
    workers: Worker[];
  }

  interface Worker {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
  }

  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [showSelector, setShowSelector] = useState(false);
  
  const [formData, setFormData] = useState({
    // Contract Information
    startDate: '',
    endDate: '',
    terminationReason: '',
    contractType: '',
    level: '',
    qualityCertification: false,
    isLivingWithEmployer: false,
    isFixedTerm: false,
    fixedTermEndDate: '',
    fixedTermReason: '',

    // Schedule Information
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

  const handleChange = (name: string, value: string | number | boolean | object) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    const employer = mockEmployers.find(emp => emp.id === employerId);
    if (employer) {
      setSelectedEmployer(employer);
    }
    setSelectedWorker(null);
  };

  const handleWorkerSelection = (workerId: number) => {
    if (selectedEmployer) {
      const worker = selectedEmployer.workers.find((w: Worker) => w.id === workerId);
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
          employers={mockEmployers}
          selectedEmployerId={selectedEmployer ? selectedEmployer.id : null}
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
              onAddEmployer={() => onNavigate?.('create-employer')}
              onAddWorker={() => onNavigate?.('new-worker')}
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
            formData={formData.salary}
            onChange={(name: string, value: string | number | boolean | object) => handleChange(`salary.${name}`, value)}
          />
        );
      case 4:
        return (
          <AdvancedSettingsForm
            formData={formData.advancedSettings}
            onChange={(name: string, value: string | number | boolean) => handleChange(`advancedSettings.${name}`, value)}
          />
        );
      case 5:
        return (
          <ReviewForm
            formData={formData}
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