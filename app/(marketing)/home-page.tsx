"use client";

import { SiteShell } from "@/app/components/site/SiteShell";
import { HeroSection } from "@/app/components/site/sections/HeroSection";
import { StatsSection } from "@/app/components/site/sections/StatsSection";
import { WasWirAndersSection } from "@/app/components/site/sections/WasWirAndersSection";
import { WarumSection } from "@/app/components/site/sections/WarumSection";
import { FeaturesSection } from "@/app/components/site/sections/FeaturesSection";
import { ProzessSection } from "@/app/components/site/sections/ProzessSection";
import { InstagramSection } from "@/app/components/site/sections/InstagramSection";

const HOME_SCROLL_IDS = [
  "hero",
  "stats",
  "was-wir-anders",
  "warum",
  "features",
  "prozess",
  "instagram",
] as const;

export function HomePage() {
  return (
    <SiteShell scrollSpyIds={HOME_SCROLL_IDS}>
      <HeroSection />
      <StatsSection />
      <WasWirAndersSection />
      <WarumSection />
      <FeaturesSection />
      <ProzessSection />
      <InstagramSection />
    </SiteShell>
  );
}
