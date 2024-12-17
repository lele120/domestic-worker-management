'use server'
import axios from 'axios';
import {  RegisterCredentials } from '@/types/auth.types';
import bcrypt from 'bcrypt';


export async function register(credentials: RegisterCredentials) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register/`;
    console.log('registering user');
    console.log(url, credentials);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(credentials.password1, salt);
    credentials.password1 = hashedPassword;
    credentials.password2 = hashedPassword;

    // Send the registration request to the backend
    const response = await axios.post(url, {
      ...credentials,
      password: hashedPassword,
    });

    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}