import React from 'react';
import { Building, Mail, Phone } from 'lucide-react';

const contactDetails = [
  {
    name: 'Office',
    description: '123 Business Avenue, Tech District, 12345',
    icon: Building,
  },
  {
    name: 'Email',
    description: 'contact@domesticworker.com',
    icon: Mail,
  },
  {
    name: 'Phone',
    description: '+1 (555) 123-4567',
    icon: Phone,
  },
];

const ContactInfo = () => {
  return (
    <div className="lg:col-span-2">
      <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
        {contactDetails.map((item) => (
          <div key={item.name}>
            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
              <item.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
              {item.name}
            </dt>
            <dd className="mt-2 text-base leading-7 text-gray-600">{item.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ContactInfo;