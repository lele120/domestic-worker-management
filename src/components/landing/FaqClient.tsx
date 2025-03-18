"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// FAQ data
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

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-6">
            Domande frequenti
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-12">
            FAQ
          </h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl shadow-sm hover:shadow transition-all duration-300"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <span className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 mr-3 text-blue-600 text-sm font-bold">Q</span>
                  {item.question}
                </h3>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-500" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  )}
                </span>
              </button>
              <div 
                id={`faq-answer-${index}`}
                className={`${openIndex === index ? 'block' : 'hidden'} px-6 pb-6`}
              >
                <p className="text-base text-gray-600 ml-11">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 