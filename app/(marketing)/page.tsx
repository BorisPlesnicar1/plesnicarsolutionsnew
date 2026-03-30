import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { pageJsonLdGraph } from "@/lib/jsonld";
import { HomePage } from "./home-page";

const SITE = "https://plesnicarsolutions.at";

/** ~150–220 Zeichen; Kernbegriffe für Snippet & Tools */
const DESC =
  "Schwerpunkt IT: Beratung, Web, Grafik & Systeme für Unternehmen und Privatkunden in Österreich. Ergänzend Hausbetreuung, Baustoffe und Unterstützung im Bau durch Ing. Dietmar Plesnicar. Jetzt anfragen – Langenlois, NÖ.";

/** Ohne layout.tsx-Template, sonst doppelt: „… | Plesnicar Solutions“ und >60 Zeichen */
const HOME_TITLE =
  "Plesnicar Solutions – IT, Web & Hausbetreuung | NÖ";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_TITLE,
    description: DESC,
    url: SITE,
  },
};

const homeJsonLd = pageJsonLdGraph({
  path: "/",
  name: HOME_TITLE,
  description: DESC,
  breadcrumbs: [{ name: "Start", path: "/" }],
});

export default function Page() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HomePage />
    </>
  );
}
