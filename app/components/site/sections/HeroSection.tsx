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

            <p className="hero-animate hero-block-p text-base md:text-lg text-white/60 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
              {t.hero.paragraph}
              <span className="text-white font-medium">{t.hero.paragraphBold}</span>
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

          <div className="relative flex justify-center lg:justify-end items-center w-full">
            <div className="hidden md:block absolute bottom-[15%] right-[10%] w-[280px] h-[280px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] rounded-full border-2 border-[#ff1900]/20 z-0" />
            <div className="hidden md:block absolute bottom-[18%] right-[13%] w-[220px] h-[220px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] rounded-full border border-[#ff1900]/10 z-0" />
            <div className="hidden md:block absolute bottom-[5%] right-[15%] w-[250px] h-[300px] md:w-[380px] md:h-[450px] lg:w-[420px] lg:h-[500px] bg-[#ff1900]/[0.08] rounded-full blur-[80px] md:blur-[120px] z-0" />
            <div className="hidden md:block absolute top-[20%] right-[5%] w-4 h-4 md:w-5 md:h-5 bg-[#ff1900] rounded-full z-10 opacity-60" />
            <div className="hidden md:block absolute top-[35%] right-[-2%] w-2.5 h-2.5 md:w-3 md:h-3 bg-[#ff1900]/40 rounded-full z-10" />
            <div className="hidden md:block absolute bottom-[30%] right-[0%] w-3 h-3 bg-white/20 rounded-full z-10" />

            <div className="absolute bottom-[20%] md:bottom-[18%] left-[-5%] md:left-[-15%] z-20 hidden sm:flex flex-col px-4 py-3 bg-[#0a0a0a]/90 border border-white/[0.1] rounded-xl backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <Code2 className="w-4 h-4 text-[#ff1900]" strokeWidth={2.5} />
                <span className="text-[11px] text-white/80 font-bold">{t.heroPills.itTitle}</span>
              </div>
              <span className="text-[10px] text-white/50 font-medium">{t.heroPills.itSub}</span>
            </div>

            <div className="absolute bottom-[57%] md:bottom-[49%] left-[-5%] md:left-[-15%] z-0 hidden sm:flex flex-col px-4 py-3 bg-[#0a0a0a]/90 border border-white/[0.1] rounded-xl backdrop-blur-xl shadow-xl max-w-[200px] md:max-w-[220px]">
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="w-4 h-4 shrink-0 text-[#ff1900]" strokeWidth={2.5} />
                <span className="text-[11px] text-white/80 font-bold">{t.heroPills.bauTitle}</span>
              </div>
              <span className="text-[10px] text-white/50 font-medium leading-snug">{t.heroPills.bauSub1}</span>
              <span className="text-[10px] text-white/50 font-medium leading-snug mt-0.5">{t.heroPills.bauSub2}</span>
            </div>

            <div
              ref={heroImageRef}
              className="hero-image-wrap relative z-10 w-[min(100%,300px)] sm:w-[340px] md:w-[450px] lg:w-[500px] xl:w-[560px] min-h-0 md:min-h-[70vh] flex items-center justify-center lg:justify-end"
            >
              <Image
                src="/portraits/plesnicart.png?v=2"
                alt="Boris Plesnicar – Inhaber von Plesnicar Solutions"
                width={1000}
                height={1200}
                className="w-full h-auto max-h-[55vh] md:max-h-[85vh] object-contain object-bottom drop-shadow-[0_0_80px_rgba(255,25,0,0.12)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
