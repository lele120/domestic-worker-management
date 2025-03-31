"use client";

import { useState, FormEvent } from 'react';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  privacyPolicy: boolean;
}

interface FormErrors {
  firstName?: boolean;
  lastName?: boolean;
  email?: boolean;
  phone?: boolean;
  message?: boolean;
  privacyPolicy?: boolean;
}

export default function ContactFormClient() {
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    privacyPolicy: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = {};

    if (!formState.firstName.trim()) {
      newErrors.firstName = true;
      valid = false;
    }

    if (!formState.lastName.trim()) {
      newErrors.lastName = true;
      valid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = true;
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        newErrors.email = true;
        valid = false;
      }
    }

    if (!formState.message.trim()) {
      newErrors.message = true;
      valid = false;
    }

    if (!formState.privacyPolicy) {
      newErrors.privacyPolicy = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when field is updated
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/staff-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          phoneNumber: formState.phone,
          message: formState.message,
          privacyPolicyAccepted: formState.privacyPolicy
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      // Reset form and show success message
      setSubmitSuccess(true);
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        privacyPolicy: false
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Si è verificato un errore durante l\'invio. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Richiedi informazioni</h3>
      
      {submitSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">La tua richiesta è stata inviata con successo! Ti contatteremo presto.</p>
            </div>
          </div>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{submitError}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nome</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 ${
                    errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  value={formState.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">Il nome è obbligatorio</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Cognome</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 ${
                    errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  value={formState.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">Il cognome è obbligatorio</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                value={formState.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">Inserisci un indirizzo email valido</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefono</label>
            <div className="mt-1">
              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="tel"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                value={formState.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Messaggio</label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 ${
                  errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                value={formState.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">Il messaggio è obbligatorio</p>
              )}
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="privacyPolicy"
                name="privacyPolicy"
                type="checkbox"
                required
                className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                  errors.privacyPolicy ? 'border-red-300' : ''
                }`}
                checked={formState.privacyPolicy}
                onChange={handleChange}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="privacyPolicy" className="text-sm text-gray-700">
                Accetto la <a href="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</a> e autorizzo il trattamento dei miei dati
              </label>
              {errors.privacyPolicy && (
                <p className="mt-1 text-sm text-red-600">Devi accettare la privacy policy</p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Invio in corso...
                </>
              ) : (
                'Invia richiesta'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 