import { Suspense } from 'react';
//import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
//import { Building, Mail, Phone } from 'lucide-react';
import Loading from '@/components/shared/Loading';
import Link from 'next/link';
import ContactForm from '../../components/contact/ContactForm';
import ContactInfo from '../../components/contact/ContactInfo';

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `Contact - ${t('app.title')}`,
  };
}

export default function Contact() {
  return (
    <Suspense fallback={<Loading />}>
      <ContactPage />
    </Suspense>
  );
}

function ContactPage() {
  //const t = useTranslations();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl space-y-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Get in touch</h2>
              <p className="mt-4 leading-7 text-gray-600">
                We&apos;d love to hear from you. Choose the best way to reach out.
              </p>
            </div>

            <ContactInfo />
          </div>

          <ContactForm />
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