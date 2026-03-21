"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Code2, 
  Palette, 
  Wrench, 
  ShoppingCart, 
  Zap, 
  Sparkles, 
  Rocket, 
  User,
  Mail,
  MapPin,
  Building2,
  Globe,
  Menu,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowUp,
  TrendingUp,
  Clock,
  Award,
  Users,
  BarChart3,
  Phone,
  Instagram,
  Monitor,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { TRANSLATIONS, PROJECT_TRANSLATIONS, type Lang } from "./translations";

/** Project data: add more entries to show more projects (images from public/recents/<folder>). */
type ProjectCategory = "it" | "bau";

type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
  link?: string;
  linkLabel?: string;
  category: ProjectCategory;
  /** Eigenes Produkt / internes Tool (zusätzliches Badge) */
  inHouse?: boolean;
  /** Höher = neuer; Anzeige immer absteigend (neuestes zuerst). Neues Projekt: höchsten Wert + 10. */
  sortOrder: number;
};

const PROJECTS_RAW: Project[] = [
  {
    id: "skyline-ios",
    title: "Skyline Hub",
    subtitle: "iOS App",
    description: "",
    category: "it",
    sortOrder: 10,
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
    description: "",
    category: "it",
    sortOrder: 20,
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
    description: "",
    category: "it",
    sortOrder: 30,
    images: [
      "/recents/DAle/iScreen Shoter - 20260311173812422.jpg",
      "/recents/DAle/iScreen Shoter - Safari - 260311173738.jpg",
    ],
  },
  {
    id: "plesnicar-crm",
    title: "PlesnicarCRM",
    subtitle: "Eigenes CRM",
    description: "",
    category: "it",
    inHouse: true,
    sortOrder: 40,
    images: [
      "/recents/PlesnicarCRM - eigenes CRM/crm1.jpg",
      "/recents/PlesnicarCRM - eigenes CRM/crm2.jpg",
    ],
  },
  {
    id: "betonlieferung",
    title: "Betonlieferung",
    subtitle: "",
    description: "",
    category: "bau",
    sortOrder: 50,
    images: [
      "/recents/betonlieferung/64357146-4B8C-4367-8FFF-3362BF3DFCE8_1_105_c.jpeg",
      "/recents/betonlieferung/5DA6A726-213B-44EA-9EFC-291E9894BF41.jpeg",
      "/recents/betonlieferung/DA615F58-E135-426E-ACC5-29A49B2B1004.jpeg",
      "/recents/betonlieferung/FA3A9532-43C9-490F-9673-3F2D9690DF98_4_5005_c.jpeg",
    ],
  },
];

/** Neuestes Projekt zuerst (Carousel, LED-Ticker, Dots). */
const PROJECTS: Project[] = [...PROJECTS_RAW].sort((a, b) => b.sortOrder - a.sortOrder);

function projectFocusShadow(category: ProjectCategory, active: boolean): string {
  if (!active) return "0 12px 24px -8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)";
  if (category === "bau") {
    return "0 24px 48px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(217,119,6,0.45), 0 0 40px -8px rgba(245,158,11,0.22)";
  }
  return "0 24px 48px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,25,0,0.25), 0 0 40px -8px rgba(255,25,0,0.2)";
}

function projectHoverShadow(category: ProjectCategory): string {
  if (category === "bau") {
    return "0 28px 56px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(245,158,11,0.45), 0 0 48px -6px rgba(245,158,11,0.3)";
  }
  return "0 28px 56px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,25,0,0.4), 0 0 48px -6px rgba(255,25,0,0.35)";
}

/** Welche Karte liegt am nächsten zur Mitte des sichtbaren Carousel-Bereichs (zuverlässiger als IntersectionObserver bei mehreren gleichzeitig sichtbaren Karten). */
function getClosestProjectIndexToCenter(container: HTMLDivElement, cards: HTMLDivElement[]): number {
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

type CookieConsent = {
  necessary: true;
  comfort: boolean;
  timestamp: string;
};

function heroChars(text: string) {
  return text.split("").map((c, i) => (
    <span key={i} className="hero-char inline-block">
      {c === " " ? "\u00A0" : c}
    </span>
  ));
}

/* Framer Motion: scroll-triggered and hover effects */
const motionViewport = { once: true, amount: 0.15 };
const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};
const staggerParent = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const staggerItem = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const cardReveal = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

/** Hero-style atmosphere for content sections: base, grid, orbs. Reused in Leistungen, Über uns, Team, Warum, Features, Prozess, Kontakt. */
function SectionBackground() {
  return (
    <>
      <div className="absolute inset-0 z-0 bg-[#070709]" aria-hidden />
      <div
        className="absolute inset-0 z-[1] opacity-50"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />
      <div className="absolute top-[10%] right-[5%] w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-[#ff1900]/[0.05] rounded-full blur-[100px] md:blur-[140px] z-0 pointer-events-none" aria-hidden />
      <div className="absolute bottom-[15%] left-[-5%] w-[240px] h-[240px] md:w-[320px] md:h-[320px] bg-[#ff3d00]/[0.04] rounded-full blur-[80px] md:blur-[120px] z-0 pointer-events-none" aria-hidden />
    </>
  );
}

const LANG_STORAGE_KEY = "ps_lang";

export default function Home() {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "de";
    try {
      const s = window.localStorage.getItem(LANG_STORAGE_KEY);
      return s === "en" ? "en" : "de";
    } catch {
      return "de";
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectModalImageIndex, setProjectModalImageIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  /** Nur wenn horizontales Scrollen nötig ist: Dots/Pfeile und Fokus-Scale sinnvoll. */
  const [projectsCarouselHasOverflow, setProjectsCarouselHasOverflow] = useState(true);
  const [mobileContactBarCollapsed, setMobileContactBarCollapsed] = useState(true);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const projectCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wasWirAndersRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [wasWirAndersProgress, setWasWirAndersProgress] = useState(0);
  const statsRef = useRef<HTMLElement>(null);
  const [statsInView, setStatsInView] = useState(false);
  const statsAnimatedRef = useRef(false);
  const [statsDisplay, setStatsDisplay] = useState({ years: 0, projects: 0, clients: 0 });
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const t = TRANSLATIONS[lang];
  const SECTION_IDS = ["hero", "leistungen", "projekte", "ueber-uns", "team", "warum", "features", "prozess", "kontakt"] as const;

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    try {
      const s = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (s === "en" && lang !== "en") setLangState("en");
    } catch {
      // ignore
    }
  }, []);

  const updateConsent = (comfort: boolean) => {
    const value: CookieConsent = {
      necessary: true,
      comfort,
      timestamp: new Date().toISOString(),
    };
    setCookieConsent(value);
    setShowCookieBanner(false);
    try {
      window.localStorage.setItem("ps_cookie_consent", JSON.stringify(value));
    } catch {
      // ignore storage errors (e.g. private mode)
    }
  };

  useEffect(() => {
    // Safari/mobile: disable heavy blur for performance
    const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isIOS || isSafari || isMobile) {
      document.documentElement.classList.add("no-heavy-blur", "no-backdrop-blur");
    }

    // Load existing cookie consent, or show banner if none stored
    try {
      const stored = window.localStorage.getItem("ps_cookie_consent");
      if (stored) {
        const parsed = JSON.parse(stored) as CookieConsent;
        setCookieConsent(parsed);
        setShowCookieBanner(false);
      } else {
        setShowCookieBanner(true);
      }
    } catch {
      setShowCookieBanner(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Carousel: aktiver Index = Karte nächst zur Mitte; bei keinem Overflow keine Dots (vermeidet „stuck“ bei mehreren gleichzeitig sichtbaren Karten)
  useEffect(() => {
    const container = projectsScrollRef.current;
    const update = () => {
      const cards = projectCardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!container || cards.length === 0) return;
      const overflow = container.scrollWidth - container.clientWidth > 4;
      setProjectsCarouselHasOverflow(overflow);
      if (!overflow) {
        setActiveProjectIndex(0);
        return;
      }
      setActiveProjectIndex(getClosestProjectIndexToCenter(container, cards));
    };
    update();
    container?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (container && ro) ro.observe(container);
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(update);
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      container?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [lang, PROJECTS.length]);

  // Stats: IntersectionObserver – Section als „in view“ markieren
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setStatsInView(true);
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stats: Count-up-Animation (einmalig wenn sichtbar)
  useEffect(() => {
    if (!statsInView || statsAnimatedRef.current) return;
    const targets = { years: t.stats.years, projects: t.stats.projects, clients: t.stats.clients };
    if (prefersReducedMotion) {
      setStatsDisplay(targets);
      statsAnimatedRef.current = true;
      return;
    }
    statsAnimatedRef.current = true;
    const duration = 1400;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const start = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      setStatsDisplay({
        years: Math.round(eased * targets.years),
        projects: Math.round(eased * targets.projects),
        clients: Math.round(eased * targets.clients),
      });
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [statsInView, prefersReducedMotion, t.stats.years, t.stats.projects, t.stats.clients]);

  useEffect(() => {
    if (statsAnimatedRef.current) {
      setStatsDisplay({ years: t.stats.years, projects: t.stats.projects, clients: t.stats.clients });
    }
  }, [lang, t.stats.years, t.stats.projects, t.stats.clients]);

  useEffect(() => {
    const setHeroVisible = () => {
      const el = heroTextRef.current;
      const imgWrap = heroImageRef.current;
      if (!el) return;
      el.querySelectorAll(".hero-char").forEach((node) => {
        (node as HTMLElement).style.opacity = "1";
        (node as HTMLElement).style.transform = "none";
      });
      el.querySelectorAll(".hero-animate").forEach((node) => {
        (node as HTMLElement).style.opacity = "1";
        (node as HTMLElement).style.transform = "none";
      });
      if (imgWrap) {
        imgWrap.style.opacity = "1";
        imgWrap.style.transform = "none";
      }
    };

    const runHeroAnimation = () => {
      const el = heroTextRef.current;
      const imgWrap = heroImageRef.current;
      if (!el) return;

      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      if (isMobile) {
        setHeroVisible();
        return;
      }

      const lines = el.querySelectorAll(".hero-line");
      const paragraph = el.querySelector(".hero-animate");
      const cta = el.querySelectorAll(".hero-animate")[1];
      if (!lines.length || !paragraph || !cta) return;

      const allChars: Element[] = [];
      lines.forEach((line) => {
        line.querySelectorAll(".hero-char").forEach((c) => allChars.push(c));
      });
      const allAnimate = Array.from(el.querySelectorAll(".hero-animate"));

      const tl = anime.timeline({
        easing: "easeOutExpo",
        duration: 500,
        complete: setHeroVisible,
      });

      if (imgWrap) {
        tl.add(
          {
            targets: imgWrap,
            translateX: [48, 0],
            opacity: [0, 1],
            scale: [0.96, 1],
            duration: 1000,
            easing: "easeOutCubic",
            delay: 180,
          },
          0
        );
      }

      for (let i = 0; i < lines.length; i++) {
        const chars = Array.from(lines[i].querySelectorAll(".hero-char"));
        if (!chars.length) continue;
        tl.add(
          {
            targets: chars,
            translateY: [24, 0],
            opacity: [0, 1],
            scale: [0.3, 1],
            duration: 520,
            easing: "easeOutElastic(1, 0.45)",
            delay: anime.stagger(38, { start: 0 }),
          },
          i === 0 ? 0 : "-=320"
        );
      }

      tl.add(
        {
          targets: paragraph,
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 560,
          easing: "easeOutExpo",
        },
        "-=280"
      );

      tl.add(
        {
          targets: cta,
          translateY: [16, 0],
          opacity: [0, 1],
          duration: 500,
          easing: "easeOutExpo",
        },
        "-=260"
      );
    };

    const win = window as unknown as { __ps_loading_closed?: boolean };
    const start = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(runHeroAnimation);
      });
    };
    if (win.__ps_loading_closed) {
      start();
      return;
    }
    const onLoadingClosed = () => start();
    window.addEventListener("ps-loading-closed", onLoadingClosed);
    return () => window.removeEventListener("ps-loading-closed", onLoadingClosed);
  }, []);

  // Nach Sprachwechsel: Hero-Text sofort sichtbar machen (neue .hero-char haben sonst opacity: 0)
  useEffect(() => {
    const el = heroTextRef.current;
    const imgWrap = heroImageRef.current;
    if (!el) return;
    const show = () => {
      el.querySelectorAll(".hero-char").forEach((node) => {
        (node as HTMLElement).style.opacity = "1";
        (node as HTMLElement).style.transform = "none";
      });
      el.querySelectorAll(".hero-animate").forEach((node) => {
        (node as HTMLElement).style.opacity = "1";
        (node as HTMLElement).style.transform = "none";
      });
      if (imgWrap) {
        imgWrap.style.opacity = "1";
        imgWrap.style.transform = "none";
      }
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(show));
    return () => cancelAnimationFrame(raf);
  }, [lang]);

  // Scroll-in für Leistungen / Warum / Prozess (nur Desktop)
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;
    const update = () => {
      const targets = document.querySelectorAll<HTMLElement>(".scroll-in-left, .scroll-in-right");
      const vh = window.innerHeight;
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.5)));
        if (p > 0.05) {
          const isLeft = el.classList.contains("scroll-in-left");
          const eased = 1 - (1 - p) ** 2;
          const tx = isLeft ? -44 * (1 - eased) : 44 * (1 - eased);
          el.style.transform = `translateX(${tx}px)`;
          el.style.opacity = String(0.3 + 0.7 * eased);
        }
      });
    };
    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // 3D-Hover für Terminal-Card („Was wir anders machen“)
  const card3dRef = useRef<HTMLDivElement>(null);
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = card3dRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const maxDeg = 14;
    const rotY = x * maxDeg;
    const rotX = -y * maxDeg;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    card.style.transition = "none";
  };
  const handleCardMouseLeave = () => {
    const card = card3dRef.current;
    if (!card) return;
    card.style.transition = "transform 0.4s ease-out";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `#${id}`);
      }
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const listener = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = wasWirAndersRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        setWasWirAndersProgress(progress);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  const getWasWirAndersStyle = () => {
    const p = wasWirAndersProgress;
    const y = p <= 0.2 ? 72 - (p / 0.2) * 48 : p <= 0.5 ? 24 - (p - 0.2) / 0.3 * 24 : p <= 0.8 ? -(p - 0.5) / 0.3 * 24 : -24 - (p - 0.8) / 0.2 * 32;
    const opacity = p <= 0.15 ? p / 0.15 : p >= 0.85 ? 1 - (p - 0.85) / 0.15 * 0.3 : 1;
    const scale = p <= 0.25 ? 0.92 + (p / 0.25) * 0.08 : p >= 0.75 ? 1 - (p - 0.75) / 0.25 * 0.06 : 1;
    return { y, opacity, scale };
  };
  const wasWirAndersStyle = getWasWirAndersStyle();

  const { scrollYProgress: globalScrollProgress } = useScroll();
  const heroOrbY = useTransform(globalScrollProgress, [0, 0.35], [0, 140]);
  const scaleX = useTransform(globalScrollProgress, [0, 1], [0, 1]);

  // Scroll-Spy: aktive Sektion + URL-Hash beim Scrollen
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const rootMargin = "-20% 0px -60% 0px";

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            setActiveSection(id);
            if (typeof window !== "undefined") {
              window.history.replaceState(null, "", `#${id}`);
            }
          });
        },
        { rootMargin, threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Initial: bei geladenem Hash zu Sektion scrollen
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && SECTION_IDS.includes(hash as typeof SECTION_IDS[number])) {
      const el = document.getElementById(hash);
      if (el) {
        const headerOffset = 80;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top, behavior: "auto" });
        setActiveSection(hash);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#212121] text-white relative overflow-x-hidden max-w-[100vw]">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#ff1900] focus:text-white focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-white"
      >
        {t.skipLink}
      </a>
      {/* (splatter effect removed) – objectBoundingBox 0–1 */}
      <svg aria-hidden className="absolute w-0 h-0 overflow-hidden pointer-events-none" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="liquid-splatter" clipPathUnits="objectBoundingBox">
            <path d="M0.02,0.48 C0,0.14,0.14,0.02,0.36,0.06 C0.52,0.08,0.68,0.03,0.86,0.12 C0.98,0.24,1,0.42,0.98,0.58 C0.96,0.78,0.82,0.96,0.58,0.99 C0.4,1,0.22,0.92,0.1,0.74 C0.04,0.64,0.02,0.54,0.02,0.48 C0.02,0.38,0.06,0.32,0.08,0.28 C0.06,0.18,0.08,0.1,0.1,0.08 C0.12,0.06,0.1,0.1,0.08,0.14 C0.06,0.22,0.04,0.32,0.02,0.42 C0.02,0.46,0.02,0.48,0.02,0.48 Z" />
          </clipPath>
        </defs>
      </svg>
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 blur-bg" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff1900]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ff1900]/3 rounded-full blur-[150px]" />
      </div>

      {/* Scroll-Fortschrittsleiste (Parallax-Feedback) – nur wenn Motion erlaubt */}
      {!prefersReducedMotion && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/10 z-[60] overflow-hidden" aria-hidden>
          <motion.div className="h-full w-full bg-[#ff1900] origin-left" style={{ scaleX }} />
        </div>
      )}

      {showSuccessAnimation && (
        <SuccessOverlay
          prefersReducedMotion={prefersReducedMotion}
          onComplete={() => {
            setShowSuccessAnimation(false);
            scrollToSection("kontakt");
          }}
        />
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 border-b border-white/[0.08] supports-[backdrop-filter]:backdrop-blur-xl backdrop-saturate-150">
        <nav className="container mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between max-w-[100vw]">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label={t.ariaScrollTop}
              title={t.ariaScrollTop}
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded-lg"
            >
              <Image
                src="/logos/LogoTEXTB.png"
                alt="Plesnicar Solutions Logo"
                width={200}
                height={60}
                className="h-12 sm:h-14 md:h-16 w-auto max-w-[180px] sm:max-w-none"
                priority
                unoptimized
              />
            </button>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {([
              ["leistungen", t.nav.leistungen],
              ["projekte", t.nav.projekte],
              ["ueber-uns", t.nav.ueberUns],
              ["team", t.nav.team],
              ["warum", t.nav.vorteile],
              ["features", t.nav.servicequalitaet],
              ["prozess", t.nav.arbeitsweise],
            ] as const).map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                className={`min-h-[44px] px-3 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center border-b-[3px] -mb-[1px] ${
                  activeSection === id
                    ? "text-white font-semibold bg-[#ff1900]/15 border-[#ff1900]"
                    : "text-white/60 border-transparent font-medium hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </a>
            ))}
            <div className="ml-2 flex items-center rounded-lg border border-white/[0.12] bg-white/[0.03] p-0.5">
              <button type="button" onClick={() => setLang("de")} className={`min-h-[36px] px-2.5 rounded-md text-sm font-medium transition-colors ${lang === "de" ? "bg-[#ff1900] text-white" : "text-white/70 hover:text-white"}`} aria-pressed={lang === "de"} aria-label="Deutsch">DE</button>
              <button type="button" onClick={() => setLang("en")} className={`min-h-[36px] px-2.5 rounded-md text-sm font-medium transition-colors ${lang === "en" ? "bg-[#ff1900] text-white" : "text-white/70 hover:text-white"}`} aria-pressed={lang === "en"} aria-label="English">EN</button>
            </div>
            <a
              href="#kontakt"
              onClick={(e) => { e.preventDefault(); scrollToSection("kontakt"); }}
              className={`ml-2 min-h-[44px] px-6 py-2.5 font-semibold rounded-xl transition-all duration-300 text-sm flex items-center shadow-lg ${activeSection === "kontakt" ? "bg-[#ff1900] text-white ring-2 ring-white/40 ring-offset-2 ring-offset-[#0a0a0a] shadow-[#ff1900]/30" : "bg-[#ff1900] hover:bg-[#e61700] text-white shadow-[#ff1900]/25 hover:shadow-xl hover:shadow-[#ff1900]/35 hover:-translate-y-0.5"}`}
            >
              {t.nav.kontakt}
            </a>
          </div>
          <div className="flex lg:hidden items-center gap-1">
            <div className="flex items-center rounded-lg border border-white/[0.12] bg-white/[0.03] p-0.5">
              <button type="button" onClick={() => setLang("de")} className={`min-h-[36px] px-2 rounded-md text-xs font-medium transition-colors ${lang === "de" ? "bg-[#ff1900] text-white" : "text-white/70 hover:text-white"}`} aria-pressed={lang === "de"}>DE</button>
              <button type="button" onClick={() => setLang("en")} className={`min-h-[36px] px-2 rounded-md text-xs font-medium transition-colors ${lang === "en" ? "bg-[#ff1900] text-white" : "text-white/70 hover:text-white"}`} aria-pressed={lang === "en"}>EN</button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              aria-label={mobileMenuOpen ? t.ariaMenuClose : t.ariaMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile / Tablet Menu (lg:hidden) */}
        {mobileMenuOpen && (
            <div className="lg:hidden bg-[#212121]/98 border-t border-white/5 supports-[backdrop-filter]:backdrop-blur-xl overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1 max-w-[100vw]">
              {([
                ["leistungen", t.nav.leistungen],
                ["projekte", t.nav.projekte],
                ["ueber-uns", t.nav.ueberUns],
                ["team", t.nav.team],
                ["warum", t.nav.vorteile],
                ["features", t.nav.servicequalitaet],
                ["prozess", t.nav.arbeitsweise],
              ] as const).map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                  className={`text-left text-sm transition-colors min-h-[44px] py-3 pl-4 pr-3 rounded-r-lg flex items-center border-l-4 ${
                    activeSection === id
                      ? "text-white font-semibold bg-[#ff1900]/20 border-[#ff1900]"
                      : "text-white/70 font-medium border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  {label}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={(e) => { e.preventDefault(); scrollToSection("kontakt"); }}
                className={`text-left min-h-[44px] px-6 py-3 font-semibold rounded-lg transition-colors text-sm w-fit mt-2 ${
                  activeSection === "kontakt"
                    ? "bg-[#ff1900] text-white ring-2 ring-white/50 ring-offset-2 ring-offset-[#212121]"
                    : "bg-[#ff1900] hover:bg-[#e61700] text-white"
                }`}
              >
                {t.nav.kontakt}
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
      {/* Hero Section – Mobile: kompakter Stack; Desktop: wie bisher */}
      <section id="hero" className="relative overflow-visible pt-20 pb-10 md:pt-28 md:pb-16 px-4 sm:px-6 min-h-0 md:min-h-[100vh] flex items-center">
        {/* Deep dark base */}
        <div className="absolute inset-0 z-0 bg-[#070709]" />

        {/* Gradient mesh – ein Orb mit leichtem Parallax beim Scrollen */}
        <motion.div
          className="hero-orb-1 absolute top-[5%] left-[15%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-[#ff1900]/[0.07] rounded-full blur-[140px] md:blur-[220px] z-0"
          style={prefersReducedMotion ? undefined : { y: heroOrbY, willChange: "transform" }}
        />
        <div className="hero-orb-2 absolute bottom-[-10%] right-[0%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#ff3d00]/[0.06] rounded-full blur-[120px] md:blur-[200px] z-0" />
        <div className="hero-orb-drift absolute top-[-5%] right-[15%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-[#1a0a3e]/20 rounded-full blur-[100px] md:blur-[160px] z-0" />
        <div className="absolute bottom-[10%] left-[40%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[#ff1900]/[0.04] rounded-full blur-[80px] md:blur-[140px] z-0" />

        {/* Grid pattern overlay */}
        <div className="hero-grid absolute inset-0 z-[1]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        {/* Radial vignette */}
        <div className="absolute inset-0 z-[1]" style={{
          background: 'radial-gradient(ellipse 60% 50% at 40% 50%, transparent 0%, #070709 100%)',
          opacity: 0.5
        }} />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 z-[2] opacity-[0.012]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />

        {/* Content – Mobile: mehr Abstand zwischen Text und Bild */}
        <div className="relative z-10 container mx-auto px-0 sm:px-6 pr-4 sm:pr-6 lg:pr-10 xl:pr-16 max-w-[100vw] w-full overflow-visible">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_auto] gap-10 md:gap-12 lg:gap-0 items-center">

            {/* Left / Top: Text – Anime.js Animation; key={lang} damit Layout bei Sprachwechsel neu berechnet wird */}
            <div
              key={lang}
              ref={heroTextRef}
              className="text-center lg:text-left space-y-5 md:space-y-7 lg:pr-10 xl:pr-14 pb-8 md:pb-10 max-w-2xl overflow-visible [font-family:var(--font-syne)]"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold leading-[1.28] tracking-tight break-words pb-1 w-full overflow-visible">
                <span className="hero-line block overflow-visible">{heroChars(t.hero.line1)}</span>
                <span className="hero-line block mt-1 overflow-visible">{heroChars(t.hero.line2)}</span>
                <span className="hero-line hero-line-gradient block mt-2 overflow-visible">{heroChars(t.hero.line3)}</span>
                <span className="hero-line hero-line-gradient block mt-1 overflow-visible">{heroChars(t.hero.line4)}</span>
              </h1>

              <p className="hero-animate text-base md:text-lg text-white/60 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
                {t.hero.paragraph}
                <span className="text-white font-medium">{t.hero.paragraphBold}</span>
              </p>

              <div className="hero-animate flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-1">
                <motion.a
                  href="#kontakt"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    setShowSuccessAnimation(true);
                  }}
                  className="group px-10 py-4 bg-gradient-to-r from-[#ff1900] to-[#ff2d00] text-white text-base font-bold shadow-2xl shadow-[#ff1900]/30 flex items-center justify-center gap-2.5 rounded-2xl"
                  initial={{ borderRadius: "1rem" }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 32px rgba(255,25,0,0.45), 0 0 60px rgba(255,25,0,0.2)",
                    transition: { duration: 0.25 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  {t.hero.ctaOffer}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                </motion.a>
                <motion.a
                  href="#leistungen"
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollToSection("leistungen"); }}
                  className="px-10 py-4 bg-white/[0.03] border border-white/[0.1] text-white text-base font-semibold rounded-2xl backdrop-blur-sm text-center"
                  whileHover={{ scale: 1.02, y: -4, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {t.hero.ctaServices}
                </motion.a>
              </div>
              <p className="hero-animate text-white/50 text-sm mt-2 text-center lg:text-left">
                {t.hero.sub}
              </p>
            </div>

            {/* Right / Bottom: Person image – auf Mobile schlanker, dekorative Elemente nur ab md */}
            <div className="relative flex justify-center lg:justify-end items-center w-full">
              {/* Decorative elements – nur ab Tablet, auf Handy nicht stören */}
              <div className="hidden md:block absolute bottom-[15%] right-[10%] w-[280px] h-[280px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] rounded-full border-2 border-[#ff1900]/20 z-0" />
              <div className="hidden md:block absolute bottom-[18%] right-[13%] w-[220px] h-[220px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] rounded-full border border-[#ff1900]/10 z-0" />
              <div className="hidden md:block absolute bottom-[5%] right-[15%] w-[250px] h-[300px] md:w-[380px] md:h-[450px] lg:w-[420px] lg:h-[500px] bg-[#ff1900]/[0.08] rounded-full blur-[80px] md:blur-[120px] z-0" />
              <div className="hidden md:block absolute top-[20%] right-[5%] w-4 h-4 md:w-5 md:h-5 bg-[#ff1900] rounded-full z-10 opacity-60" />
              <div className="hidden md:block absolute top-[35%] right-[-2%] w-2.5 h-2.5 md:w-3 md:h-3 bg-[#ff1900]/40 rounded-full z-10" />
              <div className="hidden md:block absolute bottom-[30%] right-[0%] w-3 h-3 bg-white/20 rounded-full z-10" />

              {/* Bottom-left floating card – IT & Grafikdesign */}
              <div className="absolute bottom-[20%] md:bottom-[18%] left-[-5%] md:left-[-15%] z-20 hidden sm:flex flex-col px-4 py-3 bg-[#0a0a0a]/90 border border-white/[0.1] rounded-xl backdrop-blur-xl shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Code2 className="w-4 h-4 text-[#ff1900]" strokeWidth={2.5} />
                  <span className="text-[11px] text-white/80 font-bold">{t.heroPills.itTitle}</span>
                </div>
                <span className="text-[10px] text-white/50 font-medium">{t.heroPills.itSub}</span>
              </div>

              {/* Pill: Bau & Handel – hinter dem Portrait (z < Bild), höher damit Text frei bleibt */}
              <div className="absolute bottom-[57%] md:bottom-[49%] left-[-5%] md:left-[-15%] z-0 hidden sm:flex flex-col px-4 py-3 bg-[#0a0a0a]/90 border border-white/[0.1] rounded-xl backdrop-blur-xl shadow-xl max-w-[200px] md:max-w-[220px]">
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className="w-4 h-4 shrink-0 text-[#ff1900]" strokeWidth={2.5} />
                  <span className="text-[11px] text-white/80 font-bold">{t.heroPills.bauTitle}</span>
                </div>
                <span className="text-[10px] text-white/50 font-medium leading-snug">{t.heroPills.bauSub1}</span>
                <span className="text-[10px] text-white/50 font-medium leading-snug mt-0.5">{t.heroPills.bauSub2}</span>
              </div>

              {/* Bild: Einblend-Animation beim Laden (Anime.js) */}
              <div
                ref={heroImageRef}
                className="hero-image-wrap relative z-10 w-[min(100%,300px)] sm:w-[340px] md:w-[450px] lg:w-[500px] xl:w-[560px] min-h-0 md:min-h-[70vh] flex items-center justify-center lg:justify-end"
              >
                <Image
                  src="/portraits/plesnicart.png?v=2"
                  alt="Boris Plesnicar – Inhaber von Plesnicar Solutions"
                  width={1000}
                  height={1200}
                  className="w-full h-auto max-h-[55vh] md:max-h-[85vh] object-contain object-bottom drop-shadow-[0_0_80px_rgba(255,25,0,0.12)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats-Leiste: animierte Count-up-Zahlen */}
      <section ref={statsRef} className="py-8 md:py-10 px-4 sm:px-6 border-t border-white/5 bg-[#070709]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-black text-[#ff1900] tabular-nums">
                {statsDisplay.years}+
              </p>
              <p className="text-white/60 text-sm md:text-base font-medium mt-1">{t.stats.yearsLabel}</p>
            </div>
            <div className="text-center border-x border-white/10">
              <p className="text-2xl md:text-3xl font-black text-[#ff1900] tabular-nums">
                {statsDisplay.projects}+
              </p>
              <p className="text-white/60 text-sm md:text-base font-medium mt-1">{t.stats.projectsLabel}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-black text-[#ff1900] tabular-nums">
                {statsDisplay.clients}+
              </p>
              <p className="text-white/60 text-sm md:text-base font-medium mt-1">{t.stats.clientsLabel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Was wir anders machen + 3D-Hover-Card – scroll-parallax */}
      <section ref={wasWirAndersRef} className="py-16 md:py-24 px-4 sm:px-6 relative border-t border-white/5 overflow-visible bg-[#070709]">
        <motion.div
          className="container mx-auto max-w-6xl"
          style={prefersReducedMotion ? undefined : { y: wasWirAndersStyle.y, opacity: wasWirAndersStyle.opacity, scale: wasWirAndersStyle.scale }}
        >
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial="initial"
            whileInView="animate"
            viewport={motionViewport}
            variants={staggerParent}
          >
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">{t.wasWirAnders.label}</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
              {t.wasWirAnders.title} <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.wasWirAnders.titleHighlight}</span>{t.wasWirAnders.titleSuffix ? ` ${t.wasWirAnders.titleSuffix}` : ""}
            </motion.h2>
            <motion.p variants={staggerItem} className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto">
              {t.wasWirAnders.subtitle}
            </motion.p>
          </motion.div>

          {/* Terminal-Card mit 3D-Hover */}
          <motion.div
            className="flex justify-center mb-10 md:mb-12 [perspective:1000px]"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={motionViewport}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={card3dRef}
              className="relative w-full max-w-[320px] h-[200px] md:w-[400px] md:h-[260px] rounded-2xl border border-white/[0.1] bg-[#0c0c14]/95 backdrop-blur-xl shadow-2xl shadow-[#ff1900]/20 cursor-default"
              style={{ transformStyle: "preserve-3d", transition: "transform 0.4s ease-out" }}
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-[11px] text-white/40 font-mono">plesnicar-solutions.tsx</span>
                </div>
                <div className="p-5 font-mono text-xs lg:text-sm leading-relaxed space-y-1">
                  <p><span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">solution</span> = <span className="text-[#98c379]">&quot;{t.wasWirAnders.terminalSolution}&quot;</span>;</p>
                  <p><span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">{t.wasWirAnders.terminalQualitaet}</span> = <span className="text-[#d19a66]">100</span>;</p>
                  <p><span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">{t.wasWirAnders.terminalBranchen}</span> = <span className="text-[#d19a66]">{t.wasWirAnders.terminalValue}</span>;</p>

                  <p className="text-white/20">&#47;&#47; ...</p>
                  <p><span className="text-[#c678dd]">export</span> <span className="text-[#c678dd]">default</span> <span className="text-[#61afef]">function</span> <span className="text-[#e5c07b]">Build</span>() &#123;</p>
                  <p className="pl-4"><span className="text-[#c678dd]">return</span> &lt;<span className="text-[#e06c75]">{t.wasWirAnders.terminalErgebnis}</span> <span className="text-[#d19a66]">{t.wasWirAnders.terminalPerfekt}</span> /&gt;;</p>
                  <p>&#125;</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-[#ff1900] flex items-center justify-center shadow-lg shadow-[#ff1900]/40" style={{ transform: "translateZ(40px)" }}>
                <Code2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -bottom-3 -left-3 w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center" style={{ transform: "translateZ(30px)" }}>
                <Monitor className="w-4 h-4 text-white/60" strokeWidth={2} />
              </div>
            </div>
          </motion.div>

          {/* Werte */}
          <motion.div
            className="grid grid-cols-3 gap-6 md:gap-10 max-w-3xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={motionViewport}
            variants={staggerParent}
          >
            {[
              { icon: Zap, label: t.wasWirAnders.value1, sub: t.wasWirAnders.value1Sub },
              { icon: Sparkles, label: t.wasWirAnders.value2, sub: t.wasWirAnders.value2Sub },
              { icon: Rocket, label: t.wasWirAnders.value3, sub: t.wasWirAnders.value3Sub }
            ].map((item, idx) => {
              const Ico = item.icon;
              return (
                <motion.div key={idx} variants={staggerItem} className="text-center space-y-3">
                  <motion.div
                    className="mx-auto w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#ff1900]/10 border border-[#ff1900]/20 flex items-center justify-center"
                    whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                  >
                    <Ico className="w-6 h-6 md:w-7 md:h-7 text-[#ff1900]" strokeWidth={1.5} />
                  </motion.div>
                  <p className="text-lg md:text-xl font-bold text-white">{item.label}</p>
                  <p className="text-white/45 font-light text-xs md:text-sm">{item.sub}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Leistungen Section */}
      <section id="leistungen" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
        <SectionBackground />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="initial"
            whileInView="animate"
            viewport={motionViewport}
            variants={staggerParent}
          >
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">{t.leistungen.label}</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {t.leistungen.title} <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.leistungen.titleHighlight}</span>
            </motion.h2>
          </motion.div>

          {/* Bento-Layout: IT groß, Rest kleiner */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              { ...t.leistungen.services[0], icon: Code2, wide: true as const },
              { ...t.leistungen.services[1], icon: Palette, wide: false as const },
              { ...t.leistungen.services[2], icon: Wrench, wide: false as const },
              { ...t.leistungen.services[3], icon: ShoppingCart, wide: false as const }
            ].map((service, i) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={motionViewport}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`group relative rounded-2xl border transition-all duration-500 bg-[#0a0a0a]/90 border-white/[0.1] supports-[backdrop-filter]:backdrop-blur-xl shadow-xl ${
                    service.wide
                      ? 'lg:col-span-2 p-8 md:p-10 md:hover:border-[#ff1900]/40'
                      : 'p-7 md:p-8 md:hover:border-white/[0.2]'
                  } ${service.wide ? 'border-[#ff1900]/20' : ''} md:hover:-translate-y-1 md:hover:shadow-xl md:hover:shadow-[#ff1900]/10 ${i % 2 === 0 ? 'scroll-in-left' : 'scroll-in-right'}`}
                >
                  {service.wide && (
                    <div className="absolute top-0 left-8 w-16 h-0.5 bg-gradient-to-r from-[#ff1900] to-transparent rounded-full" />
                  )}
                  <div className={`flex ${service.wide ? 'items-start gap-6 md:gap-8' : 'flex-col gap-5'}`}>
                    <div className={`flex-shrink-0 rounded-xl bg-gradient-to-br from-[#ff1900]/15 to-[#ff1900]/5 border border-[#ff1900]/15 flex items-center justify-center transition-all duration-500 group-hover:scale-105 ${service.wide ? 'w-14 h-14' : 'w-12 h-12'}`}>
                      <IconComponent className={`text-[#ff1900] ${service.wide ? 'w-7 h-7' : 'w-6 h-6'}`} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-white mb-4 group-hover:text-[#ff1900] transition-colors duration-400 ${service.wide ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'}`}>
                        {service.title}
                      </h3>
                      <ul className={`space-y-3 ${service.wide ? 'md:columns-2 md:gap-x-10' : ''}`}>
                        {service.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-white/70 group-hover:text-white/90 transition-colors duration-400">
                            <span className="w-1 h-1 rounded-full bg-[#ff1900] mt-2.5 flex-shrink-0" />
                            <span className="font-light text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projekte Section */}
      <section id="projekte" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
        <SectionBackground />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-10 md:mb-14"
            initial="initial"
            whileInView="animate"
            viewport={motionViewport}
            variants={staggerParent}
          >
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">{t.projekte.label}</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {t.projekte.title} <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.projekte.titleHighlight}</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="text-base text-white/50 font-light max-w-xl mx-auto mt-3">
              {t.projekte.subtitle}
            </motion.p>
          </motion.div>

          <p className="text-center text-white/40 text-sm mb-2 md:mb-3">{t.projekte.scrollHint}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-4 md:mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff1900]/35 bg-[#ff1900]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#ff1900]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff1900]" aria-hidden />
              {t.projekte.categoryIt}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
              {t.projekte.categoryBau}
            </span>
          </div>
          <p className="text-center text-white/35 text-xs mb-4 md:mb-5 max-w-md mx-auto">{t.projekte.itBauHint}</p>

          {/* LED-Slideshow: zuerst, automatisch durchlaufend */}
          <div className="relative w-full mb-10 md:mb-14 overflow-hidden" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff1900]/8 via-transparent to-[#ff1900]/8 pointer-events-none z-10" />
            <div
              className="py-5 md:py-6 border-y border-[#ff1900]/20 bg-[#080808]/95 backdrop-blur-sm"
              style={{ perspective: "1600px", transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center overflow-hidden" style={{ transform: "rotateX(2deg)", transformStyle: "preserve-3d" }}>
                <div className="led-ticker-track flex items-stretch gap-5 md:gap-6 shrink-0 pl-4 md:pl-6" style={{ width: "max-content" }}>
                  {[...PROJECTS, ...PROJECTS].map((project, i) => (
                    <div
                      key={`${project.id}-${i}`}
                      className={`flex-shrink-0 w-[200px] sm:w-[230px] md:w-[260px] rounded-xl overflow-hidden bg-[#0d0d0d] shadow-xl ${
                        project.category === "bau"
                          ? "border border-amber-500/35 ring-1 ring-amber-500/15"
                          : "border border-[#ff1900]/25 ring-1 ring-[#ff1900]/10"
                      }`}
                      style={{
                        boxShadow: "0 12px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
                      }}
                    >
                      <div className="relative aspect-[4/3] bg-white/5">
                        <Image
                          src={project.images[0]}
                          alt=""
                          fill
                          className="object-cover opacity-95"
                          sizes="260px"
                        />
                        <span
                          className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide text-white ${
                            project.category === "bau" ? "bg-amber-600/95" : "bg-[#ff1900]/95"
                          }`}
                        >
                          {project.category === "bau" ? t.projekte.categoryBau : t.projekte.categoryIt}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute bottom-2 left-2.5 right-2.5">
                          <p className="text-white font-bold text-sm truncate drop-shadow-lg">{project.title}</p>
                          <p className="text-white/80 text-xs truncate mt-0.5">
                            {PROJECT_TRANSLATIONS[lang][project.id]?.subtitle ?? project.subtitle ?? ""}
                          </p>
                        </div>
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-28 bg-gradient-to-r from-[#070709] via-[#070709]/95 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-28 bg-gradient-to-l from-[#070709] via-[#070709]/95 to-transparent pointer-events-none z-10" />
          </div>

          {/* Interaktives Carousel mit Dots und Pfeilen (unterhalb der Slideshow) */}
          <div className="relative -mx-4 sm:mx-0">
            <div
              ref={projectsScrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden pb-4 pt-1 px-4 sm:px-0 scroll-smooth snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
            >
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  ref={(el) => { projectCardRefs.current[i] = el; }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={motionViewport}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] snap-center first:snap-start last:snap-end flex justify-center"
                  style={{ perspective: "1200px" }}
                >
                  <motion.button
                    type="button"
                    onClick={() => { setSelectedProject(project); setProjectModalImageIndex(0); }}
                    layout
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: !projectsCarouselHasOverflow
                              ? 1
                              : activeProjectIndex === i
                                ? 1.03
                                : 0.98,
                            y: activeProjectIndex === i && projectsCarouselHasOverflow ? -6 : 0,
                            rotateX: 0,
                            rotateY: 0,
                            boxShadow: projectFocusShadow(
                              project.category,
                              activeProjectIndex === i && projectsCarouselHasOverflow
                            ),
                          }
                    }
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            scale: 1.04,
                            y: -8,
                            rotateX: 4,
                            rotateY: -6,
                            boxShadow: projectHoverShadow(project.category),
                            transition: { type: "spring", stiffness: 400, damping: 25 },
                          }
                    }
                    whileTap={prefersReducedMotion ? undefined : { scale: 1, transition: { duration: 0.1 } }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    style={{ transformOrigin: "center center" }}
                    className={`w-full max-w-[340px] text-left rounded-2xl border bg-[#0a0a0a]/95 backdrop-blur-xl overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070709] ${
                      project.category === "bau"
                        ? "border-amber-500/25 focus-visible:ring-amber-500"
                        : "border-white/[0.1] focus-visible:ring-[#ff1900]"
                    }`}
                  >
                    <div className="relative aspect-[4/3] bg-white/[0.03] overflow-hidden">
                      <Image
                        src={project.images[0]}
                        alt={[project.title, PROJECT_TRANSLATIONS[lang][project.id]?.subtitle ?? project.subtitle].filter(Boolean).join(" – ") + " " + t.projekte.imageAltPreview}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 280px, 340px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute top-3 left-3 text-white/80 font-mono text-xs tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-[1] max-w-[55%]">
                        <span
                          className={`px-2 py-0.5 rounded-md text-white text-[10px] font-semibold uppercase tracking-wider ${
                            project.category === "bau"
                              ? "bg-amber-600/95 ring-1 ring-amber-400/40"
                              : "bg-[#ff1900]/95 ring-1 ring-white/20"
                          }`}
                        >
                          {project.category === "bau" ? t.projekte.categoryBau : t.projekte.categoryIt}
                        </span>
                        {project.inHouse && (
                          <span className="px-2 py-0.5 rounded-md bg-white/15 text-white text-[10px] font-semibold uppercase tracking-wider ring-1 ring-white/25">
                            {t.projekte.inHouseLabel}
                          </span>
                        )}
                      </div>
                      <span className="absolute bottom-3 left-3 right-3 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {t.projekte.showInfo}
                      </span>
                    </div>
                    <div className="p-4 md:p-5 relative">
                      <h3 className="font-bold text-white text-lg group-hover:text-[#ff1900] transition-colors">
                        {project.title}
                        {(PROJECT_TRANSLATIONS[lang][project.id]?.subtitle ?? project.subtitle) && (
                          <span className="block text-sm font-medium text-white/60 mt-0.5">{PROJECT_TRANSLATIONS[lang][project.id]?.subtitle ?? project.subtitle}</span>
                        )}
                      </h3>
                    </div>
                  </motion.button>
                </motion.div>
              ))}
            </div>
            {/* Scroll-Dots nur wenn horizontales Scrollen nötig (sonst irreführend / „stuck“) */}
            {PROJECTS.length > 1 && projectsCarouselHasOverflow && (
              <div className="flex justify-center gap-2 mt-5 md:mt-6">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      const container = projectsScrollRef.current;
                      const card = projectCardRefs.current[i];
                      if (container && card) {
                        const left = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
                        container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
                      }
                    }}
                    className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070709]"
                    aria-label={t.projekte.ariaGoToProject.replace("%s", String(i + 1))}
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        activeProjectIndex === i
                          ? "w-8 h-2.5 bg-[#ff1900]"
                          : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
            {/* Pfeile nur bei horizontalem Overflow */}
            {PROJECTS.length > 1 && projectsCarouselHasOverflow && (
              <div className="flex md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:right-0 md:pointer-events-none justify-center md:justify-between gap-3 mt-4 md:mt-0 md:px-0">
                <button
                  type="button"
                  onClick={() => projectsScrollRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
                  className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0a0a0a]/90 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-colors pointer-events-auto z-20"
                  aria-label={t.projekte.ariaPrev}
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => projectsScrollRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
                  className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0a0a0a]/90 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-colors pointer-events-auto z-20"
                  aria-label={t.projekte.ariaNext}
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Über uns Section */}
      <section id="ueber-uns" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
        <SectionBackground />
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="md:flex md:gap-12 lg:gap-16 items-start">
            {/* Akzentlinie links (nur Desktop) */}
            <div className="hidden md:block flex-shrink-0 w-px self-stretch bg-gradient-to-b from-[#ff1900] via-[#ff1900]/40 to-transparent" />

            <motion.div
              className="flex-1 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl p-8 md:p-10 space-y-10"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={motionViewport}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold">{t.ueberUns.label}</p>
              <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] text-white font-light leading-[1.35]">
                <span className="text-[#ff1900] font-bold">{t.ueberUns.heading}</span> {t.ueberUns.headingRest}
              </h2>
              <div className="h-px w-20 bg-white/10" />
              <p className="text-base md:text-lg text-white/60 leading-relaxed font-light max-w-3xl">
                {t.ueberUns.body}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
        <SectionBackground />
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            className="text-center mb-14 md:mb-18"
            initial="initial"
            whileInView="animate"
            viewport={motionViewport}
            variants={staggerParent}
          >
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">{t.team.label}</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {t.team.title} <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.team.titleHighlight}</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                name: "Boris Plesnicar",
                role: t.team.borisRole,
                education: t.team.borisEdu,
                image: "/portraits/boris.jpg",
                isOwner: true,
                expertise: t.team.expertiseBoris,
                phone: "+43 664 467 8382",
                phoneHref: "tel:+436644678382",
                sigImg: "/signatures/signatureboris.png",
                sigAlt: t.team.sigAltBoris,
                sigLabel: t.team.sigBoris
              },
              {
                name: "Ing. Dietmar Plesnicar",
                role: t.team.dietmarRole,
                education: t.team.dietmarEdu,
                image: "/portraits/dietmar.png",
                isOwner: false,
                expertise: t.team.expertiseDietmar,
                phone: "+43 676 320 6308",
                phoneHref: "tel:+436763206308",
                sigImg: "/signatures/signaturedietmar.png",
                sigAlt: t.team.sigAltDietmar,
                sigLabel: t.team.sigDietmar
              }
            ].map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={motionViewport}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`relative rounded-2xl border transition-all duration-500 bg-[#0a0a0a]/90 border-white/[0.1] backdrop-blur-xl shadow-xl p-7 md:p-9 ${
                  person.isOwner 
                    ? 'md:hover:border-[#ff1900]/45 border-[#ff1900]/25' 
                    : 'md:hover:border-white/[0.2] md:translate-y-4'
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
                        <span className="px-2 py-0.5 bg-[#ff1900] text-white text-[10px] font-bold rounded uppercase tracking-wider">{t.team.owner}</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-white/[0.06] text-white/45 text-[10px] font-semibold rounded uppercase tracking-wider">{t.team.support}</span>
                      )}
                    </div>
                    <p className={`text-sm mb-1 ${person.isOwner ? 'text-[#ff1900] font-semibold' : 'text-white/55 font-medium'}`}>{person.role}</p>
                    <p className="text-xs text-white/45 font-light">{person.education}</p>
                  </div>
                </div>

                {/* Tags statt Liste */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {person.expertise.map((tag, idx) => (
                    <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium ${
                      person.isOwner 
                        ? 'bg-[#ff1900]/10 text-[#ff1900] border border-[#ff1900]/20' 
                        : 'bg-white/[0.04] text-white/60 border border-white/[0.08]'
                    }`}>{tag}</span>
                  ))}
                </div>

                {/* Signatur + Kontakt – primary (red) / secondary (glass) wie Hero */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <a href={person.phoneHref} className="inline-flex items-center justify-center gap-2 min-w-[140px] px-4 py-2.5 rounded-xl bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold text-sm transition-colors shadow-lg shadow-[#ff1900]/25 whitespace-nowrap">
                      <Phone className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} />
                      <span className="truncate">{person.phone}</span>
                    </a>
                    <a href="tel:+43273432048" className="inline-flex items-center justify-center gap-2 min-w-[120px] px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] text-white font-medium text-sm transition-colors whitespace-nowrap shrink-0">
                      <Phone className="w-3.5 h-3.5 shrink-0 text-[#ff1900]" strokeWidth={2} />
                      {t.team.landline}
                    </a>
                    <a href="mailto:plesnicaroffice@gmail.com" className="inline-flex items-center justify-center gap-2 min-w-[120px] px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] text-white font-medium text-sm transition-colors whitespace-nowrap shrink-0">
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

      {/* Unsere Vorteile Section – Bento */}
      <section id="warum" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
        <SectionBackground />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-14 md:mb-18"
            initial="initial"
            whileInView="animate"
            viewport={motionViewport}
            variants={staggerParent}
          >
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">{t.warum.label}</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {t.warum.title} <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.warum.titleHighlight}</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {t.warum.items.map((benefit, i) => {
              const icons = [Zap, Sparkles, User, Rocket];
              const IconComponent = icons[i];
              const wide = i === 0 || i === 3;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={motionViewport}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`group flex items-start gap-5 rounded-2xl border bg-[#0a0a0a]/90 border-white/[0.1] backdrop-blur-xl shadow-xl transition-all duration-500 md:hover:border-white/[0.2] md:hover:shadow-lg md:hover:shadow-[#ff1900]/10 ${wide ? 'md:col-span-2 p-7 md:p-8' : 'p-6 md:p-7'} ${i % 2 === 0 ? 'scroll-in-left' : 'scroll-in-right'}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#ff1900]/10 border border-[#ff1900]/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-400">
                    <IconComponent className="w-6 h-6 text-[#ff1900]" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">{benefit.title}</h3>
                    <p className="text-white/60 font-light leading-relaxed text-sm">{benefit.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Servicequalität Section */}
      <section id="features" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
        <SectionBackground />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="text-center mb-14 md:mb-18"
            initial="initial"
            whileInView="animate"
            viewport={motionViewport}
            variants={staggerParent}
          >
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">{t.features.label}</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {t.features.title} <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.features.titleHighlight}</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {t.features.items.map((feature, i) => {
              const icons = [Clock, CheckCircle2, TrendingUp, Users, BarChart3, Award];
              const IconComponent = icons[i];
              const highlight = i === 0 || i === 5;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={motionViewport}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`group relative p-6 md:p-7 rounded-2xl border bg-[#0a0a0a]/90 border-white/[0.1] backdrop-blur-xl shadow-xl transition-all duration-500 md:hover:shadow-lg md:hover:shadow-[#ff1900]/8 ${
                    highlight
                      ? 'border-[#ff1900]/20 md:hover:border-[#ff1900]/35'
                      : 'md:hover:border-white/[0.2]'
                  }`}
                >
                  {highlight && <div className="absolute top-0 left-6 w-10 h-0.5 bg-gradient-to-r from-[#ff1900] to-transparent rounded-full" />}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#ff1900]/10 border border-[#ff1900]/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-400">
                      <IconComponent className="w-5 h-5 text-[#ff1900]" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-white mb-1">{feature.title}</h3>
                      <p className="text-white/55 font-light leading-relaxed text-sm">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Arbeitsweise Section – Timeline */}
      <section id="prozess" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
        <SectionBackground />
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            className="text-center mb-14 md:mb-18"
            initial="initial"
            whileInView="animate"
            viewport={motionViewport}
            variants={staggerParent}
          >
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">{t.prozess.label}</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {t.prozess.title} <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.prozess.titleHighlight}</span>
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff1900]/40 via-white/10 to-transparent" />

            <div className="space-y-6 md:space-y-0">
              {t.prozess.steps.map((process, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={motionViewport}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="scroll-in-right relative md:flex items-start gap-8 md:py-8"
                >
                  {/* Nummer-Dot */}
                  <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-[#090a11] border-2 border-[#ff1900]/40 items-center justify-center z-10">
                    <span className="text-xs font-black text-[#ff1900]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex-1 p-6 md:p-7 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl transition-all duration-500 md:hover:border-white/[0.2] md:hover:-translate-y-1 md:hover:shadow-lg md:hover:shadow-[#ff1900]/8">
                    <div className="flex items-center gap-3 mb-2 md:hidden">
                      <span className="text-xs font-black text-[#ff1900] px-2 py-0.5 rounded-full border border-[#ff1900]/30 bg-[#ff1900]/10">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{process.title}</h3>
                    <p className="text-white/55 font-light leading-relaxed text-sm">{process.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
        <SectionBackground />
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial="initial"
            whileInView="animate"
            viewport={motionViewport}
            variants={staggerParent}
          >
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">{t.kontakt.label}</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
              {t.kontakt.title} <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.kontakt.titleHighlight}</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="text-white/50 font-light text-sm md:text-base max-w-lg mx-auto">
              {t.kontakt.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 md:gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={motionViewport}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Ansprechpartner – einheitliches Karten-Design */}
            <div className="space-y-4">
              <div className="p-5 md:p-6 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl hover:border-white/[0.18] transition-all duration-300">
                <p className="text-white font-bold text-base mb-1">{t.kontakt.boris}</p>
                <p className="text-white/55 text-sm mb-4">{t.kontakt.borisRole}</p>
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                  <a
                    href="tel:+436644678382"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold text-sm transition-colors shadow-lg shadow-[#ff1900]/25"
                  >
                    <Phone className="w-4 h-4" strokeWidth={2.5} />
                    +43 664 4678382
                  </a>
                  <a
                    href="tel:+43273432048"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                    {t.team.landline}
                  </a>
                  <a
                    href="mailto:plesnicaroffice@gmail.com"
                    title="plesnicaroffice@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                    {t.team.email}
                  </a>
                </div>
              </div>
              <div className="p-5 md:p-6 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl hover:border-white/[0.18] transition-all duration-300">
                <p className="text-white font-bold text-base mb-1">{t.kontakt.dietmar}</p>
                <p className="text-white/55 text-sm mb-4">{t.kontakt.dietmarRole}</p>
                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                  <a
                    href="tel:+436763206308"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold text-sm transition-colors shadow-lg shadow-[#ff1900]/25"
                  >
                    <Phone className="w-4 h-4" strokeWidth={2.5} />
                    +43 676 3206308
                  </a>
                  <a
                    href="tel:+43273432048"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                    {t.team.landline}
                  </a>
                  <a
                    href="mailto:plesnicaroffice@gmail.com"
                    title="plesnicaroffice@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                    {t.team.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 md:p-6 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl border-[#ff1900]/15">
                <h3 className="text-white font-bold text-base mb-3">{t.kontakt.standort}</h3>
                <div className="w-full h-48 md:h-52 rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
                  {cookieConsent?.comfort ? (
                    <iframe
                      src="https://www.google.com/maps?q=Hartriegelstraße+12,+3550+Langenlois,+Österreich&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                      title="Plesnicar Solutions Standort"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 text-center">
                      <p className="text-white/65 text-xs md:text-sm font-light">
                        {t.kontakt.mapConsent}
                      </p>
                      <button
                        type="button"
                        onClick={() => updateConsent(true)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ff1900] hover:bg-[#e61700] text-white text-sm font-semibold transition-colors"
                      >
                        {t.kontakt.acceptCookies}
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-white/65 font-light text-sm mt-3">{t.kontakt.address}</p>
                <p className="text-white/50 text-xs mt-0.5">{t.kontakt.addressNote}</p>
                <p className="text-white/65 font-light text-sm mt-3">
                  <strong className="text-white font-semibold">{t.kontakt.festnetz}:</strong>{" "}
                  <a href="tel:+43273432048" className="text-[#ff1900] hover:underline">
                    02734/32048
                  </a>
                </p>
              </div>
              <a
                href="https://www.instagram.com/plesnicarsolutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl hover:border-white/[0.18] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ff1900]/20 border border-[#ff1900]/30 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-[#ff1900]" strokeWidth={2} />
                </div>
                <span className="font-semibold text-white text-sm">@plesnicarsolutions</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      </main>

      {/* Projekt-Detail-Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#0a0a0a] shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900]"
              aria-label={t.modal.close}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-2 pr-12">
                <span
                  className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white ${
                    selectedProject.category === "bau" ? "bg-amber-600/95 ring-1 ring-amber-400/35" : "bg-[#ff1900]/95 ring-1 ring-white/20"
                  }`}
                >
                  {selectedProject.category === "bau" ? t.projekte.categoryBau : t.projekte.categoryIt}
                </span>
                {selectedProject.inHouse && (
                  <span className="inline-flex items-center rounded-md bg-white/12 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white ring-1 ring-white/20">
                    {t.projekte.inHouseLabel}
                  </span>
                )}
              </div>
              <h2 id="project-modal-title" className="text-2xl md:text-3xl font-bold text-white pr-12">
                {selectedProject.title}
                {(PROJECT_TRANSLATIONS[lang][selectedProject.id]?.subtitle ?? selectedProject.subtitle) && (
                  <span className="block text-lg font-medium text-white/60 mt-1">{PROJECT_TRANSLATIONS[lang][selectedProject.id]?.subtitle ?? selectedProject.subtitle}</span>
                )}
              </h2>

              {/* Bildergalerie im Modal */}
              <div className="mt-6 rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.08]">
                <div className="relative aspect-video">
                  <Image
                    src={selectedProject.images[projectModalImageIndex]}
                    alt={`${selectedProject.title} – ${t.modal.imageAlt} ${projectModalImageIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
                {selectedProject.images.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto border-t border-white/[0.06]">
                    {selectedProject.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setProjectModalImageIndex(idx)}
                        className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                          projectModalImageIndex === idx
                            ? selectedProject.category === "bau"
                              ? "border-amber-500 ring-2 ring-amber-500/35"
                              : "border-[#ff1900] ring-2 ring-[#ff1900]/30"
                            : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        <Image src={img} alt="" width={56} height={56} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="mt-6 text-white/70 leading-relaxed text-sm md:text-base">
                {PROJECT_TRANSLATIONS[lang][selectedProject.id]?.description ?? selectedProject.description}
              </p>

              {selectedProject.category === "bau" && (
                <p className="mt-4 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-amber-100/95 text-xs md:text-sm leading-relaxed">
                  {t.projekte.bauBefaehigungHinweis}
                </p>
              )}

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex items-center gap-2 px-4 py-3 rounded-xl text-white font-semibold text-sm transition-colors ${
                    selectedProject.category === "bau"
                      ? "bg-amber-600 hover:bg-amber-500 shadow-lg shadow-amber-600/25"
                      : "bg-[#ff1900] hover:bg-[#e61700] shadow-lg shadow-[#ff1900]/25"
                  }`}
                >
                  {PROJECT_TRANSLATIONS[lang][selectedProject.id]?.linkLabel ?? selectedProject.linkLabel ?? t.projekte.moreInfo}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="py-12 pb-24 md:pb-16 md:py-16 px-4 sm:px-6 border-t border-white/[0.08] bg-[#0a0a0a]/50 backdrop-blur-sm overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center">
            <Image
                src="/logos/LogoTEXTB.png"
                alt="Plesnicar Solutions Logo"
                width={200}
                height={60}
                className="h-12 md:h-14 w-auto opacity-80"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="font-bold text-white mb-1">Boris Plesnicar e.U.</p>
              <p className="font-light text-sm text-white/50">© {new Date().getFullYear()} Plesnicar Solutions. {t.footer.rights}</p>
            </div>
            <div className="flex items-center gap-6">
              <a 
                href="https://www.instagram.com/plesnicarsolutions/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#ff1900] transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={2} />
              </a>
              <Link href="/impressum" className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm">
                {t.footer.impressum}
              </Link>
              <Link href="/datenschutz" className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm">
                {t.footer.datenschutz}
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top (mobile: über Leiste, desktop: unten rechts) */}
      {showBackToTop && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.ariaScrollTop}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-30 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/[0.08] border border-white/[0.12] text-white/80 hover:bg-white/[0.14] hover:text-white shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.12, backgroundColor: "rgba(255,255,255,0.14)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
      )}

      {/* Mobile bottom contact bar – Stack-Layout (Dock-ähnlich), alles lesbar */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden pointer-events-none">
        <div className="mx-3 sm:mx-4 mb-3 sm:mb-4 pointer-events-auto flex justify-center">
          <div className="w-full max-w-sm rounded-2xl bg-[#0f0f0f]/98 border border-white/[0.12] shadow-xl shadow-black/50 overflow-hidden">
            {mobileContactBarCollapsed ? (
              <button
                type="button"
                onClick={() => setMobileContactBarCollapsed(false)}
                className="w-full min-h-[52px] flex items-center justify-center gap-2.5 py-3.5 px-4 text-white text-sm font-semibold rounded-2xl"
                aria-expanded="false"
                aria-label={t.mobileBar.showContact}
              >
                <Phone className="w-5 h-5 shrink-0 text-[#ff1900]" strokeWidth={2} />
                <span>{t.mobileBar.showContact}</span>
                <ChevronUp className="w-4 h-4 shrink-0 text-white/50" />
              </button>
            ) : (
              <div className="flex flex-col">
                <a
                  href="tel:+43273432048"
                  className="flex items-center gap-3 py-3.5 px-4 bg-[#ff1900]/90 hover:bg-[#ff1900] active:bg-[#cc1500] text-white transition-colors min-h-[52px]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Phone className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-semibold text-sm">{t.mobileBar.landline}</p>
                    <p className="text-xs text-white/80 font-mono">02734 32048</p>
                  </div>
                </a>
                <a
                  href="tel:+436644678382"
                  className="flex items-center gap-3 py-3 px-4 border-t border-white/10 hover:bg-white/[0.06] active:bg-white/[0.08] text-white transition-colors min-h-[48px]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.08]">
                    <Phone className="w-3.5 h-3.5 text-[#ff1900]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-medium text-sm text-white">{t.mobileBar.itGrafik}</p>
                    <p className="text-xs text-white/60 font-mono">0664 4678382</p>
                  </div>
                </a>
                <a
                  href="tel:+436763206308"
                  className="flex items-center gap-3 py-3 px-4 border-t border-white/10 hover:bg-white/[0.06] active:bg-white/[0.08] text-white transition-colors min-h-[48px]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.08]">
                    <Phone className="w-3.5 h-3.5 text-[#ff1900]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-medium text-sm text-white">{t.mobileBar.bauHaus}</p>
                    <p className="text-xs text-white/60 font-mono">0676 3206308</p>
                  </div>
                </a>
                <a
                  href="mailto:plesnicaroffice@gmail.com"
                  className="flex items-center gap-3 py-3 px-4 border-t border-white/10 hover:bg-white/[0.06] active:bg-white/[0.08] text-white transition-colors min-h-[48px]"
                  aria-label={t.team.email}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.08]">
                    <Mail className="w-3.5 h-3.5 text-[#ff1900]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-medium text-sm text-white">{t.team.email}</p>
                    <p className="text-xs text-white/60 truncate" title="plesnicaroffice@gmail.com">plesnicaroffice@gmail.com</p>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => setMobileContactBarCollapsed(true)}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 border-t border-white/10 bg-white/[0.03] hover:bg-white/[0.06] active:bg-white/[0.04] text-white/60 hover:text-white/90 text-sm transition-colors min-h-[44px]"
                  aria-label={t.mobileBar.collapseAria}
                  title={t.mobileBar.collapseTitle}
                >
                  <ChevronDown className="w-4 h-4" strokeWidth={2} />
                  <span>{t.mobileBar.collapseTitle}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCookieBanner && (
        <CookieBanner
          lang={lang}
          onAllowEssential={() => updateConsent(false)}
          onAllowAll={() => updateConsent(true)}
        />
      )}
    </div>
  );
}

type SuccessOverlayProps = {
  onComplete: () => void;
  prefersReducedMotion: boolean;
};

function SuccessOverlay({ onComplete, prefersReducedMotion }: SuccessOverlayProps) {
  const particles = useRef<Array<{ id: number; x: number; y: number; color: string; delay: number; rotate: number; endY: number }>>(null);
  if (particles.current === null) {
    const colors = ["#ff1900", "#ffffff", "rgba(255,255,255,0.7)", "rgba(255,25,0,0.8)"];
    particles.current = Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 15 + Math.random() * 25,
      color: colors[i % colors.length],
      delay: Math.random() * 0.25,
      rotate: (Math.random() - 0.5) * 360,
      endY: 100 + Math.random() * 80,
    }));
  }
  const list = particles.current;

  useEffect(() => {
    const t = prefersReducedMotion ? 600 : 1300;
    const id = setTimeout(onComplete, t);
    return () => clearTimeout(id);
  }, [onComplete, prefersReducedMotion]);

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/40 pointer-events-auto" aria-hidden>
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="relative flex items-center justify-center rounded-full bg-[#0a0a0a]/95 border-2 border-[#ff1900] p-4 shadow-[0_0_48px_rgba(255,25,0,0.35)]"
      >
        <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-[#ff1900]" strokeWidth={2} />
      </motion.div>
      {!prefersReducedMotion &&
        list.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-sm"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: p.color,
              originX: "center",
              originY: "center",
            }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{ y: p.endY, opacity: 0, rotate: p.rotate }}
            transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
          />
        ))}
    </div>
  );
}

type CookieBannerProps = {
  lang: Lang;
  onAllowEssential: () => void;
  onAllowAll: () => void;
};

function CookieBanner({ lang, onAllowEssential, onAllowAll }: CookieBannerProps) {
  const c = TRANSLATIONS[lang].cookie;
  return (
    <div className="fixed inset-x-0 z-50 bottom-24 md:bottom-0">
      <div className="mx-4 mb-4 md:mx-auto md:mb-6 md:max-w-4xl rounded-2xl bg-[#050506]/95 border border-white/[0.12] shadow-2xl shadow-black/60 backdrop-blur-xl">
        <div className="px-4 py-4 md:px-6 md:py-5 flex flex-col gap-3 md:gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#ff1900]/20 border border-[#ff1900]/40">
              <Sparkles className="h-4 w-4 text-[#ff1900]" strokeWidth={2.2} />
            </div>
            <div className="flex-1">
              <h2 className="text-sm md:text-base font-semibold text-white mb-1">
                {c.title}
              </h2>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                {c.body}{" "}
                <Link href="/datenschutz" className="underline underline-offset-2 decoration-white/40 hover:text-white">
                  {c.privacyLink}
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onAllowEssential}
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/[0.02] px-3.5 py-3 text-xs md:text-sm font-semibold text-white/90 hover:bg-white/[0.08] hover:border-white/40 transition-all duration-200"
            >
              {c.essential}
            </button>
            <button
              type="button"
              onClick={onAllowAll}
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#ff1900] to-[#ff2d00] px-4 py-3 text-xs md:text-sm font-semibold text-white shadow-lg shadow-[#ff1900]/30 hover:from-[#e61700] hover:to-[#ff1900] hover:shadow-xl hover:shadow-[#ff1900]/40 transition-all duration-200"
            >
              {c.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
