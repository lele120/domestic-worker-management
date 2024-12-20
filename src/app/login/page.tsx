"use client";

import { useRouter } from 'next/navigation';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { register } from '@/app/api/auth/auth.service';
import { loginWithEmail, loginWithGoogle} from '@/actions/auth.service'; 
import { AuthForm } from '@/components/auth/authForm';

export default function LoginPage() {
  const router = useRouter();
  const { state, updateField, setError, toggleMode } = useAuthState();
  const { isLoading, isAuthenticated } = useAuthRedirect('/dashboard');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = async () => {
    try {
      updateField('isLoading', true);
      setError(null);

      if (state.isRegistering) {
        await register({
          username: state.email,
          email: state.email,
          password1: state.password,
          password2: state.password,
          first_name: state.first_name,
          last_name: state.last_name
        });
        router.push('/dashboard');
      } else {
        const result = await loginWithEmail({
          username: state.email,
          password: state.password
        });

        if (result) {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      updateField('isLoading', true);
      setError(null);
      await loginWithGoogle();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Google authentication failed');
    }
  };

  return (
    <AuthForm
      state={state}
      onFirstNameChange={(firstName: string) => updateField('first_name', firstName)}
      onLastNameChange={(lastName: string) => updateField('last_name', lastName)}
      onEmailChange={(email: string) => updateField('email', email)}
      onPasswordChange={(password: string) => updateField('password', password)}
      onSubmit={handleSubmit}
      onGoogleLogin={handleGoogleLogin}
      onToggleMode={toggleMode}
    />
  );
}