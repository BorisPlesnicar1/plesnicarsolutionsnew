import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum von Plesnicar Solutions (Boris Plesnicar e.U.) – Pflichtangaben gemäß § 5 ECG (Österreich) und Kontaktdaten.",
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
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-[#ff1900]">Impressum</span>
          </h1>

          <div className="space-y-8 text-white/90 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Angaben gemäß § 5 ECG (E-Commerce-Gesetz)</h2>
              <p className="mb-4 text-white/80 text-sm">
                Diese Website wird von einem in <strong>Österreich</strong> niedergelassenen Unternehmen betrieben. Für
                geschäftliche Online-Auftritte gelten die Informationspflichten des{" "}
                <strong>§ 5 ECG</strong>. Entsprechende Pflichten aus dem deutschen TMG können für Besucher aus Deutschland
                inhaltlich vergleichbar sein; maßgeblich für unser Impressum ist das österreichische Recht.
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Boris Plesnicar e.U.</strong>
              </p>
              <p className="mb-2">
                Plesnicar Solutions
              </p>
              <p className="mb-2">
                Hartriegelstraße 12
              </p>
              <p className="mb-2">
                3550 Langenlois
              </p>
              <p>
                Österreich
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Kontakt</h2>
              <p className="mb-2">
                <strong className="text-white font-semibold">E-Mail:</strong>{" "}
                <a href="mailto:plesnicaroffice@gmail.com" className="text-[#ff1900] hover:underline">
                  plesnicaroffice@gmail.com
                </a>
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Festnetz:</strong>{" "}
                <a href="tel:+43273432048" className="text-[#ff1900] hover:underline">
                  02734/32048
                </a>
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Mobil (Schwerpunkt IT & Grafik):</strong>{" "}
                <a href="tel:+436644678382" className="text-[#ff1900] hover:underline">
                  +43 664 4678382
                </a>
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Mobil (Unterstützung Bau):</strong>{" "}
                <a href="tel:+436763206308" className="text-[#ff1900] hover:underline">
                  +43 676 3206308
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Umsatzsteuer</h2>
              <p className="mb-2">
                <strong className="text-white font-semibold">Hinweis:</strong> Es wird keine Umsatzsteuer verrechnet.
                Umsatzsteuerbefreit – Kleinunternehmer gem. § 6 Abs. 1 Z 27 UStG.
              </p>
              <p className="text-white/80 text-sm">
                Bis zu einem Umsatz von 55.000€ pro Jahr ist keine Umsatzsteuer-ID erforderlich.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Aufsichtsbehörde</h2>
              <p>
                Bezirkshauptmannschaft Krems
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Medieninhaber und Inhalte (Mediengesetz)</h2>
              <p className="mb-4 text-white/80 text-sm">
                Soweit einschlägig gelten die Vorgaben des österreichischen Mediengesetzes (MedienG) zu Medieninhaberschaft
                und redaktionell-medialen Inhalten. Verantwortlich für den redaktionellen Inhalt dieser Website:
              </p>
              <p className="mb-2">
                Boris Plesnicar
              </p>
              <p className="mb-2">
                Hartriegelstraße 12
              </p>
              <p>
                3550 Langenlois, Österreich
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Haftungsausschluss</h2>
              
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Haftung für Inhalte</h3>
                  <p>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Haftung für Links</h3>
                  <p>
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem{" "}
                    <strong>österreichischen Urheberrecht</strong> (UrhG). Vervielfältigung, Bearbeitung, Verbreitung und
                    jede Art der Verwertung außerhalb der gesetzlichen Grenzen bedürfen der schriftlichen Zustimmung des
                    jeweiligen Rechteinhabers.
                  </p>
                </div>
              </div>
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
