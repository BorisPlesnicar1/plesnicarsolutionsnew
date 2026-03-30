"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";

export function UeberUnsContactsBridge() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];

  return (
    <section className="py-10 px-4 sm:px-6 border-t border-white/5 bg-[#070709]">
      <div className="container mx-auto max-w-5xl">
        <div className="rounded-2xl border border-white/[0.1] bg-[#0a0a0a]/90 backdrop-blur-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 min-w-0">
            <p className="text-sm font-bold text-white tracking-tight">
              {t.team.title}{" "}
              <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">
                {t.team.titleHighlight}
              </span>
            </p>
            <p className="text-white/50 text-sm font-light max-w-xl">{t.ueberUns.contactsTeaser}</p>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <span className="font-semibold text-white">{t.kontakt.boris}</span>
                <span className="text-white/50"> — {t.team.borisRole}</span>
              </li>
              <li>
                <span className="font-semibold text-white">{t.kontakt.dietmar}</span>
                <span className="text-white/50"> — {t.team.dietmarRole}</span>
              </li>
            </ul>
          </div>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 shrink-0 min-h-[48px] px-6 rounded-xl bg-gradient-to-r from-[#ff1900] to-[#ff2d00] text-white font-bold text-sm shadow-lg shadow-[#ff1900]/25 hover:from-[#e61700] hover:to-[#ff1900] transition-colors"
          >
            {t.ueberUns.contactsToKontakt}
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
