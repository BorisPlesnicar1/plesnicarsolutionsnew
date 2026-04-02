"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { PROJECT_TRANSLATIONS, TRANSLATIONS } from "@/app/translations";
import { useSite } from "@/app/contexts/SiteContext";
import { SectionBackground } from "@/app/components/site/SectionBackground";
import { SectionKicker } from "@/app/components/site/SectionKicker";
import { motionViewport, staggerItem, staggerParent } from "@/app/components/site/motion-presets";
import {
  PROJECTS,
  formatProjectStandDate,
  getClosestProjectIndexToCenter,
  projectFocusShadow,
  projectHoverShadow,
  type Project,
} from "@/lib/projects";

export function ProjekteSection() {
  const { lang } = useSite();
  const t = TRANSLATIONS[lang];
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectModalImageIndex, setProjectModalImageIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [projectsCarouselHasOverflow, setProjectsCarouselHasOverflow] = useState(true);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const projectCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActiveRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const listener = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const projectStandText = (project: Project) => {
    const d = formatProjectStandDate(project.updatedAt, lang);
    if (!d || !project.updatedAt) return null;
    return { iso: project.updatedAt, label: t.projekte.projectStand.replace("{date}", d) };
  };

  const modalStand = selectedProject ? projectStandText(selectedProject) : null;

  useEffect(() => {
    const container = projectsScrollRef.current;
    const update = () => {
      const cards = projectCardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!container || cards.length === 0) return;
      const overflow = container.scrollWidth - container.clientWidth > 4;
      setProjectsCarouselHasOverflow((prev) => (prev === overflow ? prev : overflow));
      if (!overflow) {
        if (lastActiveRef.current !== 0) {
          lastActiveRef.current = 0;
          setActiveProjectIndex(0);
        }
        return;
      }
      const next = getClosestProjectIndexToCenter(container, cards);
      if (next !== lastActiveRef.current) {
        lastActiveRef.current = next;
        setActiveProjectIndex(next);
      }
    };
    update();
    container?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (container && ro) ro.observe(container);
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(update);
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      container?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [lang, PROJECTS.length]);

  return (
    <>
      <section id="projekte" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 relative border-t border-white/5 overflow-hidden bg-[#070709]">
        <SectionBackground />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-10 md:mb-14"
            initial="initial"
            whileInView="animate"
            viewport={motionViewport}
            variants={staggerParent}
          >
            <motion.div variants={staggerItem} className="mb-4 flex justify-center">
              <SectionKicker align="center">{t.projekte.label}</SectionKicker>
            </motion.div>
            <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {t.projekte.title}{" "}
              <span className="bg-gradient-to-r from-[#ff1900] to-[#ff3d00] bg-clip-text text-transparent">{t.projekte.titleHighlight}</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="text-base text-white/50 font-light max-w-xl mx-auto mt-3">
              {t.projekte.subtitle}
            </motion.p>
          </motion.div>

          <p className="text-center text-white/40 text-sm mb-2 md:mb-3">{t.projekte.scrollHint}</p>
          <p className="text-center text-[11px] font-medium text-white/50 mb-4 md:mb-5 max-w-lg mx-auto leading-relaxed">
            <span className="text-[#ff6b52] font-semibold">IT</span>
            <span className="text-white/25 mx-2" aria-hidden>
              ·
            </span>
            <span>{t.projekte.categoryIt}</span>
            <span className="text-white/25 mx-2.5" aria-hidden>
              |
            </span>
            <span className="text-amber-400 font-semibold">Bau</span>
            <span className="text-white/25 mx-2" aria-hidden>
              ·
            </span>
            <span>{t.projekte.categoryBau}</span>
          </p>
          <p className="text-center text-white/35 text-xs mb-4 md:mb-5 max-w-md mx-auto">{t.projekte.itBauHint}</p>

          {/* LED-Streifen: kein backdrop-blur / kein 3D-Tilt — deutlich günstiger beim ersten Paint */}
          <div className="relative w-full mb-10 md:mb-14 overflow-hidden" aria-hidden>
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff1900]/8 via-transparent to-[#ff1900]/8 pointer-events-none z-10" />
            <div className="py-5 md:py-6 border-y border-[#ff1900]/20 bg-[#080808]">
              <div className="flex items-center overflow-hidden">
                <div className="led-ticker-track flex items-stretch gap-5 md:gap-6 shrink-0 pl-4 md:pl-6" style={{ width: "max-content" }}>
                  {[...PROJECTS, ...PROJECTS].map((project, i) => {
                    const sub = PROJECT_TRANSLATIONS[lang][project.id]?.subtitle ?? project.subtitle ?? "";
                    const stand = projectStandText(project);
                    const ledAlt = [project.title, sub, t.projekte.imageAltPreview].filter(Boolean).join(" – ");
                    return (
                    <div
                      key={`${project.id}-${i}`}
                      className={`flex-shrink-0 w-[200px] sm:w-[230px] md:w-[260px] rounded-xl overflow-hidden bg-[#0d0d0d] shadow-xl ${
                        project.category === "bau"
                          ? "border border-amber-500/35 ring-1 ring-amber-500/15"
                          : "border border-[#ff1900]/25 ring-1 ring-[#ff1900]/10"
                      }`}
                      style={{ boxShadow: "0 12px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)" }}
                    >
                      <div className="relative aspect-[4/3] bg-white/5">
                        <Image
                          src={project.images[0]}
                          alt={ledAlt}
                          fill
                          className="object-cover opacity-95"
                          sizes="260px"
                          loading="lazy"
                          decoding="async"
                        />
                        <span
                          className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide text-white ${
                            project.category === "bau" ? "bg-amber-600/95" : "bg-[#ff1900]/95"
                          }`}
                        >
                          {project.category === "bau" ? t.projekte.categoryBau : t.projekte.categoryIt}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute bottom-2 left-2.5 right-2.5">
                          <p className="text-white font-bold text-sm truncate drop-shadow-lg">{project.title}</p>
                          <p className="text-white/80 text-xs truncate mt-0.5">
                            {PROJECT_TRANSLATIONS[lang][project.id]?.subtitle ?? project.subtitle ?? ""}
                          </p>
                          {stand && (
                            <p className="text-white/55 text-[10px] mt-1 tabular-nums truncate">
                              <time dateTime={stand.iso}>{stand.label}</time>
                            </p>
                          )}
                        </div>
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
                      </div>
                    </div>
                  );
                  })}
                </div>
              </div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-28 bg-gradient-to-r from-[#070709] via-[#070709]/95 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-28 bg-gradient-to-l from-[#070709] via-[#070709]/95 to-transparent pointer-events-none z-10" />
          </div>

          <div className="relative -mx-4 sm:mx-0">
            <div
              ref={projectsScrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden pb-4 pt-1 px-4 sm:px-0 scroll-smooth snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
            >
              {PROJECTS.map((project, i) => {
                const stand = projectStandText(project);
                const isActive = projectsCarouselHasOverflow && activeProjectIndex === i;
                const isHovered = hoveredCardIndex === i;
                const boxShadow = prefersReducedMotion
                  ? undefined
                  : isHovered
                    ? projectHoverShadow(project.category)
                    : projectFocusShadow(project.category, isActive);
                const transform = prefersReducedMotion
                  ? undefined
                  : !projectsCarouselHasOverflow
                    ? "scale(1) translateY(0)"
                    : isHovered
                      ? "scale(1.04) translateY(-8px)"
                      : isActive
                        ? "scale(1.03) translateY(-6px)"
                        : "scale(0.98) translateY(0)";

                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      projectCardRefs.current[i] = el;
                    }}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[340px] snap-center first:snap-start last:snap-end flex justify-center"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProject(project);
                        setProjectModalImageIndex(0);
                      }}
                      onMouseEnter={() => !prefersReducedMotion && setHoveredCardIndex(i)}
                      onMouseLeave={() => setHoveredCardIndex(null)}
                      onFocus={() => !prefersReducedMotion && setHoveredCardIndex(i)}
                      onBlur={() => setHoveredCardIndex(null)}
                      className={`w-full max-w-[340px] text-left rounded-2xl border bg-[#0a0a0a]/90 overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070709] motion-reduce:transition-none ${
                        prefersReducedMotion
                          ? ""
                          : "transition-[transform,box-shadow] duration-200 ease-out will-change-transform"
                      } ${
                        project.category === "bau"
                          ? "border-amber-500/25 focus-visible:ring-amber-500"
                          : "border-white/[0.1] focus-visible:ring-[#ff1900]"
                      }`}
                      style={{
                        boxShadow,
                        transform,
                      }}
                    >
                      <div className="relative aspect-[4/3] bg-white/[0.03] overflow-hidden">
                        <Image
                          src={project.images[0]}
                          alt={
                            [project.title, PROJECT_TRANSLATIONS[lang][project.id]?.subtitle ?? project.subtitle].filter(Boolean).join(" – ") +
                            " " +
                            t.projekte.imageAltPreview
                          }
                          fill
                          className="object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-110"
                          sizes="(max-width: 640px) 280px, 340px"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none" />
                        <span className="absolute top-3 left-3 text-white/80 font-mono text-xs tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-[1] max-w-[55%]">
                          <span
                            className={`px-2 py-0.5 rounded-md text-white text-[10px] font-semibold uppercase tracking-wider ${
                              project.category === "bau"
                                ? "bg-amber-600/95 ring-1 ring-amber-400/40"
                                : "bg-[#ff1900]/95 ring-1 ring-white/20"
                            }`}
                          >
                            {project.category === "bau" ? t.projekte.categoryBau : t.projekte.categoryIt}
                          </span>
                          {project.inHouse && (
                            <span className="px-2 py-0.5 rounded-md bg-white/15 text-white text-[10px] font-semibold uppercase tracking-wider ring-1 ring-white/25">
                              {t.projekte.inHouseLabel}
                            </span>
                          )}
                        </div>
                        <span className="absolute bottom-3 left-3 right-3 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none">
                          {t.projekte.showInfo}
                        </span>
                      </div>
                      <div className="p-4 md:p-5 relative">
                        <h3 className="font-bold text-white text-lg group-hover:text-[#ff1900] transition-colors">
                          {project.title}
                          {(PROJECT_TRANSLATIONS[lang][project.id]?.subtitle ?? project.subtitle) && (
                            <span className="block text-sm font-medium text-white/60 mt-0.5">
                              {PROJECT_TRANSLATIONS[lang][project.id]?.subtitle ?? project.subtitle}
                            </span>
                          )}
                        </h3>
                        {stand && (
                          <p className="mt-2 text-xs text-white/45 tabular-nums">
                            <time dateTime={stand.iso}>{stand.label}</time>
                          </p>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
            {PROJECTS.length > 1 && projectsCarouselHasOverflow && (
              <div className="flex justify-center gap-2 mt-5 md:mt-6">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      const container = projectsScrollRef.current;
                      const card = projectCardRefs.current[i];
                      if (container && card) {
                        const left = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
                        container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
                      }
                    }}
                    className="rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070709]"
                    aria-label={t.projekte.ariaGoToProject.replace("%s", String(i + 1))}
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        activeProjectIndex === i ? "w-8 h-2.5 bg-[#ff1900]" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
            {PROJECTS.length > 1 && projectsCarouselHasOverflow && (
              <div className="flex md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:right-0 md:pointer-events-none justify-center md:justify-between gap-3 mt-4 md:mt-0 md:px-0">
                <button
                  type="button"
                  onClick={() => projectsScrollRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
                  className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0a0a0a]/90 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-colors pointer-events-auto z-20"
                  aria-label={t.projekte.ariaPrev}
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => projectsScrollRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
                  className="flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0a0a0a]/90 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-colors pointer-events-auto z-20"
                  aria-label={t.projekte.ariaNext}
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#0a0a0a] shadow-2xl"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff1900]"
              aria-label={t.modal.close}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-2 pr-12">
                <span
                  className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white ${
                    selectedProject.category === "bau" ? "bg-amber-600/95 ring-1 ring-amber-400/35" : "bg-[#ff1900]/95 ring-1 ring-white/20"
                  }`}
                >
                  {selectedProject.category === "bau" ? t.projekte.categoryBau : t.projekte.categoryIt}
                </span>
                {selectedProject.inHouse && (
                  <span className="inline-flex items-center rounded-md bg-white/12 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white ring-1 ring-white/20">
                    {t.projekte.inHouseLabel}
                  </span>
                )}
              </div>
              <h2 id="project-modal-title" className="text-2xl md:text-3xl font-bold text-white pr-12">
                {selectedProject.title}
                {(PROJECT_TRANSLATIONS[lang][selectedProject.id]?.subtitle ?? selectedProject.subtitle) && (
                  <span className="block text-lg font-medium text-white/60 mt-1">
                    {PROJECT_TRANSLATIONS[lang][selectedProject.id]?.subtitle ?? selectedProject.subtitle}
                  </span>
                )}
              </h2>
              {modalStand && (
                <p className="mt-2 text-sm text-white/45 tabular-nums">
                  <time dateTime={modalStand.iso}>{modalStand.label}</time>
                </p>
              )}

              <div className="mt-6 rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.08]">
                <div className="relative aspect-video">
                  <Image
                    src={selectedProject.images[projectModalImageIndex]}
                    alt={`${selectedProject.title} – ${t.modal.imageAlt} ${projectModalImageIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                </div>
                {selectedProject.images.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto border-t border-white/[0.06]">
                    {selectedProject.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setProjectModalImageIndex(idx)}
                        className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                          projectModalImageIndex === idx
                            ? selectedProject.category === "bau"
                              ? "border-amber-500 ring-2 ring-amber-500/35"
                              : "border-[#ff1900] ring-2 ring-[#ff1900]/30"
                            : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${selectedProject.title} – ${t.projekte.imageAltPreview} ${idx + 1}`}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="mt-6 text-white/70 leading-relaxed text-sm md:text-base">
                {PROJECT_TRANSLATIONS[lang][selectedProject.id]?.description?.trim() ||
                  selectedProject.description?.trim() ||
                  t.projekte.fallbackDescription}
              </p>

              {selectedProject.category === "bau" && (
                <p className="mt-4 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-amber-100/95 text-xs md:text-sm leading-relaxed">
                  {t.projekte.bauBefaehigungHinweis}
                </p>
              )}

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex items-center gap-2 px-4 py-3 rounded-xl text-white font-semibold text-sm transition-colors ${
                    selectedProject.category === "bau"
                      ? "bg-amber-600 hover:bg-amber-500 shadow-lg shadow-amber-600/25"
                      : "bg-[#ff1900] hover:bg-[#e61700] shadow-lg shadow-[#ff1900]/25"
                  }`}
                >
                  {PROJECT_TRANSLATIONS[lang][selectedProject.id]?.linkLabel ?? selectedProject.linkLabel ?? t.projekte.moreInfo}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
