'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('dashboard/employers');
  
  useEffect(() => {
    console.log("status", status)
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return null;
  }else {
    console.log("Session", session)
  }

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}