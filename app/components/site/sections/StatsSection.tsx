"use client";

import { useEffect, useRef, useState } from "react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";

export function StatsSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];
  const statsRef = useRef<HTMLElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  const statsAnimatedRef = useRef(false);
  const [statsDisplay, setStatsDisplay] = useState({ years: 0, projects: 0, clients: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const listener = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setStatsInView(true);
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsInView || statsAnimatedRef.current) return;
    const targets = { years: t.stats.years, projects: t.stats.projects, clients: t.stats.clients };
    if (prefersReducedMotion) {
      setStatsDisplay(targets);
      statsAnimatedRef.current = true;
      return;
    }
    statsAnimatedRef.current = true;
    const duration = 1400;
    const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      setStatsDisplay({
        years: Math.round(eased * targets.years),
        projects: Math.round(eased * targets.projects),
        clients: Math.round(eased * targets.clients),
      });
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [statsInView, prefersReducedMotion, t.stats.years, t.stats.projects, t.stats.clients]);

  useEffect(() => {
    if (statsAnimatedRef.current) {
      setStatsDisplay({ years: t.stats.years, projects: t.stats.projects, clients: t.stats.clients });
    }
  }, [lang, t.stats.years, t.stats.projects, t.stats.clients]);

  return (
    <section ref={statsRef} id="stats" className="py-8 md:py-10 px-4 sm:px-6 border-t border-white/5 bg-[#070709]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-3 gap-6 md:gap-8">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black text-[#ff1900] tabular-nums">{statsDisplay.years}+</p>
            <p className="text-white/60 text-sm md:text-base font-medium mt-1">{t.stats.yearsLabel}</p>
          </div>
          <div className="text-center border-x border-white/10">
            <p className="text-2xl md:text-3xl font-black text-[#ff1900] tabular-nums">{statsDisplay.projects}+</p>
            <p className="text-white/60 text-sm md:text-base font-medium mt-1">{t.stats.projectsLabel}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-black text-[#ff1900] tabular-nums">{statsDisplay.clients}+</p>
            <p className="text-white/60 text-sm md:text-base font-medium mt-1">{t.stats.clientsLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
