import { useState } from 'react';
import type { AuthState } from '@/types/auth.types';

const initialState: AuthState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  isRegistering: false,
  isLoading: false,
  error: null
};

export const useAuthState = () => {
  const [state, setState] = useState<AuthState>(initialState);

  const updateField = (field: keyof AuthState, value: string | boolean | null) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error, isLoading: false }));
  };

  const toggleMode = () => {
    setState(prev => ({
      ...prev,
      isRegistering: !prev.isRegistering,
      error: null
    }));
  };

  return {
    state,
    updateField,
    setError,
    toggleMode
  };
};