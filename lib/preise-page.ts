/**
 * Inhalte und Paket-Daten für /preise (DE + EN).
 * Alle Beträge = Orientierungswerte, keine Fixangebote.
 * USt: Kleinunternehmer – es wird keine Umsatzsteuer verrechnet (§ 6 Abs. 1 Z 27 UStG); siehe `pakete.ustNote`.
 */

import type { Lang } from "@/app/translations";

export type PreisPaket = {
  id: string;
  title: string;
  subtitle: string;
  /** Nur wenn keine options – sonst Preis über Toggle */
  priceFrom?: string;
  priceDisclaimer: string;
  features: string[];
  /** Hauptangebot im Grid */
  featured?: boolean;
  /** Zwei Varianten wie One-Page (günstiger Einstieg + erweitert) */
  options?: readonly PaketPreisOption[];
  /** sr-only Label für Radiogruppe */
  toggleAriaLabel?: string;
};

/** Zwei Preisstufen pro Paket (Toggle) */
export type PaketPreisOption = {
  id: string;
  label: string;
  priceFrom: string;
  explainer: string;
};

/** @deprecated Alias – gleiche Form wie PaketPreisOption */
export type OnePagePreisOption = PaketPreisOption;

export const ONE_PAGE_PAKET = {
  id: "one-page",
  title: "One-Page-Website",
  subtitle:
    "Alles Wichtige auf einer Seite – schnell online, klar strukturiert, für Präsenz und erste Anfragen.",
  options: [
    {
      id: "ohne-db",
      label: "Ohne Datenbank",
      priceFrom: "ab 999 €",
      explainer:
        "Statische oder leicht dynamische Inhalte ohne eigenes Backend – ideal für klassische Auftrittsseiten mit Kontakt und Impressum.",
    },
    {
      id: "mit-db",
      label: "Mit Datenbank",
      priceFrom: "ab 1.199 €",
      explainer:
        "Wenn Inhalte verwaltbar, Formulare gespeichert oder kleine dynamische Bereiche nötig sind – z. B. CMS-Anbindung oder einfache Datenspeicherung.",
    },
  ] as const satisfies readonly PaketPreisOption[],
  priceDisclaimer: "abhängig von Text, Medien, Funktionen und Schnittstellen",
  features: [
    "Ein responsives Scroll-Layout mit klarer Struktur",
    "Kontakt & rechtliche Seiten (Impressum/Datenschutz) integrierbar",
    "Hosting-Empfehlung und technische Einrichtung",
    "1–2 Korrekturrunden inklusive",
  ],
} as const;

export const PREISE_PAKETE: PreisPaket[] = [
  {
    id: "business",
    title: "Business-Website",
    subtitle:
      "Einstieg in die mehrseitige Firmenwebsite: übersichtliche Unterseiten für Leistungen, Kontakt und Vertrauen – ohne Overengineering.",
    toggleAriaLabel: "Varianten Business-Website",
    options: [
      {
        id: "business-kompakt",
        label: "Kompakt",
        priceFrom: "ab 1.499 €",
        explainer:
          "Schlanker mehrseitiger Auftritt mit weniger Unterseiten und fokussiertem Layout – ideal, wenn Sie schnell professionell online sein möchten, ohne großen Umfang.",
      },
      {
        id: "business-standard",
        label: "Standard",
        priceFrom: "ab 1.900 €",
        explainer:
          "Mehr Spielraum für Unterseiten und Erweiterungen (z. B. Blog, Formulare, Zusatzmodule) – wie gewohnt klar strukturiert und technisch sauber umgesetzt.",
      },
    ],
    priceDisclaimer: "je nach Seitenzahl und Funktionen",
    features: [
      "Mehrere Unterseiten (z. B. Leistungen, Über uns, Kontakt)",
      "Klares, professionelles Layout – erweiterbar wenn Sie wachsen",
      "SEO-Grundlagen und performanceorientierte Umsetzung",
      "Optional: Blog, Formulare oder einfache Zusatzmodule",
    ],
    featured: true,
  },
  {
    id: "branding",
    title: "Branding, Logo & Grafikdesign",
    subtitle:
      "Wiedererkennung für Web, Print und Social – von der ersten Skizze bis zu den lieferfertigen Dateien.",
    toggleAriaLabel: "Varianten Logo & Branding",
    options: [
      {
        id: "branding-logo",
        label: "Logo-Fokus",
        priceFrom: "ab 449 €",
        explainer:
          "Logoentwicklung mit Abstimmungsrunden und lieferfertigen Exporten für Web (SVG, PNG) – die sichtbare Basis für Ihren Auftritt.",
      },
      {
        id: "branding-voll",
        label: "Branding-Paket",
        priceFrom: "ab 699 €",
        explainer:
          "Logo plus Farben, Typografie-Empfehlung und Exporte für Web, Social und Druck – stimmiges Erscheinungsbild aus einer Hand.",
      },
    ],
    priceDisclaimer: "je nach Varianten, Leitfaden und Umfang",
    features: [
      "Logoentwicklung mit Abstimmungsrunden",
      "Farben und Typografie-Empfehlung (Basis)",
      "Exporte für Web, Social und Druck (SVG, PNG)",
      "Weitere Grafik-Leistungen nach Absprache",
    ],
  },
  {
    id: "wartung",
    title: "Wartung & Betreuung",
    subtitle: "Technik und kleine Updates im Griff – damit Ihre Seite zuverlässig bleibt.",
    toggleAriaLabel: "Varianten Wartung & Betreuung",
    options: [
      {
        id: "wartung-basis",
        label: "Basis",
        priceFrom: "ab 39 € / Monat",
        explainer:
          "Regelmäßige Sicherheits- und Systemupdates sowie Backups im vereinbarten Rahmen – damit die Basis stimmt, ohne großen Monatsaufwand.",
      },
      {
        id: "wartung-plus",
        label: "Plus",
        priceFrom: "ab 49 € / Monat",
        explainer:
          "Wie Basis, plus mehr Spielraum für kleine Inhaltsanpassungen und priorisierte Anfragen – für Betrieb, der regelmäßig kleine Änderungen braucht.",
      },
    ],
    priceDisclaimer: "Umfang und Reaktionszeit nach Paket",
    features: [
      "Updates und Sicherheit (nach vereinbartem Paket)",
      "Backups und grundlegende Überwachung",
      "Kleine Text- oder Bildänderungen im Rahmen",
      "Priorisierte Anfragen per E-Mail",
    ],
  },
];

export const PREIS_PAKET_INDIVIDUELL: PreisPaket = {
  id: "individuell",
  title: "Individuelle Lösungen",
  subtitle:
    "Websysteme, interne Tools, Schnittstellen und Sonderprojekte – Konzept und Kalkulation passgenau zu Ihrem Prozess.",
  priceFrom: "Preis auf Anfrage",
  priceDisclaimer: "Festpreis oder nach Aufwand – transparent dokumentiert",
  features: [
    "Analyse von Ablauf und Anforderungen",
    "Konzept, Umsetzung und saubere Übergabe",
    "Dokumentation und Schulung bei Bedarf",
    "Langfristige Betreuung optional",
  ],
};

export const preiseCopy = {
  hero: {
    badge: "Transparente Richtpreise",
    titleLine1: "Investition,",
    titleHighlight: "die passt.",
    sub:
      "Orientierungswerte für Web, Branding und Betreuung – persönlich kalkuliert, ohne versteckte Überraschungen. Endpreise besprechen wir nach Ihrem konkreten Umfang.",
    subBridge:
      "Bauen, sanieren oder Baustoffe planen? Neben unserem Schwerpunkt IT erhalten Sie Unterstützung im Bau: Ing. Dietmar Plesnicar wirkt hier in der offiziellen Rolle „Unterstützung Bau“ mit langjähriger Praxis; zudem verbinden wir Sie mit einem Netzwerk geprüfter Partner – damit Sie bei Haus und Material nicht allein mit Listen, Händlern und Entscheidungen stehen. ",
    subBridgeLinkLabel: "Mehr zu Bau & Partnern",
    ctaPrimary: "Unverbindlich anfragen",
    ctaSecondary: "Leistungen ansehen",
    imageCaption: "Boris Plesnicar · Inhaber",
    captionTagline: "Schwerpunkt IT & Web · persönlich · Bau mit Unterstützung & Baustoffe",
    floatCard1: { title: "Persönlich", line: "Beratung mit dem Inhaber" },
    floatCard2: { title: "Nachvollziehbar", line: "Preis nach konkretem Umfang" },
  },
  bau: {
    badge: "Bau & Handel",
    title: "Starke Unterstützung beim Bau – und bei Baustoffen",
    text:
      "Ob Eigenheim, Umbau, Sanierung oder die passende Materialwahl: Ing. Dietmar Plesnicar unterstützt Sie im Bau-Bereich (offizielle Rolle: Unterstützung Bau) mit Jahrzehnten Praxis; wir verbinden Sie zusätzlich mit zuverlässigen österreichischen Partnern. So behalten Sie Qualität, Kosten und Abläufe besser im Griff – statt sich im Dickicht aus Sortimenten und Angeboten zu verlieren.",
    priceNoticeTitle: "Hinweis zu Preisen im Bau & Handel",
    priceNotice:
      "In der Baubranche inklusive Handel hängen Kosten und Ablauf stark vom jeweiligen Projekt ab – oft über viele Schritte und mit vielen Einflussfaktoren. Eine pauschale Preisanzeige würde diesen Umfang verkürzen und für Ihren konkreten Bau- oder Materialbedarf leicht irreführend wirken. Deshalb veröffentlichen wir hier bewusst keine Richt- oder Pauschalpreise für diesen Bereich; wir klären Leistung und Kosten transparent in einem persönlichen Gespräch mit Ihnen.",
    bullets: [
      "Unterstützung Bau mit erfahrener Bauingenieur-Perspektive (Ing. Dietmar Plesnicar) – keine generischen Standardantworten",
      "Materialien und Bezugswege über geprüfte Handelspartner, abgestimmt auf Ihr Projekt",
      "Ein verlässlicher Ansprechpunkt neben den vielen Themen rund um Baustelle und Objekt",
    ] as const,
    cta: "Zu unseren Handelspartnern",
  },
  pakete: {
    sectionLabel: "Pakete & Richtpreise",
    title: "Was kostet",
    titleHighlight: "was?",
    intro:
      "Alle Angaben sind unverbindliche Richtwerte für typische Projekte. Nach einem kurzen Gespräch erhalten Sie eine klare, schriftliche Einschätzung.",
    introBauNote:
      "Die Paketpreise hier gelten für Web & Grafik (Schwerpunkt). Für Bau, Hausbetreuung und Baustoffe stimmen wir Umfang und Konditionen persönlich mit Ihnen ab – mit Unterstützung durch Ing. Dietmar Plesnicar im Bau-Bereich (siehe Bereich „Bau & Handel“ oben auf dieser Seite).",
    ustNote:
      "Es wird keine Umsatzsteuer ausgewiesen oder verrechnet. Umsatzsteuerbefreit – Kleinunternehmer gem. § 6 Abs. 1 Z 27 UStG",
    noteTitle: "Orientierung, kein Fixpreis im Warenkorb",
    noteBody:
      "Die genannten Beträge sind Start- bzw. Richtwerte. Der endgültige Preis richtet sich nach Umfang, Funktionalität und gestalterischen Anforderungen – plus etwaiger Drittkosten (Domains, Lizenzen, Plugins).",
    scopeExplainerTitle: "Warum der Endpreis variiert",
    scopeExplainerBody:
      "Je mehr Seiten, Logik, Schnittstellen und individuelles Design Sie brauchen, desto höher der Aufwand. Wir schätzen das realistisch ein und erklären, was Pflicht, was optional ist – bevor Sie sich festlegen.",
    individuellBadge: "Maßgeschneidert",
  },
  hinweis: {
    sectionLabel: "Transparenz",
    title: "Jedes Projekt",
    titleHighlight: "ist anders.",
    body: [
      "Branche, Zielgruppe und technische Tiefe beeinflussen den Aufwand. Statt versteckter Limits in Standardpaketen kalkulieren wir ehrlich nach Ihrem Scope.",
      "Nach der Bestandsaufnahme erhalten Sie eine nachvollziehbare Aufschlüsselung: was ist enthalten, was optional, und welche Schritte folgen.",
    ],
    bullets: [
      {
        title: "Umfang",
        text: "Anzahl Seiten, Sprachen, Formulare und Schnittstellen prägen den Zeitaufwand.",
      },
      {
        title: "Funktionalität",
        text: "Login, Buchung, Datenbank, APIs – jede zusätzliche Logik will geplant und getestet sein.",
      },
      {
        title: "Design & Inhalt",
        text: "Eigenes Material spart Zeit; aufwendige Bildsprache, Animationen oder Textarbeit erhöhen den Aufwand.",
      },
    ],
  },
  vertrauen: {
    sectionLabel: "Warum Plesnicar Solutions",
    title: "Persönlich.",
    titleHighlight: "Regional. Zuverlässig.",
    items: [
      {
        title: "Direkter Draht zum Inhaber",
        text: "Kurze Wege – Sie sprechen mit den Menschen, die umsetzen.",
      },
      {
        title: "Österreichischer Service",
        text: "Ansässig in Niederösterreich, deutschsprachig, DSGVO-orientiert.",
      },
      {
        title: "IT & Kreatives aus einer Hand",
        text: "Von Logo über Website bis zu laufender Betreuung – konsistent und technisch sauber.",
      },
      {
        title: "Unterstützung: Bau, Sanierung & Baustoffe",
        text: "Von der Idee bis zur Materialbeschaffung: Unterstützung Bau durch Ing. Dietmar Plesnicar (über 40 Jahre Praxis) und eingebundene Partner, wenn es für Ihr Projekt sinnvoll ist.",
      },
    ],
  },
  cta: {
    title: "Individuelles Angebot gewünscht?",
    sub:
      "Beschreiben Sie kurz Ihr Vorhaben – wir melden uns in der Regel innerhalb von 24 Stunden mit den nächsten Schritten und einer realistischen Einschätzung. Schwerpunkt Web & IT-nahe Projekte; Bau, Objektbetreuung und Baustoffe mit Unterstützung durch unser Team.",
    button: "Unverbindliches Angebot anfragen",
  },
} as const;

/** Englische Pakete & Copy (gleiche IDs / Preise wie DE). */
export const ONE_PAGE_PAKET_EN = {
  id: "one-page",
  title: "One-page website",
  subtitle:
    "Everything important on one page – quick to go live, clearly structured, for presence and first enquiries.",
  options: [
    {
      id: "ohne-db",
      label: "Without database",
      priceFrom: "from €999",
      explainer:
        "Static or lightly dynamic content without a dedicated backend – ideal for classic brochure sites with contact and legal pages.",
    },
    {
      id: "mit-db",
      label: "With database",
      priceFrom: "from €1,199",
      explainer:
        "When content should be manageable, forms stored, or small dynamic areas are needed – e.g. CMS connection or simple data storage.",
    },
  ] as const satisfies readonly PaketPreisOption[],
  priceDisclaimer: "depends on copy, media, features, and integrations",
  features: [
    "Responsive scroll layout with clear structure",
    "Contact & legal pages (imprint/privacy) can be integrated",
    "Hosting recommendation and technical setup",
    "1–2 revision rounds included",
  ],
} as const;

export const PREISE_PAKETE_EN: PreisPaket[] = [
  {
    id: "business",
    title: "Business website",
    subtitle:
      "Entry into a multi-page company site: clear subpages for services, contact, and trust – without over-engineering.",
    toggleAriaLabel: "Business website options",
    options: [
      {
        id: "business-kompakt",
        label: "Compact",
        priceFrom: "from €1,499",
        explainer:
          "A lean multi-page site with fewer pages and a focused layout – ideal when you want a professional presence quickly without a large scope.",
      },
      {
        id: "business-standard",
        label: "Standard",
        priceFrom: "from €1,900",
        explainer:
          "More room for pages and extensions (e.g. blog, forms, add-ons) – still clear structure and solid technical delivery.",
      },
    ],
    priceDisclaimer: "depends on page count and features",
    features: [
      "Multiple subpages (e.g. services, about, contact)",
      "Clear, professional layout – expandable as you grow",
      "SEO basics and performance-oriented implementation",
      "Optional: blog, forms, or simple add-ons",
    ],
    featured: true,
  },
  {
    id: "branding",
    title: "Branding, logo & graphic design",
    subtitle:
      "Recognition for web, print, and social – from first sketch to delivery-ready files.",
    toggleAriaLabel: "Logo & branding options",
    options: [
      {
        id: "branding-logo",
        label: "Logo focus",
        priceFrom: "from €449",
        explainer:
          "Logo development with review rounds and delivery-ready exports for web (SVG, PNG) – a clear visual foundation.",
      },
      {
        id: "branding-voll",
        label: "Branding package",
        priceFrom: "from €699",
        explainer:
          "Logo plus colours, typography guidance, and exports for web, social, and print – a coherent look from one source.",
      },
    ],
    priceDisclaimer: "depends on variants, guidelines, and scope",
    features: [
      "Logo development with review rounds",
      "Colour and typography recommendations (baseline)",
      "Exports for web, social, and print (SVG, PNG)",
      "Further graphic work by arrangement",
    ],
  },
  {
    id: "wartung",
    title: "Maintenance & care",
    subtitle: "Keep technology and small updates under control – so your site stays reliable.",
    toggleAriaLabel: "Maintenance & care options",
    options: [
      {
        id: "wartung-basis",
        label: "Basic",
        priceFrom: "from €39 / month",
        explainer:
          "Regular security and core updates plus backups within an agreed scope – essentials covered with modest monthly effort.",
      },
      {
        id: "wartung-plus",
        label: "Plus",
        priceFrom: "from €49 / month",
        explainer:
          "Like Basic, with more room for small content tweaks and prioritised requests – when you need changes more often.",
      },
    ],
    priceDisclaimer: "scope and response time depend on package",
    features: [
      "Updates and security (per agreed package)",
      "Backups and basic monitoring",
      "Small text or image changes within scope",
      "Prioritised requests by email",
    ],
  },
];

export const PREIS_PAKET_INDIVIDUELL_EN: PreisPaket = {
  id: "individuell",
  title: "Custom solutions",
  subtitle:
    "Web systems, internal tools, interfaces, and special projects – concept and estimate tailored to your process.",
  priceFrom: "Price on request",
  priceDisclaimer: "Fixed price or time & materials – documented transparently",
  features: [
    "Analysis of workflow and requirements",
    "Concept, implementation, and clean handover",
    "Documentation and training if needed",
    "Long-term support optional",
  ],
};

export const preiseCopyEn = {
  hero: {
    badge: "Transparent guide prices",
    titleLine1: "Investment",
    titleHighlight: "that fits.",
    sub:
      "Guide figures for web, branding, and ongoing care – quoted personally, no hidden surprises. Final prices we agree based on your actual scope.",
    subBridge:
      "Building, renovating, or planning building materials? Alongside our IT focus you get construction support: Ing. Dietmar Plesnicar acts in the official “construction support” role with long-standing practice; we also connect you with a vetted partner network – so you are not on your own with lists, suppliers, and decisions. ",
    subBridgeLinkLabel: "More on construction & partners",
    ctaPrimary: "Request without obligation",
    ctaSecondary: "View services",
    imageCaption: "Boris Plesnicar · Owner",
    captionTagline: "IT & web focus · personal advice · construction support & materials",
    floatCard1: { title: "Personal", line: "Advice with the owner" },
    floatCard2: { title: "Transparent", line: "Price based on real scope" },
  },
  bau: {
    badge: "Construction & trade",
    title: "Strong support for your build – and for building materials",
    text:
      "Whether it is a home, refurbishment, renovation, or choosing the right materials: Ing. Dietmar Plesnicar supports you in construction (official role: construction support) with decades of practice; we also connect you with reliable Austrian partners. That helps you keep quality, cost, and processes clearer – instead of getting lost in catalogues and quotes.",
    priceNoticeTitle: "Note on construction & trade pricing",
    priceNotice:
      "In construction and trade, cost and workflow depend heavily on each project – often across many stages and variables. A single headline figure would oversimplify that scope and could mislead you about your actual build or materials needs. We therefore do not publish guide or lump-sum prices for this segment on this page; we clarify scope and cost transparently with you in a direct conversation.",
    bullets: [
      "Construction support with an experienced civil-engineering perspective (Ing. Dietmar Plesnicar) – not generic boilerplate",
      "Materials and sourcing via vetted trade partners, aligned with your project",
      "A dependable point of contact beside the many topics around site and property",
    ] as const,
    cta: "Our trade partners",
  },
  pakete: {
    sectionLabel: "Packages & guide prices",
    title: "What does",
    titleHighlight: "it cost?",
    intro:
      "All figures are non-binding guide values for typical projects. After a short conversation you receive a clear written estimate.",
    introBauNote:
      "The package prices below apply to web & graphics (our focus). For construction, property care, and building materials we agree scope and terms with you personally – with construction support from Ing. Dietmar Plesnicar (see the “Construction & trade” section above on this page).",
    ustNote:
      "No VAT is charged or shown. VAT exempt – small business under Section 6 (1) lit. 27 Austrian VAT Act (UStG).",
    noteTitle: "Orientation, not a checkout fixed price",
    noteBody:
      "The amounts shown are starting or guide values. The final price depends on scope, functionality, and design requirements – plus any third-party costs (domains, licences, plugins).",
    scopeExplainerTitle: "Why the final price varies",
    scopeExplainerBody:
      "The more pages, logic, integrations, and bespoke design you need, the higher the effort. We estimate realistically and explain what is essential, what is optional – before you commit.",
    individuellBadge: "Tailored",
  },
  hinweis: {
    sectionLabel: "Transparency",
    title: "Every project",
    titleHighlight: "is different.",
    body: [
      "Industry, audience, and technical depth affect effort. Instead of hidden limits in “standard” packages, we quote honestly for your scope.",
      "After discovery you get a clear breakdown: what is included, what is optional, and what happens next.",
    ],
    bullets: [
      {
        title: "Scope",
        text: "Number of pages, languages, forms, and integrations drives time.",
      },
      {
        title: "Functionality",
        text: "Logins, booking, database, APIs – each extra layer needs planning and testing.",
      },
      {
        title: "Design & content",
        text: "Your own assets save time; rich visuals, motion, or copy work add effort.",
      },
    ],
  },
  vertrauen: {
    sectionLabel: "Why Plesnicar Solutions",
    title: "Personal.",
    titleHighlight: "Local. Reliable.",
    items: [
      {
        title: "Direct line to the owner",
        text: "Short paths – you talk to the people who deliver.",
      },
      {
        title: "Austrian service",
        text: "Based in Lower Austria, German- and English-friendly, GDPR-aware.",
      },
      {
        title: "IT & creative from one source",
        text: "From logo to website to ongoing care – consistent and technically sound.",
      },
      {
        title: "Support: construction, renovation & materials",
        text: "From idea to sourcing: construction support from Ing. Dietmar Plesnicar (40+ years of practice) and partners where it helps.",
      },
    ],
  },
  cta: {
    title: "Want a custom quote?",
    sub:
      "Briefly describe your project – we usually respond within 24 hours with next steps and a realistic estimate. Focus on web & IT-related work; construction, property care, and materials with support from our team.",
    button: "Request a non-binding quote",
  },
} as const;

export type PreiseCopy = typeof preiseCopy;

export type PreiseBundle = {
  onePage: typeof ONE_PAGE_PAKET | typeof ONE_PAGE_PAKET_EN;
  pakete: PreisPaket[];
  individuell: PreisPaket;
  copy: PreiseCopy;
  onePageToggleAriaLabel: string;
};

export function getPreiseBundle(lang: Lang): PreiseBundle {
  if (lang === "en") {
    return {
      onePage: ONE_PAGE_PAKET_EN,
      pakete: PREISE_PAKETE_EN,
      individuell: PREIS_PAKET_INDIVIDUELL_EN,
      copy: preiseCopyEn as unknown as PreiseCopy,
      onePageToggleAriaLabel: "One-page website options",
    };
  }
  return {
    onePage: ONE_PAGE_PAKET,
    pakete: PREISE_PAKETE,
    individuell: PREIS_PAKET_INDIVIDUELL,
    copy: preiseCopy,
    onePageToggleAriaLabel: "Varianten One-Page-Website",
  };
}

/** Browser tab title (client updates when language changes). */
export function getPreiseDocumentTitle(lang: Lang): string {
  return lang === "en" ? "Guide prices | Plesnicar Solutions" : "Richtpreise | Plesnicar Solutions";
}
