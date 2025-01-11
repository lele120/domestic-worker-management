'use server'
import axios from 'axios';
import {  RegisterCredentials } from '@/types/auth.types';
//import { saltAndHashPassword } from '@/utils/password';

interface logInResponse {
  access: string;
  refresh: string;
  user: {
    pk: number;
    email: string;
    first_name: string;
    last_name: string;
  };
}

export async function register(credentials: RegisterCredentials) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/register/`;
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

export const getUserDetails = async (accessToken: string ) => {
  try {
    const response = await axios({
      method: "get",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/user/",
      headers: {
        Authorization:  `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

export async function getUserFromDb(_email: string, pwHash: string): Promise<logInResponse | null> {
  try {

    const credentials = {
      username: _email,
      password: pwHash
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login/`;

    const response = await axios.post<logInResponse>(url, {
      ...credentials
    });

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error fetching user from DB:", error);
    return null;
  }
}

export async function refreshToken(refreshToken: string) {
  try {
    const response = await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "auth/token/refresh/",
      data: {
        refresh: refreshToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
}

export async function googleAuth(access_token: string | undefined, id_token: string | undefined) {
  return await axios({
    method: "post",
    url: process.env.NEXTAUTH_BACKEND_URL + "auth/V2/social/google/",
    data: {
      access_token,
      id_token,
    },
  });
}
