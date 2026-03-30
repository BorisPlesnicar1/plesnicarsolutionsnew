"use client";

import { SiteShell } from "@/app/components/site/SiteShell";
import { LeistungenSection } from "@/app/components/site/sections/LeistungenSection";
import { ProjekteSection } from "@/app/components/site/sections/ProjekteSection";

const SCROLL_IDS = ["leistungen", "projekte"] as const;

export function LeistungenPage() {
  return (
    <SiteShell scrollSpyIds={SCROLL_IDS}>
      <div className="pt-20 md:pt-24">
        <LeistungenSection />
        <ProjekteSection />
      </div>
    </SiteShell>
  );
}
