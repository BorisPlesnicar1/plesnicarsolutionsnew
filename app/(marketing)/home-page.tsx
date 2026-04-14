"use client";

import dynamic from "next/dynamic";
import { SiteShell } from "@/app/components/site/SiteShell";
import { HeroSection } from "@/app/components/site/sections/HeroSection";
import { StatsSection } from "@/app/components/site/sections/StatsSection";
import { WasWirAndersSection } from "@/app/components/site/sections/WasWirAndersSection";
import { WarumSection } from "@/app/components/site/sections/WarumSection";
import { FeaturesSection } from "@/app/components/site/sections/FeaturesSection";
import { ProzessSection } from "@/app/components/site/sections/ProzessSection";
import { InstagramSection } from "@/app/components/site/sections/InstagramSection";
import { PartnerLogosSection } from "@/app/components/site/sections/PartnerLogosSection";
import { FaqSection } from "@/app/components/site/sections/FaqSection";

const OpeningOfferHomePopup = dynamic(
  () => import("@/app/components/site/OpeningOfferHomePopup").then((m) => ({ default: m.OpeningOfferHomePopup })),
  { ssr: false }
);

const HOME_SCROLL_IDS = [
  "hero",
  "stats",
  "partner-logos",
  "was-wir-anders",
  "warum",
  "features",
  "prozess",
  "faq",
  "instagram",
] as const;

export function HomePage() {
  return (
    <SiteShell scrollSpyIds={HOME_SCROLL_IDS}>
      <OpeningOfferHomePopup />
      <HeroSection />
      <StatsSection />
      <PartnerLogosSection />
      <WasWirAndersSection />
      <WarumSection />
      <FeaturesSection />
      <ProzessSection />
      <FaqSection />
      <InstagramSection />
    </SiteShell>
  );
}
