import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Imprint (English)",
  description:
    "Legal disclosure (Imprint) for Plesnicar Solutions (Boris Plesnicar e.U.) – Austria. English information; German version is authoritative where required by law.",
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
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-[#ff1900]">Imprint</span>
          </h1>

          <div className="space-y-8 text-white/90 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information under Section 5 ECG (Austria)</h2>
              <p className="mb-4 text-white/80 text-sm">
                This website is operated by a business established in <strong>Austria</strong>. Mandatory online disclosure
                requirements follow Austrian law (ECG). Visitors from Germany may see comparable duties under the German TMG;
                Austrian law governs this imprint.
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Boris Plesnicar e.U.</strong>
              </p>
              <p className="mb-2">Plesnicar Solutions</p>
              <p className="mb-2">Hartriegelstraße 12</p>
              <p className="mb-2">3550 Langenlois</p>
              <p>Austria</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p className="mb-2">
                <strong className="text-white font-semibold">Email:</strong>{" "}
                <a href="mailto:plesnicaroffice@gmail.com" className="text-[#ff1900] hover:underline">
                  plesnicaroffice@gmail.com
                </a>
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Landline:</strong>{" "}
                <a href="tel:+43273432048" className="text-[#ff1900] hover:underline">
                  02734/32048
                </a>
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Mobile (IT & design – primary focus):</strong>{" "}
                <a href="tel:+436644678382" className="text-[#ff1900] hover:underline">
                  +43 664 4678382
                </a>
              </p>
              <p className="mb-2">
                <strong className="text-white font-semibold">Mobile (construction support):</strong>{" "}
                <a href="tel:+436763206308" className="text-[#ff1900] hover:underline">
                  +43 676 3206308
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">VAT</h2>
              <p className="mb-2">
                <strong className="text-white font-semibold">Note:</strong> VAT exempt – small business under Section 6 (1)
                lit. 27 Austrian VAT Act (UStG).
              </p>
              <p className="text-white/80 text-sm">No VAT ID is required up to the applicable annual turnover threshold.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Supervisory authority</h2>
              <p>Bezirkshauptmannschaft Krems (District Administration Krems)</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Media owner & editorial content</h2>
              <p className="mb-4 text-white/80 text-sm">
                Where the Austrian Media Act (MedienG) applies, the following person is responsible for editorial content:
              </p>
              <p className="mb-2">Boris Plesnicar</p>
              <p className="mb-2">Hartriegelstraße 12</p>
              <p>3550 Langenlois, Austria</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Content</h3>
                  <p>
                    We prepare our pages carefully but cannot guarantee completeness, accuracy or timeliness. As a service
                    provider we are responsible for our own content on these pages under general law.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Links</h3>
                  <p>
                    Our site may link to third-party websites we do not control. We are not responsible for their content;
                    the respective operator is responsible.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Copyright</h3>
                  <p>
                    Content created by us is protected under <strong>Austrian copyright law</strong>. Use beyond statutory
                    limits requires written consent from the rights holder.
                  </p>
                </div>
              </div>
            </section>
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
