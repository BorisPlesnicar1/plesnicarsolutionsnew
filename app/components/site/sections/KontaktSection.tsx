"use client";

import { motion } from "framer-motion";
import { ArrowRight, Instagram, Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { MicroKicker, SectionKicker } from "@/app/components/site/SectionKicker";
import { ContactForm } from "@/app/components/site/ContactForm";
import { staggerItem, staggerParent } from "@/app/components/site/motion-presets";

const FESTNETZ_NUMBER = "02734/32048";
const FESTNETZ_HREF = "tel:+43273432048";
const EMAIL_ADDRESS = "plesnicaroffice@gmail.com";

/** Nachrangige Direktdurchwahl je Ansprechpartner – Haupterreichbarkeit bleibt Festnetz & E-Mail. */
const ANSPRECHPARTNER = [
  { id: "boris", mobil: "+43 664 4678382", href: "tel:+436644678382" },
  { id: "dietmar", mobil: "+43 676 3206308", href: "tel:+436763206308" },
] as const;

export function KontaktSection() {
  const { lang, cookieConsent, updateConsent } = useSite();
  const t = TRANSLATIONS[lang];

  const cardClass =
    "rounded-[1.35rem] border border-white/[0.08] bg-gradient-to-b from-[#101014]/92 via-[#0a0a0e]/95 to-[#070709]/98 supports-[backdrop-filter]:backdrop-blur-xl shadow-[0_24px_64px_-32px_rgba(0,0,0,0.75)]";

  return (
    <section
      id="kontakt"
      className="relative border-t border-white/5 overflow-hidden bg-[#070709] px-4 py-16 sm:px-6 sm:py-20 md:py-28"
    >
      <SectionBackground />
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 75% 45% at 50% -5%, rgba(255,45,35,0.07) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 95% 70%, rgba(255,25,0,0.04) 0%, transparent 45%)",
        }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="mb-10 text-center md:mb-12"
          initial="initial"
          animate="animate"
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{t.kontakt.label}</SectionKicker>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="mb-3 text-3xl font-black tracking-tight text-white md:text-4xl"
          >
            {t.kontakt.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">
              {t.kontakt.titleHighlight}
            </span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mx-auto max-w-lg text-sm font-light text-white/50 md:text-base"
          >
            {t.kontakt.subtitle}
          </motion.p>
        </motion.div>

        {/* Haupterreichbarkeit: Festnetz + E-Mail bewusst vor allen anderen Wegen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[1.4rem] p-[1px] bg-gradient-to-br from-white/[0.22] via-[#ff1900]/35 to-white/[0.08] shadow-[0_0_0_1px_rgba(255,25,0,0.1),0_32px_80px_-28px_rgba(255,35,25,0.2)]"
        >
          <div className="rounded-[1.35rem] border border-[#ff1900]/12 bg-gradient-to-b from-[#14141c]/95 via-[#0a0a0f]/95 to-[#070709]/98 p-5 supports-[backdrop-filter]:backdrop-blur-xl md:p-7">
            <MicroKicker tone="red" className="mt-0">
              {t.kontakt.mainLabel}
            </MicroKicker>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={FESTNETZ_HREF}
                className="group flex min-h-[76px] items-center gap-3.5 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3.5 transition-colors hover:border-[#ff1900]/30 hover:bg-white/[0.07]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff1900] to-[#ff2d00] shadow-lg shadow-[#ff1900]/25">
                  <Phone className="h-5 w-5 text-white" strokeWidth={2.5} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#ff6b52]">
                    {t.kontakt.festnetz}
                  </span>
                  <span className="block text-lg font-bold tabular-nums tracking-tight text-white">
                    {FESTNETZ_NUMBER}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="group flex min-h-[76px] items-center gap-3.5 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3.5 transition-colors hover:border-[#ff1900]/30 hover:bg-white/[0.07]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff1900] to-[#ff2d00] shadow-lg shadow-[#ff1900]/25">
                  <Mail className="h-5 w-5 text-white" strokeWidth={2.5} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#ff6b52]">
                    {t.team.email}
                  </span>
                  <span className="block break-all text-[15px] font-bold leading-snug text-white">
                    {EMAIL_ADDRESS}
                  </span>
                </span>
              </a>
            </div>

            <p className="mt-4 text-sm font-light leading-relaxed text-white/55">{t.kontakt.mainNote}</p>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 grid items-start gap-5 md:gap-6 lg:grid-cols-[1.05fr_0.95fr]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="min-w-0">
            <ContactForm lang={lang} />
          </div>

          <div className="min-w-0 space-y-5 md:space-y-6">
            <div className={`${cardClass} p-5 md:p-6`}>
              <h3 className="text-base font-bold text-white">{t.kontakt.ansprechpartner}</h3>
              <ul className="mt-4 divide-y divide-white/[0.06]">
                {ANSPRECHPARTNER.map((person) => {
                  const isBoris = person.id === "boris";
                  return (
                    <li key={person.id} className="py-4 first:pt-0 last:pb-0">
                      <p className="text-sm font-bold text-white">
                        {isBoris ? t.kontakt.boris : t.kontakt.dietmar}
                      </p>
                      <p className="mt-0.5 text-xs font-light leading-relaxed text-white/50">
                        {isBoris ? t.kontakt.borisRole : t.kontakt.dietmarRole}
                      </p>
                      {isBoris && (
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] supports-[backdrop-filter]:backdrop-blur-md">
                          <span className="h-1 w-1 rounded-full bg-[#ff6b52]" aria-hidden />
                          {t.kontakt.borisEdu}
                        </span>
                      )}
                      <a
                        href={person.href}
                        className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
                      >
                        <Smartphone className="h-4 w-4 text-[#ff6b52]" strokeWidth={2} aria-hidden />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/45">
                          {t.kontakt.mobil}
                        </span>
                        <span className="tabular-nums">{person.mobil}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={`${cardClass} p-5 md:p-6`}>
              <h3 className="flex items-center gap-2 text-base font-bold text-white">
                <MapPin className="h-4 w-4 text-[#ff6b52]" strokeWidth={2.25} aria-hidden />
                {t.kontakt.standort}
              </h3>
              <div className="mt-4 h-48 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] md:h-52">
                {cookieConsent?.comfort ? (
                  <iframe
                    src="https://www.google.com/maps?q=Hartriegelstraße+12,+3550+Langenlois,+Österreich&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full"
                    title="Plesnicar Solutions Standort"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center">
                    <p className="text-xs font-light text-white/65 md:text-sm">{t.kontakt.mapConsent}</p>
                    <button
                      type="button"
                      onClick={() => updateConsent(true)}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#ff1900] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e61700]"
                    >
                      {t.kontakt.acceptCookies}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm font-light text-white/65">{t.kontakt.address}</p>
              <p className="mt-0.5 text-xs text-white/50">{t.kontakt.addressNote}</p>
            </div>

            <a
              href="https://www.instagram.com/plesnicarsolutions/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClass} flex items-center gap-3 p-4 transition-colors hover:border-white/[0.16]`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ff1900]/30 bg-[#ff1900]/20">
                <Instagram className="h-5 w-5 text-[#ff1900]" strokeWidth={2} aria-hidden />
              </span>
              <span className="text-sm font-semibold text-white">@plesnicarsolutions</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
