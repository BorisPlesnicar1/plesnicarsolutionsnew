"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";

export function TeamSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];

  return (
    <section id="team" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
      <SectionBackground />
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial="initial"
          animate="animate"
          variants={staggerParent}
        >
          <motion.div variants={staggerItem} className="mb-4 flex justify-center">
            <SectionKicker align="center">{t.team.label}</SectionKicker>
          </motion.div>
          <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {t.team.title}{" "}
            <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.team.titleHighlight}</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {[
            {
              name: "Boris Plesnicar",
              role: t.team.borisRole,
              education: t.team.borisEdu,
              credential: t.team.borisCredential,
              image: "/portraits/boris.jpg",
              isOwner: true,
              expertise: t.team.expertiseBoris,
              phone: "+43 664 467 8382",
              phoneHref: "tel:+436644678382",
              sigImg: "/signatures/signatureboris.png",
              sigAlt: t.team.sigAltBoris,
              sigLabel: t.team.sigBoris,
            },
            {
              name: "Ing. Dietmar Plesnicar",
              role: t.team.dietmarRole,
              education: t.team.dietmarEdu,
              credential: null,
              image: "/portraits/dietmar.png",
              isOwner: false,
              expertise: t.team.expertiseDietmar,
              phone: "+43 676 320 6308",
              phoneHref: "tel:+436763206308",
              sigImg: "/signatures/signaturedietmar.png",
              sigAlt: t.team.sigAltDietmar,
              sigLabel: t.team.sigDietmar,
            },
          ].map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={motionViewport}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl border transition-all duration-500 bg-[#0a0a0a]/90 border-white/[0.1] backdrop-blur-xl shadow-xl p-7 md:p-9 min-w-0 h-full ${
                person.isOwner ? "md:hover:border-[#ff1900]/45 border-[#ff1900]/25" : "md:hover:border-white/[0.2]"
              } md:hover:shadow-xl md:hover:shadow-[#ff1900]/10`}
            >
              {person.isOwner && <div className="absolute top-0 left-7 w-12 h-0.5 bg-gradient-to-r from-[#ff1900] to-transparent rounded-full" />}
              <div className="flex items-start gap-5 mb-5">
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className={`object-cover ${person.isOwner ? "object-[center_30%]" : "object-center"}`}
                    sizes="(max-width: 768px) 80px, 96px"
                  />
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-white text-lg">{person.name}</h3>
                    {person.isOwner ? (
                      <span className="pl-2 py-0.5 border-l-2 border-[#ff1900] text-[#ff6b52] text-[10px] font-bold uppercase tracking-wider">
                        {t.team.owner}
                      </span>
                    ) : (
                      <span className="pl-2 py-0.5 border-l border-white/20 text-white/45 text-[10px] font-semibold uppercase tracking-wider">
                        {t.team.support}
                      </span>
                    )}
                  </div>
                  {person.credential && (
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] supports-[backdrop-filter]:backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                        <span className="w-1 h-1 rounded-full bg-[#ff6b52]" aria-hidden />
                        {person.credential}
                      </span>
                    </div>
                  )}
                  <p className={`text-sm mb-1 ${person.isOwner ? "text-[#ff1900] font-semibold" : "text-white/55 font-medium"}`}>{person.role}</p>
                  <p className="text-xs text-white/45 font-light">{person.education}</p>
                </div>
              </div>

              <p className="text-xs leading-relaxed mb-5 text-white/55">
                {person.expertise.map((tag, idx) => (
                  <span key={idx}>
                    {idx > 0 && <span className="text-white/25 mx-1.5">·</span>}
                    <span className={person.isOwner ? "text-[#ff6b52] font-medium" : ""}>{tag}</span>
                  </span>
                ))}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-4 border-t border-white/[0.06]">
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 w-full min-w-0">
                  <a
                    href={person.phoneHref}
                    className="inline-flex items-center justify-center gap-2 min-w-0 px-4 py-2.5 rounded-xl bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold text-sm transition-colors shadow-lg shadow-[#ff1900]/25 w-full sm:w-auto sm:min-w-[140px]"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
                    <span className="truncate">{person.phone}</span>
                  </a>
                  <a
                    href="tel:+43273432048"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] text-white font-medium text-sm transition-colors w-full sm:w-auto sm:min-w-[120px] min-w-0"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0 text-[#ff1900]" strokeWidth={2} />
                    {t.team.landline}
                  </a>
                  <a
                    href="mailto:plesnicaroffice@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] text-white font-medium text-sm transition-colors w-full sm:w-auto sm:min-w-[120px] min-w-0"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0 text-[#ff1900]" strokeWidth={2} />
                    {t.team.email}
                  </a>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-0.5 shrink-0 ml-0 sm:ml-4">
                  <span className="block brightness-0 invert" aria-hidden="true">
                    <Image src={person.sigImg} alt={person.sigAlt} width={120} height={40} className="h-5 w-auto opacity-80" loading="lazy" />
                  </span>
                  <p className="text-[8px] text-white/40 tracking-[0.15em] uppercase">{person.sigLabel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
