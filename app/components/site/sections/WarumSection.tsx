"use client";

import { motion } from "framer-motion";
import { Rocket, Sparkles, User, Zap } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";

export function WarumSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];

  return (
    <section id="warum" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial="initial"
          whileInView="animate"
          viewport={motionViewport}
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{t.warum.label}</SectionKicker>
          </motion.div>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {t.warum.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.warum.titleHighlight}</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {t.warum.items.map((benefit, i) => {
            const icons = [Zap, Sparkles, User, Rocket];
            const IconComponent = icons[i];
            const wide = i === 0 || i === 3;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={motionViewport}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group flex items-start gap-5 rounded-2xl border bg-[#0a0a0a]/90 border-white/[0.1] backdrop-blur-xl shadow-xl transition-all duration-500 md:hover:border-white/[0.2] md:hover:shadow-lg md:hover:shadow-[#ff1900]/10 ${
                  wide ? "md:col-span-2 p-7 md:p-8" : "p-6 md:p-7"
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#ff1900]/10 border border-[#ff1900]/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-400">
                  <IconComponent className="w-6 h-6 text-[#ff1900]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">{benefit.title}</h3>
                  <p className="text-white/60 font-light leading-relaxed text-sm">{benefit.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
