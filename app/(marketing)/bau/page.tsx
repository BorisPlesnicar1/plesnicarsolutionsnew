import type { Metadata } from "next";
import { Suspense } from "react";
import { JsonLd } from "@/app/components/JsonLd";
import { pageJsonLdGraph } from "@/lib/jsonld";
import { BauPage } from "./bau-page";
import { buildBauMetadata, getBauMetaDescription, localeFromSearchParams } from "@/lib/seo-pages";

type Search = Promise<{ lang?: string | string[] }>;

export async function generateMetadata(props: { searchParams: Search }): Promise<Metadata> {
  const sp = await props.searchParams;
  return buildBauMetadata(localeFromSearchParams(sp));
}

const bauJsonLd = pageJsonLdGraph({
  path: "/bau",
  name: "Bau & Baustoffe",
  description: getBauMetaDescription("de"),
  breadcrumbs: [
    { name: "Start", path: "/" },
    { name: "Bau", path: "/bau" },
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd data={bauJsonLd} />
      <Suspense fallback={null}>
        <BauPage />
      </Suspense>
    </>
  );
}
