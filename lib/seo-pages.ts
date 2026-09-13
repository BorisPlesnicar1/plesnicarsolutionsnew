import type { Metadata } from "next";
import { appendOpeningOfferMetaNote } from "@/lib/preise-opening-offer";

const SITE = "https://plesnicarsolutions.at";

const IT_DESC_DE =
  "IT & Web bei Plesnicar Solutions: Websites, Branding, Wartung sowie Büro- und Gaming-PCs in klaren Budgetklassen – Richtwerte und persönliche Konfiguration aus Österreich.";
const IT_DESC_EN =
  "IT & web with Plesnicar Solutions: websites, branding, care, plus office and gaming PCs in clear budget tiers – guide prices and personal configuration from Austria.";

const HANDELS_DESC_DE =
  "Ausgewählte Partner aus Bau, Handel und Industrie – Baumit, L&G Bau, Lagerhaus, Leitl, Lasselsberger. Netzwerk für Qualität und Lieferketten bei Plesnicar Solutions, Österreich.";
const HANDELS_DESC_EN =
  "Selected construction, trade, and industry partners – Baumit, L&G Bau, Lagerhaus, Leitl, Lasselsberger. Quality and supply-chain network with Plesnicar Solutions, Austria.";

const BAU_DESC_DE =
  "Bau, Hausbetreuung, Handel & Baustoffe: Unterstützung beim Bauen und Sanieren mit erfahrener Bauingenieur-Perspektive (Ing. Dietmar Plesnicar) und einem Netzwerk geprüfter Handelspartner in Österreich. Preise & Umfang nach Absprache.";
const BAU_DESC_EN =
  "Construction, property care, trade & building materials: support for building and renovation with an experienced civil-engineering perspective (Ing. Dietmar Plesnicar) and a network of vetted trade partners in Austria. Prices & scope by arrangement.";

const REF_DESC_DE =
  "Ausgewählte Projekte und Referenzen aus IT, Digital und Bau von Plesnicar Solutions aus Österreich.";
const REF_DESC_EN =
  "Selected projects and references from IT, digital and construction by Plesnicar Solutions in Austria.";

function parseLangParam(raw: string | string[] | undefined): "de" | "en" {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "en" ? "en" : "de";
}

export function localeFromSearchParams(searchParams: { lang?: string | string[] }): "de" | "en" {
  return parseLangParam(searchParams.lang);
}

/** IT-Seite: Website-Preise + PC-Bau. */
export function getItMetaDescription(lang: "de" | "en"): string {
  const base = lang === "en" ? IT_DESC_EN : IT_DESC_DE;
  return appendOpeningOfferMetaNote(base, lang);
}

export function getBauMetaDescription(lang: "de" | "en"): string {
  return lang === "en" ? BAU_DESC_EN : BAU_DESC_DE;
}

export function getReferenzenMetaDescription(lang: "de" | "en"): string {
  return lang === "en" ? REF_DESC_EN : REF_DESC_DE;
}

export function getHandelspartnerMetaDescription(lang: "de" | "en"): string {
  return lang === "en" ? HANDELS_DESC_EN : HANDELS_DESC_DE;
}

export function buildItMetadata(lang: "de" | "en"): Metadata {
  const path = "/it";
  const canonicalPath = lang === "en" ? `${path}?lang=en` : path;
  const canonicalUrl = `${SITE}${canonicalPath}`;

  const title = lang === "en" ? "IT & web" : "IT & Web";
  const description = lang === "en" ? IT_DESC_EN : IT_DESC_DE;
  const ogTitle = `${title} | Plesnicar Solutions`;

  return {
    title,
    description,
    keywords:
      lang === "en"
        ? [
            "web development Austria",
            "web design Lower Austria",
            "branding",
            "one-page website",
            "IT services Austria",
            "PC build",
            "software development",
            "Plesnicar Solutions",
          ]
        : [
            "Webentwicklung Österreich",
            "Webdesign Niederösterreich",
            "Branding",
            "One-Page Website",
            "IT Dienstleistungen",
            "PC-Bau",
            "Softwareentwicklung",
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

export function buildBauMetadata(lang: "de" | "en"): Metadata {
  const path = "/bau";
  const canonicalPath = lang === "en" ? `${path}?lang=en` : path;
  const canonicalUrl = `${SITE}${canonicalPath}`;

  const title = lang === "en" ? "Construction & materials" : "Bau & Baustoffe";
  const description = lang === "en" ? BAU_DESC_EN : BAU_DESC_DE;
  const ogTitle = `${title} | Plesnicar Solutions`;

  return {
    title,
    description,
    keywords:
      lang === "en"
        ? [
            "construction support Austria",
            "renovation",
            "building materials trade",
            "property care",
            "trade partners",
            "Plesnicar Solutions",
          ]
        : [
            "Unterstützung Bau",
            "Sanierung",
            "Baustoff-Handel",
            "Hausbetreuung",
            "Baupartner Österreich",
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

export function buildReferenzenMetadata(lang: "de" | "en"): Metadata {
  const path = "/referenzen";
  const canonicalPath = lang === "en" ? `${path}?lang=en` : path;
  const canonicalUrl = `${SITE}${canonicalPath}`;

  const title = lang === "en" ? "References" : "Referenzen";
  const description = lang === "en" ? REF_DESC_EN : REF_DESC_DE;
  const ogTitle = `${title} | Plesnicar Solutions`;

  return {
    title,
    description,
    keywords:
      lang === "en"
        ? ["projects", "references", "portfolio", "IT", "construction", "Plesnicar Solutions"]
        : ["Projekte", "Referenzen", "Portfolio", "IT", "Bau", "Plesnicar Solutions"],
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
