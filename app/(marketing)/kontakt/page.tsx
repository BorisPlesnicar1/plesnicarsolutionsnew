import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { pageJsonLdGraph } from "@/lib/jsonld";
import { KontaktPage } from "./kontakt-page";

const SITE = "https://plesnicarsolutions.at";

const DESC =
  "Kontaktieren Sie Plesnicar Solutions – Schwerpunkt IT & Grafikdesign; Unterstützung Bau & Hausbetreuung. Antwort innerhalb von 24 Stunden. Langenlois, Niederösterreich.";

export const metadata: Metadata = {
  title: "Kontakt",
  description: DESC,
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt | Plesnicar Solutions",
    description: "Telefon, E-Mail und Standort – wir freuen uns auf Ihre Anfrage.",
    url: `${SITE}/kontakt`,
  },
};

const kontaktJsonLd = pageJsonLdGraph({
  path: "/kontakt",
  name: "Kontakt",
  description: DESC,
  breadcrumbs: [
    { name: "Start", path: "/" },
    { name: "Kontakt", path: "/kontakt" },
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd data={kontaktJsonLd} />
      <KontaktPage />
    </>
  );
}
