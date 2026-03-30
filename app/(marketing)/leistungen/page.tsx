import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { pageJsonLdGraph } from "@/lib/jsonld";
import { LeistungenPage } from "./leistungen-page";

const SITE = "https://plesnicarsolutions.at";

const DESC =
  "IT, Grafikdesign, Bau, Hausbetreuung & Handel – unsere Leistungen und ausgewählte Projekte von Plesnicar Solutions aus Österreich.";

export const metadata: Metadata = {
  title: "Leistungen & Projekte",
  description: DESC,
  alternates: { canonical: "/leistungen" },
  openGraph: {
    title: "Leistungen & Projekte | Plesnicar Solutions",
    description: "Unsere Dienstleistungen und Referenzprojekte aus IT, Digital und Bau.",
    url: `${SITE}/leistungen`,
  },
};

const leistungenJsonLd = pageJsonLdGraph({
  path: "/leistungen",
  name: "Leistungen & Projekte",
  description: DESC,
  breadcrumbs: [
    { name: "Start", path: "/" },
    { name: "Leistungen & Projekte", path: "/leistungen" },
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd data={leistungenJsonLd} />
      <LeistungenPage />
    </>
  );
}
