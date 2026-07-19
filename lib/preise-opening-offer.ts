/**
 * Eröffnungsangebot: Rabatt auf Paket-Richtpreise (Anzeige).
 * `active` auf false setzen, wenn die Aktion endet.
 */

/** Gleiche Werte wie `Lang` in `@/app/translations` — hier dupliziert, damit `lib` keine `app`-Abhängigkeit braucht. */
export type PreiseOpeningOfferLang = "de" | "en";

export const PREISE_OPENING_OFFER = {
  active: true,
  /** Rabatt in Prozent (Anzeige: −40 %) */
  rabattProzent: 40,
} as const;

/** Österreichischer Regelsteuersatz (Einzelunternehmen mit UID – Preise netto). */
export const AUSTRIA_VAT_RATE = 20;

export type OpeningOfferPriceUi =
  | { mode: "inactive" }
  | { mode: "plain"; label: string }
  | { mode: "promo"; originalLabel: string; promoLabel: string; rabattProzent: number };

function formatDeInteger(n: number): string {
  return n.toLocaleString("de-DE", { maximumFractionDigits: 0 });
}

function formatEnInteger(n: number): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function discountedAmount(amount: number): number {
  const f = 1 - PREISE_OPENING_OFFER.rabattProzent / 100;
  return Math.round(amount * f);
}

function grossAmount(netAmount: number): number {
  return Math.round(netAmount * (1 + AUSTRIA_VAT_RATE / 100));
}

function parseDePriceFrom(s: string): { amount: number; afterNumber: string } | null {
  const m = s.match(/^ab\s+([\d.]+)(\s*€.*)$/);
  if (!m) return null;
  const raw = m[1].replace(/\./g, "");
  const amount = Number.parseInt(raw, 10);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return { amount, afterNumber: m[2] };
}

function parseEnPriceFrom(s: string): { amount: number; rest: string } | null {
  const m = s.match(/^from\s+€\s*([\d,]+)(.*)$/);
  if (!m) return null;
  const raw = m[1].replace(/,/g, "");
  const amount = Number.parseInt(raw, 10);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return { amount, rest: m[2] };
}

/** Erkennt DE/EN anhand des bekannten Musters aus `lib/preise-page`. */
export function getOpeningOfferPriceUi(priceFrom: string): OpeningOfferPriceUi {
  if (!PREISE_OPENING_OFFER.active) {
    return { mode: "inactive" };
  }

  const de = parseDePriceFrom(priceFrom);
  if (de) {
    const promo = discountedAmount(de.amount);
    return {
      mode: "promo",
      originalLabel: priceFrom,
      promoLabel: `ab ${formatDeInteger(promo)}${de.afterNumber}`,
      rabattProzent: PREISE_OPENING_OFFER.rabattProzent,
    };
  }

  const en = parseEnPriceFrom(priceFrom);
  if (en) {
    const promo = discountedAmount(en.amount);
    return {
      mode: "promo",
      originalLabel: priceFrom,
      promoLabel: `from €${formatEnInteger(promo)}${en.rest}`,
      rabattProzent: PREISE_OPENING_OFFER.rabattProzent,
    };
  }

  return { mode: "plain", label: priceFrom };
}

/**
 * Bruttopreis-Label (inkl. USt) für den effektiv gezahlten Preis.
 * Basis = Nettopreis; bei aktiver Aktion wird zuerst rabattiert, dann USt aufgeschlagen.
 * Gibt `null` zurück, wenn der Preis nicht parsebar ist (z. B. „Preis auf Anfrage“).
 */
export function getGrossPriceLabel(priceFrom: string, lang: PreiseOpeningOfferLang): string | null {
  const vatPct = AUSTRIA_VAT_RATE;

  const de = parseDePriceFrom(priceFrom);
  if (de) {
    const net = PREISE_OPENING_OFFER.active ? discountedAmount(de.amount) : de.amount;
    return `inkl. ${vatPct} % USt: ab ${formatDeInteger(grossAmount(net))}${de.afterNumber}`;
  }

  const en = parseEnPriceFrom(priceFrom);
  if (en) {
    const net = PREISE_OPENING_OFFER.active ? discountedAmount(en.amount) : en.amount;
    return `incl. ${vatPct}% VAT: from €${formatEnInteger(grossAmount(net))}${en.rest}`;
  }

  return null;
}

export function appendOpeningOfferMetaNote(description: string, lang: "de" | "en"): string {
  if (!PREISE_OPENING_OFFER.active) return description;
  const pct = PREISE_OPENING_OFFER.rabattProzent;
  const note =
    lang === "en"
      ? ` Opening offer: ${pct}% off all package guide prices on this page — for a limited time.`
      : ` Eröffnungsangebot: ${pct} % Rabatt auf alle Paket-Richtpreise auf dieser Seite — nur für kurze Zeit.`;
  return `${description}${note}`;
}

/** Text für das Startseiten-Popup (verweist auf /preise, nicht „auf dieser Seite“). */
export function getOpeningOfferHomePopupCopy(lang: PreiseOpeningOfferLang): { title: string; body: string } {
  const pct = PREISE_OPENING_OFFER.rabattProzent;
  if (lang === "en") {
    return {
      title: "Opening offer",
      body: `${pct}% off all package guide prices — for a limited time. Details are on our guide prices page.`,
    };
  }
  return {
    title: "Eröffnungsangebot",
    body: `${pct} % Rabatt auf alle Paket-Richtpreise — nur für kurze Zeit. Details auf der Seite „Richtpreise“.`,
  };
}

/**
 * Wenn das Popup erneut erscheinen soll (z. B. neue Kampagne): Version erhöhen.
 * Bereits geschlossene Nutzer sehen es dann wieder einmal.
 */
export const PREISE_OPENING_OFFER_POPUP_STORAGE_VERSION = 1;

export function getOpeningOfferPopupDismissedStorageKey(): string {
  return `ps-opening-offer-home-popup-dismissed-v${PREISE_OPENING_OFFER_POPUP_STORAGE_VERSION}`;
}

export function getOpeningOfferBannerCopy(lang: PreiseOpeningOfferLang): { title: string; body: string } {
  const pct = PREISE_OPENING_OFFER.rabattProzent;
  if (lang === "en") {
    return {
      title: "Opening offer",
      body: `${pct}% off all package guide prices on this page — for a limited time. The crossed-out amounts are the usual guide values.`,
    };
  }
  return {
    title: "Eröffnungsangebot",
    body: `${pct} % Rabatt auf alle Paket-Richtpreise auf dieser Seite — nur für kurze Zeit. Die durchgestrichenen Beträge sind die üblichen Richtwerte.`,
  };
}

export function getOpeningOfferPriceLabelCopy(lang: PreiseOpeningOfferLang): { badge: string; limited: string } {
  if (lang === "en") {
    return { badge: "Opening offer", limited: "for a limited time" };
  }
  return { badge: "Eröffnungsangebot", limited: "nur für kurze Zeit" };
}
