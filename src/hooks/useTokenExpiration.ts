import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { isTokenExpired } from '@/utils/generic';

export function useTokenExpiration() {
const { data: session, status } = useSession();


  useEffect(() => {
    // Check token on mount and set up interval
    const checkToken = () => {
      if (status === 'authenticated' && isTokenExpired(session?.user.accessToken)) {
        signOut({ redirect: true, callbackUrl: '/login' });
      }
    };

    // Initial check
    checkToken();

    // Check every minute
    const interval = setInterval(checkToken, 60 * 1000);

    return () => clearInterval(interval);
  }, [session, status]);
}