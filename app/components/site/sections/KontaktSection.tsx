"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Mail, Phone } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { ContactForm } from "@/app/components/site/ContactForm";
import { staggerItem, staggerParent } from "@/app/components/site/motion-presets";

export function KontaktSection() {
  const { lang, cookieConsent, updateConsent } = useSite();
  const t = TRANSLATIONS[lang];

  return (
    <section id="kontakt" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="initial"
          animate="animate"
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{t.kontakt.label}</SectionKicker>
          </motion.div>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            {t.kontakt.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.kontakt.titleHighlight}</span>
          </motion.h2>
          <motion.p variants={staggerItem} className="text-white/50 font-light text-sm md:text-base max-w-lg mx-auto">
            {t.kontakt.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 md:gap-8 items-start"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-4 min-w-0">
            <div className="p-5 md:p-6 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl hover:border-white/[0.18] transition-all duration-300">
              <p className="text-white font-bold text-base mb-1">{t.kontakt.boris}</p>
              <p className="text-white/55 text-sm mb-2">{t.kontakt.borisRole}</p>
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] supports-[backdrop-filter]:backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <span className="w-1 h-1 rounded-full bg-[#ff6b52]" aria-hidden />
                  {t.kontakt.borisEdu}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <a
                  href="tel:+436644678382"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold text-sm transition-colors shadow-lg shadow-[#ff1900]/25 w-full sm:w-auto min-w-0"
                >
                  <Phone className="w-4 h-4" strokeWidth={2.5} />
                  +43 664 4678382
                </a>
                <a
                  href="tel:+43273432048"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm transition-colors w-full sm:w-auto min-w-0"
                >
                  <Phone className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                  {t.team.landline}
                </a>
                <a
                  href="mailto:plesnicaroffice@gmail.com"
                  title="plesnicaroffice@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm transition-colors w-full sm:w-auto min-w-0"
                >
                  <Mail className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                  {t.team.email}
                </a>
              </div>
            </div>
            <div className="p-5 md:p-6 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl hover:border-white/[0.18] transition-all duration-300">
              <p className="text-white font-bold text-base mb-1">{t.kontakt.dietmar}</p>
              <p className="text-white/55 text-sm mb-4">{t.kontakt.dietmarRole}</p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <a
                  href="tel:+436763206308"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold text-sm transition-colors shadow-lg shadow-[#ff1900]/25 w-full sm:w-auto min-w-0"
                >
                  <Phone className="w-4 h-4" strokeWidth={2.5} />
                  +43 676 3206308
                </a>
                <a
                  href="tel:+43273432048"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm transition-colors w-full sm:w-auto min-w-0"
                >
                  <Phone className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                  {t.team.landline}
                </a>
                <a
                  href="mailto:plesnicaroffice@gmail.com"
                  title="plesnicaroffice@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm transition-colors w-full sm:w-auto min-w-0"
                >
                  <Mail className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                  {t.team.email}
                </a>
              </div>
            </div>
            <ContactForm lang={lang} />
          </div>

          <div className="space-y-4 min-w-0">
            <div className="p-5 md:p-6 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl border-[#ff1900]/15">
              <h3 className="text-white font-bold text-base mb-3">{t.kontakt.standort}</h3>
              <div className="w-full h-48 md:h-52 rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
                {cookieConsent?.comfort ? (
                  <iframe
                    src="https://www.google.com/maps?q=Hartriegelstraße+12,+3550+Langenlois,+Österreich&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title="Plesnicar Solutions Standort"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 text-center">
                    <p className="text-white/65 text-xs md:text-sm font-light">{t.kontakt.mapConsent}</p>
                    <button
                      type="button"
                      onClick={() => updateConsent(true)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ff1900] hover:bg-[#e61700] text-white text-sm font-semibold transition-colors"
                    >
                      {t.kontakt.acceptCookies}
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-white/65 font-light text-sm mt-3">{t.kontakt.address}</p>
              <p className="text-white/50 text-xs mt-0.5">{t.kontakt.addressNote}</p>
              <p className="text-white/65 font-light text-sm mt-3">
                <strong className="text-white font-semibold">{t.kontakt.festnetz}:</strong>{" "}
                <a href="tel:+43273432048" className="text-[#ff1900] hover:underline">
                  02734/32048
                </a>
              </p>
            </div>
            <a
              href="https://www.instagram.com/plesnicarsolutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl hover:border-white/[0.18] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ff1900]/20 border border-[#ff1900]/30 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-[#ff1900]" strokeWidth={2} />
              </div>
              <span className="font-semibold text-white text-sm">@plesnicarsolutions</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
