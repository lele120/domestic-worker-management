import React from 'react';

interface CostTableProps {
  title: string;
  data: Record<string, { hourly: number; monthly: number }>;
  showPositive?: boolean;
}

const CostTable: React.FC<CostTableProps> = ({ title, data, showPositive = false }) => {
  const sign = showPositive ? '+' : '-';

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <div className="space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="text-gray-500">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
            </span>
            <div className="flex gap-8">
              <span className="text-gray-900 w-24 text-right">
                {formatCurrency(value.hourly)} {sign}
              </span>
              <span className="text-gray-900 w-24 text-right">
                {formatCurrency(value.monthly)} {sign}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export default CostTable;