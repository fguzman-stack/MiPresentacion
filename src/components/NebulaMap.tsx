import { useState, useMemo } from "react";
import { projects } from "../data/projectsData";
import { OrbitCard } from "./OrbitCard";
import Swal from "sweetalert2";
import type { Project } from "../types/project";

const EMAIL = "familiazv2016@gmail.com";

export function NebulaMap({ lang }: { lang: "es" | "en" }) {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.constellation === filter);
  }, [filter]);

  const getTagline = (p: Project) => (lang === "en" ? p.taglineEN : p.taglineES);

  const showMobileModal = (p: Project) => {
    Swal.fire({
      title: `<span style="font-family:Orbitron,sans-serif;font-size:1.1rem">${p.name}</span>`,
      html: `
        <div style="text-align:left;font-family:Inter,sans-serif">
          <p style="margin-bottom:14px;color:rgba(244,241,255,0.7);font-size:0.9rem;line-height:1.5">${getTagline(p)}</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">
            ${p.tech.map((t) => `<span style="background:rgba(155,123,255,0.12);padding:4px 10px;border-radius:6px;font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#9b7bff;border:1px solid rgba(155,123,255,0.2)">${t}</span>`).join("")}
          </div>
          <p style="font-size:0.82rem;color:rgba(244,241,255,0.4);line-height:1.4">${p.feature}. El APK está disponible bajo solicitud.</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Solicitar APK",
      cancelButtonText: "Cerrar",
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
      window.open(p.url, "_blank", "noopener");
    }
  };

  const filters = [
    { id: "all", label: lang === "en" ? "All" : "Todos" },
    { id: "nebula-tech", label: "SaaS & IA" },
    { id: "orbita-reservas", label: "Booking" },
    { id: "aurora-creative", label: "Creative" },
    { id: "satellites", label: lang === "en" ? "Mobile Apps" : "Apps Móviles" },
  ];

  return (
    <section id="apps" className="section" data-aos>
      <div className="section-header">
        <span className="section-badge" data-i18n="apps_badge">
          Portfolio / Galaxy
        </span>
        <h2 className="section-title" data-i18n="apps_title">
          {lang === "en" ? (
            <>Discovered <span className="gradient-text">Systems</span></>
          ) : (
            <>Sistemas <span className="gradient-text">Descubiertos</span></>
          )}
        </h2>
        <p className="section-subtitle" data-i18n="apps_subtitle">
          {lang === "en" ? "16 projects in 3 constellations. Explore each system." : "16 proyectos en 3 constelaciones. Explora cada sistema."}
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

      <div className="nebula-map" id="nebulaMap">
        {filtered.map((p, i) => (
          <OrbitCard key={p.id} project={p} index={i} lang={lang} onClick={handleCardClick} />
        ))}
      </div>
    </section>
  );
}
