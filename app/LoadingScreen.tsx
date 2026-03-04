"use client";

import { useState, useEffect, useRef } from "react";

const MIN_DISPLAY_MS = 5000;

export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const mountedAt = useRef(Date.now());
  const loadFired = useRef(false);

  const hide = () => setVisible(false);

  useEffect(() => {
    const tryHide = () => {
      if (!loadFired.current) return;
      const elapsed = Date.now() - mountedAt.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(hide, remaining);
    };

    if (document.readyState === "complete") {
      loadFired.current = true;
      tryHide();
      return;
    }

    const onLoad = () => {
      loadFired.current = true;
      tryHide();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
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
        className="fixed inset-0 z-[9999] hidden md:flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-500 ease-out cursor-pointer"
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
      </div>
    </>
  );
}
