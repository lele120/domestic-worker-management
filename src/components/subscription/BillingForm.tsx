import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import InputField from '../shared/forms/InputField';

interface BillingFormProps {
  onSubmit: (data: BillingFormData) => void;
}

export interface BillingFormData {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  name: string;
  country: string;
  postalCode: string;
}

const BillingForm: React.FC<BillingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BillingFormData>({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    name: '',
    country: '',
    postalCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-2">
        <CreditCard className="h-6 w-6 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <InputField
          label="Card Number"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="1234 1234 1234 1234"
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Expiry Date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
          />
          <InputField
            label="CVC"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            placeholder="123"
          />
        </div>
        <InputField
          label="Name on Card"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="United States"
          />
          <InputField
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="12345"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Complete Subscription
      </button>
    </form>
  );
};

export default BillingForm;