"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "@/app/translations";

const LANG_STORAGE_KEY = "ps_lang";

export type CookieConsent = {
  necessary: true;
  comfort: boolean;
  timestamp: string;
};

type SiteContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  cookieConsent: CookieConsent | null;
  updateConsent: (comfort: boolean) => void;
  /** Einwilligung widerrufen / Banner erneut anzeigen (Art. 7 Abs. 3 DSGVO). */
  resetCookieConsent: () => void;
  showCookieBanner: boolean;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "de";
    try {
      const s = window.localStorage.getItem(LANG_STORAGE_KEY);
      return s === "en" ? "en" : "de";
    } catch {
      return "de";
    }
  });
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(null);
  const [cookieReady, setCookieReady] = useState(false);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
    }
  }, []);

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
  }, [lang]);

  const updateConsent = useCallback((comfort: boolean) => {
    const value: CookieConsent = {
      necessary: true,
      comfort,
      timestamp: new Date().toISOString(),
    };
    setCookieConsent(value);
    try {
      window.localStorage.setItem("ps_cookie_consent", JSON.stringify(value));
    } catch {
      // ignore
    }
  }, []);

  const resetCookieConsent = useCallback(() => {
    try {
      window.localStorage.removeItem("ps_cookie_consent");
    } catch {
      // ignore
    }
    setCookieConsent(null);
  }, []);

  useEffect(() => {
    const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isIOS || isSafari || isMobile) {
      document.documentElement.classList.add("no-heavy-blur", "no-backdrop-blur");
    }

    try {
      const stored = window.localStorage.getItem("ps_cookie_consent");
      if (stored) {
        const parsed = JSON.parse(stored) as CookieConsent;
        setCookieConsent(parsed);
      }
    } catch {
      // ignore
    }
    setCookieReady(true);
  }, []);

  const showCookieBanner = cookieReady && cookieConsent === null;

  const value = useMemo(
    () => ({ lang, setLang, cookieConsent, updateConsent, resetCookieConsent, showCookieBanner }),
    [lang, setLang, cookieConsent, updateConsent, resetCookieConsent, showCookieBanner]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
