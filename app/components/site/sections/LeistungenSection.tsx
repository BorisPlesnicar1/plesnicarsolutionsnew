"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Boxes, Code2, Palette, ShoppingCart, Wrench } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";

export function LeistungenSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];

  return (
    <section id="leistungen" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial="initial"
          animate="animate"
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{t.leistungen.label}</SectionKicker>
          </motion.div>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {t.leistungen.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.leistungen.titleHighlight}</span>
          </motion.h2>
          <motion.nav
            variants={staggerItem}
            className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 pt-6 text-xs font-semibold"
            aria-label={lang === "en" ? "Topics" : "Themen"}
          >
            <Link
              href="/leistungen#leistung-it"
              className="text-white/70 border-b border-transparent hover:border-[#ff1900]/55 hover:text-white pb-0.5 transition-colors"
            >
              {t.leistungenChips.it}
            </Link>
            <span className="text-white/20 select-none" aria-hidden>
              ·
            </span>
            <Link
              href="/leistungen#leistung-bau"
              className="text-amber-200/80 border-b border-transparent hover:border-amber-400/50 hover:text-amber-100 pb-0.5 transition-colors"
            >
              {t.leistungenChips.bau}
            </Link>
            <span className="text-white/20 select-none" aria-hidden>
              ·
            </span>
            <Link
              href="/leistungen#leistung-baustoff"
              className="text-amber-200/80 border-b border-transparent hover:border-amber-400/50 hover:text-amber-100 pb-0.5 transition-colors"
            >
              {t.leistungenChips.baustoff}
            </Link>
            <span className="text-white/20 select-none" aria-hidden>
              ·
            </span>
            <Link
              href="/leistungen#projekte"
              className="text-white/70 border-b border-transparent hover:border-[#ff1900]/55 hover:text-white pb-0.5 transition-colors"
            >
              {t.leistungenChips.projects}
            </Link>
          </motion.nav>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {[
            { ...t.leistungen.services[0], icon: Code2, wide: true as const, scrollId: "leistung-it" as const },
            { ...t.leistungen.services[1], icon: Palette, wide: false as const, scrollId: undefined },
            { ...t.leistungen.services[2], icon: Wrench, wide: false as const, scrollId: "leistung-bau" as const },
            { ...t.leistungen.services[3], icon: ShoppingCart, wide: false as const, scrollId: undefined },
            { ...t.leistungen.services[4], icon: Boxes, wide: false as const, scrollId: "leistung-baustoff" as const },
          ].map((service, i) => {
            const IconComponent = service.icon;
            const { scrollId, ...card } = service;
            return (
              <motion.div
                key={scrollId ?? `leistung-${i}`}
                id={scrollId}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={motionViewport}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative scroll-mt-28 rounded-2xl border transition-all duration-300 bg-[#0a0a0a]/95 border-white/[0.1] shadow-xl motion-reduce:transition-none ${
                  card.wide
                    ? "lg:col-span-2 p-8 md:p-10 md:hover:border-[#ff1900]/40"
                    : "p-7 md:p-8 md:hover:border-white/[0.2]"
                } ${card.wide ? "border-[#ff1900]/20" : ""} md:hover:-translate-y-1 md:hover:shadow-xl md:hover:shadow-[#ff1900]/10`}
              >
                {card.wide && <div className="absolute top-0 left-8 w-16 h-0.5 bg-gradient-to-r from-[#ff1900] to-transparent rounded-full" />}
                <div className={`flex ${card.wide ? "items-start gap-6 md:gap-8" : "flex-col gap-5"}`}>
                  <div
                    className={`flex-shrink-0 rounded-xl bg-gradient-to-br from-[#ff1900]/15 to-[#ff1900]/5 border border-[#ff1900]/15 flex items-center justify-center transition-all duration-500 group-hover:scale-105 ${
                      card.wide ? "w-14 h-14" : "w-12 h-12"
                    }`}
                  >
                    <IconComponent className={`text-[#ff1900] ${card.wide ? "w-7 h-7" : "w-6 h-6"}`} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-bold text-white mb-4 group-hover:text-[#ff1900] transition-colors duration-400 ${
                        card.wide ? "text-xl md:text-2xl" : "text-lg md:text-xl"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <ul className={card.wide ? "grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3" : "space-y-3"}>
                      {card.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/70 group-hover:text-white/90 transition-colors duration-400 min-w-0">
                          <span className="w-1 h-1 rounded-full bg-[#ff1900] mt-2.5 flex-shrink-0" />
                          <span className="font-light text-sm leading-relaxed break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
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
