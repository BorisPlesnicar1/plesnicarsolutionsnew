import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy policy (English)",
  description:
    "Privacy information for Plesnicar Solutions – processing of personal data (GDPR context). English summary; German version is authoritative where required.",
  alternates: {
    canonical: "/datenschutz-en",
    languages: { de: "/datenschutz", en: "/datenschutz-en" },
  },
};

export default function DatenschutzEn() {
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

      <main className="container mx-auto max-w-3xl lg:max-w-4xl px-4 sm:px-6 py-28 sm:py-32 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 mb-12 font-medium"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2} />
          Back to home
        </Link>

        <p className="text-sm text-white/50 mb-6">
          This is an English overview for international visitors. The binding legal text under EU/Austrian law is the{" "}
          <Link href="/datenschutz" className="text-[#ff1900] hover:underline">
            German privacy policy
          </Link>
          .
        </p>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10 md:p-16 space-y-8 break-words">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-[#ff1900]">Privacy policy</span>
          </h1>

          <div className="space-y-8 text-white/90 font-light leading-relaxed">
            <section>
              <h3 className="text-xl font-bold text-white mb-4">Controller & scope</h3>
              <p className="mb-4">
                This policy describes how we process personal data when you use our website. The legal framework includes the{" "}
                <strong>GDPR</strong> and, where applicable, the <strong>Austrian Telecommunications Act 2021 (TKG 2021)</strong>{" "}
                for cookies and similar technologies on your device.
              </p>
              <p className="mb-4">
                When you access the site, technical data such as your IP address and server logs may be processed for security
                and operation (legitimate interests under Art. 6 (1) lit. f GDPR).
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Images & self-hosted content</h3>
              <p className="mb-4">
                Photos and graphics (including the portfolio) are served from our own hosting. No extra third-party tracking
                cookies are required for that content. Optional embedded social content (Instagram) is loaded only after you
                consent separately (see below). We do not name business partners or customers in public text where unnecessary;
                identifiable persons in images are published only with a valid legal basis.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Local storage & consent banner</h3>
              <p className="mb-4">
                We store your privacy choice and language preference in your browser&apos;s <strong>local storage</strong>. Legal
                basis for the language setting is Art. 6 (1) (f) GDPR (user-friendly operation); for consent to optional
                content, Art. 6 (1) (a) GDPR together with applicable ePrivacy rules. Retention until you clear site data or use
                “Cookie settings” in the footer to withdraw consent.
              </p>
              <p className="mb-4">
                <strong>Required:</strong> site operation, security, language. <strong>Optional (only with consent):</strong>{" "}
                <strong>Google Maps</strong> (contact page) and <strong>Instagram</strong> (home). Without consent, no data is
                sent to Google or Meta for those embeds.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Google Maps</h3>
              <p className="mb-4">
                With consent, maps may be provided by <strong>Google Ireland Limited</strong>. Personal data (e.g. IP address)
                may be transferred to Google and processed in third countries. Google provides standard contractual clauses and
                other safeguards; see Google&apos;s privacy policy.
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>
                  <a
                    href="https://policies.google.com/privacy?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff1900] hover:underline"
                  >
                    Google Privacy Policy
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Instagram (embedded profile)</h3>
              <p className="mb-4">
                On the home page we may show an embedded Instagram profile. Provider is <strong>Meta Platforms Ireland Limited</strong>{" "}
                (Ireland). Loading may transfer personal data (e.g. IP address) to Meta and process it in third countries. The
                embed is shown <strong>only after your consent</strong> under Art. 6 (1) (a) GDPR and applicable ePrivacy rules.
                Without consent, the embed is not loaded; you can still use a direct link to our public profile.
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>
                  <a
                    href="https://privacycenter.instagram.com/policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ff1900] hover:underline"
                  >
                    Meta / Instagram privacy policy
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Contact form & email</h3>
              <p className="mb-4">
                If you contact us via the form or email, we process the data you send to handle your request, typically for up to
                six months, unless longer retention is required by law. We do not share your message with third parties without
                legal basis or consent.
              </p>
              <p className="mb-4">
                Form delivery uses <strong>Resend</strong> (Resend Inc., USA). Legal basis: Art. 6 (1) (b) GDPR (responding to
                your enquiry). Appropriate safeguards apply for transfers to the UK/US. See{" "}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#ff1900] hover:underline">
                  resend.com/legal/privacy-policy
                </a>
                .
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Fonts</h3>
              <p className="mb-4">
                We use Montserrat from Google Fonts. Fonts are bundled at build time via Next.js and served from our site, so
                regular page views do not load fonts directly from Google servers.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Server logs</h3>
              <p className="mb-4">
                Our host may log technical data (IP, browser, timestamps, pages visited, etc.) for security and stability. Data
                is not used for profiling or marketing by us.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Your rights</h3>
              <p className="mb-4">You may have rights including access, rectification, erasure, restriction, portability, and objection.</p>
              <p className="mb-4">
                If you believe processing violates privacy law, you may contact us at{" "}
                <a href="mailto:plesnicaroffice@gmail.com" className="text-[#ff1900] hover:underline">
                  plesnicaroffice@gmail.com
                </a>{" "}
                or lodge a complaint with a supervisory authority.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
              <p className="mb-4">
                <strong className="text-white font-semibold">Operator:</strong> Plesnicar Solutions / Boris Plesnicar e.U.
                <br />
                <strong className="text-white font-semibold">Landline:</strong> 02734/32048
                <br />
                <strong className="text-white font-semibold">Email:</strong>{" "}
                <a href="mailto:plesnicaroffice@gmail.com" className="text-[#ff1900] hover:underline">
                  plesnicaroffice@gmail.com
                </a>
              </p>
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
              <Link href="/impressum-en" className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm">
                Imprint (EN)
              </Link>
              <Link href="/datenschutz" className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm">
                Datenschutz (DE)
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
