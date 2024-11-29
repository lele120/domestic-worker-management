import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mt-4 text-gray-900">Termini di Servizio</h1>
      <p className="mt-2 text-gray-700">
        Benvenuto nei nostri Termini di Servizio. Utilizzando il nostro servizio, accetti di essere vincolato da questi termini.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-gray-900">1. Accettazione dei Termini</h2>
      <p className="mt-2 text-gray-700">
        Utilizzando il nostro servizio, accetti di essere vincolato da questi termini. Se non accetti questi termini, non utilizzare il nostro servizio.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-gray-900">2. Modifiche ai Termini</h2>
      <p className="mt-2 text-gray-700">
        Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Ti informeremo di eventuali modifiche pubblicando i nuovi termini sul nostro sito web.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-gray-900">3. Uso del Servizio</h2>
      <p className="mt-2 text-gray-700">
        Non puoi utilizzare il nostro servizio per scopi illegali o non autorizzati.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-gray-900">4. Proprietà Intellettuale</h2>
      <p className="mt-2 text-gray-700">
        Tutti i contenuti presenti nel nostro servizio, inclusi testi, grafica, loghi e software, sono di nostra proprietà o dei nostri fornitori e sono protetti dalle leggi sulla proprietà intellettuale.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-gray-900">5. Limitazione di Responsabilità</h2>
      <p className="mt-2 text-gray-700">
        Non saremo responsabili per eventuali danni diretti, indiretti, incidentali o consequenziali derivanti dall&apos;utilizzo del nostro servizio o dall&apos;impossibilità di utilizzare il servizio.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-gray-900">6. Legge Applicabile</h2>
      <p className="mt-2 text-gray-700">
        Questi Termini di Servizio sono regolati dalle leggi dello Stato [Nome dello Stato]. Qualsiasi controversia derivante da questi termini sarà soggetta alla giurisdizione esclusiva dei tribunali situati in [Nome della Città].
      </p>

      <h2 className="text-2xl font-bold mt-4 text-gray-900">7. Contatti</h2>
      <p className="mt-2 text-gray-700">
        Se hai domande riguardo a questi Termini di Servizio, contattaci all&apos;indirizzo email: support@example.com.
      </p>
    </div>
  );
};

export default TermsOfService;