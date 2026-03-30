"use client";

import { SiteShell } from "@/app/components/site/SiteShell";
import { UeberUnsContactsBridge } from "@/app/components/site/UeberUnsContactsBridge";
import { UeberUnsSection } from "@/app/components/site/sections/UeberUnsSection";
import { TeamSection } from "@/app/components/site/sections/TeamSection";

const SCROLL_IDS = ["ueber-uns", "team"] as const;

export function UeberUnsPage() {
  return (
    <SiteShell scrollSpyIds={SCROLL_IDS}>
      <div className="pt-20 md:pt-24">
        <UeberUnsSection />
        <UeberUnsContactsBridge />
        <TeamSection />
      </div>
    </SiteShell>
  );
}
