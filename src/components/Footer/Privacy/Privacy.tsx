import React from 'react';
import imgUrl from 'src/assets/img/beams-basic.png';
const Privacy = () => {
  return (
    <div className="relative -mt-[5.75rem] overflow-hidden pt-[5.75rem]">
      <img
        src={imgUrl}
        alt=""
        className="absolute left-1/2 top-0 -ml-[39rem] w-[113.125rem] max-w-none"
        data-xblocker="passed"
        style={{ visibility: 'visible' }}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Datenschutzrichtlinie
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
          Letzte Aktualisierung: 4. Mai 2023
          </p>
        </div>
      </div>
      <div className="relative px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[50rem] prose-xl prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600">
          <p>
          Willkommen bei Wunschlachen! Wunschlachen ist eine von Künstlicher Intelligenz (KI) unterstützte Website, die Benutzern hilft, die Lesezeit zu reduzieren und Vorschläge basierend auf ihren Vorlieben zu machen. Diese Datenschutzrichtlinie erklärt, wie wir Ihre persönlichen Daten sammeln, verwenden, teilen und schützen, wenn Sie unsere Website nutzen. Durch die Nutzung unserer Website stimmen Sie der Sammlung und Verwendung Ihrer Daten gemäß dieser Datenschutzrichtlinie zu.
          </p>
          <h2>Informationen, die wir sammeln</h2>
          <h3>1.1. Persönliche Informationen</h3>
          <p>
          Wenn Sie ein Konto auf Wunschlachen erstellen, sammeln wir persönliche Informationen wie Ihren Namen, Ihre E-Mail-Adresse und Ihr Passwort. Diese Informationen werden verwendet, um Sie zu identifizieren und zu authentifizieren, Ihnen Zugang zu unseren Diensten zu gewähren und mit Ihnen über Ihr Konto zu kommunizieren.
          </p>
          <h3>1.2. Nutzungsdaten</h3>
          <p>
          Wir erfassen automatisch Nutzungsdaten, wenn Sie mit unserer Website interagieren, einschließlich der Seiten, die Sie besuchen, der auf der Website verbrachten Zeit und anderer Nutzungsstatistiken. Diese Daten helfen uns zu verstehen, wie Benutzer mit unserer Website interagieren und unsere Dienste zu verbessern.
          </p>
          <h3>1.3. Cookies</h3>
          <p>
          Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden und es uns ermöglichen, Ihre Vorlieben zu speichern und personalisierte Inhalte zu liefern.
          </p>
          <h2>
          Wie wir Ihre Informationen verwenden Wir verwenden Ihre persönlichen Daten, um:
          </h2>
          <h3>
          Unsere Dienste bereitzustellen und Ihre Erfahrung auf unserer Website zu verbessern
          </h3>
          <p>
          Inhalte zu personalisieren und Empfehlungen zu geben Mit Ihnen über Ihr Konto und unsere Dienste zu kommunizieren Zu analysieren und zu verstehen, wie unsere Website genutzt wird Technische und Sicherheitsprobleme zu erkennen, zu verhindern und zu beheben Ihre Informationen teilen Wir verkaufen oder vermieten Ihre persönlichen Daten nicht an Dritte. Wir können Ihre Daten unter folgenden Umständen teilen:
          </p>
          <h3>
          Mit Dienstleistern, die uns bei Betrieb und Wartung unserer Website helfen
          </h3>
          <p>
          Wenn es das Gesetz, eine Vorschrift oder ein rechtlicher Prozess erfordert Um die Rechte, das Eigentum oder die Sicherheit von Wunschlachen, unseren Benutzern oder der Öffentlichkeit zu schützen Im Zusammenhang mit einer Fusion, Übernahme oder anderen Geschäftstransaktion Datenschutz Wir nehmen die Sicherheit Ihrer persönlichen Daten ernst und haben technische und organisatorische Maßnahmen implementiert, um Ihre Informationen vor unbefugtem Zugriff, Offenlegung, Veränderung oder Zerstörung zu schützen.
          </p>
          <h2>Links zu Drittanbietern</h2>
          <p>
          Unsere Website kann Links zu Websites Dritter enthalten. Diese Datenschutzrichtlinie gilt nicht für die Datenschutzpraktiken dieser Websites, und wir ermutigen Sie, deren Datenschutzrichtlinien zu überprüfen, bevor Sie ihnen persönliche Informationen zur Verfügung stellen.
          </p>
          <h2>Datenschutz für Kinder</h2>
          <p>
          Unsere Website ist nicht für die Nutzung durch Kinder unter 13 Jahren vorgesehen. Wir sammeln wissentlich keine persönlichen Daten von Kindern unter 13 Jahren. Wenn wir erfahren, dass ein Kind unter 13 Jahren uns persönliche Daten zur Verfügung gestellt hat, werden wir Schritte unternehmen, um solche Informationen aus unseren Aufzeichnungen zu löschen.
          </p>
          <h2>Kontakt zu uns</h2>
          <p>
          Wenn Sie Fragen oder Bedenken zu dieser Datenschutzrichtlinie oder unseren Datenschutzpraktiken haben, kontaktieren Sie uns bitte unter:
          </p>
          <p>Wunschlachen AI</p>
          <p>
            Email:{' '}
            <a href="mailto:martin.paetz@wunschlachen.de">martin.paetz@wunschlachen.de</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

