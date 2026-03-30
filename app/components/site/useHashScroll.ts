"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Abstand unter fixem Header – gleich wie Scroll-Spy-Linie in SiteShell. */
export const SCROLL_SPY_HEADER_OFFSET = 104;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_SPY_HEADER_OFFSET;
  window.scrollTo({ top, behavior: "auto" });
}

/** Scroll to #hash when the hash matches one of `allowedIds` (e.g. on load or client navigation). */
export function useHashScroll(allowedIds: readonly string[]) {
  const pathname = usePathname();
  const key = allowedIds.join("|");

  useEffect(() => {
    const allowed = new Set(allowedIds);
    const run = () => {
      const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
      if (!hash || !allowed.has(hash)) return;
      /* Doppel-rAF: Layout (Preise, Bilder) steht stabiler als nach einem Frame. */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToId(hash));
      });
    };
    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- key mirrors allowedIds content
  }, [pathname, key]);
}
