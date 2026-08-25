import type { Project } from "../types/project";

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

  const ctaText = isMobile ? "Solicitar APK" : "Abrir proyecto ↗";

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
          <iframe src={project.url} loading="lazy" title={`${project.name} preview`} sandbox="allow-same-origin allow-scripts" />
        ) : null}
        <div className="card-preview-overlay" />
        {isMobile && (
          <>
            <div className="mobile-ring" />
            <div className="card-preview-fallback">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}>APK disponible</span>
            </div>
          </>
        )}
      </div>

      <div className="card-content">
        <div className="card-header">
          <div className="card-title">{project.name}</div>
          <div className="card-type">{project.type}</div>
        </div>
        <div className="card-desc">{tagline}</div>
        <div className="card-feature">{feature}</div>
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
