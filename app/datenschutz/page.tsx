import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von Plesnicar Solutions – Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  alternates: {
    canonical: "/datenschutz",
    languages: { de: "/datenschutz", en: "/datenschutz-en" },
  },
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[#212121] text-white">
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff1900]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ff1900]/3 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#212121]/95 backdrop-blur-xl border-b border-white/5">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center -ml-2">
            <Image
              src="/logos/LogoTEXTB.png"
              alt="Plesnicar Solutions Logo"
              width={200}
              height={60}
              className="h-14 md:h-16 w-auto"
              priority
            />
          </Link>
        </nav>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-3xl lg:max-w-4xl px-4 sm:px-6 py-28 sm:py-32 relative z-10">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 mb-12 font-medium"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2} />
          Zurück zur Startseite
        </Link>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10 md:p-16 space-y-8 break-words">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-[#ff1900]">Datenschutzerklärung</span>
          </h1>

          <div className="space-y-8 text-white/90 font-light leading-relaxed">
            <section>
              <h3 className="text-xl font-bold text-white mb-4">Erklärung zur Informationspflicht</h3>
              <p className="text-center text-lg font-semibold text-white mb-6">
                <strong>Datenschutzerklärung</strong>
              </p>
              <p className="mb-4">
                In folgender Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung
                im Rahmen unserer Website. Maßgeblich sind die{" "}
                <strong>Datenschutz-Grundverordnung (DSGVO)</strong> sowie das{" "}
                <strong>österreichische Telekommunikationsgesetz 2021 (TKG 2021)</strong> – letzteres u. a. für den Einsatz von
                Cookies und ähnlichen Technologien auf Ihrem Endgerät, soweit einschlägig.
              </p>
              <p className="mb-6">
                Beim Zugriff auf unsere Website werden technisch bedingt u. a. Ihre IP-Adresse sowie Beginn und Ende der Nutzung
                (Server- bzw. Hosting-Logs) verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (betriebswirtschaftlicher
                Betrieb und Sicherheit des Webangebots).
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Bilder, Portfolio und selbst gehostete Inhalte</h3>
              <p className="mb-4">
                Fotos und Grafiken auf dieser Website (einschließlich Bildern im Portfolio) werden über unsere eigene
                Domain und unseren Hosting-Anbieter ausgeliefert. Dafür sind <strong>keine gesonderten Cookies</strong> für
                diese Inhalte erforderlich – abgesehen von der allgemeinen technischen Verarbeitung beim Aufruf der Seite
                (siehe Server-Logfiles). Optional eingebettete Social-Media-Inhalte (Instagram) werden erst nach gesonderter
                Einwilligung geladen (siehe unten).
              </p>
              <p className="mb-4">
                Soweit auf Fotos Personen erkennbar sein könnten, werden Aufnahmen nur im Rahmen der jeweils erforderlichen
                Rechtsgrundlagen veröffentlicht (z. B. Einwilligung oder berechtigtes Interesse unter Abwägung mit
                Persönlichkeitsrechten). Im Zweifel werden keine Namen von Geschäftspartnern oder Kunden im öffentlichen Text
                der Website genannt.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Cookies, lokaler Speicher und Einwilligungsbanner</h3>
              <p className="mb-4">
                Für die Speicherung Ihrer <strong>Datenschutzeinstellung</strong> sowie der <strong>Sprachwahl</strong>{" "}
                verwenden wir den <strong>lokalen Speicher Ihres Browsers</strong> (Local Storage). Rechtsgrundlage für die
                technisch notwendige Speicherung der Spracheinstellung ist Art. 6 Abs. 1 lit. f DSGVO (nutzerfreundlicher Betrieb);
                für die Speicherung Ihrer Einwilligung in optionale Inhalte ist Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 165 Abs. 3
                TKG 2021 maßgeblich. Die Speicherdauer entspricht der Dauer der Speicherung in Ihrem Browser, bis Sie die
                Website-Daten löschen oder über „Cookie-Einstellungen“ im Footer die Auswahl widerrufen.
              </p>
              <p className="mb-4">
                <strong>Erforderlich:</strong> Betrieb der Website, Sicherheit, Sprachwahl. <strong>Optional (nur mit
                Einwilligung):</strong> Einbindung von <strong>Google Maps</strong> (Kontaktseite) und <strong>Instagram</strong>{" "}
                (Startseite). Ohne Einwilligung werden diese Drittanbieter-Inhalte nicht geladen; es findet dann keine
                Datenübermittlung an Google bzw. Meta zu diesem Zweck statt.
              </p>
              <p className="mb-4">
                Sie können eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie im Footer
                „Cookie-Einstellungen“ wählen (Banner erscheint erneut) oder die gespeicherten Daten dieser Website in Ihrem
                Browser löschen.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Google Maps (eingebettete Karte)</h3>
              <p className="mb-4">
                Wenn Sie der optionalen Kategorie zustimmen, kann im Kontaktbereich eine Karte von{" "}
                <strong>Google Ireland Limited</strong> (Gordon House, Barrow Street, Dublin 4, Irland) geladen werden. Dabei
                können personenbezogene Daten (u. a. IP-Adresse, Nutzungsdaten) an Google übermittelt und in Drittländern
                (z. B. USA) verarbeitet werden. Google stellt hierzu u. a. Standardvertragsklauseln der EU-Kommission bereit;
                näheres entnehmen Sie der Datenschutzerklärung von Google.
              </p>
              <p className="mb-4">
                Rechtsgrundlage für die Einbindung nach Ihrer Auswahl ist Ihre <strong>Einwilligung</strong> gemäß Art. 6 Abs. 1
                lit. a DSGVO i. V. m. TKG 2021. Sie können Ihre Einstellung widerrufen, indem Sie den lokalen Speicher für diese
                Website löschen und die Seite erneut besuchen.
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>
                  <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                    Google Datenschutzerklärung
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Instagram (eingebettetes Profil)</h3>
              <p className="mb-4">
                Auf der Startseite können wir ein eingebettetes Profil von <strong>Instagram</strong> anzeigen. Anbieter
                ist die <strong>Meta Platforms Ireland Limited</strong> (4 Grand Canal Square, Grand Canal Harbour, Dublin 2,
                Irland). Beim Laden können personenbezogene Daten (u. a. IP-Adresse, Nutzungsdaten) übermittelt und in
                Drittländern verarbeitet werden. Die Einbindung erfolgt <strong>nach Ihrer Einwilligung</strong> gemäß Art. 6
                Abs. 1 lit. a DSGVO i. V. m. § 165 Abs. 3 TKG 2021. Ohne Einwilligung wird der eingebettete Inhalt nicht
                geladen; Sie können stattdessen einen Link zu unserem öffentlichen Profil nutzen.
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>
                  <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                    Datenschutzrichtlinie von Meta / Instagram
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Kontakt mit uns</h3>
              <p className="mb-4">
                Wenn Sie uns, entweder über unser Kontaktformular auf unserer Webseite, oder per Email kontaktieren,
                dann werden die von Ihnen an uns übermittelten Daten zwecks Bearbeitung Ihrer Anfrage oder für den Fall von weiteren
                Anschlussfragen für sechs Monate bei uns gespeichert. Es erfolgt, ohne Ihre Einwilligung, keine Weitergabe Ihrer übermittelten Daten.
              </p>
              <p className="mb-4">
                Der Versand von Nachrichten aus dem Kontaktformular erfolgt über den Dienst <strong>Resend</strong> (Resend Inc.,
                USA). Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung bzw. Beantwortung Ihrer Anfrage). Mit
                Resend bestehen geeignete Garantien für Datenübermittlungen in Drittländer (u. a. EU-Standardvertragsklauseln).
                Informationen:{" "}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                  resend.com/legal/privacy-policy
                </a>
                .
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Google Fonts</h3>
              <p className="mb-4">
                Unsere Website verwendet Schriftarten von „Google Fonts". Der
                Dienstanbieter dieser Funktion ist:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Google Ireland Limited Gordon House, Barrow Street Dublin 4. Ireland</li>
              </ul>
              <p className="mb-4">
                Tel: +353 1 543 1000
              </p>
              <p className="mb-4">
                Unsere Website verwendet die Schriftart Montserrat von Google Fonts. Die Schriftarten werden 
                über Next.js zur Build-Zeit geladen und lokal gehostet, sodass keine direkte Verbindung zu 
                Google-Servern beim Seitenaufruf besteht und keine Cookies von Google gesetzt werden.
              </p>
              <p className="mb-4">
                Die Nutzung von „Google-Fonts" dient der Optimierung unserer Dienstleistung
                und der einheitlichen Darstellung von Inhalten. Dies stellt ein
                berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
              </p>
              <p className="mb-4">
                Weitere Informationen zu Google Fonts erhalten Sie unter folgendem Link:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>
                  <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                    https://developers.google.com/fonts/faq
                  </a>
                </li>
              </ul>
              <p className="mb-4">
                Weitere Informationen über den Umgang mit Nutzerdaten von Google können Sie
                der Datenschutzerklärung entnehmen:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>
                  <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                    https://policies.google.com/privacy?hl=de
                  </a>
                </li>
              </ul>
              <p className="mb-4">
                Soweit Google Daten in Drittländern verarbeitet, erfolgt dies auf Grundlage der von Google beschriebenen
                Garantien (u. a. EU-Standardvertragsklauseln, ggf. EU-US Data Privacy Framework). Details finden Sie in der
                aktuellen Datenschutzerklärung von Google; der EuGH hat das frühere „Privacy Shield“-Abkommen nicht mehr als
                ausreichende Grundlage anerkannt – wir verweisen deshalb auf die von Google genannten aktuellen Übermittlungsmechanismen.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Server-Log Files</h3>
              <p className="mb-4">
                Diese Webseite und der damit verbundene Provider erhebt im Zuge der
                Webseitennutzung automatisch Informationen im Rahmen sogenannter
                „Server-Log Files". Dies betrifft insbesondere:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>IP-Adresse oder Hostname</li>
                <li>den verwendeten Browser</li>
                <li>Aufenthaltsdauer auf der Webseite sowie Datum und Uhrzeit</li>
                <li>aufgerufene Seiten der Webseite</li>
                <li>Spracheinstellungen und Betriebssystem</li>
                <li>„Leaving-Page" (auf welcher URL hat der Benutzer die Webseite verlassen)</li>
                <li>ISP (Internet Service Provider)</li>
              </ul>
              <p className="mb-4">
                Diese erhobenen Informationen werden nicht personenbezogen verarbeitet oder
                mit personenbezogenen Daten in Verbindung gebracht.
              </p>
              <p className="mb-4">
                Der Webseitenbetreiber behält es sich vor, im Falle von Bekanntwerden
                rechtswidriger Tätigkeiten, diese Daten auszuwerten oder zu überprüfen.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Ihre Rechte als Betroffener</h3>
              <p className="mb-4">
                Sie als Betroffener haben bezüglich Ihrer Daten, welche bei uns gespeichert sind grundsätzlich ein Recht auf:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Auskunft</li>
                <li>Löschung der Daten</li>
                <li>Berichtigung der Daten</li>
                <li>Übertragbarkeit der Daten</li>
                <li>Widerruf und Widerspruch zur Datenverarbeitung</li>
                <li>Einschränkung</li>
              </ul>
              <p className="mb-4">
                Wenn sie vermuten, dass im Zuge der Verarbeitung Ihrer Daten Verstöße gegen das Datenschutzrecht passiert sind,
                so haben Sie die Möglichkeit sich bei uns (<a href="mailto:plesnicaroffice@gmail.com" className="text-[#ff1900] hover:underline">plesnicaroffice@gmail.com</a>) oder der Datenschutzbehörde zu beschweren.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Sie erreichen uns unter folgenden Kontaktdaten:</h3>
              <p className="mb-4">
                <strong className="text-white font-semibold">Webseitenbetreiber:</strong> Plesnicar Solutions<br />
                <strong className="text-white font-semibold">Telefon (Festnetz):</strong> 02734/32048<br />
                <strong className="text-white font-semibold">Telefon (Mobil):</strong> +43 664 4678382<br />
                <strong className="text-white font-semibold">Email:</strong>{" "}
                <a href="mailto:plesnicaroffice@gmail.com" className="text-[#ff1900] hover:underline">
                  plesnicaroffice@gmail.com
                </a>
              </p>
            </section>

            <section className="pt-4 border-t border-white/10">
              <p className="text-sm text-white/60">
                <span>Rechtstext von </span>Quelle:{" "}
                <a href="https://rechtstexte-generator.at/dsgvo-datenschutz-generator" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                  DSGVO Datenschutz Generator
                </a>{" "}
                in Kooperation mit{" "}
                <strong>
                  <a href="https://rechtsanwaltmedizinrecht.at/" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                    Rechtsanwalt Medizinrecht
                  </a>
                </strong>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5 bg-black/20 mt-20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <Image
                src="/logos/LogoTEXTB.png"
                alt="Plesnicar Solutions Logo"
                width={200}
                height={60}
                className="h-12 md:h-14 w-auto opacity-80"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="font-bold text-white mb-1">Boris Plesnicar e.U.</p>
              <p className="font-light text-sm text-white/60">© {new Date().getFullYear()} Plesnicar Solutions. Alle Rechte vorbehalten.</p>
            </div>
            <div className="flex gap-6">
              <Link href="/impressum" className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-white font-medium text-sm">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
