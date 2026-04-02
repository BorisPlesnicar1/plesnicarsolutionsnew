/** Project data: add more entries to show more projects (images from public/recents/<folder>). */

export type ProjectCategory = "it" | "bau";

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
  link?: string;
  linkLabel?: string;
  category: ProjectCategory;
  inHouse?: boolean;
  sortOrder: number;
  /** ISO `YYYY-MM-DD` — Referenz für Portfolio-„Stand“ (Aktualität). */
  updatedAt?: string;
};

/** Formatiert nur das Datum; Präfix kommt aus Übersetzung `projectStand` mit `{date}`. */
export function formatProjectStandDate(iso: string | undefined, lang: "de" | "en"): string | null {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const d = new Date(`${iso}T12:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(lang === "de" ? "de-AT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const PROJECTS_RAW: Project[] = [
  {
    id: "skyline-ios",
    title: "Skyline Hub",
    subtitle: "iOS App",
    description:
      "Öffentliche App-Referenz (Diplomarbeit): Flug-Historie, Karten und Statistiken – ohne Nennung von Endkundennamen.",
    category: "it",
    sortOrder: 10,
    updatedAt: "2026-03-11",
    images: [
      "/recents/Skyline Hub - iOS App/6067ABD6-A209-46DE-A975-264F6D585441_1_105_c.jpeg",
      "/recents/Skyline Hub - iOS App/38FFC837-AA63-44CC-8594-7F7A360F27C0_1_105_c.jpeg",
      "/recents/Skyline Hub - iOS App/437294B1-AC8E-461F-8132-1E5D0787F05A_1_105_c.jpeg",
      "/recents/Skyline Hub - iOS App/4640FBCD-9468-4A03-9783-803649E98141_1_105_c.jpeg",
    ],
    link: "https://apps.apple.com/at/app/skyline-hub/id6758091952",
    linkLabel: "",
  },
  {
    id: "skyline-website",
    title: "Skyline Hub",
    subtitle: "Website",
    description: "Begleitwebsite zur App-Referenz – Inhalte und Screenshots aus dem gleichen Projekt.",
    category: "it",
    sortOrder: 20,
    updatedAt: "2026-03-11",
    images: [
      "/recents/Skyline Hub - Website/iScreen Shoter - 20260311173308125.jpg",
      "/recents/Skyline Hub - Website/iScreen Shoter - Safari - 260311173235.jpg",
      "/recents/Skyline Hub - Website/iScreen Shoter - Safari - 260311173333.jpg",
    ],
    link: "https://skylinehub.vercel.app",
    linkLabel: "",
  },
  {
    id: "mrdaleje",
    title: "MrDaleJE",
    subtitle: "Twitch-Streamer Website",
    description: "Webauftritt mit Fokus auf Animation und Scroll-Effekte – technische Spielwiese für moderne Frontends.",
    category: "it",
    sortOrder: 30,
    updatedAt: "2026-03-11",
    images: [
      "/recents/DAle/iScreen Shoter - 20260311173812422.jpg",
      "/recents/DAle/iScreen Shoter - Safari - 260311173738.jpg",
    ],
  },
  {
    id: "plesnicar-crm",
    title: "PlesnicarCRM",
    subtitle: "Eigenes CRM",
    description: "Eigenentwickeltes CRM für Angebote und Kunden – intern genutzt, ohne externe Kundennamen.",
    category: "it",
    inHouse: true,
    sortOrder: 40,
    updatedAt: "2026-03-08",
    images: [
      "/recents/PlesnicarCRM - eigenes CRM/crm1.jpg",
      "/recents/PlesnicarCRM - eigenes CRM/crm2.jpg",
    ],
  },
  {
    id: "betonlieferung",
    title: "Betonlieferung",
    subtitle: "",
    description:
      "Baustellenlogistik und Anlieferung – dokumentarische Aufnahmen ohne Nennung von Auftraggebern.",
    category: "bau",
    sortOrder: 50,
    updatedAt: "2026-03-21",
    images: [
      "/recents/betonlieferung/64357146-4B8C-4367-8FFF-3362BF3DFCE8_1_105_c.jpeg",
      "/recents/betonlieferung/5DA6A726-213B-44EA-9EFC-291E9894BF41.jpeg",
      "/recents/betonlieferung/DA615F58-E135-426E-ACC5-29A49B2B1004.jpeg",
      "/recents/betonlieferung/FA3A9532-43C9-490F-9673-3F2D9690DF98_4_5005_c.jpeg",
    ],
  },
  {
    id: "materiallieferung-kundenbaustellen",
    title: "Kundenbaustellen",
    subtitle: "Materiallieferung",
    description:
      "Anlieferung von Material auf Kundenbaustellen – dokumentarische Aufnahmen ohne Nennung von Auftraggebern.",
    category: "bau",
    sortOrder: 70,
    updatedAt: "2026-04-02",
    images: [
      "/recents/MateriallieferungPNKL/WhatsApp Image 2026-04-02 at 15.17.40.jpeg",
      "/recents/MateriallieferungPNKL/WhatsApp Image 2026-04-02 at 15.17.40 (1).jpeg",
      "/recents/MateriallieferungPNKL/WhatsApp Image 2026-04-02 at 15.17.40 (2).jpeg",
      "/recents/MateriallieferungPNKL/WhatsApp Image 2026-04-02 at 15.17.40 (3).jpeg",
      "/recents/MateriallieferungPNKL/WhatsApp Image 2026-04-02 at 15.18.31.jpeg",
    ],
  },
  {
    id: "baustoffe-sanierung",
    title: "Baustoffe & Sanierung",
    subtitle: "",
    description:
      "Baustoffhandel und Sanierungsmaterial – Impressionen aus Lager und Sortiment, keine Kundennamen.",
    category: "bau",
    sortOrder: 60,
    updatedAt: "2026-03-22",
    images: [
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.38.18.jpeg",
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.38.18-2.jpeg",
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.38.18-3.jpeg",
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.38.19.jpeg",
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.38.19-2.jpeg",
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.38.36.jpeg",
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.40.33.jpeg",
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.40.33-2.jpeg",
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.40.33-3.jpeg",
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.40.34.jpeg",
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.40.34-2.jpeg",
      "/recents/baustoffe-sanierung/WhatsApp Image 2026-03-22 at 13.40.34-3.jpeg",
    ],
  },
];

/** Neuestes Projekt zuerst (Carousel, LED-Ticker, Dots). */
export const PROJECTS: Project[] = [...PROJECTS_RAW].sort((a, b) => b.sortOrder - a.sortOrder);

export function projectFocusShadow(category: ProjectCategory, active: boolean): string {
  if (!active) return "0 12px 24px -8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)";
  if (category === "bau") {
    return "0 24px 48px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(217,119,6,0.45), 0 0 40px -8px rgba(245,158,11,0.22)";
  }
  return "0 24px 48px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,25,0,0.25), 0 0 40px -8px rgba(255,25,0,0.2)";
}

export function projectHoverShadow(category: ProjectCategory): string {
  if (category === "bau") {
    return "0 28px 56px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(245,158,11,0.45), 0 0 48px -6px rgba(245,158,11,0.3)";
  }
  return "0 28px 56px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,25,0,0.4), 0 0 48px -6px rgba(255,25,0,0.35)";
}

export function getClosestProjectIndexToCenter(container: HTMLDivElement, cards: HTMLDivElement[]): number {
  if (cards.length === 0) return 0;
  const cRect = container.getBoundingClientRect();
  const centerX = cRect.left + cRect.width / 2;
  let best = 0;
  let bestDist = Infinity;
  cards.forEach((card, i) => {
    const r = card.getBoundingClientRect();
    const cardCenter = r.left + r.width / 2;
    const dist = Math.abs(cardCenter - centerX);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });
  return best;
}
