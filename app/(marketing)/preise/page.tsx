import type { Metadata } from "next";
import { Suspense } from "react";
import { LegacyRedirect } from "@/app/components/site/LegacyRedirect";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/it" },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LegacyRedirect rules={[{ hash: "preise-bau", to: "/bau" }]} fallback="/it" />
    </Suspense>
  );
}
