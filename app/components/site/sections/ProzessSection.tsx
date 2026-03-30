"use client";

import { motion } from "framer-motion";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";

export function ProzessSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];

  return (
    <section id="prozess" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial="initial"
          whileInView="animate"
          viewport={motionViewport}
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{t.prozess.label}</SectionKicker>
          </motion.div>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {t.prozess.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.prozess.titleHighlight}</span>
          </motion.h2>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff1900]/40 via-white/10 to-transparent" />

          <div className="space-y-6 md:space-y-0">
            {t.prozess.steps.map((process, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={motionViewport}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative md:flex items-start gap-8 md:py-8"
              >
                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-[#090a11] border-2 border-[#ff1900]/40 items-center justify-center z-10">
                  <span className="text-xs font-black text-[#ff1900]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1 p-6 md:p-7 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl transition-all duration-500 md:hover:border-white/[0.2] md:hover:-translate-y-1 md:hover:shadow-lg md:hover:shadow-[#ff1900]/8">
                  <div className="flex items-center gap-3 mb-2 md:hidden">
                    <span className="text-xs font-black text-[#ff1900] tabular-nums px-2 py-1 rounded-md border border-[#ff1900]/30 bg-[#ff1900]/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">{process.title}</h3>
                  <p className="text-white/55 font-light leading-relaxed text-sm">{process.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
