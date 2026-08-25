import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "../types/project";
import { constellationMeta } from "../data/projectsData";
import { useEffect, useState, useRef } from "react";

export function TelescopeHUD({ project, anchorRect, lang, onClose }: {
  project: Project | null;
  anchorRect: DOMRect | null;
  lang: "es" | "en";
  onClose: () => void;
}) {
  const [iframeError, setIframeError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!project || !anchorRect) return;
    const hudW = 380, hudH = 420;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left = anchorRect.left + anchorRect.width / 2 - hudW / 2;
    let top = anchorRect.top - hudH - 16;
    left = Math.max(12, Math.min(left, vw - hudW - 12));
    if (top < 12) top = anchorRect.bottom + 12;
    if (top + hudH > vh - 12) top = vh - hudH - 12;
    setPos({ left, top });
  }, [project, anchorRect]);

  useEffect(() => { setIframeError(false); }, [project]);

  if (!project) return null;
  const tagline = lang === "en" ? project.taglineEN : project.taglineES;
  const meta = constellationMeta[project.constellation];
  const isMobile = project.type === "mobile";

  return (
    <AnimatePresence>
      {project && pos && (
        <motion.div
          ref={ref}
          key={project.id}
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={(e) => {
            const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            setSpot({ x, y });
          }}
          onMouseLeave={onClose}
          style={{ left: pos.left, top: pos.top, position: "fixed", zIndex: 50, width: 380 }}
          className="rounded-[24px] border border-[rgba(151,127,255,0.25)] bg-[rgba(14,14,37,0.92)] backdrop-blur-[28px] backdrop-saturate-[1.3] p-6 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)_inset] overflow-hidden"
        >
          {/* spotlight border */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[24px] opacity-60"
            style={{
              background: `radial-gradient(400px circle at ${spot.x}% ${spot.y}%, ${meta.color}15, transparent 60%)`,
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-['Orbitron'] text-[1.1rem] font-bold text-white flex-1">{project.name}</h3>
              <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold border" style={{ background: `${meta.color}18`, borderColor: `${meta.color}55`, color: meta.color }}>
                {isMobile ? "MOBILE" : "WEB"}
              </span>
            </div>
            {/* Preview */}
            <div className="relative h-[220px] rounded-[12px] overflow-hidden border border-white/10 bg-black/40 mb-4">
              {!isMobile && !iframeError ? (
                <iframe
                  src={project.url}
                  title={project.name}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  className="w-full h-full border-0 pointer-events-none"
                  onError={() => setIframeError(true)}
                  onLoad={(e) => {
                    try {
                      const doc = (e.target as HTMLIFrameElement).contentDocument;
                      if (!doc || doc.body.innerHTML === "") setIframeError(true);
                    } catch { /* cross-origin, keep */ }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: project.previewColor }}>
                  <ExternalLink className="w-10 h-10 text-white/70" />
                </div>
              )}
              {iframeError && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: project.previewColor }}>
                  <ExternalLink className="w-10 h-10 text-white/70" />
                </div>
              )}
            </div>
            <p className="font-['Inter'] text-[0.85rem] leading-relaxed text-[rgba(244,241,255,0.7)] mb-3">{tagline}</p>
            <p className="font-['Inter'] text-[0.78rem] text-[#9b7bff]/80 mb-3">{project.featureHighlight}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t) => (
                <span key={t} className="font-['JetBrains_Mono'] text-[0.65rem] px-2.5 py-1 rounded-[6px] bg-[rgba(255,255,255,0.06)] border border-white/10 text-white/60">{t}</span>
              ))}
            </div>
            {!isMobile ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-[10px] text-sm font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${meta.color}, #9b7bff)` }}
              >
                {lang === "en" ? "Open project" : "Abrir proyecto"} <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <div className="text-center text-[0.8rem] text-white/60">APK bajo solicitud</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
