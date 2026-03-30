"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PaketPreisOption } from "@/lib/preise-page";

type PaketPricingToggleProps = {
  options: readonly PaketPreisOption[];
  ariaGroupLabel: string;
};

export function PaketPricingToggle({ options, ariaGroupLabel }: PaketPricingToggleProps) {
  const firstId = options[0]?.id ?? "";
  const [activeId, setActiveId] = useState(firstId);
  const active = options.find((o) => o.id === activeId) ?? options[0];
  const groupId = useId();
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.id === activeId)
  );

  if (!options.length || !active) {
    return null;
  }

  return (
    <div className="space-y-5">
      <div
        role="radiogroup"
        aria-labelledby={`${groupId}-label`}
        className="relative inline-flex w-full max-w-md rounded-xl p-[1px] bg-gradient-to-br from-white/[0.18] via-white/[0.06] to-[#ff1900]/15 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.75),0_0_40px_-18px_rgba(255,25,0,0.12)]"
      >
        <div className="relative flex w-full rounded-[11px] border border-white/[0.06] bg-[#060608]/95 supports-[backdrop-filter]:backdrop-blur-xl p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <span id={`${groupId}-label`} className="sr-only">
          {ariaGroupLabel}
        </span>
        <span
          className="pointer-events-none absolute top-1 bottom-1 left-1 rounded-lg bg-gradient-to-b from-[#ff1900]/25 via-white/[0.1] to-white/[0.03] border border-[#ff1900]/35 shadow-[0_0_24px_-4px_rgba(255,25,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          style={{
            width: "calc(50% - 4px)",
            transform:
              activeIndex === 0 ? "translateX(0)" : "translateX(calc(100% + 4px))",
          }}
          aria-hidden
        />
        {options.map((opt) => {
          const selected = activeId === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setActiveId(opt.id)}
              className="relative z-10 flex-1 min-h-[44px] rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060608]"
            >
              <span
                className={`relative z-10 block text-center leading-tight ${
                  selected ? "text-white" : "text-white/45 hover:text-white/70"
                }`}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
        </div>
      </div>

      <div className="min-h-[5.5rem] md:min-h-[5rem]">
        {/* sync: schnelle Tab-Wechsel blockieren nicht (kein Warten auf Exit wie bei "wait") */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            <p className="text-2xl md:text-3xl font-black tabular-nums tracking-tight bg-gradient-to-r from-[#ff7a5c] via-[#ff4d33] to-[#ff8f6b] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(255,45,30,0.25)]">
              {active.priceFrom}
            </p>
            <p className="text-sm text-white/50 font-light leading-relaxed max-w-lg">
              {active.explainer}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
