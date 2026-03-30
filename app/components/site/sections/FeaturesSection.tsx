"use client";

import { motion } from "framer-motion";
import { Award, BarChart3, CheckCircle2, Clock, TrendingUp, Users } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";

export function FeaturesSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];

  return (
    <section id="features" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
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
            <SectionKicker align="center">{t.features.label}</SectionKicker>
          </motion.div>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {t.features.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.features.titleHighlight}</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {t.features.items.map((feature, i) => {
            const icons = [Clock, CheckCircle2, TrendingUp, Users, BarChart3, Award];
            const IconComponent = icons[i];
            const highlight = i === 0 || i === 5;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={motionViewport}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group relative p-6 md:p-7 rounded-2xl border bg-[#0a0a0a]/90 border-white/[0.1] backdrop-blur-xl shadow-xl transition-all duration-500 md:hover:shadow-lg md:hover:shadow-[#ff1900]/8 ${
                  highlight ? "border-[#ff1900]/20 md:hover:border-[#ff1900]/35" : "md:hover:border-white/[0.2]"
                }`}
              >
                {highlight && <div className="absolute top-0 left-6 w-10 h-0.5 bg-gradient-to-r from-[#ff1900] to-transparent rounded-full" />}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#ff1900]/10 border border-[#ff1900]/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-400">
                    <IconComponent className="w-5 h-5 text-[#ff1900]" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-white/55 font-light leading-relaxed text-sm">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
