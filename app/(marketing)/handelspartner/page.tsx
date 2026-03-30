import type { Metadata } from "next";
import { Suspense } from "react";
import { HandelspartnerPage } from "./handelspartner-page";
import { buildHandelspartnerMetadata, localeFromSearchParams } from "@/lib/seo-pages";

type Search = Promise<{ lang?: string | string[] }>;

export async function generateMetadata(props: { searchParams: Search }): Promise<Metadata> {
  const sp = await props.searchParams;
  return buildHandelspartnerMetadata(localeFromSearchParams(sp));
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <HandelspartnerPage />
    </Suspense>
  );
}
