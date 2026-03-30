import type { ReactNode } from "react";

type Tone = "red" | "muted" | "emerald";

/**
 * Redaktionelles Sektions-Label (Strich + Text) statt runder „AI-Pill“-Badge.
 */
export function SectionKicker({
  children,
  className = "",
  tone = "red",
  align = "start",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  align?: "start" | "center";
  size?: "default" | "compact";
}) {
  const bar =
    tone === "red" ? "bg-[#ff1900]" : tone === "emerald" ? "bg-emerald-400/80" : "bg-white/40";
  const text =
    tone === "red"
      ? "text-[#ff1900]"
      : tone === "emerald"
        ? "text-emerald-200/90"
        : "text-white/55";
  const textSize = size === "compact" ? "text-xs tracking-[0.16em]" : "text-sm tracking-[0.12em]";
  return (
    <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""} ${className}`}>
      <span className={`h-4 w-0.5 shrink-0 rounded-[1px] ${bar}`} aria-hidden />
      <span className={`font-semibold uppercase ${textSize} ${text}`}>{children}</span>
    </div>
  );
}

/** Kompakte Zeile für Float-Karten / Bildunterschriften (kein Kapsel-Container). */
export function MicroKicker({
  children,
  className = "",
  tone = "red",
}: {
  children: ReactNode;
  className?: string;
  tone?: "red" | "emerald";
}) {
  const bar = tone === "red" ? "border-[#ff1900]/50" : "border-emerald-400/45";
  const text = tone === "red" ? "text-[#ff6b52]" : "text-emerald-200/85";
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.1em] border-l-2 pl-2.5 ${bar} ${text} ${className}`}>
      {children}
    </p>
  );
}
