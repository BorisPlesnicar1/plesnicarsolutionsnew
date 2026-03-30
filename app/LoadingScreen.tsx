"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

/** Kürzer = besserer LCP/Speed Index (PSI); Intro nur noch auf der Startseite sichtbar. */
const MIN_DISPLAY_MS = 950;
const LOADING_CLOSED_EVENT = "ps-loading-closed";
const PROGRESS_FILL_MS = 650;
const COMPLETE_PAUSE_MS = 120;
const SKIP_BUTTON_DELAY_MS = 450;
const EXIT_ANIM_MS = 380;

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

const SEEN_KEY = "ps_loading_seen";

export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const mountedAt = useRef(Date.now());
  const rafRef = useRef<number>(0);
  const completeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitDoneRef = useRef(false);

  const finishExit = useCallback(() => {
    if (exitDoneRef.current) return;
    exitDoneRef.current = true;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
    dispatchLoadingClosed();
  }, []);

  const hide = useCallback(() => {
    if (exiting) return;
    setExiting(true);
  }, [exiting]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(finishExit, EXIT_ANIM_MS);
    return () => clearTimeout(t);
  }, [exiting, finishExit]);

  useEffect(() => {
    if (win) win.__ps_loading_closed = false;
  }, []);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY) === "1") {
        setVisible(false);
        dispatchLoadingClosed();
        exitDoneRef.current = true;
      }
    } catch {
      /* ignore */
    }
  }, []);

  /** Kein Vollbild-Intro auf Unterseiten – besserer LCP/TBT bei direkten Links. */
  useLayoutEffect(() => {
    if (pathname !== "/") {
      finishExit();
    }
  }, [pathname, finishExit]);

  useEffect(() => {
    skipRef.current = setTimeout(() => setShowSkip(true), SKIP_BUTTON_DELAY_MS);
    return () => {
      if (skipRef.current) clearTimeout(skipRef.current);
    };
  }, []);

  useEffect(() => {
    const syncProgress = () => {
      const elapsed = Date.now() - mountedAt.current;
      return Math.min(100, (elapsed / PROGRESS_FILL_MS) * 100);
    };

    /** ~30 fps reicht für den Balken; weniger setState = geringere Main-Thread-Last (TBT). */
    const UI_INTERVAL_MS = 32;
    let lastUiMs = 0;

    const loop = () => {
      const p = syncProgress();
      const now = Date.now();
      if (now - lastUiMs >= UI_INTERVAL_MS || p >= 100) {
        lastUiMs = now;
        setProgress(p);
      }
      if (p < 100) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      const p = syncProgress();
      lastUiMs = Date.now();
      setProgress(p);
      if (p < 100) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    rafRef.current = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      document.removeEventListener("visibilitychange", onVisibility);
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
  }, [progress, hide]);

  return (
    <>
      {children}
      {visible && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => !exiting && hide()}
          onKeyDown={(e) => e.key === "Enter" && !exiting && hide()}
          className={`loading-screen-overlay fixed inset-0 z-[9999] flex cursor-pointer items-center justify-center overflow-hidden bg-[#050506] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            exiting ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          style={{ willChange: exiting ? "opacity" : "auto" }}
          aria-hidden={!visible}
          aria-label="Ladeanimation schließen"
        >
          {!exiting && (
            <div className="loading-sweep-wrap pointer-events-none absolute inset-0 z-[2]" aria-hidden>
              <div className="loading-sweep-bar absolute inset-y-0 w-[55vw] max-w-[480px]" />
            </div>
          )}

          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: "linear-gradient(180deg, #070709 0%, #050506 50%, #070709 100%)",
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

          <div className="loading-screen-logo relative z-10 flex flex-col items-center gap-9 px-6 pointer-events-none">
            <div className="relative w-full max-w-[200px] sm:max-w-[260px]">
              <Image
                src="/logos/LogoTEXTB.png"
                alt="Plesnicar Solutions"
                width={280}
                height={84}
                className="h-auto w-full"
                priority
                sizes="(max-width: 640px) 200px, 260px"
              />
              <div
                className="absolute -inset-6 -z-10 rounded-full opacity-80"
                style={{
                  background: "radial-gradient(circle, rgba(255,25,0,0.06) 0%, transparent 70%)",
                  boxShadow: "0 0 40px rgba(255,25,0,0.12)",
                }}
                aria-hidden
              />
            </div>

            <div className="w-full max-w-[240px] space-y-2.5 sm:max-w-[280px]">
              <div className="h-px overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-[#ff1900] transition-[width] duration-150 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">Laden</p>
            </div>
          </div>

          {showSkip && !exiting && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                hide();
              }}
              className="pointer-events-auto absolute bottom-8 left-1/2 z-20 min-h-[44px] -translate-x-1/2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-white/40 transition-colors hover:bg-white/[0.08] hover:text-white/60"
            >
              Überspringen
            </button>
          )}
        </div>
      )}
    </>
  );
}
