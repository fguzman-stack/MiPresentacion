import { ArrowUpRight, Check, Clock3, GitBranch as Github, Images, Monitor, Smartphone } from "lucide-react";
import Swal from "sweetalert2";
import { projects } from "../data/projectsData";
import { t, type Lang } from "../lib/i18n";
import { projectDescription, projectHighlights } from "../lib/projectText";
import type { Project } from "../types/project";

const kindKeys: Record<string, string> = {
  codepet: "mobile_codepet_kind",
  "a-tiempo": "mobile_at_kind",
  "despensa-al-dia": "mobile_despensa_kind",
};

const footnotes: Record<string, string> = {
  codepet: "CODE. CARE. GROW.",
  "a-tiempo": "PLAN. REFLECT. REPEAT.",
  "despensa-al-dia": "USE. SAVE. COOK.",
};

const appIcons: Record<string, string> = {
  codepet: "CP",
  "a-tiempo": "AT",
  "despensa-al-dia": "DA",
  documind: "DM",
  counterkeep: "CK",
  sopbuilder: "SB",
  "restaurant-costing": "RC",
};

const appLogos: Record<string, string> = {
  codepet: "images/icons/codepet-512.png",
  "a-tiempo": "images/icons/a-tiempo-512.png",
  "despensa-al-dia": "images/icons/despensa-al-dia-512.jpg",
};

const desktopKindFallback = (lang: Lang) =>
  lang === "en" ? "DESKTOP APP" : lang === "pt" ? "APP DESKTOP" : lang === "fr" ? "APP BUREAU" : "APP DE ESCRITORIO";

const projectIcon = (id: string, name: string) => appIcons[id] ?? name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

const screenshotsLabel = (lang: Lang) => lang === "en" ? "View screenshots" : lang === "pt" ? "Ver capturas" : lang === "fr" ? "Voir captures" : "Ver capturas";

function showScreenshots(project: Project, lang: Lang) {
  const screenshots = project.screenshots ?? (project.screenshot ? [project.screenshot] : []);
  const isDesktop = project.type === "desktop";

  Swal.fire({
    title: `<span style="font-family:Orbitron,sans-serif;font-size:1.05rem">${project.name}</span>`,
    html: `
      <div style="text-align:left;font-family:Inter,sans-serif">
        <div class="project-gallery ${isDesktop ? "project-gallery-windows" : "project-gallery-mobile"}">
          ${screenshots.map((src, index) => `<a href="${src}" target="_blank" rel="noopener noreferrer" class="project-gallery-item"><img src="${src}" alt="${project.name} screenshot ${index + 1}" loading="lazy" /></a>`).join("")}
        </div>
        <p style="font-size:0.86rem;color:#b9bdd0;line-height:1.7;margin-top:14px">${projectDescription(project, lang)}</p>
      </div>
    `,
    showCancelButton: false,
    confirmButtonText: t(lang, "close"),
    background: "#0e0e25",
    color: "#f4f1ff",
    confirmButtonColor: "#9b7bff",
    width: Math.min(window.innerWidth - 32, isDesktop ? 1280 : 860),
    customClass: { popup: "rounded-2xl border border-white/10 backdrop-blur-xl", confirmButton: "swal2-confirm-custom" },
  });
}

export function MobileShowcase({ lang }: { lang: Lang }) {
  const mobileProjects = projects.filter(p => p.type === "mobile");

  return (
    <section id="mobile" className="section mobile-showcase" aria-labelledby="mobile-title">
      <div className="editorial-heading">
        <div><span className="eyebrow">{t(lang, "mobile_kicker")}</span>
          <h2 id="mobile-title">{t(lang, "mobile_title_a")}<br /><span className="gradient-text">{t(lang, "mobile_title_b")}</span></h2></div>
        <p>{t(lang, "mobile_desc")}</p>
      </div>
      <div className="mobile-feature-grid">
        {mobileProjects.map((p, i) => {
          const kindKey = kindKeys[p.id];
          const icon = projectIcon(p.id, p.name);
          const logo = appLogos[p.id];
          const footnote = footnotes[p.id] ?? icon;
          return (
            <article key={p.id} className={`mobile-feature ${p.id}`}>
              <div className="mobile-art">
                <span className="art-label"><Smartphone size={13} /> ANDROID / 0{i + 1}</span>
                <span className="app-icon-badge" aria-label={`${p.name} icon`}>
                  {logo ? <img src={logo} alt="" loading="lazy" decoding="async" /> : icon}
                </span>
                {p.screenshot ? <div className="phone-frame"><img src={p.screenshot} alt={`${p.name} screenshot`} loading="lazy" decoding="async" /></div> : (
                  <div className="time-art" aria-hidden="true"><div className="clock-orbit"><Clock3 size={72} strokeWidth={1} /></div><span className="time-monogram">{icon}</span><span className="time-wordmark">{p.name}</span></div>
                )}
                <span className="art-footnote">{footnote}</span>
              </div>
              <div className="mobile-feature-content">
                <span className="eyebrow">{kindKey ? t(lang, kindKey) : ""}</span>
                <h3>{p.name}<span>↗</span></h3>
                <p>{projectDescription(p, lang)}</p>
                <ul>{projectHighlights(p, lang)?.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
                <div className="card-tech">{p.tech.map(tech => <span className="tech-tag" key={tech}>{tech}</span>)}</div>
                <div className="feature-links">
                  <button className="button button-primary" type="button" onClick={() => showScreenshots(p, lang)}>{screenshotsLabel(lang)}<Images size={16} /></button>
                  {p.url.includes("github.com") && (
                    <a className="button button-secondary" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} GitHub`}><Github size={16} />GitHub<ArrowUpRight size={15} /></a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function WindowsShowcase({ lang }: { lang: Lang }) {
  const desktopProjects = projects.filter(p => p.type === "desktop");

  return (
    <section id="windows" className="section mobile-showcase windows-showcase" aria-labelledby="windows-title">
      <div className="editorial-heading">
        <div><span className="eyebrow">{t(lang, "windows_kicker")}</span>
          <h2 id="windows-title">{t(lang, "windows_title_a")}<br /><span className="gradient-text">{t(lang, "windows_title_b")}</span></h2></div>
        <p>{t(lang, "windows_desc")} <span className="section-note">{t(lang, "windows_process_note")}</span></p>
      </div>
      <div className="mobile-feature-grid">
        {desktopProjects.map((p, i) => {
          const icon = projectIcon(p.id, p.name);
           const footnote = ({ counterkeep: "SELL. TRACK. MANAGE.", documind: "ASK. SEARCH. DISCOVER.", sopbuilder: "WRITE. RUN. REVIEW.", "restaurant-costing": "COST. PRICE. CONTROL." } as Record<string, string>)[p.id];
          return (
            <article key={p.id} className={`mobile-feature desktop-feature ${p.id}`}>
              <div className="mobile-art">
                <span className="art-label"><Monitor size={13} /> WINDOWS / 0{i + 1}</span>
                <span className="app-icon-badge" aria-label={`${p.name} icon`}>{icon}</span>
                {p.screenshot ? <div className="desktop-frame"><img src={p.screenshot} alt={`${p.name} screenshot`} loading="lazy" decoding="async" /></div> : null}
                <span className="art-footnote">{footnote}</span>
              </div>
              <div className="mobile-feature-content">
                <div className="desktop-status-row">
                  <span className="eyebrow">{desktopKindFallback(lang)}</span>
                   <span className={`status-badge${p.purchaseUrl ? " status-badge--live" : ""}`}>{p.purchaseUrl ? t(lang, "windows_status_available") : t(lang, "windows_status")}</span>
                </div>
                <h3>{p.name}<span>↗</span></h3>
                <p>{projectDescription(p, lang)}</p>
                <ul>{projectHighlights(p, lang)?.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
                <div className="card-tech">{p.tech.map(tech => <span className="tech-tag" key={tech}>{tech}</span>)}</div>
                 {p.purchaseUrl && (
                   <a className="product-purchase-tag" href={p.purchaseUrl} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} — ${p.purchaseStore}`}>
                     {t(lang, "product_store")} {p.purchaseStore}
                     {p.purchasePrice && <strong>US${p.purchasePrice} · {t(lang, "product_payment")}</strong>}
                   </a>
                 )}
                 <p className="product-price-note">{t(lang, "product_price_note")}</p>
                 <div className="feature-links">
                   {p.purchaseUrl && (
                     <a className="button button-primary" href={p.purchaseUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t(lang, "buy_product")} ${p.purchaseStore} — ${p.name}`}>{t(lang, "buy_product")} {p.purchaseStore}<ArrowUpRight size={16} /></a>
                   )}
                   <a className="button button-secondary" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`${t(lang, "product_website")} — ${p.name}`}>{t(lang, "product_website")}<ArrowUpRight size={16} /></a>
                   <button className="text-link" type="button" onClick={() => showScreenshots(p, lang)}>{screenshotsLabel(lang)}<Images size={16} /></button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
