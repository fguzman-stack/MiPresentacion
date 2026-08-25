import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "../types/project";
import { constellationMeta } from "../data/projectsData";

export function MobileSheet({ project, lang, onClose, onOpen }: {
  project: Project | null;
  lang: "es" | "en";
  onClose: () => void;
  onOpen: (p: Project) => void;
}) {
  if (!project) return null;
  const tagline = lang === "en" ? project.taglineEN : project.taglineES;
  const meta = constellationMeta[project.constellation];
  const isMobile = project.type === "mobile";

  const handleDrag = (_: any, info: PanInfo) => {
    if (info.offset.y > 80) onClose();
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDrag}
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-[24px] border-t border-white/10 bg-[rgba(14,14,37,0.96)] backdrop-blur-[20px] p-6"
          >
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4" />
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-['Orbitron'] text-[1.1rem] font-bold text-white flex-1">{project.name}</h3>
              <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold border" style={{ background: `${meta.color}18`, borderColor: `${meta.color}55`, color: meta.color }}>
                {isMobile ? "MOBILE" : "WEB"}
              </span>
            </div>
            <div className="relative h-[180px] rounded-[12px] overflow-hidden border border-white/10 bg-black/40 mb-4">
              {!isMobile ? (
                <iframe src={project.url} title={project.name} loading="lazy" sandbox="allow-scripts allow-same-origin" className="w-full h-full border-0 pointer-events-none" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: project.previewColor }}>
                  <ExternalLink className="w-10 h-10 text-white/70" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#03030c]/60 to-transparent pointer-events-none" />
            </div>
            <p className="font-['Inter'] text-[0.9rem] leading-relaxed text-[rgba(244,241,255,0.7)] mb-2">{tagline}</p>
            <p className="font-['Inter'] text-[0.8rem] text-[#9b7bff]/80 mb-3">{project.featureHighlight}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.tech.map((t) => (
                <span key={t} className="font-['JetBrains_Mono'] text-[0.65rem] px-2.5 py-1 rounded-[6px] bg-white/5 border border-white/10 text-white/60">{t}</span>
              ))}
            </div>
            <div className="flex gap-3">
              {!isMobile ? (
                <a href={project.url} target="_blank" rel="noopener" className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-[10px] text-sm font-semibold text-white" style={{ background: `linear-gradient(135deg, ${meta.color}, #9b7bff)` }}>
                  {lang === "en" ? "Open project" : "Abrir proyecto"} <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <button onClick={() => onOpen(project)} className="flex-1 py-3 rounded-[10px] text-sm font-semibold text-white" style={{ background: `linear-gradient(135deg, ${meta.color}, #9b7bff)` }}>
                  {lang === "en" ? "Request APK" : "Solicitar APK"}
                </button>
              )}
              <button onClick={onClose} className="px-6 py-3 rounded-[10px] border border-white/10 text-white/70">Cerrar</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
