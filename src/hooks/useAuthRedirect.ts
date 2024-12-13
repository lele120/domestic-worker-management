import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const useAuthRedirect = (redirectPath: string = '/dashboard') => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(redirectPath);
    }
  }, [session, router, redirectPath]);

  return {
    isLoading: status === 'loading',
    isAuthenticated: !!session
  };
};