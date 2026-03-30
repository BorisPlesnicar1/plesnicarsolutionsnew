"use client";

import { useEffect } from "react";
import { SiteShell } from "@/app/components/site/SiteShell";
import { PreiseHero } from "@/app/components/site/preise/PreiseHero";
import { PreiseBauPartnerSection } from "@/app/components/site/preise/PreiseBauPartnerSection";
import { PreisePaketeSection } from "@/app/components/site/preise/PreisePaketeSection";
import { PreiseHinweisSection } from "@/app/components/site/preise/PreiseHinweisSection";
import { PreiseTrustCtaSection } from "@/app/components/site/preise/PreiseTrustCtaSection";
import { useLangQuerySync } from "@/app/components/site/useLangQuerySync";
import { useSite } from "@/app/contexts/SiteContext";
import { getPreiseDocumentTitle } from "@/lib/preise-page";
import { getPreiseMetaDescription } from "@/lib/seo-pages";

const SCROLL_IDS = ["preise-hero", "preise-bau", "pakete", "hinweis", "vertrauen", "preise-cta"] as const;

export function PreisePage() {
  const { lang } = useSite();
  useLangQuerySync();

  useEffect(() => {
    document.title = getPreiseDocumentTitle(lang);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", getPreiseMetaDescription(lang === "en" ? "en" : "de"));
    }
  }, [lang]);

  return (
    <SiteShell scrollSpyIds={SCROLL_IDS}>
      <div className="pt-0">
        <PreiseHero />
        <PreiseBauPartnerSection />
        <PreisePaketeSection />
        <PreiseHinweisSection />
        <PreiseTrustCtaSection />
      </div>
    </SiteShell>
  );
}
