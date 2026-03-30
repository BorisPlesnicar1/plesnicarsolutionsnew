"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { TRANSLATIONS, type Lang } from "@/app/translations";

type CookieBannerProps = {
  lang: Lang;
  onAllowEssential: () => void;
  onAllowAll: () => void;
};

export function CookieBanner({ lang, onAllowEssential, onAllowAll }: CookieBannerProps) {
  const c = TRANSLATIONS[lang].cookie;
  const privacyHref = lang === "en" ? "/datenschutz-en" : "/datenschutz";
  return (
    <div className="fixed inset-x-0 z-50 bottom-24 md:bottom-0">
      <div className="mx-4 mb-4 md:mx-auto md:mb-6 md:max-w-4xl rounded-2xl bg-[#050506]/95 border border-white/[0.12] shadow-2xl shadow-black/60 backdrop-blur-xl">
        <div className="px-4 py-4 md:px-6 md:py-5 flex flex-col gap-3 md:gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#ff1900]/20 border border-[#ff1900]/40">
              <Sparkles className="h-4 w-4 text-[#ff1900]" strokeWidth={2.2} />
            </div>
            <div className="flex-1">
              <h2 className="text-sm md:text-base font-semibold text-white mb-1">{c.title}</h2>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                {c.body}{" "}
                <Link href={privacyHref} className="underline underline-offset-2 decoration-white/40 hover:text-white">
                  {c.privacyLink}
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onAllowEssential}
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/[0.02] px-3.5 py-3 text-xs md:text-sm font-semibold text-white/90 hover:bg-white/[0.08] hover:border-white/40 transition-all duration-200"
            >
              {c.essential}
            </button>
            <button
              type="button"
              onClick={onAllowAll}
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#ff1900] to-[#ff2d00] px-4 py-3 text-xs md:text-sm font-semibold text-white shadow-lg shadow-[#ff1900]/30 hover:from-[#e61700] hover:to-[#ff1900] hover:shadow-xl hover:shadow-[#ff1900]/40 transition-all duration-200"
            >
              {c.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
