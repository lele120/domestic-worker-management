'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { 
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Download,
  Edit,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Coffee,
  User,
  Building,
  ArrowLeft
} from 'lucide-react';

// Mock data - in a real app this would come from an API
const mockContract = {
  id: "CON-2024-001",
  status: "Active",
  startDate: "2024-01-15",
  endDate: "2025-01-14",
  type: "Full-time",
  level: "Level B Super",
  employer: {
    id: 1,
    name: "Robert Anderson",
    company: "Anderson Enterprises",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  worker: {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  schedule: {
    weeklyHours: 40,
    days: {
      monday: { enabled: true, startTime: "09:00", endTime: "17:00", breaks: [{ startTime: "13:00", duration: 60 }] },
      tuesday: { enabled: true, startTime: "09:00", endTime: "17:00", breaks: [{ startTime: "13:00", duration: 60 }] },
      wednesday: { enabled: true, startTime: "09:00", endTime: "17:00", breaks: [{ startTime: "13:00", duration: 60 }] },
      thursday: { enabled: true, startTime: "09:00", endTime: "17:00", breaks: [{ startTime: "13:00", duration: 60 }] },
      friday: { enabled: true, startTime: "09:00", endTime: "17:00", breaks: [{ startTime: "13:00", duration: 60 }] }
    },
    holidayWork: true,
    holidayCompensation: "paid",
    nightShift: false
  },
  salary: {
    basePay: 1500,
    functionAllowance: 200,
    overtimeAllowance: 15,
    mealAllowance: {
      breakfast: 5,
      lunch: 8,
      dinner: 8
    },
    accommodationAllowance: 300,
    include13thMonth: true,
    includeHolidayPay: true,
    includeSeverancePay: true
  },
  documents: [
    { id: 1, name: "Contract Agreement", date: "2024-01-15", type: "PDF" },
    { id: 2, name: "Work Schedule", date: "2024-01-15", type: "PDF" },
    { id: 3, name: "Salary Details", date: "2024-01-15", type: "PDF" }
  ]
};

export default function ContractDetailsPage() {
  //const { t } = useTranslations();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Contracts
        </button>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contract Details</h1>
            <p className="text-gray-500 mt-1">Contract ID: {mockContract.id}</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Contract
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-8">
          {/* Contract Parties */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contract Parties</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Building className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Employer</p>
                    <div className="flex items-center mt-1">
                        <Image  
                            src={mockContract.employer.image}
                            alt={mockContract.employer.name}
                            className="w-8 h-8 rounded-full object-cover"
                            width={50}
                            height={50}
                        >
                        </Image>
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">{mockContract.employer.name}</p>
                        <p className="text-sm text-gray-500">{mockContract.employer.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Worker</p>
                    <div className="flex items-center mt-1">
                        <Image 
                            src={mockContract.worker.image}
                            alt={`${mockContract.worker.firstName} ${mockContract.worker.lastName}`}
                            className="w-8 h-8 rounded-full object-cover"
                            width={50}
                            height={50}
                        >
                        </Image>
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">
                          {mockContract.worker.firstName} {mockContract.worker.lastName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Work Schedule</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Weekly Hours</span>
                <span className="text-sm font-medium text-gray-900">{mockContract.schedule.weeklyHours} hours</span>
              </div>
              
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(mockContract.schedule.days).map(([day, schedule]) => (
                  schedule.enabled && (
                    <div key={day} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 capitalize mb-1">{day}</p>
                      <p className="text-sm text-gray-600">
                        {schedule.startTime} - {schedule.endTime}
                      </p>
                      {schedule.breaks.map((breakTime, index) => (
                        <div key={index} className="mt-2 flex items-center text-xs text-gray-500">
                          <Coffee className="w-3 h-3 mr-1" />
                          <span>{breakTime.startTime} ({breakTime.duration}min)</span>
                        </div>
                      ))}
                    </div>
                  )
                ))}
              </div>

              <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  {mockContract.schedule.holidayWork ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className="text-sm text-gray-600">Holiday Work</span>
                </div>
                <div className="flex items-center">
                  {mockContract.schedule.nightShift ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  )}
                  <span className="text-sm text-gray-600">Night Shift</span>
                </div>
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Compensation</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Base Pay</p>
                  <p className="text-lg font-medium text-gray-900 mt-1">
                    {formatCurrency(mockContract.salary.basePay)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Function Allowance</p>
                  <p className="text-lg font-medium text-gray-900 mt-1">
                    {formatCurrency(mockContract.salary.functionAllowance)}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Allowances</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Breakfast</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {formatCurrency(mockContract.salary.mealAllowance.breakfast)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Lunch</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {formatCurrency(mockContract.salary.mealAllowance.lunch)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dinner</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {formatCurrency(mockContract.salary.mealAllowance.dinner)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Benefits</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center">
                    {mockContract.salary.includeHolidayPay ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    )}
                    <span className="text-sm text-gray-600">Holiday Pay</span>
                  </div>
                  <div className="flex items-center">
                    {mockContract.salary.include13thMonth ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    )}
                    <span className="text-sm text-gray-600">13th Month</span>
                  </div>
                  <div className="flex items-center">
                    {mockContract.salary.includeSeverancePay ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mr-2" />
                    )}
                    <span className="text-sm text-gray-600">Severance Pay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Contract Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contract Status</h2>
            <div className="space-y-4">
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(mockContract.status)}`}>
                  {mockContract.status}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Start Date</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(mockContract.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">End Date</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(mockContract.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Documents</h2>
            <div className="space-y-3">
              {mockContract.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(doc.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}