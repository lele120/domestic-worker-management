import React from 'react';
import { useTranslations } from 'next-intl'

interface CostTableProps {
  title: string;
  data: Record<string, { hourly: number; monthly: number }>;
  showPositive?: boolean;
}

const CostTable: React.FC<CostTableProps> = ({ title, data, showPositive = false }) => {
  const t = useTranslations()
  
  // Convert data object to array of entries
  const entries = Object.entries(data);
  const isLastEntry = (index: number) => index === entries.length - 1;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <div className="space-y-1">
        {entries.map(([key, value], index) => {
          // Determine the sign to display
          let sign = showPositive ? '+' : '-';
          if (isLastEntry(index)) {
            sign = '=';
          }
          
          return (
            <div key={key} className="flex justify-between text-sm">
              <span className="text-gray-500">
                {t(`contract.costBreakdown.${key}`)}:
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
          );
        })}
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