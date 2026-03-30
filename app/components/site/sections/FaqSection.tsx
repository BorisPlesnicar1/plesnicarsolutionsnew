"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";

export function FaqSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];
  const f = t.faq;

  return (
    <section id="faq" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial="initial"
          whileInView="animate"
          viewport={motionViewport}
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{f.label}</SectionKicker>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white"
          >
            {f.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{f.titleHighlight}</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="mt-4 text-white/50 font-light text-base md:text-lg">
            {f.intro}
          </motion.p>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial="initial"
          whileInView="animate"
          viewport={motionViewport}
          variants={staggerParent}
        >
          {f.items.map((item, i) => (
            <motion.div key={i} variants={staggerItem}>
              <details className="group rounded-2xl border border-white/[0.08] bg-[#0a0a0e]/90 supports-[backdrop-filter]:backdrop-blur-sm open:border-[#ff1900]/25 open:bg-[#0c0c12]/95 transition-colors">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-4.5 text-left font-semibold text-white text-sm md:text-base [&::-webkit-details-marker]:hidden">
                  <span className="pr-2">{item.q}</span>
                  <ChevronDown
                    className="w-5 h-5 shrink-0 text-[#ff1900]/80 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <div className="px-5 pb-5 pt-0 md:px-6 md:pb-6 border-t border-transparent group-open:border-white/[0.06]">
                  <p className="text-sm md:text-[0.9375rem] text-white/58 font-light leading-relaxed pt-3">{item.a}</p>
                </div>
              </details>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
