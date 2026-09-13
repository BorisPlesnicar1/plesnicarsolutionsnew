/**
 * PC-Bau Budgetklassen für /it (DE + EN).
 * Beträge = unverbindliche Richtwerte; Konfiguration wird persönlich abgestimmt.
 * Bilder: Unsplash License (frei für kommerzielle Nutzung) – nur Beispieloptik, kein Lieferfoto.
 */

import type { Lang } from "@/app/translations";

export type PcCategoryId = "buero" | "gaming";

export type PcTierId = string;

export type PcTierData = {
  id: PcTierId;
  /** Unsplash – frei nutzbar unter https://unsplash.com/license */
  imageSrc: string;
};

/** Stabile Unsplash-URLs (w=960, auto format) – Beispielbilder, keine Produktfotos der fertigen Builds. */
export const PC_TIERS_BUERO: readonly PcTierData[] = [
  {
    id: "buero-einstieg",
    imageSrc:
      "https://images.unsplash.com/photo-1646705193379-bb891180399d?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "buero-business",
    imageSrc:
      "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "buero-pro",
    imageSrc:
      "https://images.unsplash.com/photo-1594636797501-ef436e157819?auto=format&fit=crop&w=960&q=80",
  },
] as const;

export const PC_TIERS_GAMING: readonly PcTierData[] = [
  {
    id: "gaming-einstieg",
    imageSrc:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "gaming-performance",
    imageSrc:
      "https://images.unsplash.com/photo-1551033541-2075d8363c66?auto=format&fit=crop&w=960&q=80",
  },
  {
    id: "gaming-highend",
    imageSrc:
      "https://images.unsplash.com/photo-1719927604476-dc404b85358f?auto=format&fit=crop&w=960&q=80",
  },
] as const;

type PcTierCopy = {
  id: PcTierId;
  label: string;
  title: string;
  subtitle: string;
  priceFrom: string;
  priceDisclaimer: string;
  features: readonly string[];
};

type PcBauCopy = {
  sectionLabel: string;
  title: string;
  titleHighlight: string;
  intro: string;
  /** Zusatz für den Bild-Alt-Text: "<Klasse> – <imageAltSuffix>" */
  imageAltSuffix: string;
  imageNote: string;
  priceNote: string;
  ustNote: string;
  tabBuero: string;
  tabGaming: string;
  tabAria: string;
  cta: string;
  buero: readonly PcTierCopy[];
  gaming: readonly PcTierCopy[];
};

const pcBauCopyDe: PcBauCopy = {
  sectionLabel: "PC-Bau",
  title: "Büro- &",
  titleHighlight: "Gaming-PCs",
  intro:
    "Individuell zusammengestellt – von soliden Bürorechnern bis zu leistungsstarken Gaming-Systemen. Die Klassen dienen der Orientierung; die genaue Konfiguration stimmen wir mit Ihnen ab.",
  imageAltSuffix: "Beispielbild (Unsplash)",
  imageNote:
    "Die Fotos sind freie Beispielbilder (Unsplash) und zeigen die typische Optik der jeweiligen Klasse – nicht den konkreten Build, den Sie erhalten.",
  priceNote:
    "Alle Beträge sind unverbindliche Richtwerte für typische Konfigurationen. Komponentenpreise schwanken; Endpreis nach Abstimmung und Verfügbarkeit.",
  ustNote:
    "Alle angegebenen Beträge sind Nettopreise und verstehen sich zzgl. 20 % gesetzlicher USt – der Bruttopreis (inkl. USt) ist jeweils unter dem Preis angegeben. Einzelunternehmen Boris Plesnicar e.U. (Plesnicar Solutions) · UID: ATU83447003.",
  tabBuero: "Büro-PC",
  tabGaming: "Gaming-PC",
  tabAria: "PC-Kategorie wählen",
  cta: "PC anfragen",
  buero: [
    {
      id: "buero-einstieg",
      label: "Einstieg",
      title: "Büro Einstieg",
      subtitle: "Zuverlässig für Alltag, Office und Browser – klar dimensioniert, ohne Overkill.",
      priceFrom: "ab 549 €",
      priceDisclaimer: "je nach Gehäuse, Speicher und Monitor-Option",
      features: [
        "Alltag, E-Mail, Office und Videokonferenzen",
        "SSD für schnellen Start und ruhigen Betrieb",
        "Erweiterbar, wenn der Bedarf wächst",
        "Zusammenbau, Einrichtung und kurze Übergabe",
      ],
    },
    {
      id: "buero-business",
      label: "Business",
      title: "Büro Business",
      subtitle: "Mehr Kerne und RAM für Multitasking, Tabellen und parallele Anwendungen.",
      priceFrom: "ab 849 €",
      priceDisclaimer: "je nach CPU, RAM und Speicherausbau",
      features: [
        "Mehrere Programme und Browser-Tabs gleichzeitig",
        "Geeignet für längere Arbeitstage und Dual-Monitor",
        "Schnelle SSD + ausreichend Arbeitsspeicher",
        "Saubere Verkabelung und getestete Übergabe",
      ],
    },
    {
      id: "buero-pro",
      label: "Pro",
      title: "Büro Pro / Creator",
      subtitle: "Für anspruchsvollere Büro- und Kreativarbeit – mehr Reserve bei Last und Speicher.",
      priceFrom: "ab 1.299 €",
      priceDisclaimer: "je nach GPU-, RAM- und Speicherbedarf",
      features: [
        "Leichtere Bild-/Videobearbeitung und größere Projekte",
        "Mehr RAM und schnellere Speicherketten",
        "Bessere Kühlung und leiser Dauerbetrieb",
        "Konfiguration nach Ihrem Workflow",
      ],
    },
  ],
  gaming: [
    {
      id: "gaming-einstieg",
      label: "Einstieg",
      title: "Gaming Einstieg",
      subtitle: "Aktuelle Titel in Full HD – ausgewogen zwischen Preis und Spielspaß.",
      priceFrom: "ab 799 €",
      priceDisclaimer: "je nach Grafikkarte und Netzteil",
      features: [
        "Full HD / 1080p mit soliden Einstellungen",
        "Aktuelle Mittelklasse-Grafik im Budgetrahmen",
        "Gute Kühlung und ausbaufähiges Gehäuse",
        "Zusammenbau, BIOS/Treiber und kurzer Funktionstest",
      ],
    },
    {
      id: "gaming-performance",
      label: "Performance",
      title: "Gaming Performance",
      subtitle: "Mehr FPS und Reserve für 1440p, Streaming oder anspruchsvollere Titel.",
      priceFrom: "ab 1.299 €",
      priceDisclaimer: "stark abhängig von GPU und CPU-Kombination",
      features: [
        "QHD / 1440p oder hohe Full-HD-Framerates",
        "Stärkere GPU und mehr Systemreserve",
        "Geeignet für Gaming plus Discord/Streaming nebenbei",
        "Stabil abgestimmte Stromversorgung und Kühlung",
      ],
    },
    {
      id: "gaming-highend",
      label: "High-End",
      title: "Gaming High-End",
      subtitle: "Maximale Performance für hohe Auflösungen, Raytracing und paralleles Streaming.",
      priceFrom: "ab 1.899 €",
      priceDisclaimer: "Premium-Komponenten – Preis je nach Markt und Wunschspecs",
      features: [
        "Hohe Auflösung / hohe Details nach Absprache",
        "Starke GPU- und CPU-Kombination",
        "Viel RAM, schnelle SSDs, hochwertige Kühlung",
        "Individuelle Abstimmung auf Ihren Monitor und Use-Case",
      ],
    },
  ],
};

const pcBauCopyEn: PcBauCopy = {
  sectionLabel: "PC builds",
  title: "Office & gaming",
  titleHighlight: "PCs",
  intro:
    "Custom-built systems – from solid office machines to strong gaming PCs. The tiers are a guide; we fine-tune the exact configuration with you.",
  imageAltSuffix: "example photo (Unsplash)",
  imageNote:
    "Photos are free stock examples (Unsplash) showing the typical look of each tier – not the exact build you will receive.",
  priceNote:
    "All amounts are non-binding guide values for typical builds. Component prices move; the final price follows after we agree scope and availability.",
  ustNote:
    "All amounts shown are net prices and are subject to 20% statutory VAT – the gross price (incl. VAT) is shown below each price. Sole proprietorship Boris Plesnicar e.U. (Plesnicar Solutions) · VAT ID (UID): ATU83447003.",
  tabBuero: "Office PC",
  tabGaming: "Gaming PC",
  tabAria: "Choose PC category",
  cta: "Enquire about a PC",
  buero: [
    {
      id: "buero-einstieg",
      label: "Entry",
      title: "Office entry",
      subtitle: "Reliable for everyday work, Office apps and browsing – sized clearly, without overkill.",
      priceFrom: "from €549",
      priceDisclaimer: "depends on case, storage and optional display",
      features: [
        "Everyday use, email, Office and video calls",
        "SSD for quick boot and quiet operation",
        "Upgradeable as needs grow",
        "Assembly, setup and a short handover",
      ],
    },
    {
      id: "buero-business",
      label: "Business",
      title: "Office business",
      subtitle: "More cores and RAM for multitasking, spreadsheets and parallel apps.",
      priceFrom: "from €849",
      priceDisclaimer: "depends on CPU, RAM and storage",
      features: [
        "Several apps and browser tabs at once",
        "Suited to long workdays and dual monitors",
        "Fast SSD plus enough memory",
        "Clean cabling and tested handover",
      ],
    },
    {
      id: "buero-pro",
      label: "Pro",
      title: "Office pro / creator",
      subtitle: "For heavier office and creative work – more headroom under load and storage.",
      priceFrom: "from €1,299",
      priceDisclaimer: "depends on GPU, RAM and storage needs",
      features: [
        "Light photo/video work and larger projects",
        "More RAM and faster storage paths",
        "Better cooling and quiet sustained use",
        "Configured around your workflow",
      ],
    },
  ],
  gaming: [
    {
      id: "gaming-einstieg",
      label: "Entry",
      title: "Gaming entry",
      subtitle: "Current titles in Full HD – balanced between price and playability.",
      priceFrom: "from €799",
      priceDisclaimer: "depends on GPU and PSU",
      features: [
        "Full HD / 1080p with solid settings",
        "Current mid-range graphics within budget",
        "Good cooling and an expandable case",
        "Build, BIOS/drivers and a short function test",
      ],
    },
    {
      id: "gaming-performance",
      label: "Performance",
      title: "Gaming performance",
      subtitle: "More FPS and headroom for 1440p, streaming or demanding titles.",
      priceFrom: "from €1,299",
      priceDisclaimer: "strongly depends on GPU and CPU pairing",
      features: [
        "QHD / 1440p or high Full HD frame rates",
        "Stronger GPU and more system headroom",
        "Suitable for gaming plus Discord/streaming",
        "Stable PSU and cooling matched to the build",
      ],
    },
    {
      id: "gaming-highend",
      label: "High-end",
      title: "Gaming high-end",
      subtitle: "Top performance for high resolutions, ray tracing and parallel streaming.",
      priceFrom: "from €1,899",
      priceDisclaimer: "premium parts – price depends on market and your specs",
      features: [
        "High resolution / high detail by arrangement",
        "Strong GPU and CPU combination",
        "Plenty of RAM, fast SSDs, quality cooling",
        "Tuned to your monitor and use case",
      ],
    },
  ],
};

export function getPcBauCopy(lang: Lang): PcBauCopy {
  return lang === "en" ? pcBauCopyEn : pcBauCopyDe;
}

export function getPcTierData(category: PcCategoryId): readonly PcTierData[] {
  return category === "gaming" ? PC_TIERS_GAMING : PC_TIERS_BUERO;
}
