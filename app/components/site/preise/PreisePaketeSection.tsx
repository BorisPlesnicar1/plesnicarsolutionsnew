"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { getPreiseBundle, type PaketPreisOption } from "@/lib/preise-page";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { MicroKicker, SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewportLong, staggerItem, staggerParent } from "@/app/components/site/motion-presets";
import { PaketPricingToggle } from "@/app/components/site/preise/PaketPricingToggle";
import { useSite } from "@/app/contexts/SiteContext";

const paketCardTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

function PaketCard({
  paket,
  featured,
  children,
  className = "",
}: {
  paket: {
    title: string;
    subtitle: string;
    features: readonly string[];
    priceFrom?: string;
    priceDisclaimer?: string;
  };
  featured?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const ring = featured
    ? "from-white/[0.22] via-[#ff1900]/35 to-white/[0.08] shadow-[0_0_0_1px_rgba(255,25,0,0.12),0_32px_80px_-28px_rgba(255,35,25,0.22),0_24px_64px_-32px_rgba(0,0,0,0.85)]"
    : "from-white/[0.14] via-white/[0.05] to-white/[0.03] shadow-[0_24px_64px_-32px_rgba(0,0,0,0.75)] hover:shadow-[0_32px_72px_-28px_rgba(0,0,0,0.8),0_0_48px_-20px_rgba(255,25,0,0.08)]";

  return (
    <motion.article
      variants={staggerItem}
      transition={paketCardTransition}
      className={`relative rounded-[1.35rem] p-[1px] bg-gradient-to-br ${ring} transition-[box-shadow] duration-300 ${className}`}
    >
      <div
        className={`relative h-full rounded-[1.3rem] overflow-hidden p-6 md:p-8 supports-[backdrop-filter]:backdrop-blur-xl ${
          featured
            ? "bg-gradient-to-b from-[#14141c]/95 via-[#0a0a0f]/95 to-[#070709]/98 border border-[#ff1900]/12"
            : "bg-gradient-to-b from-[#101014]/92 via-[#0a0a0e]/95 to-[#070709]/98 border border-white/[0.06]"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(125deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)`,
            backgroundSize: "200% 200%",
          }}
          aria-hidden
        />
        {featured && (
          <>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff5c42]/70 to-transparent" />
            <div
              className="absolute -top-24 right-0 w-48 h-48 rounded-full opacity-50 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,45,30,0.15) 0%, transparent 70%)",
                filter: "blur(24px)",
              }}
              aria-hidden
            />
          </>
        )}
        <div className="relative z-[1] flex flex-col gap-6 mb-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight [text-shadow:0_0_40px_rgba(255,255,255,0.06)]">
              {paket.title}
            </h3>
            <p className="text-white/45 text-sm mt-2 font-light leading-relaxed max-w-xl">{paket.subtitle}</p>
          </div>
          {children ??
            (paket.priceFrom && paket.priceDisclaimer ? (
              <div className="shrink-0">
                <p className="text-2xl md:text-3xl font-black tabular-nums tracking-tight bg-gradient-to-r from-[#ff7a5c] via-[#ff4428] to-[#ff9a7a] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,45,30,0.2)]">
                  {paket.priceFrom}
                </p>
                <p className="text-[11px] text-white/35 mt-1.5 max-w-xs leading-snug">{paket.priceDisclaimer}</p>
              </div>
            ) : null)}
        </div>
        <ul className="relative z-[1] space-y-3">
          {paket.features.map((line) => (
            <li key={line} className="flex gap-3 text-sm text-white/68 font-light leading-relaxed">
              <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md bg-gradient-to-br from-[#ff1900]/25 to-[#ff1900]/8 border border-[#ff1900]/30 shadow-[0_0_12px_-4px_rgba(255,25,0,0.4)] flex items-center justify-center">
                <Check className="w-3 h-3 text-[#ff8f7a]" strokeWidth={2.5} />
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function PreisePaketeSection() {
  const { lang } = useSite();
  const bundle = getPreiseBundle(lang);
  const p = bundle.copy.pakete;
  const onePage = bundle.onePage;
  const onePageOptions = onePage.options as readonly PaketPreisOption[];

  return (
    <section id="pakete" className="relative py-16 md:py-24 px-4 sm:px-6 border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,45,35,0.08) 0%, transparent 50%), radial-gradient(ellipse 55% 40% at 100% 60%, rgba(255,25,0,0.05) 0%, transparent 45%)",
        }}
        aria-hidden
      />
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14 md:mb-16"
          initial="initial"
          whileInView="animate"
          viewport={motionViewportLong}
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{p.sectionLabel}</SectionKicker>
          </motion.div>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {p.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{p.titleHighlight}</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="mt-5 text-white/50 font-light text-base md:text-lg leading-relaxed">
            {p.intro}
          </motion.p>
          <motion.p
            variants={staggerItem}
            className="mt-5 text-left sm:text-center max-w-3xl mx-auto rounded-xl p-[1px] bg-gradient-to-br from-[#ff1900]/35 via-[#ff1900]/10 to-white/[0.08] shadow-[0_0_48px_-16px_rgba(255,25,0,0.2)]"
          >
            <span className="block rounded-[11px] border border-white/[0.06] bg-[#0a0a0f]/90 supports-[backdrop-filter]:backdrop-blur-md px-4 py-3.5 text-sm text-white/58 font-light leading-relaxed">
              {p.introBauNote}
            </span>
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-5 md:gap-6"
          initial="initial"
          whileInView="animate"
          viewport={motionViewportLong}
          variants={staggerParent}
        >
          <PaketCard paket={onePage} className="md:row-start-1">
            <div>
              <PaketPricingToggle
                key={`one-page-${lang}`}
                options={onePageOptions}
                ariaGroupLabel={bundle.onePageToggleAriaLabel}
              />
              <p className="text-[11px] text-white/35 mt-4 max-w-md leading-snug">{onePage.priceDisclaimer}</p>
            </div>
          </PaketCard>

          {bundle.pakete.map((paket) =>
            paket.options && paket.options.length >= 2 ? (
              <PaketCard key={paket.id} paket={paket} featured={paket.featured}>
                <div>
                  <PaketPricingToggle
                    key={`${paket.id}-${lang}`}
                    options={paket.options}
                    ariaGroupLabel={paket.toggleAriaLabel ?? paket.title}
                  />
                  <p className="text-[11px] text-white/35 mt-4 max-w-md leading-snug">{paket.priceDisclaimer}</p>
                </div>
              </PaketCard>
            ) : (
              <PaketCard key={paket.id} paket={paket} featured={paket.featured} />
            )
          )}

          <motion.article
            variants={staggerItem}
            transition={paketCardTransition}
            className="md:col-span-2 relative rounded-[1.35rem] p-[1px] overflow-hidden bg-gradient-to-br from-white/[0.2] via-[#ff1900]/20 to-white/[0.06] shadow-[0_0_0_1px_rgba(255,25,0,0.08),0_40px_100px_-36px_rgba(255,45,30,0.25),0_48px_120px_-48px_rgba(0,0,0,0.9)]"
          >
            <div className="relative rounded-[1.3rem] overflow-hidden bg-gradient-to-br from-[#16161f] via-[#0c0c12] to-[#050506] border border-white/[0.05] p-6 md:p-10 supports-[backdrop-filter]:backdrop-blur-sm">
              <div
                className="absolute top-0 right-0 w-[min(100%,480px)] h-[min(100%,360px)] opacity-70 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 75% 15%, rgba(255,70,45,0.18) 0%, transparent 55%)",
                }}
                aria-hidden
              />
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-80"
                aria-hidden
              />
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#ff8a72] shrink-0 mt-0.5" strokeWidth={2} aria-hidden />
                    <MicroKicker tone="red" className="mt-0">
                      {p.individuellBadge}
                    </MicroKicker>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{bundle.individuell.title}</h3>
                  <p className="text-white/45 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                    {bundle.individuell.subtitle}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 pt-2">
                    {bundle.individuell.features.map((line) => (
                      <li key={line} className="flex gap-2.5 text-sm text-white/62 font-light leading-relaxed">
                        <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md bg-gradient-to-br from-[#ff1900]/25 to-[#ff1900]/8 border border-[#ff1900]/30 shadow-[0_0_12px_-4px_rgba(255,25,0,0.35)] flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#ff8f7a]" strokeWidth={2.5} />
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:w-[min(100%,280px)] shrink-0 flex flex-col justify-center lg:border-l lg:border-white/[0.1] lg:pl-10 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/[0.08]">
                  <p className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-br from-white via-white to-white/75 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                    {bundle.individuell.priceFrom}
                  </p>
                  <p className="text-xs text-white/40 mt-2 leading-relaxed">{bundle.individuell.priceDisclaimer}</p>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={motionViewportLong}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-10 md:mt-12 space-y-6"
        >
          <div className="rounded-2xl p-[1px] bg-gradient-to-br from-white/[0.12] to-transparent">
            <div className="rounded-[15px] border border-white/[0.05] bg-[#0a0a0e]/90 supports-[backdrop-filter]:backdrop-blur-md px-5 py-5 md:px-8 md:py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="text-sm font-semibold text-white mb-2">{p.noteTitle}</p>
              <p className="text-sm text-white/52 font-light leading-relaxed">{p.noteBody}</p>
            </div>
          </div>
          <div className="rounded-2xl p-[1px] bg-gradient-to-br from-[#ff1900]/25 via-transparent to-white/[0.06]">
            <div className="rounded-[15px] border border-[#ff1900]/10 bg-[#08080c]/90 supports-[backdrop-filter]:backdrop-blur-md px-5 py-5 md:px-8 md:py-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#ff6b52] font-semibold mb-2">{p.scopeExplainerTitle}</p>
              <p className="text-sm text-white/52 font-light leading-relaxed">{p.scopeExplainerBody}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
