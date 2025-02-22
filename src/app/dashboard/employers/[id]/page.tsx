'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
//import {useTranslations} from 'next-intl';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users,
  FileText,
  Edit,
  Download,
  Clock,
} from 'lucide-react';

// Mock data - in a real app this would come from an API
const mockEmployer = {
  id: 1,
  name: "Robert Anderson",
  company: "Anderson Enterprises",
  status: "Active",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
  email: "r.anderson@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Business Ave",
  city: "New York",
  state: "NY",
  postalCode: "10001",
  joinDate: "2023-01-15",
  workersCount: 3,
  activeContracts: 2,
  documents: [
    { id: 1, name: "Business Registration", date: "2023-01-15" },
    { id: 2, name: "Tax Documents", date: "2023-03-20" },
    { id: 3, name: "Insurance Certificate", date: "2023-02-01" }
  ],
  workers: [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Full-time Nanny",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
      startDate: "2023-01-20"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "House Keeper",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
      startDate: "2023-02-15"
    }
  ]
};

interface CreateEmployerProps {
  onNavigate?: (page: string) => void;
}

const EmployerProfile : React.FC<CreateEmployerProps> = () => {
  //const { t } = useTranslations();
  const { id } = useParams();
  console.log(id)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center">
          <Image
            src={mockEmployer.image}
            alt={mockEmployer.name}
            className="w-20 h-20 rounded-full object-cover"
            width={50}
            height={50}
          />
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-gray-900">{mockEmployer.name}</h1>
            <div className="flex items-center mt-2">
              <Building className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-gray-600">{mockEmployer.company}</span>
              <span className={`ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium
                ${mockEmployer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {mockEmployer.status}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {return null}}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="col-span-2 space-y-8">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{mockEmployer.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{mockEmployer.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  {mockEmployer.address}, {mockEmployer.city}, {mockEmployer.state} {mockEmployer.postalCode}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-gray-600">Joined {new Date(mockEmployer.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Workers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Workers</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-4">
              {mockEmployer.workers.map(worker => (
                <div key={worker.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Image
                      src={worker.image}
                      alt={worker.name}
                      className="w-10 h-10 rounded-full object-cover"
                      width={50}
                      height={50}
                    />
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">{worker.name}</h3>
                      <p className="text-sm text-gray-500">{worker.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    Started {new Date(worker.startDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">Total Workers</span>
                </div>
                <span className="font-semibold text-gray-900">{mockEmployer.workersCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">Active Contracts</span>
                </div>
                <span className="font-semibold text-gray-900">{mockEmployer.activeContracts}</span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents</h2>
            <div className="space-y-3">
              {mockEmployer.documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{doc.name}</span>
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
};

export default EmployerProfile;