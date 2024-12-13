export interface RegisterCredentials {
    username: string;
    email: string;
    password1: string;
    password2: string;
    first_name: string;
    last_name: string;
  }

export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthState {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    isRegistering: boolean;
    isLoading: boolean;
    error: string | null;
  }