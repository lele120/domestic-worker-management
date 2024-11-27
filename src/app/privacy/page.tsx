import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mt-4 text-gray-900">Sicurezza dei Dati</h2>
      <p className="mt-2 text-gray-700">
        Ci impegniamo a proteggere le tue informazioni. Utilizziamo misure di sicurezza appropriate per prevenire accessi non autorizzati o divulgazioni.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-gray-900">I Tuoi Diritti</h2>
      <p className="mt-2 text-gray-700">
        Hai il diritto di:
        <ul className="list-disc list-inside mt-2">
          <li>Richiedere l&apos;accesso ai tuoi dati personali.</li>
          <li>Richiedere la correzione dei tuoi dati personali.</li>
          <li>Richiedere la cancellazione dei tuoi dati personali.</li>
          <li>Opporsi al trattamento dei tuoi dati personali.</li>
        </ul>
      </p>

      <h2 className="text-2xl font-bold mt-4 text-gray-900">Modifiche alla Privacy Policy</h2>
      <p className="mt-2 text-gray-700">
        Ci riserviamo il diritto di aggiornare questa Privacy Policy. Ti informeremo di eventuali modifiche pubblicando la nuova Privacy Policy su questa pagina.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-gray-900">Contatti</h2>
      <p className="mt-2 text-gray-700">
        Per qualsiasi domanda o richiesta riguardante questa Privacy Policy, contattaci all&apos;indirizzo email: privacy@example.com.
      </p>
    </div>
  );
};

export default PrivacyPolicy;