import { useState, useMemo, useEffect, useRef } from "react";
import { projects } from "../data/projectsData";
import { OrbitCard } from "./OrbitCard";
import Swal from "sweetalert2";
import type { Project } from "../types/project";
import { t, type Lang } from "../lib/i18n";
import { projectDescription, projectFeature, projectTagline } from "../lib/projectText";
import { useConnectionQuality } from "../hooks/useConnectionQuality";
import { getPreviewImage } from "../lib/previewImages";
import { Orbit } from "lucide-react";
import { useMediaQuery } from "../hooks/useMediaQuery";

type ExploreIntent = "auto" | "web" | "ai";

const intentMatches: Record<Exclude<ExploreIntent, "auto">, (project: Project) => boolean> = {
  web: (project) => project.type === "web",
  ai: (project) => [project.name, project.feature, project.taglineES, project.taglineEN, ...project.tech].join(" ").toLowerCase().includes("ai") || [project.name, project.feature, project.taglineES, project.taglineEN, ...project.tech].join(" ").toLowerCase().includes("ia"),
};

export function NebulaMap({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState("all");
  const [intent, setIntent] = useState<ExploreIntent>("auto");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [iframeError, setIframeError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const INITIAL_VISIBLE = 6;
  const STEP = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const connectionQuality = useConnectionQuality();
  const isCompactDevice = useMediaQuery("(max-width: 760px)");
  const mapProjects = useMemo(() => projects.filter((project) => project.type === "web"), []);

  const filtered = useMemo(() => {
    const base = filter === "all" ? mapProjects : mapProjects.filter((p) => p.constellation === filter);
    const withScore = base.map((project, index) => {
      let score = 0;
      if (intent !== "auto" && intentMatches[intent](project)) score += 40;
      if (intent === "auto" && !isCompactDevice && project.type === "web") score += 4;
      return { project, score, index };
    });
    return withScore.sort((a, b) => b.score - a.score || a.index - b.index).map(({ project }) => project);
  }, [filter, intent, isCompactDevice, mapProjects]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [filter, intent]);

  const visibleProjects = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const canLoadMore = visibleCount < filtered.length;

  const getTagline = (p: Project) => projectTagline(p, lang);

  // lock scroll when modal open + esc handler
  useEffect(() => {
    if (previewProject) {
      const previousFocus = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      dialogRef.current?.querySelector<HTMLButtonElement>(".preview-btn-close")?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setPreviewProject(null);
        if (e.key === "Tab") {
          const elements = dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button, iframe');
          if (!elements?.length) return;
          const first = elements[0], last = elements[elements.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      window.addEventListener("keydown", onKey);
      return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); previousFocus?.focus(); };
    } else {
      document.body.style.overflow = "";
    }
  }, [previewProject]);

  useEffect(() => {
    if (!previewProject || previewProject.type !== "desktop") return;
    const screenshots = previewProject.screenshots ?? (previewProject.screenshot ? [previewProject.screenshot] : []);
    const onKey = (event: KeyboardEvent) => {
      if (!screenshots.length) return;
      if (event.key === "ArrowRight") setActiveScreenshot((current) => (current + 1) % screenshots.length);
      if (event.key === "ArrowLeft") setActiveScreenshot((current) => (current - 1 + screenshots.length) % screenshots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewProject]);

  useEffect(() => { setIframeError(false); }, [previewProject]);

  const showMobileModal = (p: Project) => {
    const screenshots = p.screenshots ?? (p.screenshot ? [p.screenshot] : []);
    Swal.fire({
      title: `<span style="font-family:Orbitron,sans-serif;font-size:1.1rem">${p.name}</span>`,
      html: `
        <div style="text-align:left;font-family:Inter,sans-serif">
          ${screenshots.length ? `<div class="project-gallery project-gallery-mobile">${screenshots.map((src, index) => `<a href="${src}" target="_blank" rel="noopener noreferrer" class="project-gallery-item"><img src="${src}" alt="${p.name} screenshot ${index + 1}" loading="lazy" /></a>`).join("")}</div>` : ""}
          <p style="margin-bottom:14px;color:rgba(244,241,255,0.7);font-size:0.9rem;line-height:1.5">${getTagline(p)}</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">
            ${p.tech.map((tech) => `<span style="background:rgba(155,123,255,0.12);padding:4px 10px;border-radius:6px;font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#9b7bff;border:1px solid rgba(155,123,255,0.2)">${tech}</span>`).join("")}
          </div>
          <p style="font-size:0.9rem;color:#b9bdd0;line-height:1.7">${projectDescription(p, lang)}</p>
          <p style="margin:18px 0;color:#d0c5ff">${projectFeature(p, lang)}</p>
          ${p.id === "codepet" ? `<div class="feature-links"><a class="button button-primary" href="${p.url}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>${p.downloadUrl ? `<a class="text-link" href="${p.downloadUrl}" target="_blank" rel="noopener noreferrer">${t(lang, "mobile_releases")} ↗</a>` : ""}</div>` : ""}
        </div>
      `,
      showCancelButton: false,
      confirmButtonText: t(lang, "close"),
      cancelButtonText: t(lang, "close"),
      background: "#0e0e25",
      color: "#f4f1ff",
      confirmButtonColor: "#9b7bff",
      cancelButtonColor: "rgba(255,255,255,0.08)",
      width: Math.min(window.innerWidth - 32, 860),
      customClass: {
        popup: "rounded-2xl border border-white/10 backdrop-blur-xl",
        confirmButton: "swal2-confirm-custom",
        cancelButton: "swal2-cancel-custom",
      },
      didOpen: (popup) => {
        const items = Array.from(popup.querySelectorAll<HTMLElement>(".project-gallery-item"));
        items.forEach((item) => item.setAttribute("tabindex", "0"));
        const onKey = (event: KeyboardEvent) => {
          const current = items.indexOf(document.activeElement as HTMLElement);
          if (event.key === "ArrowRight" && items.length) items[(Math.max(0, current) + 1) % items.length].focus();
          if (event.key === "ArrowLeft" && items.length) items[(Math.max(0, current) - 1 + items.length) % items.length].focus();
        };
        popup.addEventListener("keydown", onKey);
      },
    });
  };

  const handleCardClick = (p: Project) => {
    if (p.type === "mobile") {
      showMobileModal(p);
    } else {
      setPreviewProject(p);
      setActiveScreenshot(0);
      setIframeError(false);
    }
  };

  const intentOptions: { id: ExploreIntent; label: string; desc: string }[] = [
    { id: "auto", label: t(lang, "intent_auto"), desc: isCompactDevice ? t(lang, "intent_auto_mobile") : t(lang, "intent_auto_desktop") },
    { id: "web", label: t(lang, "intent_web"), desc: t(lang, "intent_web_desc") },
    { id: "ai", label: t(lang, "intent_ai"), desc: t(lang, "intent_ai_desc") },
  ];

  const chooseIntent = (nextIntent: ExploreIntent) => {
    setIntent(nextIntent);
    if (nextIntent === "web" || nextIntent === "ai" || nextIntent === "auto") setFilter("all");
  };

  const filters = [
    { id: "all", label: t(lang, "filter_all") },
    { id: "nebula-tech", label: t(lang, "filter_tech") },
    { id: "orbita-reservas", label: t(lang, "filter_booking") },
    { id: "aurora-creative", label: t(lang, "filter_creative") },
  ];

  return (
    <>
      <section id="apps" className="section" data-aos>
        <div className="editorial-heading">
          <div><span className="eyebrow">{t(lang, "projects_kicker")}</span>
          <h2>{t(lang, "projects_title_a")}<br /><span className="gradient-text">{t(lang, "projects_title_b")}</span></h2></div>
          <p>{mapProjects.length} {t(lang, "projects_desc")}</p>
        </div>

        <div className="nebula-filters" role="group" aria-label="Filtros">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`filter-pill ${filter === f.id ? "active" : ""}`}
              data-filter={f.id}
              data-i18n={`filter_${f.id === "all" ? "all" : f.id === "nebula-tech" ? "tech" : f.id === "orbita-reservas" ? "booking" : "creative"}`}
              onClick={() => setFilter(f.id)}
              type="button"
              aria-pressed={filter === f.id}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="smart-guide" aria-label={t(lang, "intent_label")}>
          <div>
            <span className="eyebrow">{t(lang, "intent_kicker")}</span>
            <p>{intentOptions.find((option) => option.id === intent)?.desc}</p>
          </div>
          <div className="smart-guide-options" role="group" aria-label={t(lang, "intent_label")}>
            {intentOptions.map((option) => (
              <button key={option.id} type="button" className={`smart-pill ${intent === option.id ? "active" : ""}`} onClick={() => chooseIntent(option.id)} aria-pressed={intent === option.id}>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="nebula-map" id="nebulaMap" aria-live="polite">
          {visibleProjects.map((p, i) => (
            <OrbitCard key={p.id} project={p} index={i} lang={lang} onClick={handleCardClick} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 mt-10">
          <p className="text-xs tracking-widest uppercase font-semibold text-white/40 flex items-center gap-2" aria-live="polite">
            <Orbit className="w-3.5 h-3.5 text-[#8b6cff]/60" />
            {t(lang, "showing")} {Math.min(visibleCount, filtered.length)} {t(lang, "of")} {filtered.length} {t(lang, "projects")}
          </p>
          {canLoadMore && (
            <div className="relative group p-[1.5px] rounded-full bg-gradient-to-r from-[#8b6cff] via-[#d66bff] to-[#54dcff] shadow-[0_0_30px_rgba(139,108,255,0.25)] hover:shadow-[0_0_45px_rgba(139,108,255,0.45)] transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8b6cff]/20 to-[#54dcff]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <button
                onClick={() => setVisibleCount((c) => Math.min(c + STEP, filtered.length))}
                className="relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[rgba(14,14,37,0.92)] backdrop-blur-xl border border-white/5 text-sm font-bold tracking-wide text-white focus:outline-none focus:ring-2 focus:ring-[#8b6cff]/40 overflow-hidden"
                aria-label={t(lang, "load_more")}
                type="button"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#8b6cff]/0 via-white/[0.06] to-[#54dcff]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                {t(lang, "load_more")}
                <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-white/80">
                  +{filtered.length - visibleCount}
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {previewProject && (
        <div ref={dialogRef} className="preview-overlay" onClick={() => setPreviewProject(null)} role="dialog" aria-modal="true" aria-label={`${previewProject.name} preview`}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preview-header">
              <div className="preview-header-left">
                <div className="preview-header-title">{previewProject.name}</div>
                <div className="preview-header-sub">{getTagline(previewProject)} · {previewProject.feature}</div>
              </div>
              <div className="preview-header-actions">
                <a href={previewProject.url} target="_blank" rel="noopener noreferrer" className="preview-btn-external">
                  {t(lang, "preview_open_external")}
                </a>
                <button className="preview-btn-close" onClick={() => setPreviewProject(null)} aria-label={t(lang, "close")}>✕</button>
              </div>
            </div>
            {previewProject.type === "web" && (
              <div className="px-4 py-2 bg-[#8b6cff]/10 border-y border-[#8b6cff]/15 text-[0.72rem] text-[#c4b5fd] flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8b6cff]/20 border border-[#8b6cff]/30 text-[0.65rem] font-bold tracking-wide">◆ {t(lang, "template_badge")}</span>
                <span className="opacity-80">{t(lang, "template_disclaimer")}</span>
              </div>
            )}
            <div className="preview-iframe-wrap">
              {(() => {
                if (previewProject.type === "desktop") {
                  const screenshots = previewProject.screenshots ?? (previewProject.screenshot ? [previewProject.screenshot] : []);
                  const currentScreenshot = screenshots[activeScreenshot] ?? screenshots[0];
                  return (
                    <div className="desktop-gallery-view">
                      <div className="desktop-gallery-copy">
                        <p>{projectDescription(previewProject, lang)}</p>
                        <div className="card-tech">{previewProject.tech.map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}</div>
                      </div>
                      {currentScreenshot && (
                        <a href={currentScreenshot} target="_blank" rel="noopener noreferrer" className="desktop-gallery-hero">
                          <img src={currentScreenshot} alt={`${previewProject.name} screenshot ${activeScreenshot + 1}`} loading="eager" decoding="async" />
                        </a>
                      )}
                      <p className="gallery-key-hint">{t(lang, "gallery_key_hint")}</p>
                      <div className="project-gallery project-gallery-desktop project-gallery-thumbs">
                        {screenshots.map((src, index) => (
                          <button type="button" className={`project-gallery-item ${activeScreenshot === index ? "active" : ""}`} key={src} onClick={() => setActiveScreenshot(index)}>
                            <img src={src} alt={`${previewProject.name} screenshot ${index + 1}`} loading="lazy" decoding="async" />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }
                const isSlow = connectionQuality === "slow";
                const imageSrc = previewProject ? getPreviewImage(previewProject.id) : null;
                const showImageInstead = isSlow && imageSrc;
                if (showImageInstead) {
                  return (
                    <div className="relative w-full h-full bg-[#0a0a1a] flex flex-col">
                      <img src={imageSrc!} alt={`${previewProject.name} preview`} className="w-full h-full object-contain object-top" loading="eager" decoding="async" />
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-[0.7rem] text-white/70 border border-white/10">{t(lang, "connection_slow_notice")}</div>
                    </div>
                  );
                }
                return (
                  <>
                    {!iframeError ? (
                      <iframe
                        src={previewProject.url}
                        title={`${previewProject.name} preview`}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        loading="eager"
                        onError={() => setIframeError(true)}
                      />
                    ) : null}
                    {iframeError && (
                      <div className="preview-iframe-fallback">
                        <p style={{ fontFamily: "Orbitron, sans-serif", fontWeight: 700, fontSize: "1.1rem" }}>{t(lang, "preview_iframe_error_title")}</p>
                        <p style={{ fontSize: "0.9rem", maxWidth: "420px", lineHeight: 1.5 }}>{t(lang, "preview_iframe_error_desc")}</p>
                        <a href={previewProject.url} target="_blank" rel="noopener noreferrer" className="preview-btn-external" style={{ marginTop: "8px" }}>
                          {t(lang, "preview_open_new_tab")}
                        </a>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
