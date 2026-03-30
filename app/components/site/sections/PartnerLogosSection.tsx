"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { HANDELS_PARTNER } from "@/lib/handelspartner";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";

export function PartnerLogosSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];
  const p = t.partnerStrip;
  const partnersHref = lang === "en" ? "/handelspartner?lang=en" : "/handelspartner";

  return (
    <section id="partner-logos" className="py-14 sm:py-18 md:py-20 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial="initial"
          whileInView="animate"
          viewport={motionViewport}
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-3 flex justify-center">
            <SectionKicker align="center">{p.label}</SectionKicker>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white"
          >
            {p.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{p.titleHighlight}</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="mt-3 text-white/45 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            {p.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={motionViewport}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 md:gap-x-12 md:gap-y-10"
        >
          {HANDELS_PARTNER.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center min-w-[120px] max-w-[160px] md:max-w-[180px] opacity-90 hover:opacity-100 transition-opacity"
              aria-label={partner.name}
            >
              <span
                className={
                  partner.logoOnLightBg
                    ? "inline-flex items-center justify-center rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-black/10"
                    : "inline-flex items-center justify-center"
                }
              >
                <Image
                  src={partner.logoSrc}
                  alt=""
                  width={partner.logoWidth}
                  height={partner.logoHeight}
                  className={
                    partner.logoOnLightBg
                      ? "h-8 sm:h-9 md:h-10 w-auto max-w-full object-contain transition-opacity duration-300"
                      : "h-9 sm:h-10 md:h-11 w-auto max-w-full object-contain grayscale-[0.35] group-hover:grayscale-0 transition-[filter] duration-300"
                  }
                />
              </span>
            </a>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={motionViewport}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Link
            href={partnersHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff8a72] hover:text-white transition-colors group"
          >
            {p.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
