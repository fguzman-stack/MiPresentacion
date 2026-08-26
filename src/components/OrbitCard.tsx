import type { Project } from "../types/project";
import { t } from "../lib/i18n";
import { useConnectionQuality } from "../hooks/useConnectionQuality";
import { getPreviewImage } from "../lib/previewImages";

export function OrbitCard({ project, index, lang, onClick }: {
  project: Project;
  index: number;
  lang: "es" | "en";
  onClick: (p: Project) => void;
}) {
  const isMobile = project.type === "mobile";
  const tagline = lang === "en" ? project.taglineEN : project.taglineES;
  const color = project.color ?? "#9b7bff";
  const color2 = project.color2 ?? "#54dcff";
  const preview = project.preview ?? project.previewColor ?? "linear-gradient(135deg, #667eea, #764ba2)";
  const feature = project.feature ?? project.featureHighlight ?? "";

  const ctaText = isMobile ? t(lang, "modal_mobile_btn") : `${t(lang, "hud_open")} ↗`;
  const connection = useConnectionQuality();
  const useImage = !isMobile && connection !== "unknown" && connection !== "fast";
  const imageSrc = !isMobile ? getPreviewImage(project.id) : null;

  return (
    <div
      className="orbit-card"
      style={{
        ["--card-glow" as string]: color,
        ["--card-glow-2" as string]: color2,
        animationDelay: `${index * 0.07}s`,
      } as React.CSSProperties}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(project); }}
      aria-label={`${project.name}: ${tagline}`}
    >
      <div className="card-preview" style={{ ["--preview-bg" as string]: preview } as React.CSSProperties}>
        {!isMobile ? (
          useImage && imageSrc ? (
            <img
              src={imageSrc}
              alt={`${project.name} preview`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                console.error(`[OrbitCard] imagen no carga: ${imageSrc}`, e);
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
              onLoad={() => console.log(`[OrbitCard] imagen ok: ${imageSrc}`)}
            />
          ) : (
            <iframe src={project.url} loading="lazy" title={`${project.name} preview`} sandbox="allow-same-origin allow-scripts" />
          )
        ) : null}
        <div className="card-preview-overlay" />
        {!isMobile && (
          <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/55 backdrop-blur border border-white/10 text-[0.62rem] font-semibold tracking-wide text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b6cff] animate-pulse" /> {t(lang, "template_badge")}
          </div>
        )}
        {isMobile && (
          <>
            <div className="mobile-ring" />
            <div className="card-preview-fallback">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}>{t(lang, "hud_apk")}</span>
            </div>
          </>
        )}
        {!isMobile && useImage && imageSrc && (
          <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[0.6rem] font-mono bg-black/55 text-white/70 backdrop-blur">{t(lang, "connection_slow_notice")}</div>
        )}
      </div>

      <div className="card-content">
        <div className="card-header">
          <div className="card-title">{project.name}</div>
          <div className="card-type">{project.type}</div>
        </div>
        <div className="card-desc">{tagline}</div>
        <div className="card-feature">{feature}</div>
        {!isMobile && (
          <div className="text-[0.68rem] leading-snug text-white/40 italic mb-2 border-l border-white/10 pl-2">
            {t(lang, "template_disclaimer")}
          </div>
        )}
        <div className="card-tech">
          {project.tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="card-hover-hud">
        <button
          className="hud-cta"
          data-project={project.id}
          onClick={(e) => {
            e.stopPropagation();
            onClick(project);
          }}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}
