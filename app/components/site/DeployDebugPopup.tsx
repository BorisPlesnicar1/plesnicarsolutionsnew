"use client";

import { useState } from "react";

/**
 * TEMP deploy check – remove after verifying Vercel.
 * 1) Set ENABLE_DEPLOY_DEBUG to false, OR
 * 2) Delete this file + the import in home-page.tsx
 */
export const ENABLE_DEPLOY_DEBUG = true;

export function DeployDebugPopup() {
  const [open, setOpen] = useState(ENABLE_DEPLOY_DEBUG);

  if (!ENABLE_DEPLOY_DEBUG || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deploy-debug-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-[#ff1900]/40 bg-[#0a0a0f] p-6 shadow-2xl shadow-[#ff1900]/20">
        <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#ff8a72] mb-2">Deploy-Debug</p>
        <h2 id="deploy-debug-title" className="text-xl font-bold text-white mb-2">
          Neues Vercel-Setup läuft
        </h2>
        <p className="text-sm text-white/65 font-light leading-relaxed mb-4">
          Wenn du dieses Fenster siehst, kommt die Seite vom neuen Account/Projekt
          (<span className="text-white/90 font-medium">plesnicarsolutionsnew</span>).
        </p>
        <p className="text-[11px] text-white/35 font-mono mb-5 break-all">
          marker=deploy-debug-2026-07-19 · host={typeof window !== "undefined" ? window.location.host : "…"}
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-[#ff1900] to-[#ff2d00] text-white text-sm font-bold shadow-lg shadow-[#ff1900]/25 hover:from-[#e61700] hover:to-[#ff1900] transition-colors"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
