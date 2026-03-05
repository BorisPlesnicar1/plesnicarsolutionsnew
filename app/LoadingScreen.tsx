"use client";

import { useState, useEffect, useRef } from "react";

const MIN_DISPLAY_MS = 5000;
const LOADING_CLOSED_EVENT = "ps-loading-closed";

const win = typeof window !== "undefined" ? (window as unknown as { __ps_loading_closed?: boolean }) : null;

function dispatchLoadingClosed() {
  if (win) win.__ps_loading_closed = true;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LOADING_CLOSED_EVENT));
  }
}

const SKIP_BUTTON_DELAY_MS = 2400;

export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const mountedAt = useRef(Date.now());
  const loadFired = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipButtonTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = () => {
    setVisible(false);
    dispatchLoadingClosed();
  };

  useEffect(() => {
    const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop && win) {
      win.__ps_loading_closed = false;
    }
    if (!isDesktop) {
      dispatchLoadingClosed();
    }
  }, []);

  useEffect(() => {
    skipButtonTimeoutRef.current = setTimeout(() => setShowSkipButton(true), SKIP_BUTTON_DELAY_MS);
    return () => {
      if (skipButtonTimeoutRef.current) {
        clearTimeout(skipButtonTimeoutRef.current);
        skipButtonTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const tryHide = () => {
      if (!loadFired.current) return;
      const elapsed = Date.now() - mountedAt.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      timeoutRef.current = setTimeout(hide, remaining);
    };

    let onLoad: (() => void) | null = null;
    if (document.readyState === "complete") {
      loadFired.current = true;
      tryHide();
    } else {
      onLoad = () => {
        loadFired.current = true;
        tryHide();
      };
      window.addEventListener("load", onLoad);
    }

    return () => {
      if (onLoad) window.removeEventListener("load", onLoad);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const handleClick = () => hide();

  return (
    <>
      {children}
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        className="fixed inset-0 z-[9999] hidden md:flex items-center justify-center bg-[#090a11] transition-opacity duration-500 ease-out cursor-pointer"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
        aria-hidden={!visible}
        aria-label="Ladeanimation schließen"
      >
        <video
          src="/terminal_showcase__copy_.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="max-h-[70vh] max-w-[90vw] w-auto h-auto object-contain pointer-events-none"
          aria-label="Ladeanimation"
        />
        {showSkipButton && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl bg-[#ff1900] hover:bg-[#e61700] text-white font-semibold text-sm transition-colors shadow-lg shadow-[#ff1900]/30 min-h-[44px]"
          >
            Seite anzeigen
          </button>
        )}
      </div>
    </>
  );
}
