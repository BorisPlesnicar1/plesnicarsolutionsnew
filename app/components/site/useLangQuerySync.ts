"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSite } from "@/app/contexts/SiteContext";

/** Wenn die URL `?lang=en` oder `?lang=de` enthält, Sprache im Kontext setzen (SEO + Teilen). */
export function useLangQuerySync() {
  const params = useSearchParams();
  const { setLang } = useSite();

  useEffect(() => {
    const q = params.get("lang");
    if (q === "en") setLang("en");
    else if (q === "de") setLang("de");
  }, [params, setLang]);
}
