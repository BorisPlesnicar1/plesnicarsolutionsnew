import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/app/components/JsonLd";
import { pageJsonLdGraph } from "@/lib/jsonld";
import { ItPage } from "./it-page";
import { buildItMetadata, getItMetaDescription, localeFromSearchParams } from "@/lib/seo-pages";

type Search = Promise<{ lang?: string | string[] }>;

export async function generateMetadata(props: { searchParams: Search }): Promise<Metadata> {
  const sp = await props.searchParams;
  return buildItMetadata(localeFromSearchParams(sp));
}

const itJsonLd = pageJsonLdGraph({
  path: "/it",
  name: "IT & Web",
  description: getItMetaDescription("de"),
  breadcrumbs: [
    { name: "Start", path: "/" },
    { name: "IT", path: "/it" },
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd data={itJsonLd} />
      <Suspense fallback={null}>
        <ItPage />
      </Suspense>
    </>
  );
}
