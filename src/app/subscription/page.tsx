'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PlanCard from '@/components/subscription/PlanCard';
import BillingForm, { BillingFormData } from '@/components/subscription/BillingForm';
import IntervalToggle from '@/components/subscription/IntervalToggle';
import axios from 'axios';
import { createSubscription } from '../api/auth/susbscription.service';
import { addDaysToDate } from '@/utils/generic';
import { useSession } from 'next-auth/react';


const SubscriptionPage = () => {
  const {data} = useSession()
  const router = useRouter();
  const [interval, setInterval] = useState<'month' | 'year'>('month');
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [showBilling, setShowBilling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  interface Plan {
    id: number;
    name: string;
    monthly_price: number;
    yearly_price: number;
    features: { text: string; included: boolean }[];
    is_popular?: boolean;
    is_trial?: boolean;
  }
  const defaultPlans: Plan[] = [];

  const [plans, setPlans] = useState<Plan[]>(defaultPlans);

  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
  
        const response =  await axios({
          method: "get",
          url: process.env.NEXT_PUBLIC_BACKEND_URL + "plan/",
          });
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = (index: number) => {
    setSelectedPlan(index);
    // If free trial is selected, skip billing and go straight to dashboard
    if (index === 0) {
      const today = new Date();
      const end_date = addDaysToDate(today,7)
      const accessToken = data?.user.accessToken;
      if (accessToken) {
        createSubscription(plans[index].id, today.toISOString(), end_date.toISOString(), 'true', accessToken);
        router.push('/dashboard');
      } else {
        console.error('Access token is missing');
      }
      router.push('/dashboard');
    } else {
      setShowBilling(true);
    }
  };

  const handleBillingSubmit = async (billingData: BillingFormData) => {
    try {
      console.log('Processing subscription...', {
        plan: plans[selectedPlan!],
        billing: billingData,
      });
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Loading Plans...</h1>
          </div>
        </div>
      </div>
    );
  }

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
          {plans.map((plan, index) => (
            <PlanCard
              isPopular={plan.is_popular}
              isTrial={plan.is_trial}
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

