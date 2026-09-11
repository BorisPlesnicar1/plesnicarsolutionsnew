"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Rule = { hash: string; to: string };

/**
 * Client-seitiger Redirect für alte URLs (/preise, /leistungen), damit bestehende
 * Links und Bookmarks – inkl. Anker – nicht ins Leere laufen. Hash wird nur
 * clientseitig übermittelt, daher die Auswertung hier statt in next.config.
 */
export function LegacyRedirect({ rules = [], fallback }: { rules?: Rule[]; fallback: string }) {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const langSuffix = new URLSearchParams(window.location.search).get("lang") === "en" ? "?lang=en" : "";
    const match = rules.find((r) => r.hash === hash);
    const target = match ? match.to : fallback;
    router.replace(`${target}${langSuffix}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <div className="min-h-screen bg-[#070709]" aria-hidden />;
}
