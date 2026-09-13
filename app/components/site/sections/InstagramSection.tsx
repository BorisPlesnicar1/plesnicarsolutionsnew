"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";
import { INSTAGRAM_EMBED_URL, INSTAGRAM_PROFILE_URL, INSTAGRAM_USERNAME } from "@/lib/instagram";

export function InstagramSection() {
  const { lang, cookieConsent, updateConsent } = useSite();
  const t = TRANSLATIONS[lang];
  const copy = t.instagram;
  const allowEmbed = cookieConsent?.comfort === true;

  return (
    <section id="instagram" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial="initial"
          whileInView="animate"
          viewport={motionViewport}
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{copy.label}</SectionKicker>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white"
          >
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">
              {copy.titleHighlight}
            </span>
          </motion.h2>
          <motion.p variants={staggerItem} className="mt-4 text-white/50 font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {copy.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={motionViewport}
          transition={{ duration: 0.45 }}
          className="rounded-[1.25rem] p-[1px] bg-gradient-to-br from-[#ff1900]/35 via-white/[0.08] to-white/[0.04] shadow-[0_32px_80px_-40px_rgba(255,35,25,0.35)]"
        >
          <div className="rounded-[1.2rem] border border-white/[0.06] bg-[#0a0a0e]/95 overflow-hidden supports-[backdrop-filter]:backdrop-blur-sm">
            {/* Profil-Kopf: macht sichtbar, dass der Feed zu unserem echten Konto gehört */}
            <div className="flex items-center gap-3 sm:gap-4 px-4 py-3.5 sm:px-6 sm:py-5 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="shrink-0 grid place-items-center w-11 h-11 sm:w-[3.25rem] sm:h-[3.25rem] rounded-2xl bg-gradient-to-br from-[#ff1900] to-[#e61700] shadow-lg shadow-[#ff1900]/25">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-white font-bold text-sm sm:text-base tracking-tight truncate">@{INSTAGRAM_USERNAME}</p>
                <p className="mt-0.5 text-[11px] sm:text-xs text-white/45 font-light truncate">{copy.profileRole}</p>
              </div>
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.openProfile}
                className="inline-flex shrink-0 items-center justify-center gap-2 min-h-[44px] rounded-xl bg-gradient-to-r from-[#ff1900] to-[#e61700] px-4 sm:px-5 text-sm font-semibold text-white shadow-lg shadow-[#ff1900]/25 hover:shadow-[#ff1900]/35 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0e]"
              >
                {copy.follow}
                <ArrowRight className="w-4 h-4" aria-hidden />
              </a>
            </div>

            <div className="relative w-full overflow-hidden bg-black/40">
              {allowEmbed ? (
                <iframe
                  src={INSTAGRAM_EMBED_URL}
                  title={copy.iframeTitle}
                  /* Höhe so gewählt, dass das 3er-Raster des Profil-Embeds nicht mitten in einer Reihe abschneidet */
                  className="w-full border-0 block min-h-[560px] h-[min(78vh,760px)] md:min-h-[640px] md:h-[700px] lg:h-[830px]"
                  loading="lazy"
                  allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <div className="min-h-[380px] md:min-h-[460px] flex flex-col items-center justify-center gap-6 px-6 py-14 text-center">
                  <span className="grid place-items-center w-14 h-14 rounded-2xl border border-white/[0.08] bg-white/[0.04] supports-[backdrop-filter]:backdrop-blur-md">
                    <Instagram className="w-6 h-6 text-[#ff8a72]" aria-hidden />
                  </span>
                  <div>
                    <p className="text-white font-semibold text-base md:text-lg mb-2">{copy.embedBlockedTitle}</p>
                    <p className="text-white/55 text-sm font-light leading-relaxed max-w-md mx-auto">{copy.embedBlockedBody}</p>
                  </div>
                  <div className="w-full max-w-md flex flex-col sm:flex-row gap-3 items-stretch justify-center">
                    <button
                      type="button"
                      onClick={() => updateConsent(true)}
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-gradient-to-r from-[#ff1900] to-[#e61700] px-5 text-sm font-semibold text-white shadow-lg shadow-[#ff1900]/25 hover:shadow-[#ff1900]/35 transition-shadow"
                    >
                      {t.kontakt.acceptCookies}
                      <ArrowRight className="w-4 h-4" aria-hidden />
                    </button>
                    <a
                      href={INSTAGRAM_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl border border-white/[0.14] bg-white/[0.04] px-5 text-sm font-semibold text-white/90 hover:bg-white/[0.08] transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-[#ff8a72]" aria-hidden />
                      {copy.openProfile}
                    </a>
                  </div>
                  <Link
                    href={lang === "en" ? "/datenschutz-en" : "/datenschutz"}
                    className="text-sm text-[#ff8a72] hover:text-white underline underline-offset-2"
                  >
                    {t.cookie.privacyLink}
                  </Link>
                </div>
              )}
            </div>

            <div className="px-4 py-3 md:px-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <span className="inline-flex items-center justify-center sm:justify-start gap-2 shrink-0 text-[11px] md:text-xs font-medium text-white/60">
                <span className="relative grid place-items-center w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-[#ff1900]/50 motion-safe:animate-ping" aria-hidden />
                  <span className="relative w-2 h-2 rounded-full bg-[#ff1900]" aria-hidden />
                </span>
                {copy.liveBadge}
              </span>
              <p className="text-[11px] md:text-xs text-white/40 font-light leading-relaxed text-center sm:text-right">{copy.hint}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
