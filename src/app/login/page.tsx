// app/auth/login.tsx
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
//import { auth, provider, signInWithPopup } from '../../firebaseConfig';
//import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      //const result = await signInWithPopup(auth, provider);
      // User signed in
      router.push('/pageContent');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      //await signInWithEmailAndPassword(auth, email, password);
      // User signed in
      router.push('/pageContent');
    } catch (error) {
      console.error('Error signing in with email:', error);
    }
  };

  const handleRegister = async () => {
    try {
      //await createUserWithEmailAndPassword(auth, email, password);
      // User registered and signed in
      router.push('/pageContent');
    } catch (error) {
      console.error('Error registering with email:', error);
    }
  };

  //useEffect(() => {
  //  // Check if user is already logged in
  //  auth.onAuthStateChanged((user) => {
  //    if (user) {
  //      router.push('/pageContent');
  //    }
  //  });
  //}, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">{isRegistering ? 'Register' : 'Login'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={isRegistering ? handleRegister : handleEmailLogin}
          className="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full px-4 py-2 mb-4 text-white bg-red-500 rounded"
        >
          Sign in with Google
        </button>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full px-4 py-2 text-blue-500 border border-blue-500 rounded"
        >
          {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
        </button>
      </div>
    </div>
  );
};

export default Login;