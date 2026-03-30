"use client";

import { motion } from "framer-motion";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";

export function UeberUnsSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];

  return (
    <section id="ueber-uns" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="md:flex md:gap-12 lg:gap-16 items-start">
          <div className="hidden md:block flex-shrink-0 w-px self-stretch bg-gradient-to-b from-[#ff1900] via-[#ff1900]/40 to-transparent" />

          <motion.div
            className="flex-1 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl p-8 md:p-10 space-y-10"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionKicker>{t.ueberUns.label}</SectionKicker>
            <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] text-white font-light leading-[1.35]">
              <span className="text-[#ff1900] font-bold">{t.ueberUns.heading}</span> {t.ueberUns.headingRest}
            </h2>
            <div className="h-px w-20 bg-white/10" />
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-light max-w-3xl">{t.ueberUns.body}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
