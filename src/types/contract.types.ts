import { UUID } from "crypto";

export interface Break {
    startTime: string;
    endTime: string;
    duration?: number;
}

export interface Schedule {
  restDay: string;
  secondRestDay?: string;
  holidayAccrualType: 'days' | 'hours' | 'proportional';
  patronSaintDay?: string;
  manualSeniorityManagement: boolean;
  accruedSeniority?: number;
  lastSeniorityDate?: string;
  nextSeniorityDate?: string;
}

export interface ContractColf {
    startDate: string;
    endDate: string;
    isTerminated: boolean;
    terminationReason: string;
    subCategory: string;
    level: string;
    qualityCertification: boolean;
    isLivingWithEmployer: boolean;
    isFixedTerm: boolean;
    fixedTermEndDate: string;
    fixedTermReason: string;
    inpsCode?: string | null;
    paymentMethod: string;
    iban?: string | null;
    schedule?: Schedule;
    trialPeriodEnabled?: boolean;
    trialPeriodDays?: number;
    includeNoticePeriod?: boolean;
    includeSpecialNotice?: boolean;
    childrenUnder6Allowance?: boolean;
    isFamilyMember?: boolean;
    familyRelationship?: string;
}

export interface DailySchedule {
    enabled: boolean
    startTime: string
    endTime: string
    breaks: Break[]
  }

export interface WorkSchedule {
    weeklyHours: number;
    schedule: {
        [key: string]: DailySchedule
    }
    holidayWork: boolean;
    holidayCompensation: string;
    holidayAccrualType?: 'days' | 'hours' | 'proportional';
    patronSaintDay?: string;
    manualSeniorityManagement?: boolean;
    accruedSeniority?: number;
    lastSeniorityDate?: string;
    nextSeniorityDate?: string;
    nightShift: boolean;
    nightShiftStartTime: string;
    nightShiftEndTime: string;
    trialPeriodEnabled?: boolean;
    trialPeriodDays?: number;
    includeNoticePeriod?: boolean;
    includeSpecialNotice?: boolean;
}

export interface Salary {
    basePay: number;
    functionAllowance: number;
    customItems: [];
    overtimeAllowance: number;
    nonAutomaticAllowance: number;
    futureIncrements: number;
    childrenAllowance: number;
    includeHolidayPay: boolean;
    include13thMonth: boolean;
    includeSeverancePay: boolean;
    mealAllowance: {
      breakfast: number;
      lunch: number;
      dinner: number;
    };
    accommodationAllowance: number;
    inKindBenefits: boolean;
}

export interface AdvancedSettings {
    payHolidaysMonthly: boolean;
    pay13thMonthly: boolean;
    payTFRMonthly: boolean;
    monthlyPayment: boolean;
    monthlyBonus: boolean;
    noWorkerContributions: boolean;
    noCassaColf: boolean
}

export interface WorkplaceLocation {
    careOf: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    province: string;
    isEmployerAddress: boolean;
}


export interface CreateContractColf {
    id?: UUID;
    employerId?: number;
    workerId?: number;
    contractColf: ContractColf;
    workSchedule: WorkSchedule;
    salary: Salary;
    advancedSettings: AdvancedSettings;
    workplaceLocation?: WorkplaceLocation;
}

export interface ContractColfValidation {
    employerId: string;
    workerId: string;
    startDate: string;
    endDate: string;
    isTerminated: string;
    terminationReason: string;
    subCategory: string;
    level: string;
    qualityCertification: string;
    isLivingWithEmployer: string;
    isFixedTerm: string;
    fixedTermEndDate: string;
    fixedTermReason: string;
    weeklyHours: string;
    holidayWork: string;
    holidayCompensation: string;
    nightShift: string;
    nightShiftStartTime: string;
    nightShiftEndTime: string;
    holidayAccrualType: string;
    patronSaintDay: string;
    manualSeniorityManagement: string;
    accruedSeniority: string;
    lastSeniorityDate: string;
    nextSeniorityDate: string;
    trialPeriodEnabled: string;
    trialPeriodDays: string;
    includeNoticePeriod: string;
    includeSpecialNotice: string;
    basePay: string;
    functionAllowance: string;
    overtimeAllowance: string;
    nonAutomaticAllowance: string;
    futureIncrements: string;
    nonAutomaticPersonalAllowance: string;
    childrenAllowance: string;
    includeHolidayPay: string;
    include13thMonth: string;
    includeSeverancePay: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    accommodationAllowance: string;
    inKindBenefits: string;
    payHolidaysMonthly: string;
    pay13thMonthly: string;
    payTFRMonthly: string;
    monthlyPayment: string;
    monthlyBonus: string;
    noWorkerContributions: string;
    noCassaColf: string;
    streetAddress?: string;
    city?: string;
    postalCode?: string;
    province?: string;
    childrenUnder6Allowance: string;
    isFamilyMember: string;
    familyRelationship: string;
}