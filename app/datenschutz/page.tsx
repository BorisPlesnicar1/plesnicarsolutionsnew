import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von Plesnicar Solutions – Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  alternates: { canonical: "/datenschutz" },
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
                im Rahmen unserer Webseite. Wir erheben und verarbeiten personenbezogene Daten nur auf Grundlage der gesetzlichen
                Bestimmungen (Datenschutzgrundverordnung, Telekommunikationsgesetz 2003).
              </p>
              <p className="mb-6">
                Sobald Sie als Benutzer auf unsere Webseite zugreifen oder diese besuchen wird Ihre IP-Adresse, Beginn sowie Beginn und Ende der Sitzung erfasst. Dies ist
                technisch bedingt und stellt somit ein berechtigtes Interesse iSv Art 6 Abs 1 lit f DSGVO.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Kontakt mit uns</h3>
              <p className="mb-4">
                Wenn Sie uns, entweder über unser Kontaktformular auf unserer Webseite, oder per Email kontaktieren,
                dann werden die von Ihnen an uns übermittelten Daten zwecks Bearbeitung Ihrer Anfrage oder für den Fall von weiteren
                Anschlussfragen für sechs Monate bei uns gespeichert. Es erfolgt, ohne Ihre Einwilligung, keine Weitergabe Ihrer übermittelten Daten.
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
                Google verarbeitet die Daten auch in den USA, hat sich jedoch dem
                EU-US Privacy-Shield unterworfen.
              </p>
              <p className="mb-4">
                <a href="https://www.privacyshield.gov/EU-US-Framework" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                  https://www.privacyshield.gov/EU-US-Framework
                </a>
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
