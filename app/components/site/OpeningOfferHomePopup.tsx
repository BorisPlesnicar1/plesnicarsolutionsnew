"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import {
  PREISE_OPENING_OFFER,
  getOpeningOfferHomePopupCopy,
  getOpeningOfferPopupDismissedStorageKey,
} from "@/lib/preise-opening-offer";

export function OpeningOfferHomePopup() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang].openingOfferPopup;
  const copy = getOpeningOfferHomePopupCopy(lang);
  const preiseHref = lang === "en" ? "/preise?lang=en" : "/preise";
  const titleId = useId();
  const descId = useId();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !PREISE_OPENING_OFFER.active) return;
    try {
      const key = getOpeningOfferPopupDismissedStorageKey();
      if (localStorage.getItem(key) === "1") return;
    } catch {
      /* private mode */
    }
    setOpen(true);
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(getOpeningOfferPopupDismissedStorageKey(), "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  if (!mounted || !open || !PREISE_OPENING_OFFER.active) {
    return null;
  }

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label={t.dismissAria}
        className="absolute inset-0 bg-[#030304]/75 backdrop-blur-md transition-opacity"
        onClick={dismiss}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative z-10 w-full max-w-[min(100%,26rem)] rounded-[1.5rem] p-[1px] bg-gradient-to-br from-white/[0.22] via-[#ff1900]/35 to-white/[0.08] shadow-[0_32px_72px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,25,0,0.12),0_0_80px_-28px_rgba(255,45,30,0.25)]"
      >
        <div className="relative rounded-[1.45rem] border border-white/[0.08] bg-[#0a0a0f]/95 supports-[backdrop-filter]:backdrop-blur-2xl px-5 pt-6 pb-5 sm:px-7 sm:pt-7 sm:pb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.45rem] opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(125deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)",
              backgroundSize: "200% 200%",
            }}
            aria-hidden
          />
          <button
            type="button"
            onClick={dismiss}
            aria-label={t.dismissAria}
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
          >
            <X className="h-4 w-4" strokeWidth={2.2} aria-hidden />
          </button>
          <div className="relative z-[1] pr-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff8a72] mb-2">{t.kicker}</p>
            <h2 id={titleId} className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
              {copy.title}
            </h2>
            <p id={descId} className="mt-3 text-sm text-white/65 font-light leading-relaxed">
              {copy.body}
            </p>
          </div>
          <div className="relative z-[1] mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={dismiss}
              className="order-2 sm:order-1 min-h-[44px] w-full sm:w-auto rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/85 transition-colors hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] sm:mr-auto"
            >
              {t.dismiss}
            </button>
            <Link
              href={preiseHref}
              onClick={dismiss}
              className="order-1 sm:order-2 min-h-[44px] inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-gradient-to-r from-[#ff1900] to-[#ff2d00] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff1900]/28 transition-[transform,box-shadow] hover:from-[#e61700] hover:to-[#ff1900] hover:shadow-xl hover:shadow-[#ff1900]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modal, document.body) : null;
}
