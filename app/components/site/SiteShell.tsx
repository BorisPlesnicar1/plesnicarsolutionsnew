"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Instagram,
  Mail,
  Menu,
  Phone,
  Settings,
  X,
} from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { useHashScroll, SCROLL_SPY_HEADER_OFFSET } from "@/app/components/site/useHashScroll";

const CookieBanner = dynamic(
  () => import("@/app/components/site/CookieBanner").then((m) => ({ default: m.CookieBanner })),
  { ssr: false }
);

/** Entscheidungsreise: Start → Richtpreise → Leistungen & Projekte → Handelspartner → Über uns; Kontakt = CTA */
const NAV_DESKTOP = [
  { href: "/", labelKey: "home" as const, match: (p: string) => p === "/" },
  {
    href: "/preise",
    labelKey: "richtpreise" as const,
    match: (p: string) => p === "/preise" || p.startsWith("/preise/"),
  },
  {
    href: "/leistungen",
    labelKey: "leistungenProjekte" as const,
    match: (p: string) => p === "/leistungen" || p.startsWith("/leistungen/"),
  },
  {
    href: "/handelspartner",
    labelKey: "handelspartner" as const,
    match: (p: string) => p === "/handelspartner" || p.startsWith("/handelspartner/"),
  },
  { href: "/ueber-uns", labelKey: "ueberUns" as const, match: (p: string) => p === "/ueber-uns" || p.startsWith("/ueber-uns/") },
] as const;

const FOOTER_MAIN_LINKS = [
  ...NAV_DESKTOP.map((n) => ({ href: n.href, labelKey: n.labelKey, match: n.match })),
  { href: "/kontakt" as const, labelKey: "kontakt" as const, match: (p: string) => p === "/kontakt" || p.startsWith("/kontakt/") },
] as const;

type SiteShellProps = {
  children: ReactNode;
  /** Section ids on this page: hash scroll + optional scroll-driven URL hash */
  scrollSpyIds?: readonly string[];
};

const EMPTY_SCROLL_SPY_IDS: readonly string[] = [];

export function SiteShell({ children, scrollSpyIds }: SiteShellProps) {
  const spyIds = scrollSpyIds ?? EMPTY_SCROLL_SPY_IDS;
  const { lang, setLang, updateConsent, resetCookieConsent, showCookieBanner } = useSite();
  const t = TRANSLATIONS[lang];
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileContactBarCollapsed, setMobileContactBarCollapsed] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  const idsKey = spyIds.join("|");
  useHashScroll(spyIds);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const listener = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  /**
   * Ein passiver Scroll-Listener + max. ein rAF:
   * Fortschrittsbalken, „Nach oben“, URL-Hash-Spy (eine klare aktive Section – kein IO-Flackern).
   */
  useEffect(() => {
    let scheduled = false;
    const tick = () => {
      scheduled = false;
      const y = window.scrollY;
      setShowBackToTop(y > 500);
      if (!prefersReducedMotion) {
        const bar = scrollBarRef.current;
        if (bar) {
          const doc = document.documentElement;
          const max = Math.max(1, doc.scrollHeight - window.innerHeight);
          bar.style.transform = `scaleX(${Math.min(1, Math.max(0, y / max))})`;
        }
      }
      if (spyIds.length) {
        const docEl = document.documentElement;
        const atBottom = y + window.innerHeight >= docEl.scrollHeight - 72;
        const shortPage = docEl.scrollHeight <= window.innerHeight + 80;
        /* Kein Hash-Snap bei Scroll 0: sonst springt die URL beim ersten Besuch ohne Nutzer-Scroll. */
        const allowHashSpy = y > 6 || atBottom || shortPage;
        if (allowHashSpy) {
          const line = SCROLL_SPY_HEADER_OFFSET + 20;
          let activeId: string | null = null;
          for (const id of spyIds) {
            const el = document.getElementById(id);
            if (!el) continue;
            if (el.getBoundingClientRect().top <= line) activeId = id;
          }
          if (atBottom) activeId = spyIds[spyIds.length - 1] ?? activeId;
          if (activeId && window.location.hash !== `#${activeId}`) {
            window.history.replaceState(null, "", `#${activeId}`);
          }
        }
      }
    };
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [prefersReducedMotion, pathname, idsKey]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogoClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white relative overflow-x-hidden max-w-[100vw]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#ff1900] focus:text-white focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-white"
      >
        {t.skipLink}
      </a>

      <svg aria-hidden className="absolute w-0 h-0 overflow-hidden pointer-events-none" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="liquid-splatter" clipPathUnits="objectBoundingBox">
            <path d="M0.02,0.48 C0,0.14,0.14,0.02,0.36,0.06 C0.52,0.08,0.68,0.03,0.86,0.12 C0.98,0.24,1,0.42,0.98,0.58 C0.96,0.78,0.82,0.96,0.58,0.99 C0.4,1,0.22,0.92,0.1,0.74 C0.04,0.64,0.02,0.54,0.02,0.48 C0.02,0.38,0.06,0.32,0.08,0.28 C0.06,0.18,0.08,0.1,0.1,0.08 C0.12,0.06,0.1,0.1,0.08,0.14 C0.06,0.22,0.04,0.32,0.02,0.42 C0.02,0.46,0.02,0.48,0.02,0.48 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="fixed inset-0 pointer-events-none z-0 blur-bg" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#ff1900]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ff1900]/3 rounded-full blur-[150px]" />
      </div>

      {!prefersReducedMotion && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-white/10 z-[60] overflow-hidden" aria-hidden>
          <div
            ref={scrollBarRef}
            className="h-full w-full bg-[#ff1900] origin-left will-change-transform"
            style={{ transform: "scaleX(0)", transformOrigin: "0 50%" }}
          />
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 border-b border-white/[0.08] supports-[backdrop-filter]:backdrop-blur-xl backdrop-saturate-150">
        <div className="container mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between max-w-[100vw]">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={handleLogoClick}
              aria-label={t.ariaLogoHome}
              title={t.ariaLogoHome}
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded-lg"
            >
              <Image
                src="/logos/LogoTEXTB.png"
                alt="Plesnicar Solutions Logo"
                width={200}
                height={60}
                className="h-12 sm:h-14 md:h-16 w-auto max-w-[180px] sm:max-w-none"
                priority
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 240px"
              />
            </button>
          </div>
          <nav aria-label={t.ariaMainNav} className="hidden lg:flex items-center gap-1.5">
            {NAV_DESKTOP.map((item) => {
              const active = item.match(pathname);
              const label = t.nav[item.labelKey];
              const isPreise = item.href === "/preise";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  aria-current={active ? "page" : undefined}
                  className={`min-h-[44px] px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 flex items-center justify-center border-b-[3px] -mb-[1px] ${
                    active
                      ? "text-white font-semibold bg-[#ff1900]/15 border-[color:var(--accent)]"
                      : "text-white/60 border-transparent font-medium hover:text-white hover:bg-white/5"
                  } ${isPreise ? `nav-text-glow-preise${active ? " nav-text-glow-preise--on" : ""}` : ""}`}
                >
                  {label}
                </Link>
              );
            })}
            <div
              role="group"
              aria-label={t.ariaLang}
              className="ml-2 flex items-center rounded-lg border border-white/[0.12] bg-white/[0.03] p-0.5"
            >
              <button
                type="button"
                onClick={() => setLang("de")}
                className={`min-h-[36px] px-2.5 rounded-md text-sm font-medium transition-colors ${lang === "de" ? "bg-[#ff1900] text-white" : "text-white/70 hover:text-white"}`}
                aria-pressed={lang === "de"}
                aria-label="Deutsch"
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`min-h-[36px] px-2.5 rounded-md text-sm font-medium transition-colors ${lang === "en" ? "bg-[#ff1900] text-white" : "text-white/70 hover:text-white"}`}
                aria-pressed={lang === "en"}
                aria-label="English"
              >
                EN
              </button>
            </div>
            <Link
              href="/kontakt"
              prefetch
              aria-current={pathname === "/kontakt" || pathname.startsWith("/kontakt/") ? "page" : undefined}
              aria-label={t.ariaKontaktCta}
              className={`ml-2 min-h-[44px] px-6 py-2.5 font-semibold rounded-xl transition-all duration-300 text-sm flex items-center shadow-lg ${
                pathname === "/kontakt" || pathname.startsWith("/kontakt/")
                  ? "bg-[#ff1900] text-white ring-2 ring-white/40 ring-offset-2 ring-offset-[#0a0a0a] shadow-[#ff1900]/30"
                  : "bg-[#ff1900] hover:bg-[#e61700] text-white shadow-[#ff1900]/25 hover:shadow-xl hover:shadow-[#ff1900]/35 hover:-translate-y-0.5"
              }`}
            >
              {t.nav.kontakt}
            </Link>
          </nav>
          <div className="flex lg:hidden items-center gap-1">
            <div
              role="group"
              aria-label={t.ariaLang}
              className="flex items-center rounded-lg border border-white/[0.12] bg-white/[0.03] p-0.5"
            >
              <button
                type="button"
                onClick={() => setLang("de")}
                className={`min-h-[36px] px-2 rounded-md text-xs font-medium transition-colors ${lang === "de" ? "bg-[#ff1900] text-white" : "text-white/70 hover:text-white"}`}
                aria-pressed={lang === "de"}
                aria-label="Deutsch"
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`min-h-[36px] px-2 rounded-md text-xs font-medium transition-colors ${lang === "en" ? "bg-[#ff1900] text-white" : "text-white/70 hover:text-white"}`}
                aria-pressed={lang === "en"}
                aria-label="English"
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              aria-expanded={mobileMenuOpen}
              aria-controls="site-mobile-nav"
              aria-label={mobileMenuOpen ? t.ariaMenuClose : t.ariaMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            id="site-mobile-nav"
            aria-label={t.ariaMobileNav}
            className="lg:hidden bg-[#212121]/98 border-t border-white/5 supports-[backdrop-filter]:backdrop-blur-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1.5 max-w-[100vw]">
              {NAV_DESKTOP.map((item) => {
                const active = item.match(pathname);
                const label = t.nav[item.labelKey];
                const isPreise = item.href === "/preise";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    aria-current={active ? "page" : undefined}
                    className={`text-left text-sm transition-colors min-h-[44px] py-3 pl-4 pr-3 rounded-r-lg flex items-center border-l-4 ${
                      active
                        ? "text-white font-semibold bg-[#ff1900]/20 border-[color:var(--accent)]"
                        : "text-white/70 font-medium border-transparent hover:text-white hover:bg-white/5"
                    } ${isPreise ? `nav-text-glow-preise nav-text-glow-preise--mobile${active ? " nav-text-glow-preise--on" : ""}` : ""}`}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 mt-3 pt-2 border-t border-white/[0.08]">
                <Link
                  href="/kontakt"
                  prefetch
                  aria-current={pathname === "/kontakt" || pathname.startsWith("/kontakt/") ? "page" : undefined}
                  aria-label={t.ariaKontaktCta}
                  className={`text-center min-h-[44px] px-6 py-3 font-semibold rounded-lg transition-colors text-sm ${
                    pathname === "/kontakt" || pathname.startsWith("/kontakt/")
                      ? "bg-[#ff1900] text-white ring-2 ring-white/50 ring-offset-2 ring-offset-[#212121]"
                      : "bg-[#ff1900] hover:bg-[#e61700] text-white"
                  }`}
                >
                  {t.nav.kontakt}
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#212121]"
      >
        {children}
      </main>

      <footer className="py-12 pb-24 md:pb-16 md:py-16 px-4 sm:px-6 border-t border-white/[0.08] bg-[#0a0a0a]/50 backdrop-blur-sm overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <nav
            aria-label={t.footerNavPages}
            className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 pb-8 mb-8 border-b border-white/[0.08]"
          >
            {FOOTER_MAIN_LINKS.map((item) => {
              const active = item.match(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="text-sm font-medium text-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded px-1 -mx-1"
                >
                  {t.nav[item.labelKey]}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center">
              <Image
                src="/logos/LogoTEXTB.png"
                alt="Plesnicar Solutions Logo"
                width={200}
                height={60}
                className="h-12 md:h-14 w-auto opacity-80"
                sizes="(max-width: 768px) 200px, 224px"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <p className="font-bold text-white mb-1">Boris Plesnicar e.U.</p>
              <p className="font-light text-sm text-white/50">
                © {new Date().getFullYear()} Plesnicar Solutions. {t.footer.rights}
              </p>
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
              <Link
                href={lang === "en" ? "/impressum-en" : "/impressum"}
                className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm"
              >
                {t.footer.impressum}
              </Link>
              <Link
                href={lang === "en" ? "/datenschutz-en" : "/datenschutz"}
                className="text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm"
              >
                {t.footer.datenschutz}
              </Link>
              <button
                type="button"
                onClick={() => resetCookieConsent()}
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-200 font-medium text-sm"
                aria-label={t.footer.cookieSettingsAria}
              >
                <Settings className="w-3.5 h-3.5" aria-hidden />
                {t.footer.cookieSettings}
              </button>
            </div>
          </div>
        </div>
      </footer>

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
                    <p className="text-xs text-white/60 truncate" title="plesnicaroffice@gmail.com">
                      plesnicaroffice@gmail.com
                    </p>
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
        <CookieBanner lang={lang} onAllowEssential={() => updateConsent(false)} onAllowAll={() => updateConsent(true)} />
      )}
    </div>
  );
}
