import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Imprint (English)",
  description:
    "Legal disclosure (Imprint) for Plesnicar Solutions (Boris Plesnicar) – Austria. English information; German version is authoritative where required by law.",
  alternates: {
    canonical: "/impressum-en",
    languages: { de: "/impressum", en: "/impressum-en" },
  },
};

export default function ImpressumEn() {
  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff1900]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ff1900]/3 rounded-full blur-[150px]" />
      </div>

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

      <main className="container mx-auto max-w-4xl px-6 py-32 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 mb-12 font-medium"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2} />
          Back to home
        </Link>

        <p className="text-sm text-white/50 mb-6">
          This page is an English convenience translation. For mandatory disclosures under Austrian law, see the{" "}
          <Link href="/impressum" className="text-[#ff1900] hover:underline">
            German Imprint
          </Link>
          .
        </p>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-10 md:p-16 space-y-8">
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            <span className="text-[#ff1900]">Imprint</span>
          </h1>
          <p className="text-white/60 text-sm mb-8">
            Information and disclosure under Section 5 (1) ECG, Section 25 MedienG, Section 63 GewO and Section 14 UGB
            (Austria)
          </p>

          <div className="space-y-8 text-white/90 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Website operator</h2>
              <p className="mb-2">
                <strong className="text-white font-semibold">Boris Plesnicar</strong>
              </p>
              <p className="mb-4">Plesnicar Solutions</p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Address:</strong> Hartriegelstraße 12, 3550 Langenlois, Austria
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">VAT ID (UID):</strong> ATU83447003
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Trade supervisory authority:</strong> Bezirkshauptmannschaft Krems (District Administration Krems)
              </p>
              <p>
                <strong className="text-white font-semibold">Memberships:</strong> Austrian Federal Economic Chamber (WKO)
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p className="mb-2">
                <strong className="text-white font-semibold">Phone:</strong>{" "}
                <a href="tel:+43273432048" className="text-[#ff1900] hover:underline">
                  02734/32048
                </a>
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Email:</strong>{" "}
                <a href="mailto:plesnicaroffice@gmail.com" className="text-[#ff1900] hover:underline">
                  plesnicaroffice@gmail.com
                </a>
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Mobile (IT &amp; design – primary focus):</strong>{" "}
                <a href="tel:+436644678382" className="text-[#ff1900] hover:underline">
                  +43 664 4678382
                </a>
              </p>
              <p>
                <strong className="text-white font-semibold">Mobile (construction support):</strong>{" "}
                <a href="tel:+436763206308" className="text-[#ff1900] hover:underline">
                  +43 676 3206308
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Professional information</h2>
              <p className="mb-2">
                <strong className="text-white font-semibold">Professional title:</strong> IT service provider
              </p>
              <p>
                <strong className="text-white font-semibold">Applicable legislation:</strong> Austrian Trade Act (GewO), available at{" "}
                <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                  www.ris.bka.gv.at
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Online dispute resolution</h2>
              <p>
                Consumers established in Austria or in another contracting state of the ODR Regulation may resolve disputes
                relating to the paid purchase of goods or services through online dispute resolution. The European
                Commission provides a platform for this purpose:{" "}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Copyright</h2>
              <p>
                The contents of this website are, to the extent legally possible, subject to various protective rights
                (e.g. copyright). Any use or distribution of the material provided that is prohibited under copyright law
                requires the written consent of the website operator.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
              <div className="space-y-4 mt-4">
                <p>
                  Despite careful review of content, the website operator accepts no liability for the content of external
                  links. The respective operators are solely responsible for the content of the linked pages. Should you
                  become aware of any outgoing links that point to a website with unlawful activity or information, we ask
                  that you notify us accordingly so that we can remove them promptly in accordance with Section 17 (2) ECG.
                </p>
                <p>
                  Third-party copyrights are observed with the utmost care by the operator of this website. Should you
                  nevertheless become aware of a copyright infringement, please let us know. Upon becoming aware of such
                  infringements, we will remove the affected content promptly.
                </p>
              </div>
            </section>

            <p className="text-white/40 text-xs pt-2">Source: fairesrecht.at</p>
          </div>
        </div>
      </main>

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
              <p className="font-light text-sm text-white/60">
                © {new Date().getFullYear()} Plesnicar Solutions. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/impressum" className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm">
                Impressum (DE)
              </Link>
              <Link href="/datenschutz-en" className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm">
                Privacy (EN)
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
