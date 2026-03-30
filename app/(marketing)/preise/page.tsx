import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/app/components/JsonLd";
import { pageJsonLdGraph } from "@/lib/jsonld";
import { PreisePage } from "./preise-page";
import { buildPreiseMetadata, getPreiseMetaDescription, localeFromSearchParams } from "@/lib/seo-pages";

type Search = Promise<{ lang?: string | string[] }>;

export async function generateMetadata(props: { searchParams: Search }): Promise<Metadata> {
  const sp = await props.searchParams;
  return buildPreiseMetadata(localeFromSearchParams(sp));
}

const preiseJsonLd = pageJsonLdGraph({
  path: "/preise",
  name: "Richtpreise",
  description: getPreiseMetaDescription("de"),
  breadcrumbs: [
    { name: "Start", path: "/" },
    { name: "Richtpreise", path: "/preise" },
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd data={preiseJsonLd} />
      <Suspense fallback={null}>
        <PreisePage />
      </Suspense>
    </>
  );
}
