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
  Target,
  BarChart3,
  Phone,
  Instagram
} from "lucide-react";

export default function Home() {
  // Initialize with all sections visible as fallback (iOS Safari safety)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    'hero': true,
    'leistungen': true,
    'ueber-uns': true,
    'team': true,
    'warum': true,
    'features': true,
    'prozess': true,
    'kontakt': true,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  useEffect(() => {
    // Show all sections immediately – no scroll/IntersectionObserver (Safari and others can fail with it)
    const allSections = {
      'hero': true,
      'leistungen': true,
      'ueber-uns': true,
      'team': true,
      'warum': true,
      'features': true,
      'prozess': true,
      'kontakt': true,
    };
    setIsVisible(allSections);
    setAnimationsReady(true);
    document.documentElement.classList.add('animations-ready');

    // Safari/mobile: disable heavy blur for performance
    const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isIOS || isSafari || isMobile) {
      document.documentElement.classList.add('no-heavy-blur', 'no-backdrop-blur');
    }
  }, []);

  // Defer Google Maps iframe until contact section is in view (reduces initial load)
  useEffect(() => {
    const el = document.getElementById('kontakt');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) setMapsLoaded(true); },
      { rootMargin: '100px', threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
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
    <div className="min-h-screen bg-[#212121] text-white relative">
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 blur-bg" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff1900]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ff1900]/3 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#212121]/98 border-b border-white/10 supports-[backdrop-filter]:backdrop-blur-xl">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 -ml-2">
        <Image
            src="/logos/LogoTEXTB.png"
            alt="Plesnicar Solutions Logo"
            width={200}
            height={60}
            className="h-14 md:h-16 w-auto"
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
              className="ml-2 px-6 py-2.5 bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold rounded-lg transition-all duration-200 text-sm shadow-lg shadow-[#ff1900]/20"
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
              className="ml-2 px-6 py-2.5 bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold rounded-lg transition-all duration-200 text-sm shadow-lg shadow-[#ff1900]/20"
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
          <div className="md:hidden bg-[#212121]/98 border-t border-white/5 supports-[backdrop-filter]:backdrop-blur-xl">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
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

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden pt-24 pb-12 md:pt-28 md:pb-14" data-animate>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#212121]/60 via-[#212121]/85 to-[#212121] z-10" />
          <Image
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=50&w=1200&auto=format&fit=crop"
            alt="Modern Technology Background"
            fill
            className="object-cover"
            priority
            quality={60}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1400px"
            loading="eager"
          />
        </div>

        {/* Animated Grid Overlay */}
        <div className="hidden md:block absolute inset-0 z-20 opacity-[0.04]">
          <div className="h-full w-full" style={{
            backgroundImage: `linear-gradient(rgba(255, 25, 0, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 25, 0, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Floating Elements */}
        <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#ff1900]/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-[#ff1900]/5 rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative z-30 container mx-auto px-6 py-10 md:py-12">
          <div
            className={`max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-8 items-center transition-all duration-700 ease-out ${
              isVisible["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-1 supports-[backdrop-filter]:backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-[#ff1900]" strokeWidth={2} />
                <span className="text-xs md:text-sm font-medium text-white/80">Österreichisches Unternehmen</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                Moderne Lösungen.
                <br />
                <span className="text-[#ff1900]">Zuverlässige Umsetzung.</span>
              </h1>
              
              <p className="text-base md:text-lg text-white/90 max-w-2xl lg:max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                IT-Beratung, PC-Bau & digitale Lösungen sowie Bau/Hausbetreuung aus einer Hand. 
                <span className="text-white font-medium"> Schnell, sauber, zuverlässig – für IT und Bau.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <button
                  onClick={() => scrollToSection("kontakt")}
                  className="group px-8 py-3 bg-[#ff1900] hover:bg-[#e61700] text-white text-base md:text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#ff1900]/30 hover:shadow-xl hover:shadow-[#ff1900]/50 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  Angebot anfragen
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </button>
                <button
                  onClick={() => scrollToSection("leistungen")}
                  className="px-8 py-3 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white text-base md:text-lg font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 supports-[backdrop-filter]:backdrop-blur-sm"
                >
                  Leistungen
                </button>
              </div>
            </div>
            {/* Hero Facts */}
              <div className="space-y-3 lg:space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 supports-[backdrop-filter]:backdrop-blur-sm">
                <p className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.15em] mb-1.5">
                  Schwerpunkte
                </p>
                <p className="text-xs md:text-sm text-white/85 leading-relaxed">
                  Individuell konfigurierte PCs, Grafikdesign und praxisorientierte Bau- und Hausbetreuung inkl. Handel
                  abgestimmt für Sie.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Kernbereiche", value: "4", icon: Target },
                  { label: "Ansprechpartner", value: "2", icon: User },
                  { label: "Zuverlässigkeit", value: "100%", icon: Award },
                  { label: "Standort", value: "AT", icon: MapPin }
                ].map((stat, i) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-left hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 supports-[backdrop-filter]:backdrop-blur-sm">
                      <IconComponent className="w-5 h-5 text-[#ff1900] mb-2" strokeWidth={2} />
                      <div className="text-2xl font-black text-white leading-none">{stat.value}</div>
                      <div className="text-[11px] font-medium text-white/60 mt-1 uppercase tracking-[0.15em]">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen Section */}
      <section id="leistungen" className="py-32 px-6 relative border-t border-white/5" data-animate>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className={`text-center mb-20 transition-opacity duration-1000 ${isVisible['leistungen'] ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Unsere <span className="text-[#ff1900]">Leistungen</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
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
                  className={`group relative p-10 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#ff1900]/10 transition-all duration-300 supports-[backdrop-filter]:backdrop-blur-sm ${isVisible['leistungen'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#ff1900]/20 flex items-center justify-center group-hover:bg-[#ff1900]/30 transition-colors duration-300">
                      <IconComponent className="w-7 h-7 text-[#ff1900]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-[#ff1900] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <ul className="space-y-4">
                        {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/80 group-hover:text-white/90 transition-colors duration-300">
                            <span className="text-[#ff1900] mt-1.5 font-bold">•</span>
                            <span className="font-light leading-relaxed">{item}</span>
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
      <section id="ueber-uns" className="py-32 px-6 bg-white/[0.02] relative border-t border-white/5" data-animate>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className={`text-center transition-opacity duration-1000 ${isVisible['ueber-uns'] ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-12 tracking-tight">
              Über <span className="text-[#ff1900]">uns</span>
            </h2>
            
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 md:p-16 space-y-8 text-left transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#ff1900]/5 supports-[backdrop-filter]:backdrop-blur-sm">
              <p className="text-2xl md:text-3xl text-white font-light leading-relaxed">
                <span className="text-[#ff1900] font-bold">Plesnicar Solutions</span> ist ein österreichisches Unternehmen 
                mit Fokus auf zuverlässige Umsetzung, schnelle Kommunikation und saubere Ergebnisse.
              </p>
              <div className="h-px w-24 bg-gradient-to-r from-[#ff1900] to-transparent" />
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
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
      <section id="team" className="py-32 px-6 bg-white/[0.02] relative border-t border-white/5" data-animate>
        <div className="container mx-auto max-w-7xl">
          <div className={`text-center mb-20 transition-opacity duration-1000 ${isVisible['ueber-uns'] ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Unser <span className="text-[#ff1900]">Team</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
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
                className={`backdrop-blur-sm border rounded-2xl transition-all duration-300 ${isVisible['ueber-uns'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${
                  person.isOwner 
                    ? 'p-10 bg-white/5 border-[#ff1900]/40 bg-gradient-to-br from-white/5 to-[#ff1900]/10 hover:border-[#ff1900]/60 hover:bg-gradient-to-br hover:from-white/10 hover:to-[#ff1900]/15 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#ff1900]/20' 
                    : 'p-8 bg-white/3 border-white/5 opacity-90 hover:border-white/10 hover:bg-white/5 hover:-translate-y-1 hover:shadow-lg'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Profilbild */}
                <div className="mb-6 flex items-start gap-6">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-xl overflow-hidden border-2 border-white/10 bg-white/5">
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
      <section id="warum" className="py-32 px-6 relative" data-animate>
        <div className="container mx-auto max-w-7xl">
          <div className={`text-center mb-20 transition-opacity duration-1000 ${isVisible['ueber-uns'] ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Unsere <span className="text-[#ff1900]">Vorteile</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
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
                  className={`text-center p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 supports-[backdrop-filter]:backdrop-blur-sm ${isVisible['ueber-uns'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#ff1900]/20 mb-6 group-hover:bg-[#ff1900]/30 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-[#ff1900]" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 font-light leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Servicequalität Section */}
      <section id="features" className="py-32 px-6 bg-white/[0.02] relative" data-animate>
        <div className="container mx-auto max-w-7xl">
          <div className={`text-center mb-20 transition-opacity duration-1000 ${isVisible['ueber-uns'] ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Unsere <span className="text-[#ff1900]">Servicequalität</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
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
                  className={`p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 supports-[backdrop-filter]:backdrop-blur-sm ${isVisible['ueber-uns'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#ff1900]/20 flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-[#ff1900]" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 font-light leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Arbeitsweise Section */}
      <section id="prozess" className="py-32 px-6 relative" data-animate>
        <div className="container mx-auto max-w-6xl">
          <div className={`text-center mb-20 transition-opacity duration-1000 ${isVisible['ueber-uns'] ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Unsere <span className="text-[#ff1900]">Arbeitsweise</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
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
                className={`relative ${isVisible['ueber-uns'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 h-full supports-[backdrop-filter]:backdrop-blur-sm">
                  <div className="text-5xl font-black text-[#ff1900]/30 mb-4">{process.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{process.title}</h3>
                  <p className="text-white/70 font-light leading-relaxed">{process.desc}</p>
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
      <section id="kontakt" className="py-32 px-6 bg-white/[0.02] relative border-t border-white/5" data-animate>
        <div className="container mx-auto max-w-7xl">
          <div className={`text-center mb-20 transition-opacity duration-1000 ${isVisible['kontakt'] ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Lassen Sie uns <span className="text-[#ff1900]">sprechen</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
              Bereit für Ihr nächstes Projekt?
            </p>
          </div>

          <div className={`grid md:grid-cols-2 gap-12 transition-opacity duration-1000 ${isVisible['kontakt'] ? 'opacity-100' : 'opacity-0'}`}>
            {/* Direkter Kontakt */}
            <div className="p-10 bg-white/5 border border-white/10 rounded-2xl supports-[backdrop-filter]:backdrop-blur-sm">
              <h3 className="text-3xl md:text-4xl font-black text-white">
                Direkter <span className="text-[#ff1900]">Kontakt</span>
              </h3>
              <p className="text-white/70 font-light mt-4 text-sm md:text-base leading-relaxed max-w-2xl">
                Rufen Sie uns an oder schreiben Sie uns. Wir melden uns schnellstmöglich zurück.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {/* Boris */}
                <div className="p-7 bg-white/5 border border-white/10 rounded-xl h-full">
                  <p className="text-xl font-bold text-white">
                    Boris Plesnicar <span className="text-white/60 font-medium">(IT)</span>
                  </p>
                  <div className="mt-4 space-y-3">
                    <a
                      href="tel:+436644678382"
                      className="w-full inline-flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold transition-colors duration-200"
                    >
                      <Phone className="w-5 h-5" strokeWidth={2} />
                      +43 664 4678382
                    </a>
                    <a
                      href="mailto:plesnicaroffice@gmail.com"
                      title="plesnicaroffice@gmail.com"
                      className="w-full min-w-0 inline-flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold transition-colors duration-200"
                    >
                      <Mail className="w-5 h-5 text-[#ff1900]" strokeWidth={2} />
                      <span className="truncate text-sm md:text-base">plesnicaroffice@gmail.com</span>
                    </a>
                  </div>
                </div>

                {/* Dietmar */}
                <div className="p-7 bg-white/5 border border-white/10 rounded-xl h-full">
                  <p className="text-xl font-bold text-white">
                    Ing. Dietmar Plesnicar <span className="text-white/60 font-medium">(Bau)</span>
                  </p>
                  <div className="mt-4 space-y-3">
                    <a
                      href="tel:+436763206308"
                      className="w-full inline-flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold transition-colors duration-200"
                    >
                      <Phone className="w-5 h-5" strokeWidth={2} />
                      +43 676 3206308
                    </a>
                    <a
                      href="mailto:plesnicaroffice@gmail.com"
                      title="plesnicaroffice@gmail.com"
                      className="w-full min-w-0 inline-flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold transition-colors duration-200"
                    >
                      <Mail className="w-5 h-5 text-[#ff1900]" strokeWidth={2} />
                      <span className="truncate text-sm md:text-base">plesnicaroffice@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-6 bg-gradient-to-br from-[#ff1900]/10 to-transparent border border-[#ff1900]/20 rounded-xl">
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#ff1900] flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <div>
                    <h4 className="font-semibold text-white mb-2">Schnelle Antwort</h4>
                    <p className="text-white/80 font-light text-sm leading-relaxed">
                      Wir melden uns innerhalb von <span className="text-white font-medium">24 Stunden</span> bei Ihnen zurück. 
                      Für dringende Anliegen kontaktieren Sie uns gerne direkt per Telefon.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-xl supports-[backdrop-filter]:backdrop-blur-sm">
                <h4 className="font-semibold text-white mb-3">Damit wir schnell helfen können</h4>
                <p className="text-white/70 font-light text-sm leading-relaxed mb-4">
                  Wenn Sie uns kurz diese Punkte nennen, sparen wir Zeit und können schneller ein passendes Angebot erstellen:
                </p>
                <ul className="space-y-2">
                  {[
                    "Bereich: IT / Grafikdesign / Bau / Hausbetreuung / Handel",
                    "Kurzbeschreibung (Ziel / Problem) + gewünschtes Ergebnis",
                    "Ort (vor Ort oder Remote möglich) + gewünschter Zeitraum",
                    "Fotos/Skizzen/Links (falls vorhanden)"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#ff1900] mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <span className="font-light text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Google Maps */}
              <div className="p-10 bg-white/5 border border-white/10 rounded-2xl supports-[backdrop-filter]:backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-white">Unser Standort</h3>
                <div className="w-full h-64 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                  {mapsLoaded ? (
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
                    <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">Karte wird geladen…</div>
                  )}
                </div>
                <p className="text-white/70 font-light text-sm mt-4">
                  Hartriegelstraße 12, 3550 Langenlois, Österreich
                </p>
              </div>

              <div className="p-10 bg-white/5 border border-white/10 rounded-2xl supports-[backdrop-filter]:backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-8 text-white">Kontaktinformationen</h3>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: "Standort", value: "Österreich" },
                    { icon: Globe, label: "Remote-IT", value: "Bundesweit verfügbar" },
                    { icon: Building2, label: "Unternehmen", value: "Boris Plesnicar e.U." }
                  ].map((info, i) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={i} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#ff1900]/20 flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-[#ff1900]" strokeWidth={2} />
                        </div>
                        <div>
                          <p className="font-semibold text-white mb-1">{info.label}</p>
                          <p className="text-white/70 font-light">{info.value}</p>
                        </div>
                      </div>
                    );
                  })}
                  {/* Social Media */}
                  <div className="pt-4 border-t border-white/10">
                    <a 
                      href="https://www.instagram.com/plesnicarsolutions/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group hover:opacity-80 transition-opacity duration-200"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#ff1900]/20 flex items-center justify-center group-hover:bg-[#ff1900]/30 transition-colors duration-200">
                        <Instagram className="w-5 h-5 text-[#ff1900]" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">Instagram</p>
                        <p className="text-white/70 font-light text-sm">@plesnicarsolutions</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-gradient-to-br from-[#ff1900]/10 to-transparent border border-[#ff1900]/20 rounded-2xl">
                <p className="text-white/90 leading-relaxed font-light">
                  Wir freuen uns auf Ihre Anfrage und melden uns <span className="text-white font-medium">schnellstmöglich</span> bei Ihnen. 
                  Für dringende Anliegen kontaktieren Sie uns gerne direkt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5 bg-black/20">
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
    </div>
  );
}
