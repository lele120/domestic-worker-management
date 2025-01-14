'use client';

import React from 'react';
//import { useTranslation } from 'react-i18next';
import { 
  User,
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText,
  Clock,
  Briefcase,
  Download,
  Edit
} from 'lucide-react';

// Mock data - in a real app this would come from an API
const mockWorker = {
  id: 1,
  firstName: "Sarah",
  lastName: "Johnson",
  status: "Active",
  position: "Full-time Nanny",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  email: "sarah.j@example.com",
  phone: "+1 (555) 123-4567",
  mobile: "+1 (555) 987-6543",
  address: "123 Worker St",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  birthDate: "1990-05-15",
  nationality: "Italian",
  fiscalCode: "JHNSRH90E15H501X",
  startDate: "2023-01-15",
  documents: [
    { id: 1, name: "Work Permit", expiry: "2024-01-15", status: "Valid" },
    { id: 2, name: "ID Card", expiry: "2025-03-20", status: "Valid" },
    { id: 3, name: "Health Certificate", expiry: "2023-12-31", status: "Expiring Soon" }
  ],
  contracts: [
    {
      id: 1,
      employer: "Robert Anderson",
      employerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
      type: "Full-time",
      startDate: "2023-01-15",
      endDate: "2024-01-14",
      status: "Active"
    }
  ],
  schedule: {
    monday: { start: "09:00", end: "17:00" },
    tuesday: { start: "09:00", end: "17:00" },
    wednesday: { start: "09:00", end: "17:00" },
    thursday: { start: "09:00", end: "17:00" },
    friday: { start: "09:00", end: "17:00" }
  },
  skills: ["Child Care", "First Aid", "Cooking", "Light Housekeeping"],
  languages: ["English", "Italian", "Spanish"],
  certifications: [
    { name: "First Aid Certificate", issuer: "Red Cross", date: "2023-01-01" },
    { name: "Child Care Certification", issuer: "Care Institute", date: "2022-12-15" }
  ]
};

export default function WorkerProfilePage() {
  //const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expiring soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center">
          <img
            src={mockWorker.image}
            alt={`${mockWorker.firstName} ${mockWorker.lastName}`}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {mockWorker.firstName} {mockWorker.lastName}
            </h1>
            <div className="flex items-center mt-2">
              <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-gray-600">{mockWorker.position}</span>
              <span className={`ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(mockWorker.status)}`}>
                {mockWorker.status}
              </span>
            </div>
          </div>
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Nationality</p>
                    <p className="text-sm font-medium">{mockWorker.nationality}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="text-sm font-medium">{new Date(mockWorker.birthDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Fiscal Code</p>
                    <p className="text-sm font-medium">{mockWorker.fiscalCode}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Started</p>
                    <p className="text-sm font-medium">{new Date(mockWorker.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{mockWorker.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-600">{mockWorker.phone} (Primary)</p>
                  <p className="text-gray-600">{mockWorker.mobile} (Mobile)</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  {mockWorker.address}, {mockWorker.city}, {mockWorker.state} {mockWorker.postalCode}
                </span>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h2>
            <div className="grid grid-cols-5 gap-4">
              {Object.entries(mockWorker.schedule).map(([day, hours]) => (
                <div key={day} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 capitalize mb-1">{day}</p>
                  <p className="text-sm text-gray-600">
                    {hours.start} - {hours.end}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Languages */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills & Languages</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {mockWorker.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {mockWorker.languages.map((language) => (
                    <span key={language} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Current Contract */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Contract</h2>
            {mockWorker.contracts.map((contract) => (
              <div key={contract.id} className="space-y-4">
                <div className="flex items-center">
                  <img
                    src={contract.employerImage}
                    alt={contract.employer}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{contract.employer}</p>
                    <p className="text-sm text-gray-500">{contract.type}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Start: {new Date(contract.startDate).toLocaleDateString()}</p>
                    <p>End: {new Date(contract.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <button className="w-full mt-2 px-4 py-2 bg-blue-50 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-100">
                  View Contract Details
                </button>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
            <div className="space-y-3">
              {mockWorker.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-xs text-gray-500">Expires: {new Date(doc.expiry).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h2>
            <div className="space-y-4">
              {mockWorker.certifications.map((cert, index) => (
                <div key={index} className="p-3 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                  <p className="text-xs text-gray-500">
                    {cert.issuer} • {new Date(cert.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}