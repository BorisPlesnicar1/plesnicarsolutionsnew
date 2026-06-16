"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";

function setHeroVisible(el: HTMLDivElement | null, imgWrap: HTMLDivElement | null) {
  if (!el) return;
  el.querySelectorAll(".hero-char").forEach((node) => {
    (node as HTMLElement).style.opacity = "1";
    (node as HTMLElement).style.transform = "none";
    (node as HTMLElement).style.animation = "none";
  });
  el.querySelectorAll(".hero-animate").forEach((node) => {
    (node as HTMLElement).style.opacity = "1";
    (node as HTMLElement).style.transform = "none";
    (node as HTMLElement).style.animation = "none";
  });
  if (imgWrap) {
    imgWrap.style.opacity = "1";
    imgWrap.style.transform = "none";
    imgWrap.style.animation = "none";
  }
}

export function HeroSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  /** Desktop: nach Ladescreen – CSS-Animationen starten (kein Anime.js → kein Hängen bei Navigation). */
  const [introActive, setIntroActive] = useState(false);

  const lines = [t.hero.line1, t.hero.line2, t.hero.line3, t.hero.line4] as const;
  const totalChars = lines.join("").length;
  const lastCharMs = Math.max(0, totalChars - 1) * 38;
  const delayP = Math.min(2000, lastCharMs + 240);
  const delayCta = delayP + 160;
  const delaySub = delayCta + 220;
  const delayChips = delaySub + 280;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const listener = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const mobile = typeof window !== "undefined" && window.innerWidth < 768;
    const reduce =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mobile || reduce) {
      setIntroActive(true);
      return;
    }

    const win = window as unknown as { __ps_loading_closed?: boolean };
    const arm = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIntroActive(true));
      });
    };

    if (win.__ps_loading_closed) {
      arm();
      return;
    }
    const onLoadingClosed = () => arm();
    window.addEventListener("ps-loading-closed", onLoadingClosed);
    return () => window.removeEventListener("ps-loading-closed", onLoadingClosed);
  }, []);

  useEffect(() => {
    const el = heroTextRef.current;
    const imgWrap = heroImageRef.current;
    if (!el) return;
    const show = () => setHeroVisible(el, imgWrap);
    const raf = requestAnimationFrame(() => requestAnimationFrame(show));
    return () => cancelAnimationFrame(raf);
  }, [lang]);

  /** Rechts: gleiche Glas-Sprache für beide Themen-Karten + dezentes Hover */
  const heroTopicGlass =
    "group absolute z-20 hidden lg:flex flex-col rounded-[1.125rem] border border-white/[0.085] bg-[#0b0b12]/[0.76] p-4 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.045)] ring-1 ring-inset ring-white/[0.035] supports-[backdrop-filter]:backdrop-blur-2xl motion-safe:transition motion-safe:duration-300 motion-safe:hover:border-white/[0.11] motion-safe:hover:bg-[#0c0c14]/[0.82] motion-safe:hover:shadow-[0_22px_56px_-18px_rgba(0,0,0,0.78)]";

  const heroTopicIconWrap =
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] border border-white/[0.08] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] motion-safe:transition motion-safe:duration-300 group-hover:border-white/[0.11] group-hover:bg-white/[0.055]";

  let charIndex = 0;

  return (
    <section
      id="hero"
      className={`relative overflow-x-clip pt-[4.75rem] pb-8 sm:pt-24 sm:pb-10 md:pt-28 md:pb-16 px-4 sm:px-6 lg:min-h-[100vh] lg:flex lg:items-center ${introActive ? "hero-intro-active" : ""}`}
      style={
        {
          "--hero-delay-p": `${delayP}ms`,
          "--hero-delay-cta": `${delayCta}ms`,
          "--hero-delay-sub": `${delaySub}ms`,
          "--hero-delay-chips": `${delayChips}ms`,
        } as CSSProperties
      }
    >
      <div className="absolute inset-0 z-0 bg-[#070709]" />

      <div
        className="hero-orb-1 absolute top-[5%] left-[15%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-[#ff1900]/[0.07] rounded-full blur-[140px] md:blur-[220px] z-0"
        aria-hidden
      />
      <div className="hero-orb-2 absolute bottom-[-10%] right-[0%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#ff3d00]/[0.06] rounded-full blur-[120px] md:blur-[200px] z-0" />
      <div className="hero-orb-drift absolute top-[-5%] right-[15%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-[#1a0a3e]/20 rounded-full blur-[100px] md:blur-[160px] z-0" />
      <div className="absolute bottom-[10%] left-[40%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#ff1900]/[0.04] rounded-full blur-[80px] md:blur-[140px] z-0" />

      <div
        className="hero-grid absolute inset-0 z-[1]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 40% 50%, transparent 0%, #070709 100%)",
          opacity: 0.5,
        }}
      />

      <div
        className="absolute inset-0 z-[2] opacity-[0.012]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 container mx-auto px-0 lg:pr-10 xl:pr-16 max-w-[100vw] w-full min-w-0">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[minmax(0,1fr)_minmax(220px,36%)] lg:grid-cols-[minmax(0,1fr)_auto] gap-6 sm:gap-8 md:gap-6 lg:gap-10 xl:gap-12 items-center">
          <div
            key={lang}
            ref={heroTextRef}
            className="hero-copy-col flex w-full min-w-0 flex-col items-start text-left gap-4 sm:gap-4 md:gap-5 lg:gap-5 lg:pr-8 xl:pr-14 pb-2 sm:pb-4 md:pb-0 max-w-full md:max-w-none lg:max-w-xl xl:max-w-2xl md:self-center [font-family:var(--font-syne)]"
          >
            <h1 className="w-full min-w-0 text-[clamp(1.625rem,7.4vw,2rem)] leading-[1.3] sm:text-4xl sm:leading-[1.28] md:text-[2.35rem] md:leading-[1.24] lg:text-[3.25rem] lg:leading-[1.2] xl:text-[3.75rem] font-extrabold tracking-tight text-balance">
              <span className="hero-line block">
                {lines[0].split("").map((c, i) => {
                  const d = charIndex++ * 38;
                  return (
                    <span key={i} className="hero-char inline-block" style={{ animationDelay: `${d}ms` }}>
                      {c === " " ? "\u00A0" : c}
                    </span>
                  );
                })}
              </span>
              <span className="hero-line block mt-1.5 sm:mt-2">
                {lines[1].split("").map((c, i) => {
                  const d = charIndex++ * 38;
                  return (
                    <span key={i} className="hero-char inline-block" style={{ animationDelay: `${d}ms` }}>
                      {c === " " ? "\u00A0" : c}
                    </span>
                  );
                })}
              </span>
              <span className="hero-line hero-line-gradient block mt-2 sm:mt-2.5">
                {lines[2].split("").map((c, i) => {
                  const d = charIndex++ * 38;
                  return (
                    <span key={i} className="hero-char inline-block" style={{ animationDelay: `${d}ms` }}>
                      {c === " " ? "\u00A0" : c}
                    </span>
                  );
                })}
              </span>
              <span className="hero-line hero-line-gradient block mt-1.5 sm:mt-2">
                {lines[3].split("").map((c, i) => {
                  const d = charIndex++ * 38;
                  return (
                    <span key={i} className="hero-char inline-block" style={{ animationDelay: `${d}ms` }}>
                      {c === " " ? "\u00A0" : c}
                    </span>
                  );
                })}
              </span>
            </h1>

            <div className="hero-animate hero-block-audience w-full min-w-0">
              <p className="text-[13px] sm:text-sm lg:text-[0.95rem] text-white/45 font-medium leading-relaxed max-w-lg">
                {t.hero.audienceIntro}
              </p>
              <ul className="mt-3 grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-5 gap-y-3 sm:gap-x-6 sm:gap-y-3.5 lg:gap-x-10 lg:mt-4 max-w-2xl">
                <li className="min-w-0 space-y-0.5 lg:space-y-1">
                  <Link
                    href="/leistungen#leistung-it"
                    className="inline-block text-sm font-bold text-[#ff8068] hover:text-[#ff9a80] underline decoration-[#ff1900]/35 underline-offset-[5px] hover:decoration-[#ff8068]/70 transition-colors"
                  >
                    {t.hero.audienceItLabel}:
                  </Link>
                  <p className="text-[13px] sm:text-sm text-white/52 leading-snug sm:leading-relaxed">
                    {t.hero.audienceItItems}
                  </p>
                </li>
                <li className="min-w-0 space-y-0.5 lg:space-y-1">
                  <Link
                    href="/leistungen#leistung-bau"
                    className="inline-block text-sm font-bold text-amber-300/90 hover:text-amber-200 underline decoration-amber-400/30 underline-offset-[5px] hover:decoration-amber-300/60 transition-colors"
                  >
                    {t.hero.audienceBauLabel}:
                  </Link>
                  <p className="text-[13px] sm:text-sm text-white/52 leading-snug sm:leading-relaxed">
                    {t.hero.audienceBauItems}
                  </p>
                </li>
              </ul>
            </div>

            <div className="hero-animate hero-block-cta flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:flex-nowrap justify-start pt-0.5 sm:pt-1">
              <motion.div
                className="w-full sm:w-auto sm:shrink-0"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                <Link
                  href="/kontakt"
                  className="group relative overflow-hidden w-full sm:w-auto px-8 lg:px-10 py-3.5 lg:py-4 bg-gradient-to-r from-[#ff1900] to-[#ff2d00] text-white text-[15px] sm:text-base font-bold shadow-[0_18px_40px_-12px_rgba(255,25,0,0.55)] flex items-center justify-center gap-2.5 rounded-2xl ring-1 ring-inset ring-white/15 whitespace-nowrap"
                >
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-60" aria-hidden />
                  <span className="relative">{t.hero.ctaOffer}</span>
                  <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                </Link>
              </motion.div>
              <motion.div
                className="w-full sm:w-auto sm:shrink-0"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -4 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href="/leistungen"
                  className="block w-full sm:w-auto px-8 lg:px-10 py-3.5 lg:py-4 bg-white/[0.03] border border-white/[0.1] text-white text-[15px] sm:text-base font-semibold rounded-2xl backdrop-blur-sm text-center hover:bg-white/[0.06] hover:border-white/[0.18] transition-colors whitespace-nowrap"
                >
                  {t.hero.ctaServices}
                </Link>
              </motion.div>
            </div>

            <div className="hero-animate flex w-full flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 lg:gap-x-5">
              <p className="hero-block-sub text-white/42 text-xs sm:text-[13px] leading-relaxed">
                {t.hero.ctaMicro}
              </p>
              <div className="hero-block-chips flex justify-start">
              <Link
                href="/leistungen#projekte"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/45 hover:text-white/75 underline decoration-white/15 underline-offset-[5px] hover:decoration-white/35 transition-colors"
              >
                {t.hero.exploreProjects}
                <ArrowRight className="w-3.5 h-3.5 opacity-70" strokeWidth={2.25} aria-hidden />
              </Link>
            </div>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end items-end md:items-center w-full min-w-0 isolate md:-mt-2 lg:mt-0">
            {/* Bühne: weicher Spotlight-Halo + langsam rotierender Lichtring für Tiefe */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 hidden md:block aspect-square w-[min(118%,640px)] rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 50% 42%, rgba(255,60,30,0.16) 0%, rgba(255,40,0,0.06) 34%, transparent 62%)",
                filter: "blur(8px)",
              }}
              aria-hidden
            />
            <div
              className="hero-stage-ring pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 hidden lg:block aspect-square w-[min(108%,560px)] rounded-full opacity-[0.55]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(255,60,30,0.32) 40deg, transparent 120deg, transparent 220deg, rgba(255,120,80,0.18) 280deg, transparent 340deg)",
                WebkitMask: "radial-gradient(circle, transparent 67%, #000 68.5%, #000 71%, transparent 72%)",
                mask: "radial-gradient(circle, transparent 67%, #000 68.5%, #000 71%, transparent 72%)",
              }}
              aria-hidden
            />
            {/* Ruhiger „Studio“-Hintergrund: neutrale Tiefe statt roter Zielscheiben / Leuchtpunkte */}
            <div
              className="pointer-events-none absolute inset-0 z-0 hidden md:block"
              style={{
                background:
                  "radial-gradient(ellipse 74% 86% at 56% 44%, rgba(12,12,18,0.26) 0%, transparent 64%), radial-gradient(ellipse 52% 48% at 68% 90%, rgba(7,7,9,0.82) 0%, transparent 58%)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-[7%] right-[10%] z-0 hidden lg:block h-[min(50%,400px)] w-[min(44%,300px)] rounded-[3rem] opacity-[0.1]"
              style={{
                background: "linear-gradient(165deg, rgba(255,35,25,0.2) 0%, transparent 55%)",
                filter: "blur(48px)",
              }}
              aria-hidden
            />

            <div
              className={`${heroTopicGlass} top-[3%] md:top-[5%] left-[-1%] md:left-[-9%] lg:left-[-6%] w-[min(100%,224px)] md:w-[min(100%,244px)]`}
            >
              <div className="flex items-center gap-2.5">
                <span className={heroTopicIconWrap}>
                  <GraduationCap className="h-4 w-4 text-[#ff8068]" strokeWidth={2.2} aria-hidden />
                </span>
                <span className="text-[11px] font-semibold tracking-tight text-white/[0.92]">{t.heroPills.eduTitle}</span>
              </div>
              <p className="mt-2.5 pl-[2.625rem] text-[10px] font-medium leading-relaxed tracking-[0.01em] text-white/54">{t.heroPills.eduSub}</p>
            </div>

            <div
              ref={heroImageRef}
              className="hero-image-wrap relative z-10 w-[min(100%,300px)] sm:w-[300px] md:w-[min(100%,260px)] lg:w-[460px] xl:w-[540px] min-h-0 flex items-end md:items-center justify-center md:justify-end"
            >
              {/* Dezente Kante + Innenkante: etwas mehr „Objekt“, weniger flach */}
              <div
                className="pointer-events-none absolute inset-x-[3.5%] bottom-[1.5%] top-[7%] rounded-[2rem] md:rounded-[2.35rem] border border-white/[0.055] bg-gradient-to-b from-white/[0.025] via-transparent to-transparent opacity-[0.88] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                aria-hidden
              />
              <Image
                src="/portraits/plesnicart.png?v=2"
                alt="Boris Plesnicar – Inhaber von Plesnicar Solutions"
                width={1000}
                height={1200}
                className="relative z-[1] w-full h-auto max-h-[min(52vh,420px)] sm:max-h-[min(56vh,460px)] md:max-h-[min(72vh,560px)] lg:max-h-[85vh] object-contain object-bottom contrast-[1.015] drop-shadow-[0_22px_48px_rgba(0,0,0,0.48)] drop-shadow-[0_6px_16px_rgba(0,0,0,0.28)]"
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 420px, 560px"
                quality={85}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
