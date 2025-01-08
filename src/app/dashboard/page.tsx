import { Suspense } from 'react';
import Loading from '@/components/shared/Loading';


export default function Home() {
   return (
     <Suspense fallback={<Loading />}>
     </Suspense>
   );
 }
