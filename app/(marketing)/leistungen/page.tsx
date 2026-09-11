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
      <LegacyRedirect
        rules={[
          { hash: "leistung-bau", to: "/bau" },
          { hash: "leistung-baustoff", to: "/bau" },
          { hash: "leistung-energie", to: "/bau" },
          { hash: "leistung-it", to: "/it" },
          { hash: "projekte", to: "/referenzen" },
        ]}
        fallback="/it"
      />
    </Suspense>
  );
}
