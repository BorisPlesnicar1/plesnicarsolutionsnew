import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/app/components/JsonLd";
import { pageJsonLdGraph } from "@/lib/jsonld";
import { ReferenzenPage } from "./referenzen-page";
import { buildReferenzenMetadata, getReferenzenMetaDescription, localeFromSearchParams } from "@/lib/seo-pages";

type Search = Promise<{ lang?: string | string[] }>;

export async function generateMetadata(props: { searchParams: Search }): Promise<Metadata> {
  const sp = await props.searchParams;
  return buildReferenzenMetadata(localeFromSearchParams(sp));
}

const referenzenJsonLd = pageJsonLdGraph({
  path: "/referenzen",
  name: "Referenzen",
  description: getReferenzenMetaDescription("de"),
  breadcrumbs: [
    { name: "Start", path: "/" },
    { name: "Referenzen", path: "/referenzen" },
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd data={referenzenJsonLd} />
      <Suspense fallback={null}>
        <ReferenzenPage />
      </Suspense>
    </>
  );
}
