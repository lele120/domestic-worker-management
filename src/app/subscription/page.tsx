'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PlanCard from '@/components/subscription/PlanCard';
import BillingForm, { BillingFormData } from '@/components/subscription/BillingForm';
import IntervalToggle from '@/components/subscription/IntervalToggle';

const plans = {
  month: [
    {
      name: 'Free Trial',
      price: 0,
      features: [
        { text: 'Up to 2 workers', included: true },
        { text: 'Basic scheduling', included: true },
        { text: 'Email support', included: true },
        { text: 'Valid for 1 week', included: true },
        { text: 'No credit card required', included: true },
        { text: 'Core features included', included: true },
      ],
      isTrial: true,
    },
    {
      name: 'Basic',
      price: 29,
      features: [
        { text: 'Up to 5 workers', included: true },
        { text: 'Basic scheduling', included: true },
        { text: 'Email support', included: true },
        { text: 'Document management', included: false },
        { text: 'Advanced reporting', included: false },
        { text: 'Custom branding', included: false },
      ],
    },
    {
      name: 'Professional',
      price: 79,
      features: [
        { text: 'Up to 20 workers', included: true },
        { text: 'Advanced scheduling', included: true },
        { text: 'Priority support', included: true },
        { text: 'Document management', included: true },
        { text: 'Advanced reporting', included: true },
        { text: 'Custom branding', included: false },
      ],
      isPopular: true,
    },
    {
      name: 'Enterprise',
      price: 149,
      features: [
        { text: 'Unlimited workers', included: true },
        { text: 'Advanced scheduling', included: true },
        { text: '24/7 phone support', included: true },
        { text: 'Document management', included: true },
        { text: 'Advanced reporting', included: true },
        { text: 'Custom branding', included: true },
      ],
    },
  ],
  year: [
    {
      name: 'Free Trial',
      price: 0,
      features: [
        { text: 'Up to 2 workers', included: true },
        { text: 'Basic scheduling', included: true },
        { text: 'Email support', included: true },
        { text: 'Valid for 1 week', included: true },
        { text: 'No credit card required', included: true },
        { text: 'Core features included', included: true },
      ],
      isTrial: true,
    },
    {
      name: 'Basic',
      price: 279,
      features: [
        { text: 'Up to 5 workers', included: true },
        { text: 'Basic scheduling', included: true },
        { text: 'Email support', included: true },
        { text: 'Document management', included: false },
        { text: 'Advanced reporting', included: false },
        { text: 'Custom branding', included: false },
      ],
    },
    {
      name: 'Professional',
      price: 759,
      features: [
        { text: 'Up to 20 workers', included: true },
        { text: 'Advanced scheduling', included: true },
        { text: 'Priority support', included: true },
        { text: 'Document management', included: true },
        { text: 'Advanced reporting', included: true },
        { text: 'Custom branding', included: false },
      ],
      isPopular: true,
    },
    {
      name: 'Enterprise',
      price: 1429,
      features: [
        { text: 'Unlimited workers', included: true },
        { text: 'Advanced scheduling', included: true },
        { text: '24/7 phone support', included: true },
        { text: 'Document management', included: true },
        { text: 'Advanced reporting', included: true },
        { text: 'Custom branding', included: true },
      ],
    },
  ],
};

const SubscriptionPage = () => {
  const router = useRouter();
  const [interval, setInterval] = useState<'month' | 'year'>('month');
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [showBilling, setShowBilling] = useState(false);

  const handlePlanSelect = (index: number) => {
    setSelectedPlan(index);
    // If free trial is selected, skip billing and go straight to dashboard
    if (index === 0) {
      router.push('/dashboard');
    } else {
      setShowBilling(true);
    }
  };

  const handleBillingSubmit = async (billingData: BillingFormData) => {
    try {
      console.log('Processing subscription...', {
        plan: plans[interval][selectedPlan!],
        billing: billingData,
      });
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
          <p className="mt-4 text-lg text-gray-600">
            Start with a free trial or select the perfect plan for your business needs
          </p>
        </div>

        <div className="mt-8">
          <IntervalToggle interval={interval} onChange={setInterval} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {plans[interval].map((plan, index) => (
            <PlanCard
              key={plan.name}
              {...plan}
              interval={interval}
              isSelected={selectedPlan === index}
              onSelect={() => handlePlanSelect(index)}
            />
          ))}
        </div>

        {showBilling && selectedPlan !== null && selectedPlan !== 0 && (
          <div className="mt-12">
            <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg">
              <BillingForm onSubmit={handleBillingSubmit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;