import type { Metadata } from "next";
import { JsonLd } from "@/app/components/JsonLd";
import { pageJsonLdGraph } from "@/lib/jsonld";
import { UeberUnsPage } from "./ueber-uns-page";

const SITE = "https://plesnicarsolutions.at";

const DESC =
  "Plesnicar Solutions – inhabergeführtes österreichisches Unternehmen für IT, Grafikdesign, Bau und Hausbetreuung. Lernen Sie unser Team kennen.";

export const metadata: Metadata = {
  title: "Über uns",
  description: DESC,
  alternates: { canonical: "/ueber-uns" },
  openGraph: {
    title: "Über uns | Plesnicar Solutions",
    description: "Unser Unternehmen – Schwerpunkt IT; Ansprechpartner und Unterstützung im Bau.",
    url: `${SITE}/ueber-uns`,
  },
};

const ueberUnsJsonLd = pageJsonLdGraph({
  path: "/ueber-uns",
  name: "Über uns",
  description: DESC,
  breadcrumbs: [
    { name: "Start", path: "/" },
    { name: "Über uns", path: "/ueber-uns" },
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd data={ueberUnsJsonLd} />
      <UeberUnsPage />
    </>
  );
}
