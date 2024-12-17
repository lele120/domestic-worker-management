'use server'
import axios from 'axios';
import {  RegisterCredentials } from '@/types/auth.types';
//import { saltAndHashPassword } from '@/utils/password';


export async function register(credentials: RegisterCredentials) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register/`;
    console.log('registering user');
    console.log(url, credentials);

    // Hash the password
   
    /*
    const hashedPassword = await saltAndHashPassword(credentials.password1);
    credentials.password1 = hashedPassword;
    credentials.password2 = hashedPassword;
    */

    // Send the registration request to the backend
    const response = await axios.post(url, {
      ...credentials
    });

    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}