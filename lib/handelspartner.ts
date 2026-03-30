/**
 * Handelspartner für /handelspartner — Logos unter /public/logos/
 */

import type { Lang } from "@/app/translations";

export type Handelspartner = {
  id: string;
  name: string;
  url: string;
  logoSrc: string;
  /** Für next/image */
  logoWidth: number;
  logoHeight: number;
  /** Optionale Grid-Platzierung (lg 6-Spalten-Layout) */
  gridClass?: string;
};

export const HANDELS_PARTNER: Handelspartner[] = [
  {
    id: "baumit",
    name: "Baumit",
    url: "https://baumit.at/",
    logoSrc: "/logos/baumit/default_seo_image.jpg",
    logoWidth: 400,
    logoHeight: 200,
    gridClass: "lg:col-span-2 lg:col-start-1",
  },
  {
    id: "lg-bau",
    name: "L&G Bau GmbH",
    url: "http://www.lg-bau.at/",
    logoSrc: "/logos/lgbau/1264_43949374.jpeg",
    logoWidth: 400,
    logoHeight: 200,
    gridClass: "lg:col-span-2 lg:col-start-3",
  },
  {
    id: "lagerhaus",
    name: "Lagerhaus",
    url: "https://lagerhaus.at/",
    logoSrc: "/logos/lagerhaus/Lagerhaus-Logo.png",
    logoWidth: 320,
    logoHeight: 120,
    gridClass: "lg:col-span-2 lg:col-start-5",
  },
  {
    id: "leitl",
    name: "Leitl Ziegel und Betonfertigteile",
    url: "https://www.leitl.at/",
    logoSrc: "/logos/leitl/Leitl.png",
    logoWidth: 320,
    logoHeight: 120,
    gridClass: "lg:col-span-2 lg:col-start-2 lg:row-start-2",
  },
  {
    id: "lasselsberger",
    name: "Lasselsberger",
    url: "https://lasselsberger.at/",
    logoSrc: "/logos/lasselsberger/176086.png",
    logoWidth: 280,
    logoHeight: 100,
    gridClass: "lg:col-span-2 lg:col-start-4 lg:row-start-2",
  },
];

export const handelspartnerCopy = {
  hero: {
    badge: "Handelspartner",
    title: "Starke Partner für starke Projekte",
    sub:
      "Damit Sie beim Bauen und bei Baustoffen nicht allein entscheiden müssen, arbeiten wir mit ausgewählten Unternehmen aus Bau, Handel und Industrie zusammen – für nachvollziehbare Qualität, Logistik und faire Wege in Ihrem Projekt.",
  },
  grid: {
    sectionLabel: "Netzwerk",
    title: "Ausgewählte Partner",
    intro:
      "Nachfolgend finden Sie Marken und Lieferanten, mit denen wir regelmäßig zusammenarbeiten. Die Auswahl spiegelt unseren Anspruch an Verlässlichkeit und regionale Nähe wider – nicht jede mögliche Kooperation ist aufgeführt.",
    hint: "Jede Karte führt zur Website des jeweiligen Unternehmens und öffnet in einem neuen Tab.",
    viewWebsiteLabel: "Website ansehen",
  },
  info: {
    sectionLabel: "Gut zu wissen",
    title: "So nutzen wir dieses Netzwerk",
    items: [
      {
        title: "Projektbezogen",
        text: "Partner kommen dort zum Einsatz, wo sie fachlich und wirtschaftlich sinnvoll sind – abgestimmt auf Ihr Vorhaben.",
      },
      {
        title: "Österreichischer Fokus",
        text: "Wir bevorzugen bewährte Anbieter aus dem Inland, kurze Wege und nachvollziehbare Lieferketten.",
      },
      {
        title: "Keine gesponserten Inhalte",
        text: "Die Darstellung dient der Transparenz unserer Zusammenarbeit, nicht bezahlter Werbeplatzierung.",
      },
    ],
  },
  legalNote:
    "Die dargestellten Unternehmen sind ausgewählte Partner, mit denen wir im Rahmen von Projekten zusammenarbeiten. Die Verwendung der Logos dient ausschließlich zur Darstellung dieser Zusammenarbeit.",
  warum: {
    sectionLabel: "Qualität",
    title: "Warum diese Partner?",
    text:
      "Wir setzen auf zuverlässige Materialien, bewährte Lieferketten und starke Partner, um für unsere Kunden nachhaltige und hochwertige Ergebnisse zu liefern.",
  },
  cta: {
    title: "Sie planen ein Projekt?",
    text: "Lassen Sie uns gemeinsam die passende Lösung entwickeln – von der ersten Idee bis zur Umsetzung.",
    button: "Projekt anfragen",
    secondaryHref: "/preise",
    secondaryLabel: "Richtpreise ansehen",
  },
} as const;

export const handelspartnerCopyEn = {
  hero: {
    badge: "Trade partners",
    title: "Strong partners for strong projects",
    sub:
      "So you are not left to decide alone when building or choosing building materials, we work with selected companies from construction, trade, and industry – for traceable quality, logistics, and fair paths in your project.",
  },
  grid: {
    sectionLabel: "Network",
    title: "Selected partners",
    intro:
      "Below are brands and suppliers we work with regularly. The list reflects our focus on reliability and regional ties – not every possible cooperation is shown.",
    hint: "Each card links to the company website and opens in a new tab.",
    viewWebsiteLabel: "View website",
  },
  info: {
    sectionLabel: "Good to know",
    title: "How we use this network",
    items: [
      {
        title: "Project-based",
        text: "Partners are involved where it makes technical and economic sense – aligned with your project.",
      },
      {
        title: "Austria-focused",
        text: "We favour proven domestic suppliers, short distances, and transparent supply chains.",
      },
      {
        title: "No sponsored placements",
        text: "This page explains our collaborations; it is not paid advertising space.",
      },
    ],
  },
  legalNote:
    "The companies shown are selected partners we work with on projects. Logos are used solely to illustrate these collaborations.",
  warum: {
    sectionLabel: "Quality",
    title: "Why these partners?",
    text:
      "We rely on dependable materials, proven supply chains, and strong partners to deliver sustainable, high-quality outcomes for our clients.",
  },
  cta: {
    title: "Planning a project?",
    text: "Let us shape the right approach together – from the first idea through to delivery.",
    button: "Start a project enquiry",
    secondaryHref: "/preise",
    secondaryLabel: "View guide prices",
  },
} as const;

export type HandelspartnerCopy = typeof handelspartnerCopy;

export function getHandelspartnerCopy(lang: Lang): HandelspartnerCopy {
  return (lang === "en" ? handelspartnerCopyEn : handelspartnerCopy) as HandelspartnerCopy;
}

export function getHandelspartnerDocumentTitle(lang: Lang): string {
  return lang === "en" ? "Trade partners | Plesnicar Solutions" : "Handelspartner | Plesnicar Solutions";
}
