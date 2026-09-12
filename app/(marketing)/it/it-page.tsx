"use client";

import { useEffect } from "react";
import { SiteShell } from "@/app/components/site/SiteShell";
import { PreiseHero } from "@/app/components/site/preise/PreiseHero";
import { LeistungenSection } from "@/app/components/site/sections/LeistungenSection";
import { PcBauSection } from "@/app/components/site/it/PcBauSection";
import { ProjekteSection } from "@/app/components/site/sections/ProjekteSection";
import { WebsitePreiseSection } from "@/app/components/site/preise/WebsitePreiseSection";
import { PreiseHinweisSection } from "@/app/components/site/preise/PreiseHinweisSection";
import { PreiseTrustCtaSection } from "@/app/components/site/preise/PreiseTrustCtaSection";
import { useLangQuerySync } from "@/app/components/site/useLangQuerySync";
import { useSite } from "@/app/contexts/SiteContext";
import { getItMetaDescription } from "@/lib/seo-pages";

const SCROLL_IDS = ["preise-hero", "leistungen", "pc-bau", "website-preise", "hinweis", "projekte", "vertrauen", "preise-cta"] as const;

export function ItPage() {
  const { lang } = useSite();
  useLangQuerySync();

  useEffect(() => {
    document.title = lang === "en" ? "IT & web | Plesnicar Solutions" : "IT & Web | Plesnicar Solutions";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", getItMetaDescription(lang === "en" ? "en" : "de"));
    }
  }, [lang]);

  return (
    <SiteShell scrollSpyIds={SCROLL_IDS}>
      <div className="pt-0">
        <PreiseHero />
        <LeistungenSection domain="it" />
        <PcBauSection />
        <WebsitePreiseSection />
        <PreiseHinweisSection />
        <ProjekteSection domain="it" />
        <PreiseTrustCtaSection />
      </div>
    </SiteShell>
  );
}
