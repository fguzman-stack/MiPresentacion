import type { Project } from "../types/project";
import { t, type Lang } from "../lib/i18n";
import { projectFeature, projectTagline } from "../lib/projectText";
import { useConnectionQuality } from "../hooks/useConnectionQuality";
import { getPreviewImage } from "../lib/previewImages";

export function OrbitCard({ project, index, lang, onClick }: {
  project: Project;
  index: number;
  lang: Lang;
  onClick: (p: Project) => void;
}) {
  const isMobile = project.type === "mobile";
  const isDesktop = project.type === "desktop";
  const tagline = projectTagline(project, lang);
  const color = project.color ?? "#9b7bff";
  const color2 = project.color2 ?? "#54dcff";
  const preview = project.preview ?? project.previewColor ?? "linear-gradient(135deg, #667eea, #764ba2)";
  const feature = projectFeature(project, lang);

  const ctaText = isMobile ? t(lang, "mobile_card_cta") : `${t(lang, "hud_open")} ↗`;
  const connection = useConnectionQuality();
  const useImage = !isMobile && connection !== "unknown" && connection !== "fast";
  const imageSrc = !isMobile ? getPreviewImage(project.id) : null;

  return (
    <article
      className="orbit-card"
      style={{
        ["--card-glow" as string]: color,
        ["--card-glow-2" as string]: color2,
        animationDelay: `${index * 0.07}s`,
      } as React.CSSProperties}
    >
      <div className="card-preview" style={{ ["--preview-bg" as string]: preview } as React.CSSProperties}>
        {isMobile || isDesktop ? (
          project.screenshot ? (
            <img
              src={project.screenshot}
              alt={`${project.name} screenshot`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top"
            />
          ) : null
        ) : (
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
            <iframe src={project.url} loading="lazy" tabIndex={-1} title={`${project.name} preview`} sandbox="allow-same-origin allow-scripts" />
          )
        )}
        <div className="card-preview-overlay" />
        {!isMobile && !isDesktop && (
          <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/55 backdrop-blur border border-white/10 text-[0.62rem] font-semibold tracking-wide text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b6cff] animate-pulse" /> {t(lang, "template_badge")}
          </div>
        )}
        {isMobile && (
          <>
            <div className="card-preview-fallback">
              <span className="mobile-card-monogram">{project.id === "codepet" ? "{ cp }" : "AT"}</span>
              <span>ANDROID / {project.name}</span>
            </div>
          </>
        )}
        {!isMobile && useImage && imageSrc && (
          <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[0.6rem] font-mono bg-black/55 text-white/70 backdrop-blur">{t(lang, "connection_slow_notice")}</div>
        )}
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{project.name}</h3>
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
        {isDesktop && project.screenshot && (
          <div className="text-[0.68rem] leading-snug text-white/40 italic mt-2 border-l border-white/10 pl-2">
            {lang === "en" ? "Desktop application — screenshot from live app" : lang === "pt" ? "Aplicação desktop — captura do app real" : lang === "fr" ? "Application de bureau — capture de l'app réelle" : "Aplicación de escritorio — captura de la app real"}
          </div>
        )}
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
          {isDesktop || isMobile ? `${t(lang, "hud_open")} ↗` : `${t(lang, "hud_open")} ↗`}
        </button>
      </div>
    </article>
  );
}
