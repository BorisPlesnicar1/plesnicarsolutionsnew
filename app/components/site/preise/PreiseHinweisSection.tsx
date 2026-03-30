"use client";

import { motion } from "framer-motion";
import { Layers, FileText, Clock } from "lucide-react";
import { getPreiseBundle } from "@/lib/preise-page";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewportLong, staggerItem, staggerParent } from "@/app/components/site/motion-presets";
import { useSite } from "@/app/contexts/SiteContext";

const icons = [Layers, FileText, Clock] as const;

export function PreiseHinweisSection() {
  const { lang } = useSite();
  const h = getPreiseBundle(lang).copy.hinweis;

  return (
    <section id="hinweis" className="relative py-16 md:py-24 px-4 sm:px-6 border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 15% 30%, rgba(255,35,25,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(255,25,0,0.04) 0%, transparent 45%)",
        }}
        aria-hidden
      />
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial="initial"
          whileInView="animate"
          viewport={motionViewportLong}
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{h.sectionLabel}</SectionKicker>
          </motion.div>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-black tracking-tight text-white">
            {h.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{h.titleHighlight}</span>
          </motion.h2>
        </motion.div>

        <div className="space-y-5 mb-12 md:mb-14">
          {h.body.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={motionViewportLong}
              transition={{ duration: 0.45 }}
              className="text-base md:text-lg text-white/55 font-light leading-relaxed text-center md:text-left"
            >
              {para}
            </motion.p>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {h.bullets.map((b, i) => {
            const Ico = icons[i] ?? Layers;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={motionViewportLong}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="group rounded-[1.25rem] p-[1px] bg-gradient-to-br from-white/[0.14] via-white/[0.04] to-[#ff1900]/12 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.75)] hover:shadow-[0_28px_72px_-28px_rgba(0,0,0,0.82),0_0_40px_-18px_rgba(255,25,0,0.1)] transition-shadow duration-300"
              >
                <div className="h-full rounded-[1.2rem] border border-white/[0.05] bg-gradient-to-b from-[#111116]/95 via-[#0a0a0e]/96 to-[#070709]/98 p-6 md:p-7 supports-[backdrop-filter]:backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff1900]/28 to-[#ff1900]/8 border border-[#ff1900]/32 shadow-[0_0_20px_-6px_rgba(255,25,0,0.45)] flex items-center justify-center mb-4">
                    <Ico className="w-5 h-5 text-[#ff9a82]" strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-white/52 font-light leading-relaxed">{b.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
