"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Handshake, Info, MapPin } from "lucide-react";
import { SiteShell } from "@/app/components/site/SiteShell";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { PartnerCard } from "@/app/components/site/handelspartner/PartnerCard";
import { useLangQuerySync } from "@/app/components/site/useLangQuerySync";
import { useSite } from "@/app/contexts/SiteContext";
import { HANDELS_PARTNER, getHandelspartnerCopy, getHandelspartnerDocumentTitle } from "@/lib/handelspartner";
import { getHandelspartnerMetaDescription } from "@/lib/seo-pages";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";

const SCROLL_IDS = [
  "handelspartner-hero",
  "partner-grid",
  "handelspartner-info",
  "handelspartner-legal",
  "handelspartner-warum",
  "handelspartner-cta",
] as const;

const infoIcons = [MapPin, Handshake, Info] as const;

export function HandelspartnerPage() {
  const { lang } = useSite();
  const c = getHandelspartnerCopy(lang);
  useLangQuerySync();

  useEffect(() => {
    document.title = getHandelspartnerDocumentTitle(lang);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", getHandelspartnerMetaDescription(lang === "en" ? "en" : "de"));
    }
  }, [lang]);

  return (
    <SiteShell scrollSpyIds={SCROLL_IDS}>
      <div className="bg-[#070709] text-white">
        {/* Hero */}
        <section
          id="handelspartner-hero"
          className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20 px-4 sm:px-6 border-b border-white/5"
        >
          <SectionBackground />
          <div
            className="pointer-events-none absolute inset-0 z-[2] opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 75% 55% at 50% -15%, rgba(255,25,0,0.07), transparent 58%)",
            }}
            aria-hidden
          />
          <div className="relative z-10 container mx-auto max-w-3xl text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerParent}
              className="space-y-6 [font-family:var(--font-syne)]"
            >
              <motion.div variants={staggerItem} className="flex justify-center">
                <SectionKicker align="center">{c.hero.badge}</SectionKicker>
              </motion.div>
              <motion.h1
                variants={staggerItem}
                className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold leading-[1.12] tracking-tight text-white"
              >
                {c.hero.title}
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-2xl mx-auto"
              >
                {c.hero.sub}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Partner grid */}
        <section
          id="partner-grid"
          className="relative py-16 md:py-24 px-4 sm:px-6 border-t border-white/5 overflow-hidden"
        >
          <SectionBackground />
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <div className="mb-3 flex justify-center">
                <SectionKicker align="center">{c.grid.sectionLabel}</SectionKicker>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-5">
                {c.grid.title}
              </h2>
              <p className="text-white/50 font-light text-sm md:text-base leading-relaxed">{c.grid.intro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6">
              {HANDELS_PARTNER.map((partner, i) => (
                <PartnerCard key={partner.id} partner={partner} index={i} />
              ))}
            </div>

            <p className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-white/40 font-light max-w-xl mx-auto">
              <ExternalLink className="w-4 h-4 shrink-0 text-[#ff1900]/80" strokeWidth={2} aria-hidden />
              <span>{c.grid.hint}</span>
            </p>
          </div>
        </section>

        {/* Info / UX */}
        <section
          id="handelspartner-info"
          className="relative py-16 md:py-20 px-4 sm:px-6 border-t border-white/5 overflow-hidden"
        >
          <SectionBackground />
          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              className="text-center mb-12 md:mb-14"
              initial="initial"
              whileInView="animate"
              viewport={motionViewport}
              variants={staggerParent}
            >
              <motion.div variants={staggerItem} className="mb-3 flex justify-center">
                <SectionKicker align="center">{c.info.sectionLabel}</SectionKicker>
              </motion.div>
              <motion.h2 variants={staggerItem} className="text-2xl md:text-3xl font-bold text-white tracking-tight [font-family:var(--font-syne)]">
                {c.info.title}
              </motion.h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {c.info.items.map((item, i) => {
                const Ico = infoIcons[i] ?? Info;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={motionViewport}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-white/[0.1] bg-[#0a0a0a]/95 p-6 md:p-7"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#ff1900]/10 border border-[#ff1900]/20 flex items-center justify-center mb-4">
                      <Ico className="w-5 h-5 text-[#ff1900]" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-white/50 font-light leading-relaxed">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Legal */}
        <section
          id="handelspartner-legal"
          className="relative py-10 md:py-14 px-4 sm:px-6 border-t border-white/5 overflow-hidden"
        >
          <SectionBackground />
          <div className="container mx-auto max-w-3xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={motionViewport}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-5 md:px-8 md:py-6"
            >
              <p className="text-[13px] md:text-sm leading-relaxed text-white/45 font-light text-center">
                {c.legalNote}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Warum */}
        <section
          id="handelspartner-warum"
          className="relative py-16 md:py-20 px-4 sm:px-6 border-t border-white/5 overflow-hidden"
        >
          <SectionBackground />
          <div className="container mx-auto max-w-2xl text-center relative z-10">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={motionViewport}
              variants={staggerParent}
              className="space-y-5 [font-family:var(--font-syne)]"
            >
              <motion.div variants={staggerItem} className="flex justify-center">
                <SectionKicker align="center">{c.warum.sectionLabel}</SectionKicker>
              </motion.div>
              <motion.h2 variants={staggerItem} className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {c.warum.title}
              </motion.h2>
              <motion.p variants={staggerItem} className="text-base text-white/50 font-light leading-relaxed">
                {c.warum.text}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="handelspartner-cta"
          className="relative py-16 md:py-24 px-4 sm:px-6 border-t border-white/5 overflow-hidden"
        >
          <SectionBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff1900]/[0.07] via-transparent to-transparent pointer-events-none z-[1]" aria-hidden />
          <div className="container mx-auto max-w-3xl relative z-10 text-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={motionViewport}
              variants={staggerParent}
              className="rounded-3xl border border-[#ff1900]/25 bg-[#0a0a0a]/95 px-6 py-12 md:px-12 md:py-14 shadow-[0_0_80px_-30px_rgba(255,25,0,0.35)]"
            >
              <motion.h2 variants={staggerItem} className="text-2xl md:text-3xl font-black text-white tracking-tight [font-family:var(--font-syne)]">
                {c.cta.title}
              </motion.h2>
              <motion.p variants={staggerItem} className="mt-4 text-white/50 font-light text-base leading-relaxed">
                {c.cta.text}
              </motion.p>
              <motion.div
                variants={staggerItem}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              >
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#ff1900] to-[#ff2d00] text-white text-base font-bold shadow-xl shadow-[#ff1900]/30 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 w-full sm:w-auto"
                >
                  {c.cta.button}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                </Link>
                <Link
                  href={c.cta.secondaryHref}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl border border-white/[0.14] bg-white/[0.04] text-white/90 text-sm font-semibold hover:bg-white/[0.08] transition-colors w-full sm:w-auto"
                >
                  {c.cta.secondaryLabel}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
