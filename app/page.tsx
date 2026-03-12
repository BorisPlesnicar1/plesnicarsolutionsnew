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

/** Project data: add more entries to show more projects (images from public/recents/<folder>). */
type Project = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
  link?: string;
  linkLabel?: string;
};

const PROJECTS: Project[] = [
  {
    id: "skyline-ios",
    title: "Skyline Hub",
    subtitle: "iOS App",
    description: "Im Rahmen einer Diplomarbeit an der HTL Krems entstanden. Skyline ist eine moderne iOS-App zum Verwalten deiner Fluggeschichte: Flüge erfassen, interaktive Karten, Statistiken und Achievements, Dokumenten-Upload mit OCR. Mehr Infos auf skylinehub.vercel.app.",
    images: [
      "/recents/Skyline Hub - iOS App/6067ABD6-A209-46DE-A975-264F6D585441_1_105_c.jpeg",
      "/recents/Skyline Hub - iOS App/38FFC837-AA63-44CC-8594-7F7A360F27C0_1_105_c.jpeg",
      "/recents/Skyline Hub - iOS App/437294B1-AC8E-461F-8132-1E5D0787F05A_1_105_c.jpeg",
      "/recents/Skyline Hub - iOS App/4640FBCD-9468-4A03-9783-803649E98141_1_105_c.jpeg",
    ],
    link: "https://apps.apple.com/at/app/skyline-hub/id6758091952",
    linkLabel: "Im App Store öffnen",
  },
  {
    id: "skyline-website",
    title: "Skyline Hub",
    subtitle: "Website",
    description: "Im Rahmen einer Diplomarbeit an der HTL Krems entstanden. Die Website zu Skyline – Infos zur App, Features (Flug-Tracking, interaktive Karte, Statistiken, Dokumenten-Upload), Team und rechtliche Hinweise. Mehr Infos auf skylinehub.vercel.app.",
    images: [
      "/recents/Skyline Hub - Website/iScreen Shoter - 20260311173308125.jpg",
      "/recents/Skyline Hub - Website/iScreen Shoter - Safari - 260311173235.jpg",
      "/recents/Skyline Hub - Website/iScreen Shoter - Safari - 260311173333.jpg",
    ],
    link: "https://skylinehub.vercel.app",
    linkLabel: "skylinehub.vercel.app",
  },
  {
    id: "mrdaleje",
    title: "MrDaleJE",
    subtitle: "Twitch-Streamer Website",
    description: "Website für den Twitch-Streamer MrDaleJE – mit Parallax und On-Scroll-Effekten. Wichtig: Scroll-getriebene Parallax-Effekte und ein 3D-Objekt, das sich beim Scrollen bewegt. Großteils eine Test-Website zur Erprobung moderner Web-Animationen.",
    images: [
      "/recents/DAle/iScreen Shoter - 20260311173812422.jpg",
      "/recents/DAle/iScreen Shoter - Safari - 260311173738.jpg",
    ],
  },
];

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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectModalImageIndex, setProjectModalImageIndex] = useState(0);
  const [mobileContactBarCollapsed, setMobileContactBarCollapsed] = useState(false);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const wasWirAndersRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [wasWirAndersProgress, setWasWirAndersProgress] = useState(0);

  const SECTION_IDS = ["hero", "leistungen", "projekte", "ueber-uns", "team", "warum", "features", "prozess", "kontakt"] as const;

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
        Zum Inhalt springen
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

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 border-b border-white/[0.08] supports-[backdrop-filter]:backdrop-blur-xl backdrop-saturate-150">
        <nav className="container mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between max-w-[100vw]">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Nach oben scrollen"
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
              ["leistungen", "Leistungen"],
              ["projekte", "Projekte"],
              ["ueber-uns", "Über uns"],
              ["team", "Team"],
              ["warum", "Vorteile"],
              ["features", "Servicequalität"],
              ["prozess", "Arbeitsweise"],
            ] as const).map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                className={`min-h-[44px] px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center border-b-2 border-transparent ${activeSection === id ? "text-white border-[#ff1900]" : "text-white/80 hover:text-white hover:bg-white/5"}`}
              >
                {label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={(e) => { e.preventDefault(); scrollToSection("kontakt"); }}
              className={`ml-2 min-h-[44px] px-6 py-2.5 font-semibold rounded-xl transition-all duration-300 text-sm flex items-center shadow-lg ${activeSection === "kontakt" ? "bg-[#ff1900] text-white ring-2 ring-white/40 ring-offset-2 ring-offset-[#0a0a0a] shadow-[#ff1900]/30" : "bg-[#ff1900] hover:bg-[#e61700] text-white shadow-[#ff1900]/25 hover:shadow-xl hover:shadow-[#ff1900]/35 hover:-translate-y-0.5"}`}
            >
              Kontakt
            </a>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile / Tablet Menu (lg:hidden) */}
        {mobileMenuOpen && (
            <div className="lg:hidden bg-[#212121]/98 border-t border-white/5 supports-[backdrop-filter]:backdrop-blur-xl overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1 max-w-[100vw]">
              {([
                ["leistungen", "Leistungen"],
                ["projekte", "Projekte"],
                ["ueber-uns", "Über uns"],
                ["team", "Team"],
                ["warum", "Vorteile"],
                ["features", "Servicequalität"],
                ["prozess", "Arbeitsweise"],
              ] as const).map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                  className={`text-left text-sm font-medium transition-colors min-h-[44px] py-3 px-3 rounded-lg flex items-center ${activeSection === id ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"}`}
                >
                  {label}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={(e) => { e.preventDefault(); scrollToSection("kontakt"); }}
                className="text-left min-h-[44px] px-6 py-3 bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold rounded-lg transition-colors text-sm w-fit mt-2"
              >
                Kontakt
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

            {/* Left / Top: Text – Anime.js Animation */}
            <div
              ref={heroTextRef}
              className="text-center lg:text-left space-y-5 md:space-y-7 lg:pr-10 xl:pr-14 pb-8 md:pb-10 max-w-2xl overflow-visible [font-family:var(--font-syne)]"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold leading-[1.28] tracking-tight break-words pb-1">
                <span className="hero-line block">{heroChars("Moderne")}</span>
                <span className="hero-line block mt-1">{heroChars("Lösungen.")}</span>
                <span className="hero-line hero-line-gradient block mt-2">{heroChars("Zuverlässige")}</span>
                <span className="hero-line hero-line-gradient block mt-1">{heroChars("Umsetzung.")}</span>
              </h1>

              <p className="hero-animate text-base md:text-lg text-white/60 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
                IT-Beratung, Grafikdesign & digitale Lösungen sowie Bau und Hausbetreuung aus einer Hand.
                <span className="text-white font-medium"> Schnell, sauber, zuverlässig.</span>
              </p>

              <div className="hero-animate flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-1">
                <motion.a
                  href="#kontakt"
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); scrollToSection("kontakt"); }}
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
                  Angebot anfragen
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
                  Leistungen ansehen
                </motion.a>
              </div>
              <p className="hero-animate text-white/50 text-sm mt-2 text-center lg:text-left">
                Antwort innerhalb von 24 Stunden – auch am Wochenende.
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
                  <span className="text-[11px] text-white/80 font-bold">IT & Grafikdesign</span>
                </div>
                <span className="text-[10px] text-white/50 font-medium">PC-Bau · Webdesign · Branding</span>
              </div>

              {/* Pill: Bau & Handel – hinter dem Portrait (z < Bild), höher damit Text frei bleibt */}
              <div className="absolute bottom-[57%] md:bottom-[49%] left-[-5%] md:left-[-15%] z-0 hidden sm:flex flex-col px-4 py-3 bg-[#0a0a0a]/90 border border-white/[0.1] rounded-xl backdrop-blur-xl shadow-xl max-w-[200px] md:max-w-[220px]">
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className="w-4 h-4 shrink-0 text-[#ff1900]" strokeWidth={2.5} />
                  <span className="text-[11px] text-white/80 font-bold">Bau & Handel</span>
                </div>
                <span className="text-[10px] text-white/50 font-medium leading-snug">Einfache Reinigung · Objektbezogene Tätigkeiten · Hausbetreuung</span>
                <span className="text-[10px] text-white/50 font-medium leading-snug mt-0.5">Handel mit Baustoffen · Verkauf & Zubehör · Individuelle Lösungen · Beratung</span>
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
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Unser Ansatz</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
              Was wir <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">anders</span> machen
            </motion.h2>
            <motion.p variants={staggerItem} className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto">
              Individuelle Lösungen statt Massenware – maßgeschneidert für Ihr Projekt.
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
                  <p><span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">solution</span> = <span className="text-[#98c379]">&quot;maßgeschneidert&quot;</span>;</p>
                  <p><span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">qualität</span> = <span className="text-[#d19a66]">100</span>;</p>
                  <p><span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">branchen</span> = <span className="text-[#d19a66]">IT & Bau & Handel</span>;</p>

                  <p className="text-white/20">&#47;&#47; ...</p>
                  <p><span className="text-[#c678dd]">export</span> <span className="text-[#c678dd]">default</span> <span className="text-[#61afef]">function</span> <span className="text-[#e5c07b]">Build</span>() &#123;</p>
                  <p className="pl-4"><span className="text-[#c678dd]">return</span> &lt;<span className="text-[#e06c75]">Ergebnis</span> <span className="text-[#d19a66]">perfekt</span> /&gt;;</p>
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
              { icon: Zap, label: "Schnell", sub: "24h Reaktionszeit" },
              { icon: Sparkles, label: "Sauber", sub: "Höchste Qualität" },
              { icon: Rocket, label: "Modern", sub: "Aktuelle Technologien" }
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
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Was wir bieten</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Unsere <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Leistungen</span>
            </motion.h2>
          </motion.div>

          {/* Bento-Layout: IT groß, Rest kleiner */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                title: "IT / Automatische Datenverarbeitung",
                icon: Code2,
                items: [
                  "PC-Bau und Hardware-Konfiguration",
                  "Beratung, Einrichtung und Betreuung von Systemen",
                  "Digitale Lösungen und Automatisierungen",
                  "Laufender Support und Wartung"
                ],
                wide: true
              },
              {
                title: "Grafikdesign / Werbeagentur",
                icon: Palette,
                items: [
                  "Branding und Corporate Design",
                  "Social Media Content und Werbemittel",
                  "Professionelle Design-Lösungen",
                  "Logo-Design und Visuelle Identität"
                ],
                wide: false
              },
              {
                title: "Bau / Hausbetreuung",
                icon: Wrench,
                items: [
                  "Einfache Reinigungstätigkeiten",
                  "Objektbezogene einfache Tätigkeiten",
                  "Zuverlässige Hausbetreuung"
                ],
                wide: false
              },
              {
                title: "Handel",
                icon: ShoppingCart,
                items: [
                  "Verkauf passender Produkte und Zubehör",
                  "Individuelle Lösungen für Ihre Bedürfnisse",
                  "Kompetente Beratung beim Kauf"
                ],
                wide: false
              }
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

      {/* Projekte Section – horizontal scroll, beliebig erweiterbar */}
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
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Portfolio</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Ausgewählte <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Projekte</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="text-base text-white/50 font-light max-w-xl mx-auto mt-3">
              Qualität und Vielfalt – eine Auswahl unserer Arbeiten.
            </motion.p>
          </motion.div>

          {/* Horizontal scroll / Wisch-Carousel – Scroll oder Wischen auf der X-Achse */}
          <p className="text-center text-white/40 text-sm mb-4 md:mb-5">Scrollen oder wischen zum Durchblättern</p>
          <div className="relative -mx-4 sm:mx-0">
            <div
              ref={projectsScrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden pb-4 pt-1 px-4 sm:px-0 scroll-smooth snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
            >
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={motionViewport}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] snap-center first:snap-start last:snap-end"
                >
                  <button
                    type="button"
                    onClick={() => { setSelectedProject(project); setProjectModalImageIndex(0); }}
                    className="w-full text-left rounded-2xl border border-white/[0.1] bg-[#0a0a0a]/90 backdrop-blur-xl overflow-hidden shadow-xl hover:border-[#ff1900]/30 hover:shadow-[#ff1900]/10 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070709]"
                  >
                    <div className="relative aspect-[4/3] bg-white/[0.03] overflow-hidden">
                      <Image
                        src={project.images[0]}
                        alt={`${project.title}${project.subtitle ? ` – ${project.subtitle}` : ""} Projektvorschau`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 280px, 340px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute bottom-3 left-3 right-3 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Infos anzeigen
                      </span>
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="font-bold text-white text-lg group-hover:text-[#ff1900] transition-colors">
                        {project.title}
                        {project.subtitle && (
                          <span className="block text-sm font-medium text-white/60 mt-0.5">{project.subtitle}</span>
                        )}
                      </h3>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
            {/* Pfeile: vorheriges / nächstes Projekt (Desktop + Mobile als Option) */}
            {PROJECTS.length > 1 && (
              <div className="flex md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:right-0 md:pointer-events-none justify-center md:justify-between gap-3 mt-4 md:mt-0 md:px-0">
                <button
                  type="button"
                  onClick={() => projectsScrollRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
                  className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0a0a0a]/90 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-colors"
                  aria-label="Vorheriges Projekt"
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => projectsScrollRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
                  className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0a0a0a]/90 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-colors"
                  aria-label="Nächstes Projekt"
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
              <p className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold">Über uns</p>
              <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] text-white font-light leading-[1.35]">
                <span className="text-[#ff1900] font-bold">Plesnicar Solutions</span> ist ein österreichisches Unternehmen 
                mit Fokus auf zuverlässige Umsetzung, schnelle Kommunikation und saubere Ergebnisse – in IT und Bau.
              </h2>
              <div className="h-px w-20 bg-white/10" />
              <p className="text-base md:text-lg text-white/60 leading-relaxed font-light max-w-3xl">
                Als <span className="text-white font-medium">inhabergeführtes Unternehmen</span> bieten wir direkten, persönlichen Service ohne Umwege. 
                <span className="text-white font-medium">Boris Plesnicar</span> (Inhaber) deckt IT-Beratung, PC-Bau, digitale Lösungen und Grafikdesign ab. 
                Im Bereich Bau, Hausbetreuung und Handel unterstützt <span className="text-white font-medium">Ing. Dietmar Plesnicar</span> – Bauingenieur 
                mit über <span className="text-[#ff1900] font-medium">40 Jahren Erfahrung im Bauwesen</span>. 
                IT und Bau aus einer Hand, <span className="text-white font-medium">regional in Österreich</span> und mit Remote-IT-Möglichkeiten.
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
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Das Team</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Ihre <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Ansprechpartner</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                name: "Boris Plesnicar",
                role: "IT-Spezialist & Grafikdesign",
                education: "HTL Krems IT, Freelancer",
                image: "/portraits/boris.jpg",
                isOwner: true,
                expertise: ["PC-Bau", "Grafikdesign", "Webdesign", "IT-Support", "Handwerk"],
                phone: "+43 664 467 8382",
                phoneHref: "tel:+436644678382",
                sigImg: "/signatures/signatureboris.png",
                sigAlt: "Unterschrift von Boris Plesnicar",
                sigLabel: "Boris Plesnicar · Inhaber"
              },
              {
                name: "Ing. Dietmar Plesnicar",
                role: "Bau-Beratung & Handel",
                education: "Ingenieur · 40+ Jahre Erfahrung",
                image: "/portraits/dietmar.png",
                isOwner: false,
                expertise: ["Bauwesen", "Projektplanung", "Hausbetreuung", "Handel", "Beratung"],
                phone: "+43 676 320 6308",
                phoneHref: "tel:+436763206308",
                sigImg: "/signatures/signaturedietmar.png",
                sigAlt: "Unterschrift von Ing. Dietmar Plesnicar",
                sigLabel: "Ing. Dietmar Plesnicar · Unterstützung"
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
                        <span className="px-2 py-0.5 bg-[#ff1900] text-white text-[10px] font-bold rounded uppercase tracking-wider">Inhaber</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-white/[0.06] text-white/45 text-[10px] font-semibold rounded uppercase tracking-wider">Unterstützung</span>
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
                      Festnetz 02734/32048
                    </a>
                    <a href="mailto:plesnicaroffice@gmail.com" className="inline-flex items-center justify-center gap-2 min-w-[120px] px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] text-white font-medium text-sm transition-colors whitespace-nowrap shrink-0">
                      <Mail className="w-3.5 h-3.5 shrink-0 text-[#ff1900]" strokeWidth={2} />
                      E-Mail
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
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Warum wir</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Unsere <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Vorteile</span>
            </motion.h2>
          </motion.div>

          {/* Bento: 2 breite + 2 schmale */}
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {[
              { icon: Zap, title: "Schnell", desc: "Rasche Reaktionszeiten und zügige Umsetzung – ob IT-Systeme oder Bau-Aufgaben.", wide: true },
              { icon: Sparkles, title: "Sauber", desc: "Präzise Arbeit und hochwertige Ergebnisse in IT, Design und Hausbetreuung.", wide: false },
              { icon: User, title: "Direkt", desc: "Ein Ansprechpartner für IT und Bau – kurze Wege, persönlicher Service.", wide: false },
              { icon: Rocket, title: "Modern", desc: "Aktuelle Technologien für IT und zeitgemäße Lösungen für Bau.", wide: true }
            ].map((benefit, i) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={motionViewport}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`group flex items-start gap-5 rounded-2xl border bg-[#0a0a0a]/90 border-white/[0.1] backdrop-blur-xl shadow-xl transition-all duration-500 md:hover:border-white/[0.2] md:hover:shadow-lg md:hover:shadow-[#ff1900]/10 ${benefit.wide ? 'md:col-span-2 p-7 md:p-8' : 'p-6 md:p-7'} ${i % 2 === 0 ? 'scroll-in-left' : 'scroll-in-right'}`}
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
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Qualität</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Unsere <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Servicequalität</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[
              { icon: Clock, title: "Schnelle Reaktionszeiten", desc: "Kontaktaufnahme innerhalb von 24 Stunden. Zügige Projektumsetzung.", highlight: true },
              { icon: CheckCircle2, title: "Qualitätssicherung", desc: "Hochwertige Ergebnisse nach etablierten Standards.", highlight: false },
              { icon: TrendingUp, title: "Moderne Lösungsansätze", desc: "Aktuelle Technologien und bewährte Methoden.", highlight: false },
              { icon: Users, title: "Persönliche Betreuung", desc: "Direkter Ansprechpartner – IT und Bau aus einer Hand.", highlight: false },
              { icon: BarChart3, title: "Transparente Kommunikation", desc: "Klare Absprachen und regelmäßige Statusupdates.", highlight: false },
              { icon: Award, title: "Erfahrung & Kompetenz", desc: "Langjährige Expertise für zuverlässige Ergebnisse.", highlight: true }
            ].map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={motionViewport}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`group relative p-6 md:p-7 rounded-2xl border bg-[#0a0a0a]/90 border-white/[0.1] backdrop-blur-xl shadow-xl transition-all duration-500 md:hover:shadow-lg md:hover:shadow-[#ff1900]/8 ${
                    feature.highlight
                      ? 'border-[#ff1900]/20 md:hover:border-[#ff1900]/35'
                      : 'md:hover:border-white/[0.2]'
                  }`}
                >
                  {feature.highlight && <div className="absolute top-0 left-6 w-10 h-0.5 bg-gradient-to-r from-[#ff1900] to-transparent rounded-full" />}
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
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">So arbeiten wir</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Unsere <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Arbeitsweise</span>
            </motion.h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertikale Linie (nur md+) */}
            <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff1900]/40 via-white/10 to-transparent" />

            <div className="space-y-6 md:space-y-0">
              {[
                { step: "01", title: "Kontakt", desc: "Sie nehmen Kontakt auf und beschreiben Ihr Anliegen – ob IT oder Bau." },
                { step: "02", title: "Beratung", desc: "Wir analysieren Ihre Anforderungen und erstellen ein individuelles Angebot." },
                { step: "03", title: "Umsetzung", desc: "Professionelle Ausführung: IT-Lösungen mit Updates oder Bau/Hausbetreuung mit Terminabsprache." },
                { step: "04", title: "Betreuung", desc: "Laufende Betreuung: IT-Support oder regelmäßige Bau/Hausbetreuung nach Bedarf." }
              ].map((process, i) => (
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
                    <span className="text-xs font-black text-[#ff1900]">{process.step}</span>
                  </div>
                  <div className="flex-1 p-6 md:p-7 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl transition-all duration-500 md:hover:border-white/[0.2] md:hover:-translate-y-1 md:hover:shadow-lg md:hover:shadow-[#ff1900]/8">
                    <div className="flex items-center gap-3 mb-2 md:hidden">
                      <span className="text-xs font-black text-[#ff1900] px-2 py-0.5 rounded-full border border-[#ff1900]/30 bg-[#ff1900]/10">{process.step}</span>
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
            <motion.p variants={staggerItem} className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Kontakt</motion.p>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
              Sprechen wir <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">darüber</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="text-white/50 font-light text-sm md:text-base max-w-lg mx-auto">
              Erzählen Sie uns von Ihrem Projekt – wir antworten innerhalb von 24 Stunden. Dringend? Einfach anrufen.
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
                <p className="text-white font-bold text-base mb-1">Boris Plesnicar</p>
                <p className="text-white/55 text-sm mb-4">IT & Grafikdesign</p>
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
                    Festnetz 02734/32048
                  </a>
                  <a
                    href="mailto:plesnicaroffice@gmail.com"
                    title="plesnicaroffice@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                    E-Mail
                  </a>
                </div>
              </div>
              <div className="p-5 md:p-6 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl hover:border-white/[0.18] transition-all duration-300">
                <p className="text-white font-bold text-base mb-1">Ing. Dietmar Plesnicar</p>
                <p className="text-white/55 text-sm mb-4">Bau & Hausbetreuung</p>
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
                    Festnetz 02734/32048
                  </a>
                  <a
                    href="mailto:plesnicaroffice@gmail.com"
                    title="plesnicaroffice@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                    E-Mail
                  </a>
                </div>
              </div>
            </div>

            {/* Standort + Adresse + Instagram kompakt */}
            <div className="space-y-4">
              <div className="p-5 md:p-6 rounded-2xl bg-[#0a0a0a]/90 border border-white/[0.1] backdrop-blur-xl shadow-xl border-[#ff1900]/15">
                <h3 className="text-white font-bold text-base mb-3">Standort</h3>
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
                        Karte laden wir erst nach Ihrer Cookie-Einwilligung. Details in der Datenschutzerklärung.
                      </p>
                      <button
                        type="button"
                        onClick={() => updateConsent(true)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ff1900] hover:bg-[#e61700] text-white text-sm font-semibold transition-colors"
                      >
                        Cookies akzeptieren
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-white/65 font-light text-sm mt-3">Hartriegelstraße 12, 3550 Langenlois</p>
                <p className="text-white/50 text-xs mt-0.5">Boris Plesnicar e.U. · IT auch remote</p>
                <p className="text-white/65 font-light text-sm mt-3">
                  <strong className="text-white font-semibold">Festnetz:</strong>{" "}
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
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              <h2 id="project-modal-title" className="text-2xl md:text-3xl font-bold text-white pr-12">
                {selectedProject.title}
                {selectedProject.subtitle && (
                  <span className="block text-lg font-medium text-white/60 mt-1">{selectedProject.subtitle}</span>
                )}
              </h2>

              {/* Bildergalerie im Modal */}
              <div className="mt-6 rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.08]">
                <div className="relative aspect-video">
                  <Image
                    src={selectedProject.images[projectModalImageIndex]}
                    alt={`${selectedProject.title} – Bild ${projectModalImageIndex + 1}`}
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
                          projectModalImageIndex === idx ? "border-[#ff1900] ring-2 ring-[#ff1900]/30" : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        <Image src={img} alt="" width={56} height={56} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="mt-6 text-white/70 leading-relaxed text-sm md:text-base">
                {selectedProject.description}
              </p>

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold text-sm transition-colors"
                >
                  {selectedProject.linkLabel ?? "Mehr erfahren"}
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
              <p className="font-light text-sm text-white/50">© {new Date().getFullYear()} Plesnicar Solutions. Alle Rechte vorbehalten.</p>
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
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm">
                Datenschutz
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
          aria-label="Nach oben scrollen"
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

      {/* Mobile bottom contact bar – ein Kasten, einklappbar für Impressum/Datenschutz */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden pointer-events-none">
        <div className="mx-3 sm:mx-4 mb-3 sm:mb-4 pointer-events-auto flex justify-center">
          <div className="w-full max-w-lg rounded-2xl bg-[#0f0f0f]/98 border border-white/[0.12] shadow-xl shadow-black/50 overflow-hidden">
            {mobileContactBarCollapsed ? (
              <button
                type="button"
                onClick={() => setMobileContactBarCollapsed(false)}
                className="w-full min-h-[48px] flex items-center justify-center gap-2.5 py-3 px-4 text-white text-sm font-semibold"
                aria-expanded="false"
                aria-label="Kontaktleiste einblenden"
              >
                <Phone className="w-5 h-5 shrink-0 text-[#ff1900]" strokeWidth={2} />
                <span>Kontakt anzeigen</span>
                <ChevronUp className="w-4 h-4 shrink-0 text-white/50" />
              </button>
            ) : (
              <div className="flex flex-wrap items-stretch gap-0">
                <a
                  href="tel:+43273432048"
                  className="flex-1 min-w-0 min-h-[48px] inline-flex items-center justify-center gap-2 rounded-none py-3 px-3 text-center bg-[#ff1900] hover:bg-[#e61700] active:bg-[#cc1500] text-white text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" strokeWidth={2} />
                  <span className="truncate">Festnetz</span>
                </a>
                <a
                  href="tel:+436644678382"
                  className="flex-1 min-w-0 min-h-[48px] inline-flex items-center justify-center gap-2 rounded-none py-3 px-3 text-center bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.08] text-white text-sm font-semibold border-l border-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" strokeWidth={2} />
                  <span className="truncate">IT & Grafik</span>
                </a>
                <a
                  href="tel:+436763206308"
                  className="flex-1 min-w-0 min-h-[48px] inline-flex items-center justify-center gap-2 rounded-none py-3 px-3 text-center bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.08] text-white text-sm font-semibold border-l border-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" strokeWidth={2} />
                  <span className="truncate">Bau & Hausbetreuung</span>
                </a>
                <a
                  href="mailto:plesnicaroffice@gmail.com"
                  className="flex-none w-12 min-h-[48px] inline-flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.08] text-white border-l border-white/10 transition-colors"
                  aria-label="E-Mail"
                >
                  <Mail className="w-5 h-5" strokeWidth={2} />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileContactBarCollapsed(true)}
                  className="flex-none w-12 min-h-[48px] inline-flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.06] text-white/70 hover:text-white border-l border-white/10 transition-colors"
                  aria-label="Einklappen – Impressum & Datenschutz erreichbar"
                  title="Einklappen"
                >
                  <ChevronDown className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cookie Banner (desktop & mobile) */}
      {showCookieBanner && (
        <CookieBanner
          onAllowEssential={() => updateConsent(false)}
          onAllowAll={() => updateConsent(true)}
        />
      )}
    </div>
  );
}

type CookieBannerProps = {
  onAllowEssential: () => void;
  onAllowAll: () => void;
};

function CookieBanner({ onAllowEssential, onAllowAll }: CookieBannerProps) {
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
                Datenschutzeinstellungen
              </h2>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                Wir verwenden Cookies und ähnliche Technologien. Einige sind technisch erforderlich, um diese Website
                sicher und zuverlässig zu betreiben (z.&nbsp;B. für grundlegende Funktionen und Sicherheit). Zusätzlich
                können Sie optionale Komfort-Cookies für eingebettete Inhalte wie Google Maps aktivieren. Dabei können
                personenbezogene Daten (z.&nbsp;B. Ihre IP-Adresse) an Drittanbieter innerhalb der EU und ggf. in
                Drittländer übermittelt werden. Sie können nur notwendige Cookies zulassen oder alle Cookies
                akzeptieren. Ausführliche Informationen finden Sie in unserer{" "}
                <Link href="/datenschutz" className="underline underline-offset-2 decoration-white/40 hover:text-white">
                  Datenschutzerklärung
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
              Nur notwendige Cookies
            </button>
            <button
              type="button"
              onClick={onAllowAll}
              className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#ff1900] to-[#ff2d00] px-4 py-3 text-xs md:text-sm font-semibold text-white shadow-lg shadow-[#ff1900]/30 hover:from-[#e61700] hover:to-[#ff1900] hover:shadow-xl hover:shadow-[#ff1900]/40 transition-all duration-200"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
