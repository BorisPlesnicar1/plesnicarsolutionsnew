"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
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
  TrendingUp,
  Clock,
  Award,
  Users,
  BarChart3,
  Phone,
  Instagram,
  Monitor
} from "lucide-react";

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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const heroTextRef = useRef<HTMLDivElement>(null);

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
    const runHeroAnimation = () => {
      const el = heroTextRef.current;
      if (!el) return;

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
        complete: () => {
          // Fallback: alles sichtbar, falls Anime.js einzelne Ziele verpasst (z. B. Safari)
          allChars.forEach((node) => {
            (node as HTMLElement).style.opacity = "1";
            (node as HTMLElement).style.transform = "none";
          });
          allAnimate.forEach((node) => {
            (node as HTMLElement).style.opacity = "1";
            (node as HTMLElement).style.transform = "none";
          });
        },
      });

      // Headline: Buchstaben nacheinander „springen“ (pro Zeile)
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

      // Absatz: weicher Fade + Slide
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

      // CTA-Buttons
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;
    const targets = document.querySelectorAll(".scroll-in-left, .scroll-in-right");
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

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
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white relative overflow-x-hidden max-w-[100vw]">
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 blur-bg" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff1900]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ff1900]/3 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 border-b border-white/[0.08] supports-[backdrop-filter]:backdrop-blur-xl backdrop-saturate-150">
        <nav className="container mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between max-w-[100vw]">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Image
            src="/logos/LogoTEXTB.png"
            alt="Plesnicar Solutions Logo"
            width={200}
            height={60}
            className="h-12 sm:h-14 md:h-16 w-auto max-w-[180px] sm:max-w-none"
            priority
            unoptimized
        />
          </div>
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => scrollToSection("leistungen")}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Leistungen
            </button>
            <button
              onClick={() => scrollToSection("ueber-uns")}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Über uns
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("warum")}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Vorteile
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Servicequalität
            </button>
            <button
              onClick={() => scrollToSection("prozess")}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Arbeitsweise
            </button>
            <button
              onClick={() => scrollToSection("kontakt")}
              className="ml-2 px-6 py-2.5 bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold rounded-xl transition-all duration-300 text-sm shadow-lg shadow-[#ff1900]/25 hover:shadow-xl hover:shadow-[#ff1900]/35 hover:-translate-y-0.5"
            >
              Kontakt
            </button>
          </div>
          <div className="hidden md:flex lg:hidden items-center gap-1">
            <button
              onClick={() => scrollToSection("leistungen")}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Leistungen
            </button>
            <button
              onClick={() => scrollToSection("kontakt")}
              className="ml-2 px-6 py-2.5 bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold rounded-xl transition-all duration-300 text-sm shadow-lg shadow-[#ff1900]/25 hover:shadow-xl hover:shadow-[#ff1900]/35 hover:-translate-y-0.5"
            >
              Kontakt
            </button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white transition-colors p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <div className="md:hidden bg-[#212121]/98 border-t border-white/5 supports-[backdrop-filter]:backdrop-blur-xl overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3 max-w-[100vw]">
              <button
                onClick={() => scrollToSection("leistungen")}
                className="text-left text-sm font-medium text-white/80 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-white/5"
              >
                Leistungen
              </button>
              <button
                onClick={() => scrollToSection("ueber-uns")}
                className="text-left text-sm font-medium text-white/80 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-white/5"
              >
                Über uns
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="text-left text-sm font-medium text-white/80 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-white/5"
              >
                Team
              </button>
              <button
                onClick={() => scrollToSection("warum")}
                className="text-left text-sm font-medium text-white/80 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-white/5"
              >
                Vorteile
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-left text-sm font-medium text-white/80 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-white/5"
              >
                Servicequalität
              </button>
              <button
                onClick={() => scrollToSection("prozess")}
                className="text-left text-sm font-medium text-white/80 hover:text-white transition-colors py-2 px-2 rounded-lg hover:bg-white/5"
              >
                Arbeitsweise
              </button>
              <button
                onClick={() => scrollToSection("kontakt")}
                className="text-left px-6 py-2.5 bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold rounded-lg transition-colors text-sm w-fit mt-2"
              >
                Kontakt
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section – Mobile: kompakter Stack; Desktop: wie bisher */}
      <section id="hero" className="relative overflow-visible pt-20 pb-10 md:pt-28 md:pb-16 px-4 sm:px-6 min-h-0 md:min-h-[100vh] flex items-center">
        {/* Deep dark base */}
        <div className="absolute inset-0 z-0 bg-[#070709]" />

        {/* Gradient mesh */}
        <div className="hero-orb-1 absolute top-[5%] left-[15%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-[#ff1900]/[0.07] rounded-full blur-[140px] md:blur-[220px] z-0" />
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
                IT-Beratung, PC-Bau & digitale Lösungen sowie Bau/Hausbetreuung aus einer Hand.
                <span className="text-white font-medium"> Schnell, sauber, zuverlässig.</span>
              </p>

              <div className="hero-animate flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-1">
                <button
                  onClick={() => scrollToSection("kontakt")}
                  className="group px-10 py-4 bg-gradient-to-r from-[#ff1900] to-[#ff2d00] hover:from-[#e61700] hover:to-[#ff1900] text-white text-base font-bold rounded-2xl transition-all duration-300 shadow-2xl shadow-[#ff1900]/30 hover:shadow-[#ff1900]/50 flex items-center justify-center gap-2.5 hover:-translate-y-1 hover:scale-[1.02]"
                >
                  Angebot anfragen
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => scrollToSection("leistungen")}
                  className="px-10 py-4 bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.2] text-white text-base font-semibold rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] backdrop-blur-sm"
                >
                  Leistungen ansehen
                </button>
              </div>
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

              {/* Floating badge */}
              <div className="absolute top-[15%] md:top-[12%] right-[0%] md:right-[-5%] z-20 hidden sm:flex items-center gap-2.5 px-4 py-2.5 bg-[#0a0a0a]/90 border border-white/[0.1] rounded-xl backdrop-blur-xl shadow-xl">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-white/80 font-semibold whitespace-nowrap">Verfügbar für Projekte</span>
              </div>

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

              {/* Bild: Mobile kompakter, kein min-height; ab md wie bisher */}
              <div className="relative z-10 w-[min(100%,300px)] sm:w-[340px] md:w-[450px] lg:w-[500px] xl:w-[560px] min-h-0 md:min-h-[70vh] flex items-center justify-center lg:justify-end">
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

      {/* Leistungen Section */}
      <section id="leistungen" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden">
        {/* Dezente geometrische Deko */}
        <div className="hidden md:block absolute top-24 left-[-80px] w-[260px] h-[260px] rounded-full border border-white/[0.04] pointer-events-none" />
        <div className="hidden md:block absolute bottom-16 right-[-60px] w-[180px] h-[180px] rounded-full border border-[#ff1900]/[0.08] pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Was wir bieten</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Unsere <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Leistungen</span>
            </h2>
          </div>

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
                <div 
                  key={i}
                  className={`group relative rounded-2xl border transition-all duration-500 supports-[backdrop-filter]:backdrop-blur-xl ${
                    service.wide
                      ? 'lg:col-span-2 p-8 md:p-10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-[#ff1900]/20 md:hover:border-[#ff1900]/40'
                      : 'p-7 md:p-8 bg-white/[0.02] border-white/[0.06] md:hover:border-white/[0.15]'
                  } md:hover:bg-white/[0.05] md:hover:-translate-y-1 md:hover:shadow-xl md:hover:shadow-[#ff1900]/10 ${i % 2 === 0 ? 'scroll-in-left' : 'scroll-in-right'}`}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Über uns Section */}
      <section id="ueber-uns" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="md:flex md:gap-12 lg:gap-16 items-start">
            {/* Akzentlinie links (nur Desktop) */}
            <div className="hidden md:block flex-shrink-0 w-px self-stretch bg-gradient-to-b from-[#ff1900] via-[#ff1900]/40 to-transparent" />

            <div className="space-y-10">
              <p className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold">Über uns</p>
              <p className="text-2xl md:text-3xl lg:text-[2.5rem] text-white font-light leading-[1.35]">
                <span className="text-[#ff1900] font-bold">Plesnicar Solutions</span> ist ein österreichisches Unternehmen 
                mit Fokus auf zuverlässige Umsetzung, schnelle Kommunikation und saubere Ergebnisse.
              </p>
              <div className="h-px w-20 bg-white/10" />
              <p className="text-base md:text-lg text-white/60 leading-relaxed font-light max-w-3xl">
                Als <span className="text-white font-medium">Kleinunternehmer</span> bieten wir direkten, persönlichen Service ohne Umwege. 
                Unser Team besteht aus zwei Experten: einem IT-Spezialisten für PC-Bau, digitale Lösungen und Grafikdesign sowie einem 
                Bauingenieur mit 40+ Jahren Bau-Erfahrung. Unser Angebot umfasst IT-Beratung, PC-Bau, digitale Lösungen, 
                Grafikdesign, Bau/Hausbetreuung sowie Handel – alles aus einer Hand, <span className="text-[#ff1900] font-medium">regional in Österreich</span> und mit Remote-IT-Möglichkeiten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14 md:mb-18">
            <p className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Das Team</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Ihre <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Ansprechpartner</span>
            </h2>
          </div>

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
              <div
                key={i}
                className={`relative rounded-2xl border transition-all duration-500 ${
                  person.isOwner 
                    ? 'p-7 md:p-9 bg-gradient-to-br from-white/[0.03] to-[#ff1900]/[0.04] border-[#ff1900]/25 md:hover:border-[#ff1900]/45 md:-translate-y-1' 
                    : 'p-7 md:p-9 bg-white/[0.02] border-white/[0.06] md:hover:border-white/[0.12] md:translate-y-4'
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
                      {person.isOwner && (
                        <span className="px-2 py-0.5 bg-[#ff1900] text-white text-[10px] font-bold rounded uppercase tracking-wider">Inhaber</span>
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

                {/* Signatur + Kontakt */}
                <div className="flex items-end justify-between pt-4 border-t border-white/[0.06]">
                  <div className="space-y-2">
                    <a href={person.phoneHref} className="flex items-center gap-2.5 text-white/70 hover:text-[#ff1900] transition-colors text-sm">
                      <Phone className="w-3.5 h-3.5 text-[#ff1900]" strokeWidth={2} />
                      <span className="font-light">{person.phone}</span>
                    </a>
                    <a href="mailto:plesnicaroffice@gmail.com" className="flex items-center gap-2.5 text-white/70 hover:text-[#ff1900] transition-colors text-sm">
                      <Mail className="w-3.5 h-3.5 text-[#ff1900]" strokeWidth={2} />
                      <span className="font-light">E-Mail</span>
                    </a>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="block brightness-0 invert" aria-hidden="true">
                      <Image src={person.sigImg} alt={person.sigAlt} width={120} height={40} className="h-5 w-auto opacity-80" loading="lazy" />
                    </span>
                    <p className="text-[8px] text-white/40 tracking-[0.15em] uppercase">{person.sigLabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unsere Vorteile Section – Bento */}
      <section id="warum" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14 md:mb-18">
            <p className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Warum wir</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Unsere <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Vorteile</span>
            </h2>
          </div>

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
                <div 
                  key={i}
                  className={`group flex items-start gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 md:hover:border-white/[0.14] md:hover:bg-white/[0.04] md:hover:-translate-y-1 md:hover:shadow-lg md:hover:shadow-[#ff1900]/10 ${benefit.wide ? 'md:col-span-2 p-7 md:p-8' : 'p-6 md:p-7'} ${i % 2 === 0 ? 'scroll-in-left' : 'scroll-in-right'}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#ff1900]/10 border border-[#ff1900]/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-400">
                    <IconComponent className="w-6 h-6 text-[#ff1900]" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">{benefit.title}</h3>
                    <p className="text-white/60 font-light leading-relaxed text-sm">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Servicequalität Section */}
      <section id="features" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14 md:mb-18">
            <p className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Qualität</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Unsere <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Servicequalität</span>
            </h2>
          </div>

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
                <div
                  key={i}
                  className={`group relative p-6 md:p-7 rounded-2xl border transition-all duration-500 md:hover:-translate-y-1 md:hover:shadow-lg md:hover:shadow-[#ff1900]/8 ${
                    feature.highlight
                      ? 'bg-gradient-to-br from-white/[0.04] to-[#ff1900]/[0.03] border-[#ff1900]/20 md:hover:border-[#ff1900]/35'
                      : 'bg-white/[0.02] border-white/[0.06] md:hover:border-white/[0.12]'
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Arbeitsweise Section – Timeline */}
      <section id="prozess" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14 md:mb-18">
            <p className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">So arbeiten wir</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Unsere <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Arbeitsweise</span>
            </h2>
          </div>

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
                <div
                  key={i}
                  className="scroll-in-right relative md:flex items-start gap-8 md:py-8"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Nummer-Dot */}
                  <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-[#090a11] border-2 border-[#ff1900]/40 items-center justify-center z-10">
                    <span className="text-xs font-black text-[#ff1900]">{process.step}</span>
                  </div>
                  <div className="flex-1 p-6 md:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] transition-all duration-500 md:hover:border-white/[0.12] md:hover:bg-white/[0.04] md:hover:-translate-y-1 md:hover:shadow-lg md:hover:shadow-[#ff1900]/8">
                    <div className="flex items-center gap-3 mb-2 md:hidden">
                      <span className="text-xs font-black text-[#ff1900] px-2 py-0.5 rounded-full border border-[#ff1900]/30 bg-[#ff1900]/10">{process.step}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{process.title}</h3>
                    <p className="text-white/55 font-light leading-relaxed text-sm">{process.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-[#ff1900] font-semibold mb-4">Kontakt</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
              Sprechen wir <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">darüber</span>
            </h2>
            <p className="text-white/50 font-light text-sm md:text-base max-w-lg mx-auto">
              Antwort innerhalb von 24 Stunden. Dringend? Einfach anrufen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Ansprechpartner – einheitliches Karten-Design */}
            <div className="space-y-4">
              <div className="p-5 md:p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300">
                <p className="text-white font-bold text-base mb-1">Boris Plesnicar</p>
                <p className="text-white/55 text-sm mb-4">IT & Grafikdesign</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+436644678382"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" strokeWidth={2.5} />
                    +43 664 4678382
                  </a>
                  <a
                    href="mailto:plesnicaroffice@gmail.com"
                    title="plesnicaroffice@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                    E-Mail
                  </a>
                </div>
              </div>
              <div className="p-5 md:p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300">
                <p className="text-white font-bold text-base mb-1">Ing. Dietmar Plesnicar</p>
                <p className="text-white/55 text-sm mb-4">Bau & Hausbetreuung</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+436763206308"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" strokeWidth={2.5} />
                    +43 676 3206308
                  </a>
                  <a
                    href="mailto:plesnicaroffice@gmail.com"
                    title="plesnicaroffice@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                    E-Mail
                  </a>
                </div>
              </div>
            </div>

            {/* Standort + Adresse + Instagram kompakt */}
            <div className="space-y-4">
              <div className="p-5 md:p-6 bg-gradient-to-br from-white/[0.03] to-[#ff1900]/[0.02] border border-[#ff1900]/15 rounded-2xl">
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
              </div>
              <a
                href="https://www.instagram.com/plesnicarsolutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ff1900]/20 border border-[#ff1900]/30 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-[#ff1900]" strokeWidth={2} />
                </div>
                <span className="font-semibold text-white text-sm">@plesnicarsolutions</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 px-4 sm:px-6 border-t border-white/[0.08] bg-[#0a0a0a]/50 backdrop-blur-sm overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
              <p className="font-light text-sm text-white/60">© {new Date().getFullYear()} Plesnicar Solutions. Alle Rechte vorbehalten.</p>
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

      {/* Mobile bottom contact bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden pointer-events-none">
        <div className="mx-4 mb-4 rounded-xl bg-[#111111]/95 border border-white/10 shadow-lg shadow-black/40 flex gap-3 p-3 pointer-events-auto">
          <a
            href="tel:+436644678382"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff1900] hover:bg-[#e61700] text-white text-sm font-semibold py-2 transition-colors"
          >
            <Phone className="w-4 h-4" strokeWidth={2} />
            <span className="truncate">IT & Grafik</span>
          </a>
          <a
            href="tel:+436763206308"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold py-2 border border-white/15 transition-colors"
          >
            <Phone className="w-4 h-4" strokeWidth={2} />
            <span className="truncate">Bau & Hausbetreuung</span>
          </a>
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
    <div className="fixed inset-x-0 bottom-0 z-50">
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
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/[0.02] px-3.5 py-2 text-xs md:text-sm font-semibold text-white/90 hover:bg-white/[0.08] hover:border-white/40 transition-all duration-200"
            >
              Nur notwendige Cookies
            </button>
            <button
              type="button"
              onClick={onAllowAll}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#ff1900] to-[#ff2d00] px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-lg shadow-[#ff1900]/30 hover:from-[#e61700] hover:to-[#ff1900] hover:shadow-xl hover:shadow-[#ff1900]/40 transition-all duration-200"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
