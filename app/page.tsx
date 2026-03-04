"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

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

            {/* Left / Top: Text – mehr Höhe/Abstand, Container nicht zu eng */}
            <div className="text-center lg:text-left space-y-5 md:space-y-7 lg:pr-10 xl:pr-14 pb-8 md:pb-10 max-w-2xl overflow-visible [font-family:var(--font-syne)]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold leading-[1.28] tracking-tight break-words pb-1">
                <span className="hero-text-slide-in hero-text-slide-in-delay-1 block">Moderne</span>
                <span className="hero-text-slide-in hero-text-slide-in-delay-1 block mt-1">Lösungen.</span>
                <span className="hero-text-slide-in hero-text-slide-in-delay-2 block mt-2 bg-gradient-to-r from-[#ff1900] via-[#ff2d00] to-[#ff4d3a] bg-clip-text text-transparent">Zuverlässige</span>
                <span className="hero-text-slide-in hero-text-slide-in-delay-2 block mt-1 bg-gradient-to-r from-[#ff1900] via-[#ff2d00] to-[#ff4d3a] bg-clip-text text-transparent">Umsetzung.</span>
              </h1>

              <p className="hero-text-slide-in hero-text-slide-in-delay-3 text-base md:text-lg text-white/60 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
                IT-Beratung, PC-Bau & digitale Lösungen sowie Bau/Hausbetreuung aus einer Hand.
                <span className="text-white font-medium"> Schnell, sauber, zuverlässig.</span>
              </p>

              <div className="hero-text-slide-in hero-text-slide-in-delay-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-1">
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
      <section id="leistungen" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative border-t border-white/5">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Unsere <span className="text-[#ff1900] bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Leistungen</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/65 max-w-2xl mx-auto font-light leading-relaxed">
              Vier Kernbereiche für Ihre individuellen Anforderungen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "IT / Automatische Datenverarbeitung",
                icon: Code2,
                items: [
                  "PC-Bau und Hardware-Konfiguration",
                  "Beratung, Einrichtung und Betreuung von Systemen",
                  "Digitale Lösungen und Automatisierungen",
                  "Laufender Support und Wartung"
                ]
              },
              {
                title: "Grafikdesign / Werbeagentur",
                icon: Palette,
                items: [
                  "Branding und Corporate Design",
                  "Social Media Content und Werbemittel",
                  "Professionelle Design-Lösungen",
                  "Logo-Design und Visuelle Identität"
                ]
              },
              {
                title: "Bau / Hausbetreuung",
                icon: Wrench,
                items: [
                  "Einfache Reinigungstätigkeiten",
                  "Objektbezogene einfache Tätigkeiten",
                  "Zuverlässige Hausbetreuung"
                ]
              },
              {
                title: "Handel",
                icon: ShoppingCart,
                items: [
                  "Verkauf passender Produkte und Zubehör",
                  "Individuelle Lösungen für Ihre Bedürfnisse",
                  "Kompetente Beratung beim Kauf"
                ]
              }
            ].map((service, i) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={i}
                  className="group relative p-8 sm:p-10 lg:p-12 bg-white/[0.02] border border-white/[0.06] rounded-3xl md:hover:border-white/[0.15] md:hover:bg-white/[0.04] md:hover:-translate-y-2 md:hover:shadow-2xl md:hover:shadow-[#ff1900]/15 transition-all duration-500 supports-[backdrop-filter]:backdrop-blur-xl"
                >
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff1900]/20 to-[#ff1900]/10 border border-[#ff1900]/20 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#ff1900]/30 group-hover:to-[#ff1900]/20 group-hover:border-[#ff1900]/30 transition-all duration-500 group-hover:scale-110">
                      <IconComponent className="w-8 h-8 text-[#ff1900]" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white group-hover:text-[#ff1900] transition-colors duration-500">
                        {service.title}
                      </h3>
                      <ul className="space-y-5">
                        {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4 text-white/75 group-hover:text-white/95 transition-colors duration-500">
                            <span className="text-[#ff1900] mt-2 font-bold text-lg">•</span>
                            <span className="font-light leading-relaxed text-base">{item}</span>
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
      <section id="ueber-uns" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white/[0.02] relative border-t border-white/5">
        <div className="container mx-auto max-w-5xl relative z-10 overflow-hidden">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-16 tracking-tight">
              Über <span className="text-[#ff1900] bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">uns</span>
            </h2>
            
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-12 md:p-20 space-y-10 text-left transition-all duration-500 hover:bg-white/[0.04] hover:border-white/[0.12] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ff1900]/10 supports-[backdrop-filter]:backdrop-blur-xl">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed">
                <span className="text-[#ff1900] font-bold">Plesnicar Solutions</span> ist ein österreichisches Unternehmen 
                mit Fokus auf zuverlässige Umsetzung, schnelle Kommunikation und saubere Ergebnisse.
              </p>
              <div className="h-0.5 w-32 bg-gradient-to-r from-[#ff1900] via-[#ff3d00] to-transparent rounded-full" />
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light">
                Als <span className="text-white font-semibold">Kleinunternehmer</span> bieten wir direkten, persönlichen Service ohne Umwege. 
                Unser Team besteht aus zwei Experten: einem IT-Spezialisten für PC-Bau, digitale Lösungen und Grafikdesign sowie einem 
                Bauingenieur mit 40+ Jahren Bau-Erfahrung. Unser Angebot umfasst IT-Beratung, PC-Bau, digitale Lösungen, 
                Grafikdesign, Bau/Hausbetreuung sowie Handel – alles aus einer Hand, <span className="text-[#ff1900] font-semibold">regional in Österreich</span> und mit Remote-IT-Möglichkeiten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white/[0.02] relative border-t border-white/5">
        <div className="container mx-auto max-w-7xl overflow-hidden">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Unser <span className="text-[#ff1900] bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/65 max-w-2xl mx-auto font-light leading-relaxed">
              Zwei Experten für IT und Bau – Ihre kompetenten Ansprechpartner
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Boris Plesnicar",
                role: "IT-Spezialist & Bau-Beratung",
                education: "HTL Krems IT, Freelancer",
                image: "/portraits/boris.jpg",
                isOwner: true,
                expertise: [
                  "PC-Bau und Hardware-Konfiguration",
                  "Grafikdesign und Corporate Design",
                  "Website Design & Entwicklung",
                  "IT-Systemberatung und Support",
                  "Handwerkliche Kompetenzen"
                ]
              },
              {
                name: "Ing. Dietmar Plesnicar",
                role: "Unterstützung Bau-Beratung & Handel",
                education: "Ingenieur",
                image: "/portraits/dietmar.png",
                isOwner: false,
                expertise: [
                  "40+ Jahre Erfahrung im Bauwesen",
                  "Bauberatung und Projektplanung",
                  "Hausbetreuung und Wartung",
                  "Handel und Produktberatung",
                  "punktegenaue Expertise"
                ]
              }
            ].map((person, i) => (
              <div
                key={i}
                className={`backdrop-blur-xl border rounded-3xl transition-all duration-500 ${
                  person.isOwner 
                    ? 'p-10 md:p-12 bg-white/[0.02] border-[#ff1900]/30 bg-gradient-to-br from-white/[0.02] to-[#ff1900]/[0.05] hover:border-[#ff1900]/50 hover:bg-gradient-to-br hover:from-white/[0.04] hover:to-[#ff1900]/[0.08] hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#ff1900]/25' 
                    : 'p-10 md:p-12 bg-white/[0.015] border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.025] hover:-translate-y-2 hover:shadow-xl hover:shadow-black/30'
                }`}
              >
                {/* Profilbild */}
                <div className="mb-6 flex items-start gap-6">
                  <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-white/[0.08] bg-white/[0.03] shadow-lg">
                    {person.image ? (
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className={`object-cover ${person.name === "Boris Plesnicar" ? "object-center object-[center_30%]" : "object-center"}`}
                        sizes="(max-width: 768px) 96px, 112px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#ff1900]/20 to-[#ff1900]/10">
                        <User className="w-12 h-12 text-[#ff1900]/50" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className={`font-bold text-white ${person.isOwner ? 'text-2xl' : 'text-xl'}`}>{person.name}</h3>
                      {person.isOwner ? (
                        <span className="px-2.5 py-1 bg-[#ff1900] text-white text-xs font-bold rounded uppercase tracking-wide shadow-lg shadow-[#ff1900]/30">
                          Inhaber
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-white/10 border border-white/20 text-white/70 text-xs font-medium rounded uppercase tracking-wide">
                          Unterstützung
                        </span>
                      )}
                    </div>
                    <p className={`font-semibold mb-3 ${person.isOwner ? 'text-lg text-[#ff1900]' : 'text-base text-white/60'}`}>{person.role}</p>
                    <p className="text-sm text-white/70 font-light">{person.education}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className={`text-sm font-semibold uppercase tracking-wide ${person.isOwner ? 'text-white/90' : 'text-white/60'}`}>Kompetenzen</h4>
                  <ul className="space-y-2">
                    {person.expertise.map((item, idx) => (
                      <li key={idx} className={`flex items-start gap-3 ${person.isOwner ? 'text-white/80' : 'text-white/60'}`}>
                        <span className={`mt-1.5 font-bold ${person.isOwner ? 'text-[#ff1900]' : 'text-white/40'}`}>•</span>
                        <span className="font-light leading-relaxed text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Signaturen direkt bei den Team-Karten */}
                <div className="mt-4 flex justify-end">
                  {person.name === "Boris Plesnicar" ? (
                    <div className="inline-flex flex-col items-end gap-1">
                      <span className="block brightness-0 invert flex justify-end" aria-hidden="true">
                        <Image
                          src="/signatures/signatureboris.png"
                          alt="Unterschrift von Boris Plesnicar"
                          width={140}
                          height={45}
                          className="h-6 md:h-7 w-auto opacity-95"
                          loading="lazy"
                        />
                      </span>
                      <p className="text-[9px] md:text-[10px] text-white/60 text-right tracking-[0.16em] uppercase">
                        Boris Plesnicar · Inhaber
                      </p>
                    </div>
                  ) : (
                    <div className="inline-flex flex-col items-end gap-1 opacity-90">
                      <span className="block brightness-0 invert flex justify-end" aria-hidden="true">
                        <Image
                          src="/signatures/signaturedietmar.png"
                          alt="Unterschrift von Ing. Dietmar Plesnicar"
                          width={130}
                          height={40}
                          className="h-5 md:h-6 w-auto opacity-95"
                          loading="lazy"
                        />
                      </span>
                      <p className="text-[8.5px] md:text-[9.5px] text-white/60 text-right tracking-[0.18em] uppercase">
                        Ing. Dietmar Plesnicar · Unterstützung
                      </p>
                    </div>
                  )}
                </div>
                {/* Contact Details */}
                <div className={`mt-6 pt-6 border-t space-y-3 ${person.isOwner ? 'border-white/10' : 'border-white/5'}`}>
                  <h4 className={`text-sm font-semibold uppercase tracking-wide mb-3 ${person.isOwner ? 'text-white/90' : 'text-white/60'}`}>Kontakt</h4>
                  {person.name === "Boris Plesnicar" ? (
                    <>
                      <a 
                        href="tel:+436644678382" 
                        className="flex items-center gap-3 text-white/80 hover:text-[#ff1900] transition-colors duration-200 group"
                      >
                        <Phone className="w-4 h-4 text-[#ff1900] group-hover:scale-110 transition-transform" strokeWidth={2} />
                        <span className="font-light text-sm">+43 664 467 8382</span>
                      </a>
                      <a 
                        href="mailto:plesnicaroffice@gmail.com" 
                        className="flex items-center gap-3 text-white/80 hover:text-[#ff1900] transition-colors duration-200 group"
                      >
                        <Mail className="w-4 h-4 text-[#ff1900] group-hover:scale-110 transition-transform" strokeWidth={2} />
                        <span className="font-light text-sm">plesnicaroffice@gmail.com</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <a 
                        href="tel:+436763206308" 
                        className="flex items-center gap-3 text-white/80 hover:text-[#ff1900] transition-colors duration-200 group"
                      >
                        <Phone className="w-4 h-4 text-[#ff1900] group-hover:scale-110 transition-transform" strokeWidth={2} />
                        <span className="font-light text-sm">+43 676 320 6308</span>
                      </a>
                      <a 
                        href="mailto:plesnicaroffice@gmail.com" 
                        className="flex items-center gap-3 text-white/80 hover:text-[#ff1900] transition-colors duration-200 group"
                      >
                        <Mail className="w-4 h-4 text-[#ff1900] group-hover:scale-110 transition-transform" strokeWidth={2} />
                        <span className="font-light text-sm">plesnicaroffice@gmail.com</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unsere Vorteile Section */}
      <section id="warum" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative">
        <div className="container mx-auto max-w-7xl overflow-hidden">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Unsere <span className="text-[#ff1900] bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Vorteile</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/65 max-w-2xl mx-auto font-light leading-relaxed">
              Was Sie von unserer Zusammenarbeit erwarten können
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Schnell", desc: "Rasche Reaktionszeiten und zügige Umsetzung – ob IT-Systeme oder Bau-Aufgaben" },
              { icon: Sparkles, title: "Sauber", desc: "Präzise Arbeit und hochwertige Ergebnisse in IT, Design und Hausbetreuung" },
              { icon: Rocket, title: "Modern", desc: "Aktuelle Technologien für IT und zeitgemäße Lösungen für Bau" },
              { icon: User, title: "Direkt", desc: "Ein Ansprechpartner für IT und Bau – kurze Wege, persönlicher Service" }
            ].map((benefit, i) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={i}
                  className="text-center p-10 bg-white/[0.02] border border-white/[0.06] rounded-3xl hover:border-white/[0.15] hover:bg-white/[0.04] hover:-translate-y-3 hover:shadow-2xl hover:shadow-[#ff1900]/15 transition-all duration-500 supports-[backdrop-filter]:backdrop-blur-xl"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff1900]/20 to-[#ff1900]/10 border border-[#ff1900]/20 mb-8 group-hover:bg-gradient-to-br group-hover:from-[#ff1900]/30 group-hover:to-[#ff1900]/20 group-hover:border-[#ff1900]/30 group-hover:scale-110 transition-all duration-500">
                    <IconComponent className="w-10 h-10 text-[#ff1900]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-5 text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed text-base">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Servicequalität Section */}
      <section id="features" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-white/[0.02] relative">
        <div className="container mx-auto max-w-7xl overflow-hidden">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Unsere <span className="text-[#ff1900] bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Servicequalität</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/65 max-w-2xl mx-auto font-light leading-relaxed">
              Professionelle Standards für IT-Projekte und Bau/Hausbetreuung
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Schnelle Reaktionszeiten",
                desc: "Kontaktaufnahme innerhalb von 24 Stunden. Zügige Projektumsetzung für IT-Systeme und Bau/Hausbetreuung."
              },
              {
                icon: CheckCircle2,
                title: "Qualitätssicherung",
                desc: "Hochwertige Ergebnisse nach etablierten Standards in IT, Design und Hausbetreuung."
              },
              {
                icon: TrendingUp,
                title: "Moderne Lösungsansätze",
                desc: "Aktuelle Technologien für IT-Projekte und bewährte Methoden für Bau/Hausbetreuung."
              },
              {
                icon: Users,
                title: "Persönliche Betreuung",
                desc: "Direkter Ansprechpartner für alle Bereiche – IT und Bau aus einer Hand."
              },
              {
                icon: BarChart3,
                title: "Transparente Kommunikation",
                desc: "Klare Absprachen, regelmäßige Statusupdates und fundierte Beratung für alle Projekte."
              },
              {
                icon: Award,
                title: "Erfahrung & Kompetenz",
                desc: "Langjährige Expertise in IT-Beratung und Bau/Hausbetreuung für zuverlässige Ergebnisse."
              }
            ].map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={i}
                  className="p-10 bg-white/[0.02] border border-white/[0.06] rounded-3xl hover:border-white/[0.15] hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ff1900]/10 transition-all duration-500 supports-[backdrop-filter]:backdrop-blur-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff1900]/20 to-[#ff1900]/10 border border-[#ff1900]/20 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-[#ff1900]/30 group-hover:to-[#ff1900]/20 group-hover:scale-110 transition-all duration-500">
                    <IconComponent className="w-7 h-7 text-[#ff1900]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 font-light leading-relaxed text-base">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Arbeitsweise Section */}
      <section id="prozess" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative">
        <div className="container mx-auto max-w-6xl overflow-hidden">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Unsere <span className="text-[#ff1900] bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">Arbeitsweise</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/65 max-w-2xl mx-auto font-light leading-relaxed">
              Strukturierter Ablauf für IT-Projekte und Bau/Hausbetreuung
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Kontakt", desc: "Sie nehmen Kontakt auf und beschreiben Ihr Anliegen – ob IT oder Bau" },
              { step: "02", title: "Beratung", desc: "Wir analysieren Ihre Anforderungen und erstellen ein individuelles Angebot" },
              { step: "03", title: "Umsetzung", desc: "Professionelle Ausführung: IT-Lösungen mit Updates oder Bau/Hausbetreuung mit Terminabsprache" },
              { step: "04", title: "Betreuung", desc: "Laufende Betreuung: IT-Support oder regelmäßige Bau/Hausbetreuung nach Bedarf" }
            ].map((process, i) => (
              <div
                key={i}
                className="relative"
              >
                <div className="p-10 bg-white/[0.02] border border-white/[0.06] rounded-3xl hover:border-white/[0.15] hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ff1900]/10 transition-all duration-500 h-full supports-[backdrop-filter]:backdrop-blur-xl">
                  <div className="text-6xl font-black text-[#ff1900]/20 mb-6">{process.step}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{process.title}</h3>
                  <p className="text-white/70 font-light leading-relaxed text-base">{process.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/20">
                    <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" strokeWidth={2} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-white/[0.02] relative border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
              Kontakt
            </h2>
            <p className="text-white/60 font-light text-base md:text-lg max-w-xl mx-auto">
              Einfach anrufen oder schreiben – Antwort innerhalb von 24 Stunden. Dringend? Wir sind persönlich erreichbar.
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
              <div className="p-5 md:p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
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
