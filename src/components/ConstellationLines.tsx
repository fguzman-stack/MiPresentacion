import { motion } from "framer-motion";
import type { Project } from "../types/project";

const constellationGroups: Record<string, string[]> = {
  "nebula-tech": ["ai-boost", "aimpact", "nexusstream", "promptflow", "reviewroom"],
  "orbita-reservas": ["latambooker", "bookingsuite", "nichebooker", "barberia", "vetflow"],
  "aurora-creative": ["auradesign", "creatorflow", "comidacallejera"],
  satellites: ["a-tiempo", "mitad-mitad", "despensa-dia"],
};

const colors: Record<string, string> = {
  "nebula-tech": "#54dcff",
  "orbita-reservas": "#9b7bff",
  "aurora-creative": "#ff63b8",
  satellites: "#ffca6b",
};

export function ConstellationLines({ projects, hoveredId }: { projects: Project[]; hoveredId: string | null }) {
  const getProjectPos = (id: string) => {
    const el = document.querySelector(`[data-card-id="${id}"]`) as HTMLElement;
    if (!el) return null;
    const parent = el.closest("#nebula-grid") as HTMLElement;
    if (!parent) return null;
    const pRect = parent.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: ((r.left + r.width / 2 - pRect.left) / pRect.width) * 100,
      y: ((r.top + r.height / 2 - pRect.top) / pRect.height) * 100,
    };
  };

  // Render via SVG paths using measured positions; fallback to approximate if not mounted
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        {Object.entries(colors).map(([k, c]) => (
          <linearGradient key={k} id={`grad-${k}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={c} stopOpacity={0.1} />
            <stop offset="50%" stopColor={c} stopOpacity={0.5} />
            <stop offset="100%" stopColor={c} stopOpacity={0.1} />
          </linearGradient>
        ))}
      </defs>
      {Object.entries(constellationGroups).map(([constellation, ids]) => {
        const isHovered = hoveredId && projects.find((p) => p.id === hoveredId)?.constellation === constellation;
        // Approximate bezier path using fixed anchors per group (since grid layout, we approximate)
        // We'll compute path on mount via DOM measurement in effect, but for SSR fallback use simple polyline
        // For simplicity, don't compute live here; parent will position cards in grid and lines are decorative
        // We'll use motion.path with dash animation
        const pathData = (() => {
          // Generate smooth bezier between ids order; approximate positions based on grid order
          // This is visual only, so static paths per group are okay for premium feel
          if (constellation === "nebula-tech") return "M 15 18 C 28 14, 42 20, 50 28 C 62 36, 72 22, 84 30";
          if (constellation === "orbita-reservas") return "M 58 42 C 68 38, 76 52, 70 64 C 62 76, 48 72, 38 62";
          if (constellation === "aurora-creative") return "M 18 72 C 30 68, 42 78, 52 74";
          return "M 46 48 L 54 52 L 48 58 Z";
        })();
        return (
          <motion.path
            key={constellation}
            d={pathData}
            fill="none"
            stroke={`url(#grad-${constellation})`}
            strokeWidth={isHovered ? 1.8 : 1.2}
            opacity={isHovered ? 0.8 : 0.28}
            strokeLinecap="round"
            strokeDasharray={isHovered ? "0" : "6 8"}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: isHovered ? 0.8 : 0.28 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              filter: isHovered ? `drop-shadow(0 0 6px ${colors[constellation]})` : undefined,
            }}
          />
        );
      })}
      {/* pulse travelling light */}
      {Object.entries(constellationGroups).map(([c]) => (
        <motion.circle
          key={`pulse-${c}`}
          r={0.6}
          fill={colors[c]}
          opacity={0.6}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: `path('${c === "nebula-tech" ? "M 15 18 C 28 14, 42 20, 50 28 C 62 36, 72 22, 84 30" : c === "orbita-reservas" ? "M 58 42 C 68 38, 76 52, 70 64 C 62 76, 48 72, 38 62" : c === "aurora-creative" ? "M 18 72 C 30 68, 42 78, 52 74" : "M 46 48 L 54 52 L 48 58 Z"}')` } as any}
        />
      ))}
    </svg>
  );
}
