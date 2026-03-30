"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { motion } from "framer-motion";
import { Code2, Monitor, Rocket, Sparkles, Zap } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";

export function WasWirAndersSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];
  const wasWirAndersRef = useRef<HTMLElement>(null);
  const card3dRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [wasWirAndersProgress, setWasWirAndersProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const listener = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = wasWirAndersRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        setWasWirAndersProgress(progress);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  const getWasWirAndersStyle = () => {
    const p = wasWirAndersProgress;
    const y =
      p <= 0.2 ? 72 - (p / 0.2) * 48 : p <= 0.5 ? 24 - ((p - 0.2) / 0.3) * 24 : p <= 0.8 ? -((p - 0.5) / 0.3) * 24 : -24 - ((p - 0.8) / 0.2) * 32;
    const opacity = p <= 0.15 ? p / 0.15 : p >= 0.85 ? 1 - ((p - 0.85) / 0.15) * 0.3 : 1;
    const scale = p <= 0.25 ? 0.92 + (p / 0.25) * 0.08 : p >= 0.75 ? 1 - ((p - 0.75) / 0.25) * 0.06 : 1;
    return { y, opacity, scale };
  };
  const wasWirAndersStyle = getWasWirAndersStyle();

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = card3dRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const maxDeg = 14;
    const rotY = x * maxDeg;
    const rotX = -y * maxDeg;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    card.style.transition = "none";
  };
  const handleCardMouseLeave = () => {
    const card = card3dRef.current;
    if (!card) return;
    card.style.transition = "transform 0.4s ease-out";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section ref={wasWirAndersRef} id="was-wir-anders" className="py-16 md:py-24 px-4 sm:px-6 relative border-t border-white/5 overflow-visible bg-[#070709]">
      <motion.div
        className="container mx-auto max-w-6xl"
        style={prefersReducedMotion ? undefined : { y: wasWirAndersStyle.y, opacity: wasWirAndersStyle.opacity, scale: wasWirAndersStyle.scale }}
      >
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial="initial"
          whileInView="animate"
          viewport={motionViewport}
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{t.wasWirAnders.label}</SectionKicker>
          </motion.div>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            {t.wasWirAnders.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.wasWirAnders.titleHighlight}</span>
            {t.wasWirAnders.titleSuffix ? ` ${t.wasWirAnders.titleSuffix}` : ""}
          </motion.h2>
          <motion.p variants={staggerItem} className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto">
            {t.wasWirAnders.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center mb-10 md:mb-12 [perspective:1000px]"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={motionViewport}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={card3dRef}
            className="relative w-full max-w-[320px] h-[200px] md:w-[400px] md:h-[260px] rounded-2xl border border-white/[0.1] bg-[#0c0c14]/95 backdrop-blur-xl shadow-2xl shadow-[#ff1900]/20 cursor-default"
            style={{ transformStyle: "preserve-3d", transition: "transform 0.4s ease-out" }}
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[11px] text-white/40 font-mono">plesnicar-solutions.tsx</span>
              </div>
              <div className="p-5 font-mono text-xs lg:text-sm leading-relaxed space-y-1">
                <p>
                  <span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">solution</span> ={" "}
                  <span className="text-[#98c379]">&quot;{t.wasWirAnders.terminalSolution}&quot;</span>;
                </p>
                <p>
                  <span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">{t.wasWirAnders.terminalQualitaet}</span> ={" "}
                  <span className="text-[#d19a66]">100</span>;
                </p>
                <p>
                  <span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">{t.wasWirAnders.terminalBranchen}</span> ={" "}
                  <span className="text-[#d19a66]">{t.wasWirAnders.terminalValue}</span>;
                </p>
                <p className="text-white/20">&#47;&#47; ...</p>
                <p>
                  <span className="text-[#c678dd]">export</span> <span className="text-[#c678dd]">default</span>{" "}
                  <span className="text-[#61afef]">function</span> <span className="text-[#e5c07b]">Build</span>() &#123;
                </p>
                <p className="pl-4">
                  <span className="text-[#c678dd]">return</span> &lt;<span className="text-[#e06c75]">{t.wasWirAnders.terminalErgebnis}</span>{" "}
                  <span className="text-[#d19a66]">{t.wasWirAnders.terminalPerfekt}</span> /&gt;;
                </p>
                <p>&#125;</p>
              </div>
            </div>
            <div
              className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-[#ff1900] flex items-center justify-center shadow-lg shadow-[#ff1900]/40"
              style={{ transform: "translateZ(40px)" }}
            >
              <Code2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div
              className="absolute -bottom-3 -left-3 w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center"
              style={{ transform: "translateZ(30px)" }}
            >
              <Monitor className="w-4 h-4 text-white/60" strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-6 md:gap-10 max-w-3xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={motionViewport}
          variants={staggerParent}
        >
          {[
            { icon: Zap, label: t.wasWirAnders.value1, sub: t.wasWirAnders.value1Sub },
            { icon: Sparkles, label: t.wasWirAnders.value2, sub: t.wasWirAnders.value2Sub },
            { icon: Rocket, label: t.wasWirAnders.value3, sub: t.wasWirAnders.value3Sub },
          ].map((item, idx) => {
            const Ico = item.icon;
            return (
              <motion.div key={idx} variants={staggerItem} className="text-center space-y-3">
                <motion.div
                  className="mx-auto w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#ff1900]/10 border border-[#ff1900]/20 flex items-center justify-center"
                  whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                >
                  <Ico className="w-6 h-6 md:w-7 md:h-7 text-[#ff1900]" strokeWidth={1.5} />
                </motion.div>
                <p className="text-lg md:text-xl font-bold text-white">{item.label}</p>
                <p className="text-white/45 font-light text-xs md:text-sm">{item.sub}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
