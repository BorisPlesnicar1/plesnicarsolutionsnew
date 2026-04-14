"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Wrench } from "lucide-react";
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
  const delayCta = delayP + 140;
  const delaySub = delayCta + 400;
  const delayChips = delaySub + 100;

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
    "group absolute z-20 hidden sm:flex flex-col rounded-[1.125rem] border border-white/[0.085] bg-[#0b0b12]/[0.76] p-4 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.045)] ring-1 ring-inset ring-white/[0.035] supports-[backdrop-filter]:backdrop-blur-2xl motion-safe:transition motion-safe:duration-300 motion-safe:hover:border-white/[0.11] motion-safe:hover:bg-[#0c0c14]/[0.82] motion-safe:hover:shadow-[0_22px_56px_-18px_rgba(0,0,0,0.78)]";

  const heroTopicIconWrap =
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] border border-white/[0.08] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] motion-safe:transition motion-safe:duration-300 group-hover:border-white/[0.11] group-hover:bg-white/[0.055]";

  let charIndex = 0;

  return (
    <section
      id="hero"
      className={`relative overflow-visible pt-20 pb-10 md:pt-28 md:pb-16 px-4 sm:px-6 min-h-0 md:min-h-[100vh] flex items-center ${introActive ? "hero-intro-active" : ""}`}
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

      <div className="relative z-10 container mx-auto px-0 sm:px-6 pr-4 sm:pr-6 lg:pr-10 xl:pr-16 max-w-[100vw] w-full overflow-visible">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_auto] gap-10 md:gap-12 lg:gap-0 items-center">
          <div
            key={lang}
            ref={heroTextRef}
            className="hero-copy-col text-center lg:text-left space-y-5 md:space-y-7 lg:pr-10 xl:pr-14 pb-8 md:pb-10 max-w-2xl overflow-visible [font-family:var(--font-syne)]"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold leading-[1.28] tracking-tight break-words pb-1 w-full overflow-visible">
              <span className="hero-line block overflow-visible">
                {lines[0].split("").map((c, i) => {
                  const d = charIndex++ * 38;
                  return (
                    <span key={i} className="hero-char inline-block" style={{ animationDelay: `${d}ms` }}>
                      {c === " " ? "\u00A0" : c}
                    </span>
                  );
                })}
              </span>
              <span className="hero-line block mt-1 overflow-visible">
                {lines[1].split("").map((c, i) => {
                  const d = charIndex++ * 38;
                  return (
                    <span key={i} className="hero-char inline-block" style={{ animationDelay: `${d}ms` }}>
                      {c === " " ? "\u00A0" : c}
                    </span>
                  );
                })}
              </span>
              <span className="hero-line hero-line-gradient block mt-2 overflow-visible">
                {lines[2].split("").map((c, i) => {
                  const d = charIndex++ * 38;
                  return (
                    <span key={i} className="hero-char inline-block" style={{ animationDelay: `${d}ms` }}>
                      {c === " " ? "\u00A0" : c}
                    </span>
                  );
                })}
              </span>
              <span className="hero-line hero-line-gradient block mt-1 overflow-visible">
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

            <p className="hero-animate hero-block-audience text-sm md:text-[0.95rem] text-white/58 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light border-l-2 border-[#ff1900]/45 pl-4 py-0.5">
              {t.hero.audienceLine}
            </p>

            <div className="hero-animate hero-block-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-1">
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                <Link
                  href="/kontakt"
                  className="group px-10 py-4 bg-gradient-to-r from-[#ff1900] to-[#ff2d00] text-white text-base font-bold shadow-2xl shadow-[#ff1900]/30 flex items-center justify-center gap-2.5 rounded-2xl"
                >
                  {t.hero.ctaOffer}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02, y: -4 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href="/leistungen"
                  className="block px-10 py-4 bg-white/[0.03] border border-white/[0.1] text-white text-base font-semibold rounded-2xl backdrop-blur-sm text-center"
                >
                  {t.hero.ctaServices}
                </Link>
              </motion.div>
            </div>

            <p className="hero-animate hero-block-sub text-white/50 text-sm mt-2 text-center lg:text-left">{t.hero.sub}</p>

            <nav
              className="hero-animate hero-block-chips flex flex-wrap justify-center lg:justify-start items-center gap-x-3 gap-y-1 pt-2 text-[11px] font-semibold"
              aria-label={lang === "en" ? "Topics" : "Themen"}
            >
              <Link
                href="/leistungen#leistung-it"
                className="text-white/65 border-b border-transparent hover:border-[#ff1900]/55 hover:text-white pb-0.5 transition-colors"
              >
                {t.heroChips.it}
              </Link>
              <span className="text-white/20 select-none" aria-hidden>
                ·
              </span>
              <Link
                href="/leistungen#leistung-bau"
                className="text-amber-200/75 border-b border-transparent hover:border-amber-400/50 hover:text-amber-100 pb-0.5 transition-colors"
              >
                {t.heroChips.bau}
              </Link>
              <span className="text-white/20 select-none" aria-hidden>
                ·
              </span>
              <Link
                href="/leistungen#projekte"
                className="text-white/65 border-b border-transparent hover:border-[#ff1900]/55 hover:text-white pb-0.5 transition-colors"
              >
                {t.heroChips.projects}
              </Link>
            </nav>
          </div>

          <div className="relative flex justify-center lg:justify-end items-center w-full isolate">
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
              className={`${heroTopicGlass} bottom-[19%] md:bottom-[15.5%] left-[-1%] md:left-[-9%] lg:left-[-6%] w-[min(100%,224px)] md:w-[min(100%,244px)]`}
            >
              <div className="flex items-center gap-2.5">
                <span className={heroTopicIconWrap}>
                  <Code2 className="h-4 w-4 text-[#ff8068]" strokeWidth={2.2} aria-hidden />
                </span>
                <span className="text-[11px] font-semibold tracking-tight text-white/[0.92]">{t.heroPills.itTitle}</span>
              </div>
              <p className="mt-2.5 pl-[2.625rem] text-[10px] font-medium leading-relaxed tracking-[0.01em] text-white/54">{t.heroPills.itSub}</p>
            </div>

            <div
              className={`${heroTopicGlass} bottom-[55%] md:bottom-[47%] left-[-1%] md:left-[-9%] lg:left-[-6%] w-[min(100%,224px)] md:w-[min(100%,252px)]`}
            >
              <div className="flex items-start gap-2.5">
                <span className={heroTopicIconWrap}>
                  <Wrench className="h-4 w-4 text-[#ff8068]" strokeWidth={2.2} aria-hidden />
                </span>
                <span className="text-[11px] font-semibold tracking-tight text-white/[0.92] leading-snug">{t.heroPills.bauTitle}</span>
              </div>
              <p className="mt-2.5 pl-[2.625rem] text-[10px] font-medium leading-relaxed tracking-[0.01em] text-white/54">{t.heroPills.bauSub1}</p>
              <p className="mt-1.5 pl-[2.625rem] text-[10px] font-medium leading-relaxed tracking-[0.01em] text-white/54">{t.heroPills.bauSub2}</p>
            </div>

            <div
              ref={heroImageRef}
              className="hero-image-wrap relative z-10 w-[min(100%,300px)] sm:w-[340px] md:w-[450px] lg:w-[500px] xl:w-[560px] min-h-0 md:min-h-[70vh] flex items-center justify-center lg:justify-end"
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
                className="relative z-[1] w-full h-auto max-h-[55vh] md:max-h-[85vh] object-contain object-bottom contrast-[1.015] drop-shadow-[0_22px_48px_rgba(0,0,0,0.48)] drop-shadow-[0_6px_16px_rgba(0,0,0,0.28)]"
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
