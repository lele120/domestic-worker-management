import { Suspense } from 'react';
//import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
//import { Building, Users, FileText, Clock } from 'lucide-react';
import Loading from '@/components/shared/Loading';
import Link from 'next/link';
import AboutHero from '../../components/about/AboutHero';
import AboutTimeline from '../../components/about/AboutTimeline';
import AboutStats from '../../components/about/AboutStats';

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `About - ${t('app.title')}`,
  };
}

export default function About() {
  return (
    <Suspense fallback={<Loading />}>
      <AboutPage />
    </Suspense>
  );
}

function AboutPage() {
  //const t = useTranslations();

  return (
    <div className="bg-white">
      <AboutHero />
      <AboutStats />
      <AboutTimeline />
      
      {/* Mission Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Our Mission</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We&apos;re dedicated to transforming domestic worker management through technology, 
              ensuring fair treatment, transparent processes, and efficient operations for both 
              employers and workers.
            </p>
          </div>
        </div>
      </div>

      {/* Return Home */}
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-500 font-semibold flex items-center"
        >
        </Link>
      </div>
  );
}