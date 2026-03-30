"use client";

import { SiteShell } from "@/app/components/site/SiteShell";
import { KontaktSection } from "@/app/components/site/sections/KontaktSection";

const SCROLL_IDS = ["kontakt"] as const;

export function KontaktPage() {
  return (
    <SiteShell scrollSpyIds={SCROLL_IDS}>
      <div className="pt-20 md:pt-24">
        <KontaktSection />
      </div>
    </SiteShell>
  );
}
