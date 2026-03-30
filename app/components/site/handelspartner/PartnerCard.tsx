"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Handelspartner } from "@/lib/handelspartner";
import { getHandelspartnerCopy } from "@/lib/handelspartner";
import { motionViewport } from "@/app/components/site/motion-presets";
import { useSite } from "@/app/contexts/SiteContext";

type PartnerCardProps = {
  partner: Handelspartner;
  index: number;
};

export function PartnerCard({ partner, index }: PartnerCardProps) {
  const { lang } = useSite();
  const viewLabel = getHandelspartnerCopy(lang).grid.viewWebsiteLabel;

  return (
    <motion.a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block h-full ${partner.gridClass ?? ""}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionViewport}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.99 }}
    >
      <div
        className="relative h-full min-h-[220px] rounded-2xl border border-white/[0.1] bg-[#0a0a0a]/95 px-8 py-10 flex flex-col items-center justify-between gap-6
        transition-[border-color,box-shadow] duration-300
        group-hover:border-[#ff1900]/30
        group-hover:shadow-[0_0_48px_-16px_rgba(255,25,0,0.18)]"
      >
        <div className="relative h-28 w-full max-w-[220px] shrink-0">
          <Image
            src={partner.logoSrc}
            alt={`Logo ${partner.name}`}
            width={partner.logoWidth}
            height={partner.logoHeight}
            className="object-contain object-center w-full h-full transition-all duration-500 ease-out grayscale opacity-[0.85] group-hover:grayscale-0 group-hover:opacity-100"
            sizes="(max-width: 768px) 70vw, 220px"
          />
        </div>
        <div className="text-center space-y-3 w-full">
          <p className="text-[15px] font-semibold text-white/95 leading-snug tracking-tight [font-family:var(--font-syne)]">
            {partner.name}
          </p>
          <p className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#ff1900] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {viewLabel}
            <ExternalLink className="w-3.5 h-3.5 shrink-0" strokeWidth={2} aria-hidden />
          </p>
        </div>
      </div>
    </motion.a>
  );
}
