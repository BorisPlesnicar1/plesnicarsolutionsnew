"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ItBauMicroGame } from "@/app/components/ItBauMicroGame";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { TRANSLATIONS, type Lang } from "@/app/translations";

const LANG_KEY = "ps_lang";

export default function NotFound() {
  const [lang, setLang] = useState<Lang>("de");

  useEffect(() => {
    try {
      const s = window.localStorage.getItem(LANG_KEY);
      if (s === "en") setLang("en");
    } catch {
      /* ignore */
    }
  }, []);

  const t = TRANSLATIONS[lang].notFound;
  const g = TRANSLATIONS[lang].itBauMiniGame;

  const linkClass =
    "min-h-[44px] inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/[0.14] bg-white/[0.05] text-sm font-semibold text-white hover:bg-white/[0.1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070709] transition-colors";

  return (
    <div className="min-h-[min(100dvh,100vh)] flex flex-col items-center justify-center px-4 py-20 bg-[#070709] text-white">
      <div className="mb-3 flex justify-center">
        <SectionKicker align="center" size="compact">
          404
        </SectionKicker>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-center max-w-lg [font-family:var(--font-syne)] mb-4">
        {t.title}
      </h1>
      <p className="text-white/55 text-center max-w-md text-sm sm:text-base font-light leading-relaxed mb-10">
        {t.body}
      </p>
      <nav aria-label={TRANSLATIONS[lang].footerNavPages} className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center w-full max-w-lg">
        <Link href="/" className={linkClass}>
          {t.home}
        </Link>
        <Link href="/leistungen" className={linkClass}>
          {t.leistungen}
        </Link>
        <Link href="/kontakt" className={linkClass}>
          {t.kontakt}
        </Link>
      </nav>

      <details className="mt-16 w-full max-w-md mx-auto rounded-xl border border-white/[0.1] bg-white/[0.02] open:border-[#ff1900]/25 transition-colors text-left">
        <summary className="cursor-pointer select-none list-none px-4 py-3 text-center text-[11px] text-white/35 hover:text-white/55 tracking-wide [&::-webkit-details-marker]:hidden">
          {g.eggSummary}
        </summary>
        <div className="px-3 pb-3 pt-0 border-t border-white/[0.06]">
          <ItBauMicroGame copy={g} />
        </div>
      </details>
    </div>
  );
}
