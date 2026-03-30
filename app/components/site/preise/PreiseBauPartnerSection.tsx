"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Check, Info } from "lucide-react";
import { getPreiseBundle } from "@/lib/preise-page";
import { MicroKicker } from "@/app/components/site/SectionKicker";
import { motionViewportLong, staggerItem, staggerParent } from "@/app/components/site/motion-presets";
import { useSite } from "@/app/contexts/SiteContext";

export function PreiseBauPartnerSection() {
  const { lang } = useSite();
  const b = getPreiseBundle(lang).copy.bau;

  return (
    <section
      id="preise-bau"
      className="relative py-14 md:py-20 px-4 sm:px-6 border-t border-white/[0.06] bg-[#070709] overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 50% at 20% 50%, rgba(255,25,0,0.06), transparent 55%)`,
        }}
        aria-hidden
      />
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          className="rounded-[1.35rem] p-[1px] bg-gradient-to-br from-white/[0.16] via-[#ff1900]/18 to-white/[0.06] shadow-[0_32px_80px_-32px_rgba(255,45,30,0.2),0_24px_64px_-36px_rgba(0,0,0,0.85)]"
          initial="initial"
          whileInView="animate"
          viewport={motionViewportLong}
          variants={staggerParent}
        >
          <div className="relative rounded-[1.3rem] overflow-hidden border border-white/[0.06] bg-gradient-to-b from-[#12121a]/95 via-[#0a0a0f]/96 to-[#070709]/98 px-6 py-10 md:px-10 md:py-12 supports-[backdrop-filter]:backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div
              className="pointer-events-none absolute -top-20 -right-16 w-64 h-64 opacity-60"
              style={{
                background: "radial-gradient(circle, rgba(255,50,35,0.14) 0%, transparent 68%)",
                filter: "blur(28px)",
              }}
              aria-hidden
            />
            <div className="relative z-[1]">
          <motion.div variants={staggerItem} className="flex items-start gap-3 mb-6">
            <Building2 className="w-4 h-4 text-[#ff7a62] mt-0.5 shrink-0" strokeWidth={2} aria-hidden />
            <MicroKicker tone="red" className="mt-0">
              {b.badge}
            </MicroKicker>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="text-2xl md:text-3xl font-bold text-white tracking-tight [font-family:var(--font-syne)] mb-4"
          >
            {b.title}
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-base text-white/50 font-light leading-relaxed max-w-2xl mb-6"
          >
            {b.text}
          </motion.p>
          <motion.aside
            variants={staggerItem}
            className="mb-8 max-w-2xl rounded-xl p-[1px] bg-gradient-to-br from-[#ff1900]/35 via-transparent to-white/[0.08] shadow-[0_0_40px_-14px_rgba(255,25,0,0.15)]"
            aria-labelledby="preise-bau-price-notice-title"
          >
            <div className="rounded-[11px] border border-white/[0.06] border-l-[3px] border-l-[color:color-mix(in_srgb,var(--accent)_75%,transparent)] bg-[color:color-mix(in_srgb,var(--accent)_8%,#08080c)] supports-[backdrop-filter]:backdrop-blur-sm px-4 py-4 md:px-5 md:py-5">
            <div className="flex gap-3">
              <div className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff1900]/22 to-[#ff1900]/8 border border-[#ff1900]/28 shadow-[0_0_16px_-4px_rgba(255,25,0,0.35)]">
                <Info className="w-4 h-4 text-[#ff9a82]" strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0">
                <p
                  id="preise-bau-price-notice-title"
                  className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/50 mb-2"
                >
                  {b.priceNoticeTitle}
                </p>
                <p className="text-sm text-white/[0.58] font-light leading-relaxed">{b.priceNotice}</p>
              </div>
            </div>
            </div>
          </motion.aside>
          <motion.ul
            variants={staggerItem}
            className="space-y-3 mb-8 max-w-2xl"
            aria-label={lang === "en" ? "Benefits: construction & building materials" : "Vorteile Bau & Baustoffe"}
          >
            {b.bullets.map((line) => (
              <li key={line} className="flex gap-3 text-sm text-white/62 font-light leading-relaxed">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md bg-gradient-to-br from-[#ff1900]/25 to-[#ff1900]/8 border border-[#ff1900]/30 shadow-[0_0_12px_-4px_rgba(255,25,0,0.35)] flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#ff8f7a]" strokeWidth={2.5} aria-hidden />
                </span>
                <span>{line}</span>
              </li>
            ))}
          </motion.ul>
          <motion.div variants={staggerItem}>
            <Link
              href={lang === "en" ? "/handelspartner?lang=en" : "/handelspartner"}
              className="group relative inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#ff1900] to-[#ff3508] shadow-[0_0_32px_-8px_rgba(255,25,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)] ring-1 ring-white/10 hover:brightness-110 active:scale-[0.98] transition-[transform,filter] duration-200"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-white/[0.08] to-white/[0.12] opacity-70 pointer-events-none" aria-hidden />
              <span className="relative">{b.cta}</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
            </Link>
          </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
