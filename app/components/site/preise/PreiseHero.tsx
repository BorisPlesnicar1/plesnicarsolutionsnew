"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { getPreiseBundle } from "@/lib/preise-page";
import { staggerItem, staggerParent } from "@/app/components/site/motion-presets";
import { MicroKicker, SectionKicker } from "@/app/components/site/SectionKicker";
import { useSite } from "@/app/contexts/SiteContext";

export function PreiseHero() {
  const { lang } = useSite();
  const { copy } = getPreiseBundle(lang);
  const c = copy.hero;
  const bauHashHref = lang === "en" ? "/preise?lang=en#preise-bau" : "/preise#preise-bau";

  return (
    <section id="preise-hero" className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 px-4 sm:px-6">
      <div className="absolute inset-0 z-0 bg-[#070709]" aria-hidden />
      <div
        className="absolute inset-0 z-[1] opacity-[0.22]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 72% 42%, transparent 0%, rgba(7,7,9,0.4) 55%, #070709 88%)",
        }}
        aria-hidden
      />
      <div
        className="absolute z-[1] top-[-8%] right-[-5%] w-[min(95vw,640px)] h-[min(85vw,560px)] rounded-full pointer-events-none opacity-90"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(255,55,35,0.07) 0%, rgba(255,80,40,0.03) 35%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />
      <div
        className="absolute top-[20%] left-[-15%] w-[min(80vw,420px)] h-[min(80vw,420px)] rounded-full pointer-events-none z-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle, rgba(120,120,130,0.12) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6 xl:gap-x-8 lg:gap-y-0 items-center lg:items-stretch lg:min-h-[min(72vh,680px)]">
          <div className="order-1 lg:order-2 lg:col-span-7 relative flex justify-center lg:justify-end mb-10 lg:mb-0 lg:min-h-[min(72vh,680px)] lg:items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[430px] lg:max-w-[min(100%,520px)] lg:mr-0 lg:ml-auto">
              {/* Breiteres Ambient-Glow – verbindet Karte mit Seitenhintergrund */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[118%] h-[92%] rounded-[2.5rem] pointer-events-none opacity-90"
                style={{
                  background:
                    "radial-gradient(ellipse 72% 68% at 50% 48%, rgba(255,55,40,0.14) 0%, rgba(255,40,25,0.05) 42%, transparent 68%)",
                  filter: "blur(36px)",
                }}
                aria-hidden
              />
              <div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[92%] h-28 rounded-[100%] opacity-75 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(255,45,25,0.14) 0%, transparent 70%)",
                  filter: "blur(22px)",
                }}
                aria-hidden
              />

              <motion.div
                className="absolute z-30 left-[-2%] sm:left-[-4%] md:left-[-6%] top-[8%] md:top-[11%] max-w-[210px] sm:max-w-[232px] hidden sm:block"
                initial={{ opacity: 0, x: -12, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="rounded-2xl border border-[#ff1900]/20 bg-[#0a0a0f]/80 supports-[backdrop-filter]:backdrop-blur-xl px-4 py-3.5 shadow-[0_28px_56px_-28px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,25,0,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#ff1900]/12 border border-[#ff1900]/25">
                      <Sparkles className="w-[17px] h-[17px] text-[#ff5c42]" strokeWidth={2} />
                    </div>
                    <div>
                      <MicroKicker tone="red" className="mt-0">
                        {c.floatCard1.title}
                      </MicroKicker>
                      <p className="text-[13px] text-white/88 font-medium leading-snug mt-1">
                        {c.floatCard1.line}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute z-30 right-[-2%] sm:right-[-4%] md:right-[-5%] bottom-[11%] md:bottom-[14%] max-w-[210px] sm:max-w-[232px] hidden sm:block"
                initial={{ opacity: 0, x: 12, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="rounded-2xl border border-emerald-500/25 bg-[#0a0a0f]/80 supports-[backdrop-filter]:backdrop-blur-xl px-4 py-3.5 shadow-[0_28px_56px_-28px_rgba(0,0,0,0.9),0_0_0_1px_rgba(52,211,153,0.12),inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-400/25">
                      <ShieldCheck className="w-[17px] h-[17px] text-emerald-300" strokeWidth={2} />
                    </div>
                    <div>
                      <MicroKicker tone="emerald" className="mt-0">
                        {c.floatCard2.title}
                      </MicroKicker>
                      <p className="text-[13px] text-white/82 font-medium leading-snug mt-1">
                        {c.floatCard2.line}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div
                className="absolute -inset-3 md:-inset-5 rounded-[2.35rem] opacity-80 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,55,38,0.22) 0%, rgba(255,255,255,0.05) 38%, transparent 58%)",
                  filter: "blur(32px)",
                }}
                aria-hidden
              />

              <motion.div
                className="relative z-10 mx-auto w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative rounded-[1.9rem] p-[1px] bg-gradient-to-br from-white/[0.28] via-[#ff1900]/12 to-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_40px_100px_-36px_rgba(0,0,0,0.82),0_0_100px_-24px_rgba(255,45,30,0.22)]">
                  <div className="rounded-[1.85rem] bg-[#08080c] p-[1px] ring-1 ring-black/50">
                    <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-b from-[#16161f] via-[#0d0d12] to-[#050506]">
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-20"
                        aria-hidden
                      />
                      <div
                        className="pointer-events-none absolute inset-0 z-[4] opacity-[0.035] mix-blend-overlay"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                        aria-hidden
                      />
                      <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[5/6.2] lg:min-h-[min(520px,58vh)]">
                        <div
                          className="absolute inset-0 z-0"
                          style={{
                            background:
                              "radial-gradient(ellipse 70% 58% at 50% 36%, rgba(255,255,255,0.07) 0%, rgba(255,25,0,0.04) 35%, transparent 65%)",
                          }}
                          aria-hidden
                        />
                        <Image
                          src="/portraits/plesnicart.png?v=2"
                          alt="Boris Plesnicar – Inhaber von Plesnicar Solutions"
                          width={1000}
                          height={1200}
                          className="relative z-[1] w-full h-full object-contain object-bottom scale-[1.04] sm:scale-[1.02] lg:scale-100 drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                          priority
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 420px, 520px"
                        />
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[48%] bg-gradient-to-t from-[#050506] via-[#070709]/88 to-transparent"
                          aria-hidden
                        />
                        <div className="absolute bottom-0 left-0 right-0 z-[3] px-5 sm:px-6 pb-5 sm:pb-6 pt-20">
                          <div className="h-px w-12 bg-gradient-to-r from-[#ff1900]/80 to-transparent mb-4" aria-hidden />
                          <MicroKicker tone="red" className="mt-0 text-xs tracking-[0.14em]">
                            {c.imageCaption}
                          </MicroKicker>
                          <p className="text-sm sm:text-[15px] text-white/55 font-light mt-2 leading-relaxed max-w-[28ch]">
                            {c.captionTagline}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-center">
            <motion.div
              className="relative text-center lg:text-left space-y-6 md:space-y-8 [font-family:var(--font-syne)] lg:pr-6 xl:pr-10"
              initial="initial"
              animate="animate"
              variants={staggerParent}
            >
              <div
                className="hidden lg:block absolute -inset-x-4 -inset-y-6 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] -z-10 pointer-events-none"
                aria-hidden
              />

              <motion.div variants={staggerItem} className="flex justify-center lg:justify-start">
                <SectionKicker>{c.badge}</SectionKicker>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="text-[2rem] leading-[1.12] sm:text-4xl md:text-[2.75rem] lg:text-[2.85rem] font-extrabold tracking-tight text-white"
              >
                {c.titleLine1}{" "}
                <span className="bg-gradient-to-r from-[#ff5c42] via-[#ff3d28] to-[#ff6b52] bg-clip-text text-transparent">
                  {c.titleHighlight}
                </span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                {c.sub}
              </motion.p>

              <motion.p
                variants={staggerItem}
                className="text-sm md:text-base text-white/40 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 border-l-2 border-[#ff1900]/45 pl-4 -ml-px"
              >
                {c.subBridge}{" "}
                <Link
                  href={bauHashHref}
                  className="text-[#ff6b52] hover:text-white font-medium underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] rounded"
                >
                  {c.subBridgeLinkLabel}
                </Link>
                .
              </motion.p>

              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-1"
              >
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#e83218] to-[#ff3d28] text-white text-sm font-bold shadow-lg shadow-[#c42810]/25 transition-[transform,box-shadow] duration-200 hover:shadow-xl hover:shadow-[#ff3d28]/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {c.ctaPrimary}
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    strokeWidth={2.5}
                  />
                </Link>
                <Link
                  href="/leistungen"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl border border-white/[0.1] bg-white/[0.03] text-white/90 text-sm font-semibold hover:bg-white/[0.06] hover:border-white/[0.14] transition-colors"
                >
                  {c.ctaSecondary}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
