// pages/privacy-policy.tsx

import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>Norme sulla Privacy</h1>
            <p>
                Questa Privacy Policy descrive come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali quando utilizzi il nostro sito web.
            </p>
            
            <h2>Informazioni Raccolte</h2>
            <p>
                Raccogliamo diverse tipologie di informazioni, tra cui:
                <ul>
                    <li>Informazioni di identificazione personale (nome, email, ecc.)</li>
                    <li>Dati di utilizzo (informazioni su come utilizzi il nostro sito)</li>
                    <li>Cookie e dati di tracciamento</li>
                </ul>
            </p>

            <h2>Utilizzo delle Informazioni</h2>
            <p>
                Utilizziamo le informazioni raccolte per:
                <ul>
                    <li>Fornire e mantenere il nostro servizio</li>
                    <li>Informarti su modifiche al nostro servizio</li>
                    <li>Consentirti di partecipare a funzionalità interattive del nostro servizio quando lo desideri</li>
                    <li>Fornire assistenza ai clienti</li>
                    <li>Raccogliere analisi o informazioni preziose che ci aiutano a migliorare il servizio</li>
                </ul>
            </p>

            <h2>Condivisione delle Informazioni</h2>
            <p>
                Non vendiamo né affittiamo le tue informazioni personali a terzi. Possiamo condividere le tue informazioni con:
                <ul>
                    <li>Fornitori di servizi che ci assistono nel fornire il nostro servizio.</li>
                    <li>Autorità legali se richiesto dalla legge.</li>
                </ul>
            </p>

            <h2>Sicurezza dei Dati</h2>
            <p>
                Ci impegniamo a proteggere le tue informazioni. Utilizziamo misure di sicurezza appropriate per prevenire accessi non autorizzati o divulgazioni.
            </p>

            <h2>I Tuoi Diritti</h2>
            <p>
                Hai il diritto di:
                <ul>
                    <li>Richiedere l&apos; accesso ai tuoi dati personali.</li>
                    <li>Richiedere la correzione dei tuoi dati personali.</li>
                    <li>Richiedere la cancellazione dei tuoi dati personali.</li>
                    <li>Opporsi al trattamento dei tuoi dati personali.</li>
                </ul>
            </p>

            <h2>Modifiche alla Privacy Policy</h2>
            <p>
                Ci riserviamo il diritto di aggiornare questa Privacy Policy. Ti informeremo di eventuali modifiche pubblicando la nuova Privacy Policy su questa pagina.
            </p>

            <h2>Contatti</h2>
            <p>
                Se hai domande riguardo a questa Privacy Policy, contattaci all&apos;indirizzo email: support@example.com.
            </p>

        </div>
    );
};

export default PrivacyPolicy;