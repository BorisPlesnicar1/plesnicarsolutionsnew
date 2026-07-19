import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum von Plesnicar Solutions (Boris Plesnicar) – Offenlegung gemäß § 5 (1) ECG, § 25 MedienG, § 63 GewO und § 14 UGB.",
  alternates: {
    canonical: "/impressum",
    languages: { de: "/impressum", en: "/impressum-en" },
  },
};

export default function Impressum() {
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
      <main className="container mx-auto max-w-4xl px-6 py-32 relative z-10">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 mb-12 font-medium"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2} />
          Zurück zur Startseite
        </Link>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-10 md:p-16 space-y-8">
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            <span className="text-[#ff1900]">Impressum</span>
          </h1>
          <p className="text-white/60 text-sm mb-8">
            Informationen und Offenlegung gemäß § 5 (1) ECG, § 25 MedienG, § 63 GewO und § 14 UGB
          </p>

          <div className="space-y-8 text-white/90 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Webseitenbetreiber</h2>
              <p className="mb-2">
                <strong className="text-white font-semibold">Boris Plesnicar</strong>
              </p>
              <p className="mb-4">Plesnicar Solutions</p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Anschrift:</strong> Hartriegelstraße 12, 3550 Langenlois, Österreich
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">UID-Nr.:</strong> ATU83447003
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Gewerbeaufsichtsbehörde:</strong> Bezirkshauptmannschaft Krems
              </p>
              <p>
                <strong className="text-white font-semibold">Mitgliedschaften:</strong> Wirtschaftskammer Österreich (WKO)
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Kontaktdaten</h2>
              <p className="mb-2">
                <strong className="text-white font-semibold">Telefon:</strong>{" "}
                <a href="tel:+43273432048" className="text-[#ff1900] hover:underline">
                  02734/32048
                </a>
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">E-Mail:</strong>{" "}
                <a href="mailto:plesnicaroffice@gmail.com" className="text-[#ff1900] hover:underline">
                  plesnicaroffice@gmail.com
                </a>
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Mobil (Schwerpunkt IT &amp; Grafik):</strong>{" "}
                <a href="tel:+436644678382" className="text-[#ff1900] hover:underline">
                  +43 664 4678382
                </a>
              </p>
              <p>
                <strong className="text-white font-semibold">Mobil (Unterstützung Bau):</strong>{" "}
                <a href="tel:+436763206308" className="text-[#ff1900] hover:underline">
                  +43 676 3206308
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Berufsrechtliche Angaben</h2>
              <p className="mb-2">
                <strong className="text-white font-semibold">Berufsbezeichnung:</strong> IT-Dienstleister
              </p>
              <p>
                <strong className="text-white font-semibold">Anwendbare Rechtsvorschrift:</strong> Gewerbeordnung (GewO), abrufbar unter{" "}
                <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                  www.ris.bka.gv.at
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Online-Streitbeilegung</h2>
              <p>
                Verbraucher, welche in Österreich oder in einem sonstigen Vertragsstaat der ODR-VO niedergelassen sind,
                haben die Möglichkeit, Probleme bezüglich dem entgeltlichen Kauf von Waren oder Dienstleistungen im Rahmen
                einer Online-Streitbeilegung (nach OS, AStG) zu lösen. Die Europäische Kommission stellt eine Plattform
                hierfür bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Urheberrecht</h2>
              <p>
                Die Inhalte dieser Webseite unterliegen, soweit dies rechtlich möglich ist, diversen Schutzrechten
                (z. B. dem Urheberrecht). Jegliche Verwendung/Verbreitung von bereitgestelltem Material, welche
                urheberrechtlich untersagt ist, bedarf schriftlicher Zustimmung des Webseitenbetreibers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Haftungsausschluss</h2>
              <div className="space-y-4 mt-4">
                <p>
                  Trotz sorgfältiger inhaltlicher Kontrolle übernimmt der Webseitenbetreiber dieser Webseite keine Haftung
                  für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
                  verantwortlich. Sollten Sie dennoch auf ausgehende Links aufmerksam werden, welche auf eine Webseite mit
                  rechtswidriger Tätigkeit/Information verweisen, ersuchen wir um dementsprechenden Hinweis, um diese nach
                  § 17 Abs. 2 ECG umgehend zu entfernen.
                </p>
                <p>
                  Die Urheberrechte Dritter werden vom Betreiber dieser Webseite mit größter Sorgfalt beachtet. Sollten Sie
                  trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.
                  Bei Bekanntwerden derartiger Rechtsverletzungen werden wir den betroffenen Inhalt umgehend entfernen.
                </p>
              </div>
            </section>

            <p className="text-white/40 text-xs pt-2">Quelle: fairesrecht.at</p>
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
              <Link href="/impressum" className="text-white font-medium text-sm">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
