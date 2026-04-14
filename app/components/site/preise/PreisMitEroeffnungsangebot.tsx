"use client";

import type { Lang } from "@/app/translations";
import { getOpeningOfferPriceLabelCopy, getOpeningOfferPriceUi } from "@/lib/preise-opening-offer";

const priceGradientClass =
  "text-2xl md:text-3xl font-black tabular-nums tracking-tight bg-gradient-to-r from-[#ff7a5c] via-[#ff4d33] to-[#ff8f6b] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(255,45,30,0.25)]";

type PreisMitEroeffnungsangebotProps = {
  priceLabel: string;
  lang: Lang;
  /** z. B. leicht andere Gradient-Richtung wie in PaketCard */
  promoClassName?: string;
};

export function PreisMitEroeffnungsangebot({ priceLabel, lang, promoClassName = priceGradientClass }: PreisMitEroeffnungsangebotProps) {
  const ui = getOpeningOfferPriceUi(priceLabel);
  const labels = getOpeningOfferPriceLabelCopy(lang);

  if (ui.mode === "inactive" || ui.mode === "plain") {
    return <p className={promoClassName}>{ui.mode === "plain" ? ui.label : priceLabel}</p>;
  }

  const sr =
    lang === "en"
      ? `Opening offer, ${ui.rabattProzent} percent off the usual guide price: ${ui.originalLabel}. Promotional guide price: ${ui.promoLabel}. For a limited time.`
      : `Eröffnungsangebot, ${ui.rabattProzent} Prozent Rabatt auf den üblichen Richtpreis: ${ui.originalLabel}. Aktions-Richtpreis: ${ui.promoLabel}. Nur für kurze Zeit.`;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-lg border border-[#ff1900]/28 bg-[#ff1900]/[0.12] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#ffb5a8]">
          {labels.badge}
        </span>
        <span className="text-xs font-semibold tabular-nums text-white/55">−{ui.rabattProzent}&nbsp;%</span>
        <span className="text-[11px] text-white/40 font-light">{labels.limited}</span>
      </div>
      <p className="flex flex-col gap-0.5">
        <span className="text-base md:text-lg font-semibold tabular-nums text-white/32 line-through decoration-white/20" aria-hidden="true">
          {ui.originalLabel}
        </span>
        <span className={promoClassName}>{ui.promoLabel}</span>
      </p>
      <span className="sr-only">{sr}</span>
    </div>
  );
}
