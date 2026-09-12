"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, LayoutTemplate, Palette, Sparkles } from "lucide-react";
import { PREISE_OPENING_OFFER, getOpeningOfferBannerCopy } from "@/lib/preise-opening-offer";
import { getPreiseBundle, type PaketPreisOption } from "@/lib/preise-page";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { MicroKicker, SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewportLong, staggerItem, staggerParent } from "@/app/components/site/motion-presets";
import { PaketPricingToggle } from "@/app/components/site/preise/PaketPricingToggle";
import { PreisMitEroeffnungsangebot } from "@/app/components/site/preise/PreisMitEroeffnungsangebot";
import type { Lang } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";

type PreisTabId = "website" | "branding";

/** Gemeinsame Form von One-Page-Paket, Paketen und „Individuelle Lösungen“. */
type PreisCard = {
  id: string;
  title: string;
  subtitle: string;
  priceFrom?: string;
  priceDisclaimer: string;
  features: readonly string[];
  featured?: boolean;
  options?: readonly PaketPreisOption[];
  toggleAriaLabel?: string;
};

function PreisKarte({
  card,
  kicker,
  ctaLabel,
  lang,
  withSparkles = false,
}: {
  card: PreisCard;
  kicker: string;
  ctaLabel: string;
  lang: Lang;
  withSparkles?: boolean;
}) {
  const featured = Boolean(card.featured);

  return (
    <article
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
        {featured && (
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5c42]/70 to-transparent"
            aria-hidden
          />
        )}

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <div className="flex items-start gap-2">
            {withSparkles && (
              <Sparkles className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[#ff8a72]" strokeWidth={2} aria-hidden />
            )}
            <MicroKicker tone="red" className="mt-0">
              {kicker}
            </MicroKicker>
          </div>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-white">{card.title}</h3>
          <p className="mt-2 text-sm font-light leading-relaxed text-white/45">{card.subtitle}</p>

          <div className="mt-5 mb-5">
            {card.options && card.options.length >= 2 ? (
              <>
                <PaketPricingToggle
                  key={`${card.id}-${lang}`}
                  options={card.options}
                  ariaGroupLabel={card.toggleAriaLabel ?? card.title}
                  lang={lang}
                />
                <p className="mt-4 text-[11px] leading-snug text-white/35">{card.priceDisclaimer}</p>
              </>
            ) : (
              <div className="min-h-[7.5rem] md:min-h-[6.75rem]">
                {card.priceFrom && <PreisMitEroeffnungsangebot lang={lang} priceLabel={card.priceFrom} />}
                <p className="mt-1.5 text-[11px] leading-snug text-white/35">{card.priceDisclaimer}</p>
              </div>
            )}
          </div>

          <ul className="flex-1 space-y-2.5">
            {card.features.map((line) => (
              <li key={line} className="flex gap-2.5 text-sm font-light leading-relaxed text-white/65">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#ff1900]/30 bg-gradient-to-br from-[#ff1900]/25 to-[#ff1900]/8">
                  <Check className="h-3 w-3 text-[#ff8f7a]" strokeWidth={2.5} aria-hidden />
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
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function WebsitePreiseSection() {
  const { lang } = useSite();
  const bundle = getPreiseBundle(lang);
  const p = bundle.copy.pakete;
  const [tab, setTab] = useState<PreisTabId>("website");
  const openingBanner = PREISE_OPENING_OFFER.active ? getOpeningOfferBannerCopy(lang) : null;

  /** Tab „Website“: One-Page → Business → Individuelle Lösungen; alles Übrige in Tab 2. */
  const business = bundle.pakete.find((paket) => paket.id === "business");
  const websiteCards: readonly PreisCard[] = [
    { ...bundle.onePage, toggleAriaLabel: bundle.onePageToggleAriaLabel },
    ...(business ? [business] : []),
    bundle.individuell,
  ];
  const brandingCards: readonly PreisCard[] = bundle.pakete.filter((paket) => paket.id !== "business");

  const cards = tab === "website" ? websiteCards : brandingCards;
  const tabKicker = tab === "website" ? p.tabWebsite : p.tabBranding;

  return (
    <section
      id="website-preise"
      className="relative border-t border-white/5 overflow-hidden bg-[#070709] px-4 py-16 sm:px-6 md:py-24"
    >
      <SectionBackground />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,45,35,0.08) 0%, transparent 50%), radial-gradient(ellipse 55% 40% at 100% 60%, rgba(255,25,0,0.05) 0%, transparent 45%)",
        }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
          initial="initial"
          whileInView="animate"
          viewport={motionViewportLong}
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{p.sectionLabel}</SectionKicker>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            {p.title}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">
              {p.titleHighlight}
            </span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-5 text-base font-light leading-relaxed text-white/50 md:text-lg"
          >
            {p.intro}
          </motion.p>

          {openingBanner && (
            <motion.div
              variants={staggerItem}
              className="mt-6 rounded-2xl p-[1px] bg-gradient-to-br from-[#ff1900]/45 via-[#ff1900]/15 to-white/[0.1] shadow-[0_0_56px_-18px_rgba(255,45,30,0.35)]"
            >
              <div className="rounded-[15px] border border-white/[0.08] bg-[#0c0c12]/92 px-5 py-4 text-left supports-[backdrop-filter]:backdrop-blur-xl md:px-6 md:py-5">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff8a72]">
                  {openingBanner.title}
                </p>
                <p className="text-sm font-light leading-relaxed text-white/78 md:text-[15px]">{openingBanner.body}</p>
              </div>
            </motion.div>
          )}

          <motion.p
            variants={staggerItem}
            role="note"
            className="mt-5 rounded-xl border border-[#ff1900]/22 bg-[#ff1900]/[0.07] px-4 py-3 text-left text-sm font-light leading-relaxed text-white/75 sm:text-center"
          >
            {p.ustNote}
          </motion.p>
          <motion.p
            variants={staggerItem}
            className="mt-5 rounded-xl p-[1px] text-left bg-gradient-to-br from-[#ff1900]/35 via-[#ff1900]/10 to-white/[0.08] shadow-[0_0_48px_-16px_rgba(255,25,0,0.2)] sm:text-center"
          >
            <span className="block rounded-[11px] border border-white/[0.06] bg-[#0a0a0f]/90 px-4 py-3.5 text-sm font-light leading-relaxed text-white/58 supports-[backdrop-filter]:backdrop-blur-md">
              {p.introBauNote}
            </span>
          </motion.p>
        </motion.div>

        <div
          role="tablist"
          aria-label={p.tabAria}
          className="mx-auto mb-10 flex w-full max-w-md rounded-2xl border border-white/[0.1] bg-white/[0.03] p-1.5 supports-[backdrop-filter]:backdrop-blur-xl"
        >
          {(
            [
              { id: "website" as const, label: p.tabWebsite, Icon: LayoutTemplate },
              { id: "branding" as const, label: p.tabBranding, Icon: Palette },
            ] as const
          ).map(({ id, label, Icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(id)}
                className={`flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-[#ff1900] text-white shadow-lg shadow-[#ff1900]/25"
                    : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
                {label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            role="tabpanel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`grid gap-5 md:gap-6 ${
              cards.length === 2 ? "md:mx-auto md:max-w-4xl md:grid-cols-2" : "md:grid-cols-3"
            }`}
          >
            {cards.map((card) => (
              <PreisKarte
                key={card.id}
                card={card}
                kicker={card.id === "individuell" ? p.individuellBadge : tabKicker}
                withSparkles={card.id === "individuell"}
                ctaLabel={bundle.copy.hero.ctaPrimary}
                lang={lang}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5">
            <p className="mb-1.5 text-sm font-semibold text-white">{p.noteTitle}</p>
            <p className="text-xs font-light leading-relaxed text-white/45 sm:text-sm">{p.noteBody}</p>
          </div>
          <div className="rounded-xl border border-[#ff1900]/18 bg-[#ff1900]/[0.06] px-4 py-3.5">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b52]">
              {p.scopeExplainerTitle}
            </p>
            <p className="text-xs font-light leading-relaxed text-white/60 sm:text-sm">{p.scopeExplainerBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
