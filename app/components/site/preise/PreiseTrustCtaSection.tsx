"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, Laptop, MapPin, UserCircle } from "lucide-react";
import { getPreiseBundle } from "@/lib/preise-page";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewportLong, staggerItem, staggerParent } from "@/app/components/site/motion-presets";
import { useSite } from "@/app/contexts/SiteContext";

const trustIcons = [UserCircle, MapPin, Laptop, Home] as const;

export function PreiseTrustCtaSection() {
  const { lang } = useSite();
  const { copy } = getPreiseBundle(lang);
  const v = copy.vertrauen;
  const c = copy.cta;

  return (
    <>
      <section id="vertrauen" className="relative py-16 md:py-24 px-4 sm:px-6 border-t border-white/5 overflow-hidden bg-[#070709]">
        <SectionBackground />
        <div
          className="pointer-events-none absolute inset-0 opacity-75"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,40,30,0.07) 0%, transparent 55%)",
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
              <SectionKicker align="center">{v.sectionLabel}</SectionKicker>
            </motion.div>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-black tracking-tight text-white">
              {v.title}{" "}
              <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{v.titleHighlight}</span>
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {v.items.map((item, i) => {
              const Ico = trustIcons[i] ?? UserCircle;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={motionViewportLong}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="text-center md:text-left rounded-[1.25rem] p-[1px] bg-gradient-to-br from-white/[0.12] via-transparent to-[#ff1900]/10 shadow-[0_20px_56px_-28px_rgba(0,0,0,0.72)]"
                >
                  <div className="h-full rounded-[1.2rem] border border-white/[0.06] bg-gradient-to-b from-[#101014]/92 to-[#070709]/95 px-6 py-8 supports-[backdrop-filter]:backdrop-blur-sm">
                    <div className="mx-auto md:mx-0 w-11 h-11 rounded-full bg-gradient-to-br from-[#ff1900]/22 to-[#ff1900]/6 border border-[#ff1900]/28 shadow-[0_0_22px_-6px_rgba(255,25,0,0.4)] flex items-center justify-center mb-4">
                      <Ico className="w-5 h-5 text-[#ff8f7a]" strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/52 font-light leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="preise-cta"
        className="relative py-16 md:py-24 px-4 sm:px-6 border-t border-white/5 overflow-hidden bg-[#070709]"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-90"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(255,45,35,0.12) 0%, transparent 55%), linear-gradient(to bottom, rgba(255,25,0,0.06), transparent 45%)",
          }}
          aria-hidden
        />
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={motionViewportLong}
            variants={staggerParent}
            className="rounded-[1.6rem] p-[1px] bg-gradient-to-br from-white/[0.2] via-[#ff1900]/35 to-white/[0.08] shadow-[0_0_0_1px_rgba(255,25,0,0.12),0_32px_100px_-28px_rgba(255,45,30,0.35),0_48px_120px_-48px_rgba(0,0,0,0.9)]"
          >
            <div className="relative overflow-hidden rounded-[1.55rem] border border-[#ff1900]/15 bg-gradient-to-b from-[#14141c]/96 via-[#0a0a0f]/97 to-[#070709]/98 px-6 py-12 md:px-12 md:py-14 supports-[backdrop-filter]:backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-80"
                aria-hidden
              />
              <motion.h2 variants={staggerItem} className="relative text-2xl md:text-3xl font-black text-white tracking-tight">
                {c.title}
              </motion.h2>
              <motion.p variants={staggerItem} className="relative mt-4 text-white/52 font-light text-base leading-relaxed">
                {c.sub}
              </motion.p>
              <motion.div variants={staggerItem} className="relative mt-8">
                <Link
                  href="/kontakt"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#ff1900] to-[#ff2d00] text-white text-base font-bold shadow-[0_0_40px_-10px_rgba(255,25,0,0.55),0_12px_40px_-18px_rgba(255,25,0,0.35)] ring-1 ring-white/15 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                >
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/[0.07] to-white/15 opacity-60 pointer-events-none" aria-hidden />
                  <span className="relative">{c.button}</span>
                  <ArrowRight className="relative w-5 h-5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
