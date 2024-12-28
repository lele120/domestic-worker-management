import { signIn } from 'next-auth/react';
import { LoginCredentials } from '@/types/auth.types';

export async function loginWithEmail(credentials: LoginCredentials) {
  try {
    return await signIn('credentials', {
      email: credentials.username,
      password: credentials.password,
    });
  } catch (error) {
    console.error('Email login error:', error);
    throw error;
  }
}

export async function loginWithGoogle() {
  try {
    return await signIn('google');
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
}

