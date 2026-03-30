import { SiteProvider } from "@/app/contexts/SiteContext";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <SiteProvider>{children}</SiteProvider>;
}
