import { Suspense } from 'react';
import Loading from '@/components/shared/Loading';
import PageContent from '@/components/PageContent';



export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <PageContent />
    </Suspense>
  );
}