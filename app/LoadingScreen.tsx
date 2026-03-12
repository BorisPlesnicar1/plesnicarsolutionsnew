"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const MIN_DISPLAY_MS = 2200;
const LOADING_CLOSED_EVENT = "ps-loading-closed";
const PROGRESS_INTERVAL_MS = 26;
const PROGRESS_STEP = 2;
const COMPLETE_PAUSE_MS = 300;
const SKIP_BUTTON_DELAY_MS = 1400;

const win =
  typeof window !== "undefined"
    ? (window as unknown as { __ps_loading_closed?: boolean })
    : null;

function dispatchLoadingClosed() {
  if (win) win.__ps_loading_closed = true;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LOADING_CLOSED_EVENT));
  }
}

const ease = [0.22, 1, 0.36, 1];

export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const mountedAt = useRef(Date.now());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitDoneRef = useRef(false);

  const hide = () => {
    if (exiting) return;
    setExiting(true);
  };

  const finishExit = () => {
    if (exitDoneRef.current) return;
    exitDoneRef.current = true;
    setVisible(false);
    dispatchLoadingClosed();
  };

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(finishExit, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exiting]);

  useEffect(() => {
    if (win) win.__ps_loading_closed = false;
  }, []);

  useEffect(() => {
    skipRef.current = setTimeout(() => setShowSkip(true), SKIP_BUTTON_DELAY_MS);
    return () => {
      if (skipRef.current) clearTimeout(skipRef.current);
    };
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 100;
        }
        return Math.min(100, p + PROGRESS_STEP);
      });
    }, PROGRESS_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    completeRef.current = setTimeout(() => {
      const elapsed = Date.now() - mountedAt.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      completeRef.current = setTimeout(hide, remaining);
    }, COMPLETE_PAUSE_MS);
    return () => {
      if (completeRef.current) clearTimeout(completeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            role="button"
            tabIndex={0}
            onClick={() => !exiting && hide()}
            onKeyDown={(e) => e.key === "Enter" && !exiting && hide()}
            className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer overflow-hidden bg-[#050506]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            style={{ pointerEvents: visible ? "auto" : "none" }}
            aria-hidden={!visible}
            aria-label="Ladeanimation schließen"
          >
            {/* Ein roter Sweep von links nach rechts – dezenter, ein Statement */}
            {!exiting && (
              <motion.div
                className="absolute inset-0 z-[2] pointer-events-none"
                aria-hidden
              >
                <motion.div
                  className="absolute inset-y-0 w-[55vw] max-w-[480px]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "120vw" }}
                  transition={{
                    duration: 1,
                    ease,
                  }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,25,0,0.08) 30%, rgba(255,25,0,0.4) 48%, rgba(255,45,0,0.55) 50%, rgba(255,25,0,0.4) 52%, rgba(255,25,0,0.08) 70%, transparent 100%)",
                    boxShadow: "0 0 60px rgba(255,25,0,0.15)",
                  }}
                />
              </motion.div>
            )}

            {/* Hintergrund: ruhig, leichtes Grid */}
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(180deg, #070709 0%, #050506 50%, #070709 100%)",
              }}
            />
            <div
              className="absolute inset-0 z-[1] opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
              aria-hidden
            />

            {/* Logo + Progress – klare Einblendung, kein Gimmick */}
            <motion.div
              className="relative z-10 flex flex-col items-center gap-9 px-6 pointer-events-none"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                ease,
              }}
            >
              <div className="relative w-full max-w-[200px] sm:max-w-[260px]">
                <Image
                  src="/logos/LogoTEXTB.png"
                  alt="Plesnicar Solutions"
                  width={280}
                  height={84}
                  className="w-full h-auto"
                  priority
                />
                <div
                  className="absolute -inset-6 -z-10 rounded-full opacity-80"
                  style={{
                    background: "radial-gradient(circle, rgba(255,25,0,0.06) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
              </div>

              <div className="w-full max-w-[240px] sm:max-w-[280px] space-y-2.5">
                <div className="h-px rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#ff1900]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.15, ease: "linear" }}
                  />
                </div>
                <p className="text-center text-white/30 text-[10px] font-medium tracking-[0.25em] uppercase">
                  Laden
                </p>
              </div>
            </motion.div>

            {/* Exit: weicher Fade, optional ein dezenter Wisch */}
            {exiting && (
              <motion.div
                className="absolute inset-0 z-[20] pointer-events-none bg-[#050506]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease }}
              />
            )}

            {showSkip && !exiting && (
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.35 }}
                onClick={(e) => {
                  e.stopPropagation();
                  hide();
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/40 hover:text-white/60 text-[10px] font-medium tracking-widest uppercase transition-colors min-h-[44px] pointer-events-auto"
              >
                Überspringen
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
