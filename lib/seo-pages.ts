import type { Metadata } from "next";

const SITE = "https://plesnicarsolutions.at";

const PREISE_DESC_DE =
  "Transparente Richtpreise: One-Page ab 999 €, Business-Website ab 1.900 €, Branding ab 699 €, Wartung ab 49 €/Monat – Schwerpunkt Web & Design aus Österreich. Bau & Baustoffe: Unterstützung nach Absprache.";
const PREISE_DESC_EN =
  "Transparent guide prices from Austria: focus on web & design (one-page from €999, business sites from €1,900, branding from €699, care from €49/month). Construction & materials: support by arrangement.";

const HANDELS_DESC_DE =
  "Ausgewählte Partner aus Bau, Handel und Industrie – Baumit, L&G Bau, Lagerhaus, Leitl, Lasselsberger. Netzwerk für Qualität und Lieferketten bei Plesnicar Solutions, Österreich.";
const HANDELS_DESC_EN =
  "Selected construction, trade, and industry partners – Baumit, L&G Bau, Lagerhaus, Leitl, Lasselsberger. Quality and supply-chain network with Plesnicar Solutions, Austria.";

function parseLangParam(raw: string | string[] | undefined): "de" | "en" {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "en" ? "en" : "de";
}

export function localeFromSearchParams(searchParams: { lang?: string | string[] }): "de" | "en" {
  return parseLangParam(searchParams.lang);
}

export function getPreiseMetaDescription(lang: "de" | "en"): string {
  return lang === "en" ? PREISE_DESC_EN : PREISE_DESC_DE;
}

export function getHandelspartnerMetaDescription(lang: "de" | "en"): string {
  return lang === "en" ? HANDELS_DESC_EN : HANDELS_DESC_DE;
}

export function buildPreiseMetadata(lang: "de" | "en"): Metadata {
  const path = "/preise";
  const canonicalPath = lang === "en" ? `${path}?lang=en` : path;
  const canonicalUrl = `${SITE}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;

  const titleDe = "Richtpreise";
  const titleEn = "Guide prices";
  const descDe = PREISE_DESC_DE;
  const descEn = PREISE_DESC_EN;

  const title = lang === "en" ? titleEn : titleDe;
  const description = lang === "en" ? descEn : descDe;
  const ogTitle = `${title} | Plesnicar Solutions`;

  return {
    title,
    description,
    keywords:
      lang === "en"
        ? [
            "website pricing Austria",
            "web design Lower Austria",
            "branding",
            "one-page website",
            "IT services Austria",
            "construction partner",
            "building materials",
            "Plesnicar Solutions",
          ]
        : [
            "Richtpreise Webdesign",
            "Website Preise Österreich",
            "Branding Niederösterreich",
            "One-Page Website",
            "IT Dienstleistungen",
            "Baupartner",
            "Baustoffe Beratung",
            "Plesnicar Solutions",
          ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "de-AT": `${SITE}${path}`,
        en: `${SITE}${path}?lang=en`,
        "x-default": `${SITE}${path}`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: ogTitle,
      description,
      siteName: "Plesnicar Solutions",
      locale: lang === "en" ? "en_AT" : "de_AT",
      alternateLocale: lang === "en" ? ["de_AT"] : ["en_AT"],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export function buildHandelspartnerMetadata(lang: "de" | "en"): Metadata {
  const path = "/handelspartner";
  const canonicalPath = lang === "en" ? `${path}?lang=en` : path;
  const canonicalUrl = `${SITE}${canonicalPath}`;

  const titleDe = "Handelspartner";
  const titleEn = "Trade partners";
  const descDe = HANDELS_DESC_DE;
  const descEn = HANDELS_DESC_EN;

  const title = lang === "en" ? titleEn : titleDe;
  const description = lang === "en" ? descEn : descDe;
  const ogTitle = `${title} | Plesnicar Solutions`;

  return {
    title,
    description,
    keywords:
      lang === "en"
        ? [
            "building materials partners Austria",
            "construction suppliers",
            "Baumit",
            "Lagerhaus",
            "trade network",
            "Plesnicar Solutions",
          ]
        : [
            "Handelspartner Baustoffe",
            "Baumit Händler",
            "Lagerhaus Partner",
            "Bau Lieferanten Österreich",
            "Plesnicar Solutions",
          ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "de-AT": `${SITE}${path}`,
        en: `${SITE}${path}?lang=en`,
        "x-default": `${SITE}${path}`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: ogTitle,
      description,
      siteName: "Plesnicar Solutions",
      locale: lang === "en" ? "en_AT" : "de_AT",
      alternateLocale: lang === "en" ? ["de_AT"] : ["en_AT"],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
    robots: { index: true, follow: true },
  };
}
