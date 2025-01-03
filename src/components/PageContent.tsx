'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import WorkersList from '@/components/features/workers/WorkersList';
import NewWorker from '@/components/features/workers/NewWorker';
import EmployersList from '@/components/features/employers/EmployersList';
import CreateEmployer from '@/components/features/employers/CreateEmployer';
import CreateContract from '@/components/features/contracts/CreateContract';

export default function PageContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('workers-list');

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
    console.log("session", session)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'workers-list':
        return <WorkersList onNavigate={setCurrentPage} />;
      case 'new-worker':
        return <NewWorker onNavigate={setCurrentPage} />;
      case 'employers-list':
        return <EmployersList onNavigate={setCurrentPage} />;
      case 'create-employer':
        return <CreateEmployer onNavigate={setCurrentPage} />;
      case 'create-contract':
        return <CreateContract onNavigate={setCurrentPage} />;
      default:
        return <WorkersList onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-1 ml-64 p-8">
        {renderPage()}
      </main>
    </div>
  );
}