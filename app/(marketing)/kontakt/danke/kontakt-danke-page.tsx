"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteShell } from "@/app/components/site/SiteShell";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionKicker } from "@/app/components/site/SectionKicker";

function DankeContent() {
  const { lang, setLang } = useSite();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("lang") === "en") setLang("en");
  }, [searchParams, setLang]);

  const t = TRANSLATIONS[lang].kontaktDanke;

  return (
    <SiteShell scrollSpyIds={[]}>
      <div className="pt-28 md:pt-32 pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-lg text-center">
          <div className="mb-4 flex justify-center">
            <SectionKicker align="center">{TRANSLATIONS[lang].kontakt.label}</SectionKicker>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 [font-family:var(--font-syne)]">{t.title}</h1>
          <p className="text-white/55 font-light text-base mb-10 leading-relaxed">{t.body}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white font-semibold text-sm hover:bg-white/[0.1] transition-colors"
            >
              {t.home}
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl bg-gradient-to-r from-[#ff1900] to-[#ff2d00] text-white font-bold text-sm shadow-lg shadow-[#ff1900]/25 hover:from-[#e61700] hover:to-[#ff1900] transition-colors"
            >
              {t.again}
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

export function KontaktDankePage() {
  return (
    <Suspense fallback={null}>
      <DankeContent />
    </Suspense>
  );
}
