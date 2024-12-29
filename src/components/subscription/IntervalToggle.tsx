import React from 'react';

interface IntervalToggleProps {
  interval: 'month' | 'year';
  onChange: (interval: 'month' | 'year') => void;
}

const IntervalToggle: React.FC<IntervalToggleProps> = ({ interval, onChange }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={() => onChange('month')}
        className={`rounded-lg px-4 py-2 text-sm font-medium ${
          interval === 'month'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange('year')}
        className={`rounded-lg px-4 py-2 text-sm font-medium ${
          interval === 'year'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Yearly
        <span className="ml-1 text-xs text-blue-200">Save 20%</span>
      </button>
    </div>
  );
};

export default IntervalToggle;