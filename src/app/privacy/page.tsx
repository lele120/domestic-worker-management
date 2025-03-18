import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, Clock, RefreshCw, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Staffwise',
  description: 'Informativa completa sulla privacy e sul trattamento dei dati personali di Staffwise, la piattaforma per la gestione del personale domestico.',
  keywords: 'privacy policy, GDPR, protezione dati, dati personali, staffwise, sicurezza dati',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Staffwise</span>
          </Link>
          <nav>
            <Link 
              href="/" 
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Torna alla Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Privacy Policy</h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-xl">
                Il tuo diritto alla privacy è la nostra priorità. Ecco come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.
              </p>
            </div>
            <div className="w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl">
                <div className="flex justify-center mb-4">
                  <Shield className="h-16 w-16 text-white" />
                </div>
                <p className="text-center text-blue-50">
                  Ultimo aggiornamento: 18 Marzo 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 md:p-10">
            {/* Introduction */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Informativa sulla Privacy</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                La presente Privacy Policy ha lo scopo di descrivere le modalità di gestione del sito in riferimento al trattamento dei dati personali degli utenti che lo consultano. Si tratta di un&apos;informativa che è resa ai sensi dell&apos;art. 13 del Regolamento UE 2016/679 (GDPR) a coloro che interagiscono con la piattaforma Staffwise.
              </p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800">
                  <strong>Staffwise</strong> si impegna a rispettare e proteggere la tua privacy. Leggi attentamente questa Privacy Policy per comprendere come trattiamo i tuoi dati personali.
                </p>
              </div>
            </div>

            {/* Titolare del Trattamento */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Lock className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Titolare del Trattamento</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Il Titolare del trattamento dei dati personali è Staffwise S.r.l., con sede legale in Via Example 123, 20100 Milano (MI), P.IVA 12345678901, email: privacy@staffwise.it.
              </p>
            </div>

            {/* Dati Raccolti */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Dati Raccolti</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Raccogliamo i seguenti tipi di dati personali:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">Dati di registrazione</h3>
                  <p className="text-gray-700 text-sm">Nome, cognome, indirizzo email, numero di telefono forniti durante la creazione dell&apos;account.</p>
                </div>
                <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">Dati di fatturazione</h3>
                  <p className="text-gray-700 text-sm">Informazioni di pagamento, indirizzi di fatturazione e altre informazioni fiscali.</p>
                </div>
                <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">Dati del personale</h3>
                  <p className="text-gray-700 text-sm">Informazioni sui collaboratori domestici che gestisci attraverso la piattaforma.</p>
                </div>
                <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">Dati di utilizzo</h3>
                  <p className="text-gray-700 text-sm">Informazioni su come interagisci con la piattaforma, incluse le funzionalità utilizzate e il tempo trascorso.</p>
                </div>
              </div>
            </div>

            {/* Finalità del Trattamento */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Clock className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Finalità del Trattamento</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                I tuoi dati personali vengono trattati per le seguenti finalità:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Fornire i servizi richiesti:</strong>
                    <p className="text-gray-700 mt-1">Gestione del personale domestico, elaborazione delle buste paga, generazione di contratti, etc.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Migliorare i nostri servizi:</strong>
                    <p className="text-gray-700 mt-1">Analisi dell&apos;utilizzo della piattaforma per ottimizzare le funzionalità e l&apos;esperienza utente.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Comunicazioni di servizio:</strong>
                    <p className="text-gray-700 mt-1">Invio di notifiche relative al servizio, aggiornamenti e informazioni amministrative.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">4</span>
                  </div>
                  <div>
                    <strong className="text-gray-900">Marketing:</strong>
                    <p className="text-gray-700 mt-1">Con il tuo consenso, invio di comunicazioni su nuovi servizi, offerte speciali e contenuti informativi.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Sicurezza dei Dati */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Sicurezza dei Dati</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                La sicurezza dei tuoi dati personali è importante per noi. Utilizziamo misure di sicurezza tecniche e organizzative appropriate per proteggere i tuoi dati personali contro l&apos;accesso, la modifica, la divulgazione o la distruzione non autorizzati.
              </p>
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Le nostre misure di sicurezza includono:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <Lock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-blue-800 font-medium">Crittografia SSL/TLS</p>
                      <p className="text-blue-700 text-sm mt-1">Tutti i dati trasmessi tra il tuo browser e i nostri server sono criptati.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-blue-800 font-medium">Accesso limitato</p>
                      <p className="text-blue-700 text-sm mt-1">Solo il personale autorizzato ha accesso ai tuoi dati personali.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <RefreshCw className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-blue-800 font-medium">Backup regolari</p>
                      <p className="text-blue-700 text-sm mt-1">Effettuiamo backup regolari per prevenire la perdita di dati.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-blue-800 font-medium">Monitoraggio continuo</p>
                      <p className="text-blue-700 text-sm mt-1">Monitoriamo costantemente i nostri sistemi per rilevare potenziali vulnerabilità.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* I Tuoi Diritti */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">I Tuoi Diritti</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Ai sensi del GDPR, hai i seguenti diritti in relazione ai tuoi dati personali:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Diritto di accesso</h3>
                  <p className="text-gray-700 text-sm">Hai il diritto di ottenere la conferma che sia o meno in corso un trattamento di dati personali che ti riguardano e, in tal caso, di ottenere l&apos;accesso a tali dati.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Diritto di rettifica</h3>
                  <p className="text-gray-700 text-sm">Hai il diritto di ottenere la rettifica dei dati personali inesatti che ti riguardano e di integrare i dati personali incompleti.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Diritto alla cancellazione</h3>
                  <p className="text-gray-700 text-sm">Hai il diritto di ottenere la cancellazione dei dati personali che ti riguardano, quando non sono più necessari o se revochi il consenso.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Diritto di limitazione</h3>
                  <p className="text-gray-700 text-sm">Hai il diritto di ottenere la limitazione del trattamento in determinate circostanze, ad esempio se contesti l&apos;esattezza dei dati.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Diritto alla portabilità</h3>
                  <p className="text-gray-700 text-sm">Hai il diritto di ricevere i tuoi dati personali in un formato strutturato, di uso comune e leggibile da dispositivo automatico.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">Diritto di opposizione</h3>
                  <p className="text-gray-700 text-sm">Hai il diritto di opporti, in qualsiasi momento, al trattamento dei tuoi dati personali per motivi connessi alla tua situazione particolare.</p>
                </div>
              </div>
            </div>

            {/* Modifiche alla Privacy Policy */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <RefreshCw className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Modifiche alla Privacy Policy</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con una nuova data di aggiornamento. Ti invitiamo a consultare regolarmente questa pagina per rimanere informato su eventuali modifiche. L&apos;uso continuato dei nostri servizi dopo la pubblicazione di modifiche costituisce l&apos;accettazione delle stesse.
              </p>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> In caso di modifiche sostanziali della Privacy Policy, ti informeremo via email o tramite un avviso sul nostro sito.
                </p>
              </div>
            </div>

            {/* Contatti */}
            <div>
              <div className="flex items-center mb-6">
                <Mail className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Contatti</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Per qualsiasi domanda o richiesta riguardante questa Privacy Policy o il trattamento dei tuoi dati personali, puoi contattarci ai seguenti recapiti:
              </p>
              <div className="mt-6 bg-blue-600 text-white rounded-xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Responsabile della Protezione dei Dati (DPO)</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-blue-300 mr-3 mt-0.5" />
                      <span>privacy@staffwise.it</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Staffwise S.r.l., Via Example 123, 20100 Milano (MI)</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-blue-500">
                    <p className="text-sm text-blue-200">
                      Ci impegniamo a rispondere alle tue richieste entro 30 giorni dalla ricezione.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-lg font-bold text-gray-900">Staffwise</span>
              </Link>
              <p className="text-sm text-gray-600 mt-2">La piattaforma per la gestione del personale domestico.</p>
            </div>
            <div className="flex flex-wrap justify-center space-x-6">
              <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Cookie Policy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Termini e Condizioni
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Staffwise S.r.l. Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}