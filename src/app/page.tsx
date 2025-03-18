import React, { Suspense } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { CheckCircle, FileText, Calendar, Star, ChevronRight, ArrowRight, CreditCard } from 'lucide-react';
import Loading from '@/components/shared/Loading';
import NavbarClient from '@/components/landing/NavbarClient';
import StatsClient from '@/components/landing/StatsClient';
import FaqClient from '@/components/landing/FaqClient';
import ContactFormClient from '@/components/landing/ContactFormClient';

export const metadata: Metadata = {
  title: 'Staffwise | Il gestionale per il personale domestico',
  description: 'Assumi, gestisci e paga il tuo personale domestico in pochi click: Dimentica la burocrazia con la piattaforma per gestire baby sitter, badanti e colf.',
  keywords: 'personale domestico, colf, badante, baby sitter, buste paga, contratti, gestione personale',
  openGraph: {
    title: 'Staffwise | Il gestionale per il personale domestico',
    description: 'Assumi, gestisci e paga il tuo personale domestico in pochi click: Dimentica la burocrazia con Staffwise.',
    url: 'https://staffwise.it',
    siteName: 'Staffwise',
    images: [
      {
        url: 'https://staffwise.it/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Staffwise - Gestionale per personale domestico',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staffwise | Il gestionale per il personale domestico',
    description: 'Assumi, gestisci e paga il tuo personale domestico in pochi click',
    images: ['https://staffwise.it/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://staffwise.it',
  }
};

// Features data
const features = [
  {
    icon: FileText,
    title: 'Assunzione Semplificata',
    description: 'Crea contratti conformi alla normativa in pochi minuti. Ti guidiamo passo dopo passo nella compilazione dei documenti.'
  },
  {
    icon: Calendar,
    title: 'Gestione Presenze Digitale',
    description: 'Registra le ore lavorate, approva ferie e permessi con un semplice calendario digitale.'
  },
  {
    icon: CreditCard,
    title: 'Buste Paga Automatiche',
    description: 'Genera buste paga corrette ogni mese senza fare calcoli. Il sistema si aggiorna automaticamente.'
  }
];

// Services data
const services = [
  'Contratti conformi alla normativa vigente',
  'Calcolo automatico di buste paga e contributi',
  'Gestione presenze e calendario integrato',
  'Nota spese digitale',
  'Comunicazioni obbligatorie automatizzate',
  'Archivio documentale sicuro'
];

// Metrics data
const metrics = [
  {
    value: '100%',
    label: 'Gestione delle pratiche del personale domestico automatizzata'
  },
  {
    value: '90 sec.',
    label: 'Il tempo necessario per generare una busta paga ogni mese'
  },
  {
    value: '< 2 settimane',
    label: 'Il tempo necessario per assumere personale domestico in modo legale'
  }
];

// Navigation items
const navigationItems = [
  { name: 'Home', href: '#home' },
  { name: 'Soluzione', href: '#solution' },
  { name: 'Funzionalità', href: '#features' },
  { name: 'Servizi', href: '#services' },
  { name: 'Consulente', href: '#consultant' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contatti', href: '#contact' }
];

// FAQ data for structured data
const faqItems = [
  {
    question: 'È sicuro inserire i dati nella piattaforma?',
    answer: 'Assolutamente. Utilizziamo protocolli di sicurezza avanzati e rispettiamo al 100% il GDPR. Tutti i dati sono criptati e archiviati in server sicuri all&apos;interno dell&apos;Unione Europea.'
  },
  {
    question: 'Come si gestiscono malattie o ferie?',
    answer: 'Attraverso un semplice calendario digitale, con notifiche automatiche e calcoli immediati. Puoi approvare richieste, monitorare le assenze e gestire le sostituzioni, tutto da un&apos;unica interfaccia.'
  },
  {
    question: 'Posso passare a Staffwise se ho già un collaboratore?',
    answer: 'Certamente! Ti guideremo nel processo di migrazione senza interruzioni nel rapporto di lavoro. I nostri esperti ti aiuteranno a trasferire tutti i dati e documenti esistenti nel nuovo sistema.'
  },
  {
    question: 'Quanto costa utilizzare Staffwise?',
    answer: 'Offriamo piani flessibili adatti a diverse esigenze. Puoi iniziare con una prova gratuita di 30 giorni, senza impegno. I nostri piani partono da un canone mensile accessibile che include tutte le funzionalità base.'
  },
  {
    question: 'Staffwise sostituisce il consulente del lavoro?',
    answer: 'Staffwise non sostituisce il consulente del lavoro, ma collabora con lui. La piattaforma automatizza le attività ripetitive, lasciando ai professionisti più tempo per consulenza di valore. Puoi utilizzare il tuo consulente di fiducia o uno dei nostri partner.'
  }
];

export default function Home() {
  // Create JSON-LD structured data for better SEO
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Staffwise",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock"
    },
    "description": "Piattaforma per la gestione del personale domestico",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "105"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Staffwise",
    "image": "https://staffwise.it/og-image.jpg",
    "url": "https://staffwise.it",
    "telephone": "+39-000-0000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Example 123",
      "addressLocality": "Milano",
      "postalCode": "20100",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.4642,
      "longitude": 9.1900
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/staffwise",
      "https://www.linkedin.com/company/staffwise",
      "https://twitter.com/staffwise"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />

        {/* Navigation Bar - Client Component */}
        <NavbarClient navigationItems={navigationItems} />

        {/* Hero Section - Enhanced with gradient background and modern layout */}
        <section id="home" className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-16">
          {/* Abstract shapes for visual interest */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
          </div>
          
          <div className="mx-auto max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:flex lg:px-8 lg:py-32 items-center">
            <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
              <div className="flex items-center space-x-2 mb-6">
                <div className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-700 ring-1 ring-inset ring-blue-600/20">
                  Nuova piattaforma
                </div>
                <div className="h-4 w-4 text-yellow-400">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                </div>
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Il nuovo modo di assumere,</span> gestire e pagare il personale
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Assumi, gestisci e paga il tuo personale domestico in pochi click: Dimentica la burocrazia. Staffwise è la piattaforma cloud che semplifica la gestione di baby sitter, badanti e colf.
              </p>
              <div className="mt-10 flex flex-wrap gap-6">
                <a
                  href="/login"
                  className="group relative flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  aria-label="Prova Staffwise gratuitamente"
                >
                  <span className="relative z-10 flex items-center">
                    Prova Staffwise
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
                <a 
                  href="#features" 
                  className="group relative rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-md hover:shadow-lg ring-1 ring-gray-200 hover:ring-blue-200 transition-all duration-300"
                  aria-label="Scopri la piattaforma Staffwise"
                >
                  Scopri la piattaforma
                  <ChevronRight className="inline-block ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl sm:mt-16 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
              <div className="relative w-full max-w-3xl flex-none sm:max-w-5xl lg:max-w-none transform transition-transform hover:scale-[1.02] duration-500 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=85"
                  alt="Gestione digitale del personale domestico: tablet che mostra la piattaforma Staffwise per semplificare contratti e pagamenti"
                  width={1400}
                  height={850}
                  className="w-full h-auto object-cover rounded-2xl bg-white/5 ring-1 ring-gray-900/10"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwMCIgaGVpZ2h0PSI4NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YwZjlmZiI+PC9yZWN0PjwvdmlnPg=="
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="eager"
                  quality={90}
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
              </div>
            </div>
          </div>
          
          {/* Abstract shapes for bottom section */}
          <div className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-80" aria-hidden="true">
            <div className="relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-blue-400 opacity-20 sm:left-[calc(50%+30rem)] sm:w-[72.1875rem]"></div>
          </div>
        </section>

        {/* Problem & Solution Section - Enhanced with better spacing and card design */}
        <section id="solution" className="bg-white py-24 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] opacity-[0.03] bg-fixed"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div className="mb-12 lg:mb-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                  <span className="inline-block py-1 px-3 bg-yellow-100 text-yellow-800 rounded-lg mr-2">Immagina:</span> 
                  fare impresa, ma senza la burocrazia
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  La gestione del personale domestico è complessa. Contratti, buste paga, contributi, presenze... Gestire un collaboratore domestico richiede tempo e competenze specifiche. Molte famiglie rinunciano a regolarizzare i propri collaboratori a causa della burocrazia eccessiva.
                </p>
                <p className="text-lg text-gray-600 relative pl-4 border-l-4 border-blue-500">
                  Staffwise è il tuo assistente digitale per la gestione del personale domestico. Abbiamo creato una piattaforma cloud che automatizza ogni aspetto burocratico, consentendoti di gestire il tuo personale domestico in modo legale e senza stress.
                </p>
              </div>
              <div className="transform transition-transform hover:scale-[1.02] duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                  alt="Interfaccia di Staffwise mostrando la semplificazione del processo di gestione domestica con documenti organizzati"
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section - Better styling with logos */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-xl font-semibold leading-8 text-gray-900 mb-2">
              Credono in noi i migliori imprenditori italiani
            </h2>
            <p className="text-center text-gray-500 mb-12">Soluzioni utilizzate da aziende di ogni dimensione</p>
            <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="col-span-1 flex justify-center transition-opacity hover:opacity-80">
                  <div className="h-16 w-40 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-semibold">
                    LOGO {i}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Improved card design with hover effects */}
        <section id="features" className="bg-white py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          <div className="hidden lg:block absolute -right-60 -top-40 w-96 h-96 rounded-full bg-blue-50 blur-3xl"></div>
          <div className="hidden lg:block absolute -left-60 -bottom-40 w-96 h-96 rounded-full bg-blue-50 blur-3xl"></div>
          
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-6">
                Funzionalità principali
              </h2>
              <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Una piattaforma per <span className="text-blue-600">TUTTO</span> ciò che riguarda il personale
              </h3>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Tutto ciò che ti serve in un&apos;unica piattaforma
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-16 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <div 
                    key={feature.title} 
                    className="group relative bg-white p-10 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden border border-gray-100"
                  >
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300"></div>
                    <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-900 mb-4 relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                        <feature.icon className="h-7 w-7 flex-none text-blue-600" aria-hidden="true" />
                      </div>
                      {feature.title}
                    </dt>
                    <dd className="mt-4 text-base leading-7 text-gray-600 relative">
                      {feature.description}
                    </dd>
                    <div className="mt-6 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-500 transition-colors duration-300 relative">
                      <span>Scopri di più</span>
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Services Section - Enhanced with better visual grouping */}
        <section id="services" className="bg-gradient-to-b from-blue-50 to-blue-100 py-24 relative overflow-hidden">
          <div className="hidden lg:block absolute -right-40 top-40 w-96 h-96 rounded-full bg-white/50 blur-3xl"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 mb-6">
                Tutto incluso
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Servizi Inclusi
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Tutto ciò che ti serve in un&apos;unica piattaforma
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3 gap-x-12">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                      <CheckCircle className="h-6 w-6 flex-none text-blue-600" aria-hidden="true" />
                    </div>
                    <span className="text-base text-gray-700 ml-4 pt-1.5">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section - Better card design and animations */}
        <StatsClient metrics={metrics} />

        {/* Consultant Section - Enhanced with better visuals */}
        <section id="consultant" className="bg-gradient-to-b from-gray-50 to-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] opacity-[0.02] bg-fixed"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-6">
                Supporto professionale
              </span>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
              <div className="transform transition-transform hover:scale-[1.02] duration-500 order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Consulente del lavoro professionista che supporta i clienti Staffwise"
                  width={600}
                  height={450}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="mt-12 lg:mt-0 order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                  Un consulente del lavoro dedicato
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Non sei solo. Quando adotti Staffwise, puoi scegliere un consulente del lavoro nostro Partner. Sono professionisti indipendenti estremamente competenti, che han superato un processo di selezione rigoroso e che, come noi, odiano la burocrazia.
                </p>
                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Trasparenza con:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                        <CheckCircle className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                      </div>
                      <span className="ml-3">Controllo di tutti i costi preventivamente</span>
                    </li>
                    <li className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                        <CheckCircle className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                      </div>
                      <span className="ml-3">Costo certo del lavoro</span>
                    </li>
                    <li className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                        <CheckCircle className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                      </div>
                      <span className="ml-3">Assistenza per ogni necessità</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - More engaging design */}
        <section id="contact" className="bg-gradient-to-r from-yellow-400 to-yellow-300 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] opacity-[0.05] bg-fixed"></div>
          <div className="hidden lg:block absolute -right-20 top-0 bottom-0 w-96 bg-yellow-200 blur-3xl opacity-50"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Parla con noi
                </h2>
                <p className="mt-4 text-lg text-gray-800">
                  Siamo qui per aiutarti. Contattaci per scoprire come Staffwise può semplificare la gestione del tuo personale domestico.
                </p>
                <div className="mt-8 flex justify-start">
                  <a
                    href="#contact"
                    className="group relative inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-4 text-base font-medium text-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    aria-label="Richiedi una demo di Staffwise"
                  >
                    <span className="relative z-10 flex items-center">
                      Richiedi Demo
                      <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                    <span className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </a>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="mt-12 lg:mt-0">
                <ContactFormClient />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Using client component for interactions */}
        <FaqClient />

        {/* Final CTA - More impactful design */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute right-0 bottom-0 h-64 w-64 opacity-20">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="50" cy="50" r="40" fill="white" />
            </svg>
          </div>
          <div className="absolute -left-20 -top-20 h-64 w-64 opacity-10">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="50" cy="50" r="40" fill="white" />
            </svg>
          </div>
          
          <div className="mx-auto max-w-7xl px-6 py-6 sm:py-12 lg:flex lg:items-center lg:justify-between lg:px-8 relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl max-w-xl">
              Pronto a semplificare la gestione del personale domestico?
            </h2>
            <div className="mt-10 flex flex-col sm:flex-row gap-6 lg:mt-0 lg:flex-shrink-0">
              <a
                href="/register"
                className="group relative flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-medium text-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                aria-label="Registrati per provare Staffwise gratuitamente per 30 giorni"
              >
                Prova Staffwise Gratis per 30 Giorni
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#home"
                className="group relative flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-lg font-medium text-white hover:bg-white/10 transition-all duration-300"
                aria-label="Torna all&apos;inizio della pagina"
              >
                Torna all&apos;inizio
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}