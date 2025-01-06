import React from 'react';
import { Check } from 'lucide-react';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PlanCardProps {
  id : number;
  name: string;
  monthly_price: number;
  yearly_price: number;
  interval: 'month' | 'year';
  features: PlanFeature[];
  isPopular?: boolean;
  isTrial?: boolean;
  isSelected?: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  name,
  monthly_price,
  yearly_price,
  interval,
  features,
  isPopular,
  isTrial,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`relative rounded-2xl border-2 p-6 ${
        isSelected
          ? 'border-blue-600 bg-blue-50'
          : isTrial
          ? 'border-green-300 bg-green-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
          Most Popular
        </div>
      )}
      {isTrial && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-green-600 px-4 py-1 text-sm font-semibold text-white">
          Free Trial
        </div>
      )}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900">{ interval == "month" ? monthly_price : yearly_price }</span>
          {!isTrial && <span className="text-gray-500">/{interval}</span>}
        </div>
      </div>
      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check
              className={`h-5 w-5 shrink-0 ${
                feature.included ? 'text-blue-600' : 'text-gray-300'
              }`}
            />
            <span
              className={`ml-3 text-sm ${
                feature.included ? 'text-gray-700' : 'text-gray-400'
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className={`mt-8 w-full rounded-lg px-4 py-2 text-sm font-semibold ${
          isSelected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : isTrial
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
        }`}
      >
        {isTrial ? 'Start Free Trial' : isSelected ? 'Selected' : 'Select Plan'}
      </button>
    </div>
  );
};

export default PlanCard;