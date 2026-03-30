"use client";

import { useCallback, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Building2, Code2, Cpu, Hammer, HardHat, Laptop, Monitor, Wrench } from "lucide-react";
import { MicroKicker } from "@/app/components/site/SectionKicker";

export type ItBauMiniGameCopy = {
  title: string;
  blurb: string;
  itLabel: string;
  bauLabel: string;
  again: string;
  winTitle: string;
  winSub: string;
  loseTitle: string;
  loseSub: string;
  points: string;
  lives: string;
  ariaGame: string;
};

type Cat = "it" | "bau";

const DECK: readonly { Icon: LucideIcon; cat: Cat }[] = [
  { Icon: Laptop, cat: "it" },
  { Icon: Code2, cat: "it" },
  { Icon: Cpu, cat: "it" },
  { Icon: Monitor, cat: "it" },
  { Icon: Hammer, cat: "bau" },
  { Icon: Wrench, cat: "bau" },
  { Icon: Building2, cat: "bau" },
  { Icon: HardHat, cat: "bau" },
];

const WIN_SCORE = 8;
const START_LIVES = 3;

function randomCard() {
  return DECK[Math.floor(Math.random() * DECK.length)]!;
}

type Props = { copy: ItBauMiniGameCopy };

export function ItBauMicroGame({ copy }: Props) {
  const [status, setStatus] = useState<"play" | "won" | "lost">("play");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(START_LIVES);
  const [card, setCard] = useState(() => randomCard());
  const lockRef = useRef(false);

  const reset = useCallback(() => {
    lockRef.current = false;
    setStatus("play");
    setScore(0);
    setLives(START_LIVES);
    setCard(randomCard());
  }, []);

  const onPick = useCallback(
    (choice: Cat) => {
      if (status !== "play" || lockRef.current) return;
      lockRef.current = true;
      const correct = choice === card.cat;
      if (correct) {
        const next = score + 1;
        setScore(next);
        if (next >= WIN_SCORE) {
          setStatus("won");
          lockRef.current = false;
          return;
        }
      } else {
        const nextL = lives - 1;
        setLives(nextL);
        if (nextL <= 0) {
          setStatus("lost");
          lockRef.current = false;
          return;
        }
      }
      setCard(randomCard());
      requestAnimationFrame(() => {
        lockRef.current = false;
      });
    },
    [status, card.cat, score, lives]
  );

  const Icon = card.Icon;

  return (
    <div
      className="rounded-xl border border-white/[0.08] bg-[#0c0c10]/90 p-4 sm:p-5"
      role="region"
      aria-label={copy.ariaGame}
    >
      <MicroKicker tone="red" className="mb-2 text-[10px] tracking-[0.14em]">
        {copy.title}
      </MicroKicker>
      <p className="text-xs text-white/45 mb-4 leading-relaxed">{copy.blurb}</p>

      {status === "play" && (
        <>
          <div className="flex items-center justify-between gap-3 text-[11px] text-white/50 mb-4">
            <span>
              {copy.points}: <span className="text-white font-semibold tabular-nums">{score}</span>/{WIN_SCORE}
            </span>
            <span>
              {copy.lives}: <span className="text-white font-semibold tabular-nums">{lives}</span>
            </span>
          </div>

          <div className="flex justify-center py-6 mb-4 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-[#ff6b52]" strokeWidth={1.5} aria-hidden />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onPick("it")}
              className="min-h-[52px] rounded-xl bg-gradient-to-br from-[#ff1900]/25 to-[#ff1900]/10 border border-[#ff1900]/35 text-white text-sm font-bold active:scale-[0.98] transition-transform touch-manipulation"
            >
              {copy.itLabel}
            </button>
            <button
              type="button"
              onClick={() => onPick("bau")}
              className="min-h-[52px] rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-100 text-sm font-bold active:scale-[0.98] transition-transform touch-manipulation"
            >
              {copy.bauLabel}
            </button>
          </div>
        </>
      )}

      {status === "won" && (
        <div className="text-center py-4 space-y-3">
          <p className="text-lg font-bold text-white [font-family:var(--font-syne)]">{copy.winTitle}</p>
          <p className="text-sm text-white/55 leading-relaxed">{copy.winSub}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 min-h-[44px] px-5 rounded-xl border border-white/15 bg-white/5 text-sm font-medium text-white hover:bg-white/10 touch-manipulation"
          >
            {copy.again}
          </button>
        </div>
      )}

      {status === "lost" && (
        <div className="text-center py-4 space-y-3">
          <p className="text-lg font-bold text-white/90 [font-family:var(--font-syne)]">{copy.loseTitle}</p>
          <p className="text-sm text-white/55 leading-relaxed">{copy.loseSub}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 min-h-[44px] px-5 rounded-xl border border-white/15 bg-white/5 text-sm font-medium text-white hover:bg-white/10 touch-manipulation"
          >
            {copy.again}
          </button>
        </div>
      )}
    </div>
  );
}
