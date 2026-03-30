"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";
import { INSTAGRAM_EMBED_URL, INSTAGRAM_PROFILE_URL } from "@/lib/instagram";

export function InstagramSection() {
  const { lang, cookieConsent, updateConsent } = useSite();
  const t = TRANSLATIONS[lang];
  const copy = t.instagram;
  const allowEmbed = cookieConsent?.comfort === true;

  return (
    <section id="instagram" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div className="container mx-auto max-w-3xl relative z-10">
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
            <div className="relative w-full overflow-hidden bg-black/40">
              {allowEmbed ? (
                <iframe
                  src={INSTAGRAM_EMBED_URL}
                  title={copy.iframeTitle}
                  className="w-full border-0 block min-h-[480px] h-[min(70vh,620px)] md:min-h-[520px] md:h-[580px]"
                  loading="lazy"
                  allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <div className="min-h-[320px] md:min-h-[400px] flex flex-col items-center justify-center gap-5 px-6 py-12 text-center">
                  <div>
                    <p className="text-white font-semibold text-base mb-2">{copy.embedBlockedTitle}</p>
                    <p className="text-white/55 text-sm font-light leading-relaxed max-w-md mx-auto">{copy.embedBlockedBody}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <button
                      type="button"
                      onClick={() => updateConsent(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff1900] to-[#e61700] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff1900]/25 hover:shadow-[#ff1900]/35 transition-shadow"
                    >
                      {t.kontakt.acceptCookies}
                      <ArrowRight className="w-4 h-4" aria-hidden />
                    </button>
                    <Link
                      href={lang === "en" ? "/datenschutz-en" : "/datenschutz"}
                      className="text-sm text-[#ff8a72] hover:text-white underline underline-offset-2"
                    >
                      {t.cookie.privacyLink}
                    </Link>
                  </div>
                  <a
                    href={INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
                  >
                    <Instagram className="w-4 h-4 text-[#ff1900]" aria-hidden />
                    {copy.openProfile}
                  </a>
                </div>
              )}
            </div>
            <div className="px-4 py-3 md:px-5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-[11px] md:text-xs text-white/40 font-light leading-relaxed text-center sm:text-left">{copy.hint}</p>
              <a
                href={INSTAGRAM_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 shrink-0 rounded-xl bg-gradient-to-r from-[#ff1900] to-[#e61700] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#ff1900]/25 hover:shadow-[#ff1900]/35 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0e]"
              >
                <Instagram className="w-4 h-4" aria-hidden />
                {copy.openProfile}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
