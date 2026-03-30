/**
 * "some" + großzügiges rootMargin: verhindert, dass Above-the-fold-Inhalte mit opacity:0
 * hängen bleiben, wenn der erste IntersectionObserver-Frame noch nicht feuert (v. a. Mobile/Safari).
 */
export const motionViewport = {
  once: true,
  amount: "some" as const,
  margin: "120px 0px 120px 0px",
};

/** Lange Marketing-Seiten (z. B. Preise): sanfter Einblend-Punkt, weniger Zappeln am Viewport-Rand. */
export const motionViewportLong = {
  once: true,
  amount: 0.12,
  margin: "100px 0px 14% 0px",
};
export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};
/** `initial: {}` ist nötig: mit `initial="initial"` + fehlendem Key bleiben Kinder sonst unsichtbar (z. B. Preise-Hero). */
export const staggerParent = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
export const staggerItem = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
export const cardReveal = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};
