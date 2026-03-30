"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Home, Mail } from "lucide-react";
import { ItBauMicroGame } from "@/app/components/ItBauMicroGame";
import { TRANSLATIONS, type Lang } from "@/app/translations";

const LANG_KEY = "ps_lang";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [lang, setLang] = useState<Lang>("de");

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    try {
      const s = window.localStorage.getItem(LANG_KEY);
      if (s === "en") setLang("en");
    } catch {
      /* ignore */
    }
  }, []);

  const t = TRANSLATIONS[lang].errorPage;
  const g = TRANSLATIONS[lang].itBauMiniGame;
  const linkClass =
    "inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl border border-white/[0.14] bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070709]";

  return (
    <div className="min-h-screen bg-[#212121] text-white flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-md text-center space-y-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#ff1900]/15 border border-[#ff1900]/30 text-[#ff1900]">
          <AlertTriangle className="w-7 h-7" strokeWidth={2} aria-hidden />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight [font-family:var(--font-syne)]">{t.title}</h1>
        <p className="text-white/60 text-sm md:text-base leading-relaxed">{t.body}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#212121]"
          >
            {t.retry}
          </button>
          <Link href="/" className={linkClass}>
            <Home className="w-4 h-4" strokeWidth={2} aria-hidden />
            {t.home}
          </Link>
          <Link href="/kontakt" className={linkClass}>
            <Mail className="w-4 h-4" strokeWidth={2} aria-hidden />
            {t.kontakt}
          </Link>
        </div>

        <details className="mt-14 w-full max-w-md mx-auto rounded-xl border border-white/[0.08] bg-white/[0.02] open:border-[#ff1900]/25 transition-colors text-left">
          <summary className="cursor-pointer select-none list-none px-4 py-3 text-center text-[11px] text-white/35 hover:text-white/55 tracking-wide [&::-webkit-details-marker]:hidden">
            {g.eggSummary}
          </summary>
          <div className="px-3 pb-3 pt-0 border-t border-white/[0.06]">
            <ItBauMicroGame copy={g} />
          </div>
        </details>
      </div>
    </div>
  );
}
