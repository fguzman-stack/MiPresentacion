import { useState, useMemo, useEffect } from "react";
import { projects } from "../data/projectsData";
import { OrbitCard } from "./OrbitCard";
import Swal from "sweetalert2";
import type { Project } from "../types/project";
import { t } from "../lib/i18n";
import { useConnectionQuality } from "../hooks/useConnectionQuality";
import { getPreviewImage } from "../lib/previewImages";
import { Orbit } from "lucide-react";

const EMAIL = "familiazv2016@gmail.com";

export function NebulaMap({ lang }: { lang: "es" | "en" }) {
  const [filter, setFilter] = useState("all");
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [iframeError, setIframeError] = useState(false);
  const INITIAL_VISIBLE = 6;
  const STEP = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const connectionQuality = useConnectionQuality();

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.constellation === filter);
  }, [filter]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [filter]);

  const visibleProjects = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const canLoadMore = visibleCount < filtered.length;

  const getTagline = (p: Project) => (lang === "en" ? p.taglineEN : p.taglineES);

  // lock scroll when modal open + esc handler
  useEffect(() => {
    if (previewProject) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPreviewProject(null); };
      window.addEventListener("keydown", onKey);
      return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
    } else {
      document.body.style.overflow = "";
    }
  }, [previewProject]);

  useEffect(() => { setIframeError(false); }, [previewProject]);

  const showMobileModal = (p: Project) => {
    Swal.fire({
      title: `<span style="font-family:Orbitron,sans-serif;font-size:1.1rem">${p.name}</span>`,
      html: `
        <div style="text-align:left;font-family:Inter,sans-serif">
          <p style="margin-bottom:14px;color:rgba(244,241,255,0.7);font-size:0.9rem;line-height:1.5">${getTagline(p)}</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">
            ${p.tech.map((tech) => `<span style="background:rgba(155,123,255,0.12);padding:4px 10px;border-radius:6px;font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#9b7bff;border:1px solid rgba(155,123,255,0.2)">${tech}</span>`).join("")}
          </div>
          <p style="font-size:0.82rem;color:rgba(244,241,255,0.4);line-height:1.4">${p.feature}. ${t(lang, "modal_mobile_desc")}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: t(lang, "modal_mobile_btn"),
      cancelButtonText: t(lang, "close"),
      background: "#0e0e25",
      color: "#f4f1ff",
      confirmButtonColor: "#9b7bff",
      cancelButtonColor: "rgba(255,255,255,0.08)",
      customClass: {
        popup: "rounded-2xl border border-white/10 backdrop-blur-xl",
        confirmButton: "swal2-confirm-custom",
        cancelButton: "swal2-cancel-custom",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `mailto:${EMAIL}?subject=Solicitud%20APK%20${encodeURIComponent(p.name)}`;
      }
    });
  };

  const handleCardClick = (p: Project) => {
    if (p.type === "mobile") {
      showMobileModal(p);
    } else {
      setPreviewProject(p);
      setIframeError(false);
    }
  };

  const filters = [
    { id: "all", label: t(lang, "filter_all") },
    { id: "nebula-tech", label: t(lang, "filter_tech") },
    { id: "orbita-reservas", label: t(lang, "filter_booking") },
    { id: "aurora-creative", label: t(lang, "filter_creative") },
    { id: "satellites", label: t(lang, "filter_mobile") },
  ];

  return (
    <>
      <section id="apps" className="section" data-aos>
        <div className="section-header">
          <span className="section-badge">
            {t(lang, "apps_badge")}
          </span>
          <h2 className="section-title">
            {lang === "en" ? (
              <>Discovered <span className="gradient-text">Systems</span></>
            ) : (
              <>Sistemas <span className="gradient-text">Descubiertos</span></>
            )}
          </h2>
          <p className="section-subtitle">
            {t(lang, "apps_subtitle")}
          </p>
        </div>

        <div className="nebula-filters" role="group" aria-label="Filtros">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`filter-pill ${filter === f.id ? "active" : ""}`}
              data-filter={f.id}
              data-i18n={`filter_${f.id === "all" ? "all" : f.id === "nebula-tech" ? "tech" : f.id === "orbita-reservas" ? "booking" : f.id === "aurora-creative" ? "creative" : "mobile"}`}
              onClick={() => setFilter(f.id)}
              type="button"
            >
              {f.label}
            </button>
          ))}
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
        <div className="preview-overlay" onClick={() => setPreviewProject(null)} role="dialog" aria-modal="true" aria-label={`${previewProject.name} preview`}>
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
