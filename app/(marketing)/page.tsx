import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { pageJsonLdGraph } from "@/lib/jsonld";
import { HomePage } from "./home-page";

const SITE = "https://plesnicarsolutions.at";

const DESC =
  "Schwerpunkt IT: Beratung, Web, Grafik & Systeme aus Österreich. Ergänzend Hausbetreuung, Baustoffe und Unterstützung im Bau. Jetzt anfragen.";

export const metadata: Metadata = {
  title: "Plesnicar Solutions – IT & Digital aus Österreich",
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Plesnicar Solutions – IT & Digital aus Österreich",
    description:
      "Schwerpunkt IT: Beratung, Web, Grafik & Systeme. Ergänzend Hausbetreuung, Baustoffe und Unterstützung im Bau – aus Österreich.",
    url: SITE,
  },
};

const homeJsonLd = pageJsonLdGraph({
  path: "/",
  name: "Plesnicar Solutions – IT & Digital aus Österreich",
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
