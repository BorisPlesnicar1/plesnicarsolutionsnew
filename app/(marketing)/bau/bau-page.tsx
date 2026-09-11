"use client";

import { useEffect } from "react";
import { SiteShell } from "@/app/components/site/SiteShell";
import { PreiseBauPartnerSection } from "@/app/components/site/preise/PreiseBauPartnerSection";
import { LeistungenSection } from "@/app/components/site/sections/LeistungenSection";
import { ProjekteSection } from "@/app/components/site/sections/ProjekteSection";
import { PreiseTrustCtaSection } from "@/app/components/site/preise/PreiseTrustCtaSection";
import { useLangQuerySync } from "@/app/components/site/useLangQuerySync";
import { useSite } from "@/app/contexts/SiteContext";
import { getBauMetaDescription } from "@/lib/seo-pages";

const SCROLL_IDS = ["preise-bau", "leistungen", "projekte", "preise-cta"] as const;

export function BauPage() {
  const { lang } = useSite();
  useLangQuerySync();

  useEffect(() => {
    document.title =
      lang === "en" ? "Construction & materials | Plesnicar Solutions" : "Bau & Baustoffe | Plesnicar Solutions";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", getBauMetaDescription(lang === "en" ? "en" : "de"));
    }
  }, [lang]);

  return (
    <SiteShell scrollSpyIds={SCROLL_IDS}>
      <div className="pt-20 md:pt-24">
        <PreiseBauPartnerSection />
        <LeistungenSection domain="bau" />
        <ProjekteSection domain="bau" />
        <PreiseTrustCtaSection variant="cta" />
      </div>
    </SiteShell>
  );
}
