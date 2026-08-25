const filters = [
  { id: "all", labelES: "Todos", labelEN: "All", i18n: "filter_all" },
  { id: "nebula-tech", labelES: "SaaS & IA", labelEN: "SaaS & AI", i18n: "filter_tech" },
  { id: "orbita-reservas", labelES: "Booking", labelEN: "Booking", i18n: "filter_booking" },
  { id: "aurora-creative", labelES: "Creative", labelEN: "Creative", i18n: "filter_creative" },
  { id: "satellites", labelES: "Apps Móviles", labelEN: "Mobile Apps", i18n: "filter_mobile" },
] as const;

export function ProjectFilters({ active, onChange, lang }: { active: string; onChange: (id: string) => void; lang: "es" | "en" }) {
  return (
    <div className="nebula-filters" role="group" aria-label="Filtros">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className={`filter-pill ${active === f.id ? "active" : ""}`}
          data-filter={f.id}
          data-i18n={f.i18n}
          type="button"
        >
          {lang === "en" ? f.labelEN : f.labelES}
        </button>
      ))}
    </div>
  );
}
