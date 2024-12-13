import React from 'react';
import type { AuthState } from '@/types/auth.types';

interface AuthFormProps {
  state: AuthState;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: () => void;
  onGoogleLogin: () => void;
  onToggleMode: () => void;
  onFirstNameChange: (firstName: string) => void;
  onLastNameChange: (lastName: string) => void;

}

export const AuthForm: React.FC<AuthFormProps> = ({
  state,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onGoogleLogin,
  onToggleMode,
  onFirstNameChange,
  onLastNameChange,
}) => {
  const { isRegistering, email,password, error, first_name, last_name } = state;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
        <h2 className="mb-4 text-xl font-bold text-center">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {isRegistering && < input 
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => onFirstNameChange(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        }

        {isRegistering && <input 
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => onLastNameChange(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        }   
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          onClick={onSubmit}
          className="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
        
        <button
          onClick={onGoogleLogin}
          className="w-full px-4 py-2 mb-4 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
        >
          Sign in with Google
        </button>
        
        <button
          onClick={onToggleMode}
          className="w-full px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-50 transition-colors"
        >
          {isRegistering 
            ? 'Already have an account? Login' 
            : 'Don\'t have an account? Register'}
        </button>
      </div>
    </div>
  );
};