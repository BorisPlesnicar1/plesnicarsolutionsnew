"use client";

import { useEffect } from "react";
import { SiteShell } from "@/app/components/site/SiteShell";
import { ProjekteSection } from "@/app/components/site/sections/ProjekteSection";
import { useLangQuerySync } from "@/app/components/site/useLangQuerySync";
import { useSite } from "@/app/contexts/SiteContext";
import { getReferenzenMetaDescription } from "@/lib/seo-pages";

const SCROLL_IDS = ["projekte"] as const;

export function ReferenzenPage() {
  const { lang } = useSite();
  useLangQuerySync();

  useEffect(() => {
    document.title = lang === "en" ? "References | Plesnicar Solutions" : "Referenzen | Plesnicar Solutions";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", getReferenzenMetaDescription(lang === "en" ? "en" : "de"));
    }
  }, [lang]);

  return (
    <SiteShell scrollSpyIds={SCROLL_IDS}>
      <div className="pt-20 md:pt-24">
        <ProjekteSection />
      </div>
    </SiteShell>
  );
}
