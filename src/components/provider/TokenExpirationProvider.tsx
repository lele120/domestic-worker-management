import { ReactNode } from 'react';
import { useTokenExpiration } from '@/hooks/useTokenExpiration';

interface Props {
  children: ReactNode;
}

export function TokenExpirationProvider({ children }: Props) {
  useTokenExpiration();
  return <>{children}</>;
}