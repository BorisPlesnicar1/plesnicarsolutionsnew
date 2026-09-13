"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Cpu, Gamepad2, Monitor } from "lucide-react";
import { getGrossPriceLabel } from "@/lib/preise-opening-offer";
import { getPcBauCopy, getPcTierData, type PcCategoryId } from "@/lib/pc-bau";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { MicroKicker, SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewportLong, staggerItem, staggerParent } from "@/app/components/site/motion-presets";
import { useSite } from "@/app/contexts/SiteContext";

export function PcBauSection() {
  const { lang } = useSite();
  const c = getPcBauCopy(lang);
  const [category, setCategory] = useState<PcCategoryId>("buero");

  const tiers = category === "gaming" ? c.gaming : c.buero;
  const tierData = getPcTierData(category);
  /** PC-Preise sind nicht Teil des Eröffnungsangebots – Brutto direkt aus dem Netto-Richtwert. */
  const grossLabel = (priceFrom: string) => getGrossPriceLabel(priceFrom, lang, { applyOpeningOffer: false });

  return (
    <section
      id="pc-bau"
      className="relative py-16 md:py-24 px-4 sm:px-6 border-t border-white/5 overflow-hidden bg-[#070709]"
    >
      <SectionBackground />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 20% 0%, rgba(255,45,35,0.07) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 90% 70%, rgba(255,25,0,0.04) 0%, transparent 45%)",
        }}
        aria-hidden
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
          initial="initial"
          whileInView="animate"
          viewport={motionViewportLong}
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{c.sectionLabel}</SectionKicker>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white"
          >
            {c.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">
              {c.titleHighlight}
            </span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-5 text-white/50 font-light text-base md:text-lg leading-relaxed"
          >
            {c.intro}
          </motion.p>
        </motion.div>

        <div
          role="tablist"
          aria-label={c.tabAria}
          className="mx-auto mb-10 flex w-full max-w-md rounded-2xl border border-white/[0.1] bg-white/[0.03] p-1.5 supports-[backdrop-filter]:backdrop-blur-xl"
        >
          {(
            [
              { id: "buero" as const, label: c.tabBuero, Icon: Monitor },
              { id: "gaming" as const, label: c.tabGaming, Icon: Gamepad2 },
            ] as const
          ).map(({ id, label, Icon }) => {
            const active = category === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(id)}
                className={`flex flex-1 min-h-[48px] items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-[#ff1900] text-white shadow-lg shadow-[#ff1900]/25"
                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" strokeWidth={2.25} aria-hidden />
                {label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-3 gap-5 md:gap-6"
          >
            {tiers.map((tier, i) => {
              const data = tierData.find((t) => t.id === tier.id) ?? tierData[i];
              const featured = i === 1;
              return (
                <article
                  key={tier.id}
                  className={`relative flex flex-col rounded-[1.35rem] p-[1px] bg-gradient-to-br ${
                    featured
                      ? "from-white/[0.22] via-[#ff1900]/35 to-white/[0.08] shadow-[0_0_0_1px_rgba(255,25,0,0.12),0_32px_80px_-28px_rgba(255,35,25,0.2)]"
                      : "from-white/[0.14] via-white/[0.05] to-white/[0.03] shadow-[0_24px_64px_-32px_rgba(0,0,0,0.75)]"
                  }`}
                >
                  <div
                    className={`relative flex h-full flex-col overflow-hidden rounded-[1.3rem] border supports-[backdrop-filter]:backdrop-blur-xl ${
                      featured
                        ? "border-[#ff1900]/12 bg-gradient-to-b from-[#14141c]/95 via-[#0a0a0f]/95 to-[#070709]/98"
                        : "border-white/[0.06] bg-gradient-to-b from-[#101014]/92 via-[#0a0a0e]/95 to-[#070709]/98"
                    }`}
                  >
                    <div className="relative aspect-[16/10] bg-white/[0.03] overflow-hidden">
                      {data && (
                        <Image
                          src={data.imageSrc}
                          alt={`${tier.title} – ${c.imageAltSuffix}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/35 to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/45 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white supports-[backdrop-filter]:backdrop-blur-md">
                          <Cpu className="w-3 h-3 text-[#ff8a72]" strokeWidth={2.5} aria-hidden />
                          {tier.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <MicroKicker tone="red" className="mt-0 mb-2">
                        {category === "gaming" ? c.tabGaming : c.tabBuero}
                      </MicroKicker>
                      <h3 className="text-xl font-bold text-white tracking-tight">{tier.title}</h3>
                      <p className="mt-2 text-sm text-white/45 font-light leading-relaxed">{tier.subtitle}</p>

                      <div className="mt-5 mb-5">
                        <p className="text-2xl md:text-[1.65rem] font-black tabular-nums tracking-tight bg-gradient-to-r from-[#ff7a5c] via-[#ff4428] to-[#ff9a7a] bg-clip-text text-transparent">
                          {tier.priceFrom}
                        </p>
                        {grossLabel(tier.priceFrom) && (
                          <p className="text-[11px] font-medium tabular-nums text-white/40 leading-snug mt-1">
                            {grossLabel(tier.priceFrom)}
                          </p>
                        )}
                        <p className="text-[11px] text-white/35 mt-1.5 leading-snug">{tier.priceDisclaimer}</p>
                      </div>

                      <ul className="space-y-2.5 flex-1">
                        {tier.features.map((line) => (
                          <li key={line} className="flex gap-2.5 text-sm text-white/65 font-light leading-relaxed">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#ff1900]/30 bg-gradient-to-br from-[#ff1900]/25 to-[#ff1900]/8">
                              <Check className="w-3 h-3 text-[#ff8f7a]" strokeWidth={2.5} aria-hidden />
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/kontakt"
                        className={`group mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-[transform,filter] ${
                          featured
                            ? "bg-gradient-to-r from-[#ff1900] to-[#ff2d00] text-white shadow-lg shadow-[#ff1900]/25 hover:brightness-110"
                            : "border border-white/[0.1] bg-white/[0.04] text-white/90 hover:bg-white/[0.08]"
                        }`}
                      >
                        {c.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 space-y-3 max-w-3xl mx-auto">
          <p className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-xs sm:text-sm text-white/45 font-light leading-relaxed text-center">
            {c.imageNote}
          </p>
          <p className="rounded-xl border border-[#ff1900]/18 bg-[#ff1900]/[0.06] px-4 py-3 text-xs sm:text-sm text-white/60 font-light leading-relaxed text-center">
            {c.priceNote}
          </p>
          <p className="text-center text-[11px] text-white/35 font-light leading-relaxed">{c.ustNote}</p>
        </div>
      </div>
    </section>
  );
}
