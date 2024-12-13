import { signIn } from 'next-auth/react';
import axios from 'axios';
import { LoginCredentials,RegisterCredentials } from '@/types/auth.types';

export class AuthService {
  static async loginWithEmail(credentials: LoginCredentials) {
    try {
      return await signIn('email', {
        ...credentials,
        redirectTo: '/dashboard',
        redirect: false
      });
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    }
  }

  static async loginWithGoogle() {
    try {
      return await signIn('google', { redirectTo: '/dashboard' });
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  static async register(credentials: RegisterCredentials) {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register/`;
      console.log("registering user")
      console.log(url, credentials)
  
      const response = await axios.post(url, credentials, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      return response.data; // Return the response data directly
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
}
