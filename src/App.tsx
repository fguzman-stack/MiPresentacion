import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { ArrowDown, ArrowUpRight, Code2, GitBranch as Github, Globe, Layers, Mail, Menu, MessageCircle, Satellite, Smartphone, X } from "lucide-react";
import { NebulaMap } from "./components/NebulaMap";
import { MobileShowcase, WindowsShowcase } from "./components/MobileShowcase";
import { projects } from "./data/projectsData";
import { LangContext, languages, t, type Lang } from "./lib/i18n";

const isLang = (value: string | null): value is Lang => languages.some((language) => language.code === value);

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("lang");
      return isLang(saved) ? saved : "es";
    } catch {
      return "es";
    }
  });
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch { /* Storage may be disabled. */ }
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
  }, [lang]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const update = () => {
      lenis?.destroy();
      lenis = query.matches ? undefined : new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        autoRaf: true,
        anchors: true,
        prevent: (node) => !!node.closest(".preview-overlay, .swal2-container"),
      });
    };
    update();
    query.addEventListener("change", update);
    return () => { lenis?.destroy(); query.removeEventListener("change", update); };
  }, []);

  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setNavOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const nav = [
    ["inicio", t(lang, "nav_home")],
    ["servicios", lang === "en" ? "Services" : "Servicios"],
    ["mobile", t(lang, "nav_mobile")],
    ["windows", t(lang, "nav_windows")],
    ["apps", t(lang, "nav_projects")],
    ["habilidades", t(lang, "nav_skills")],
  ];
  const stats = [
    [projects.filter((p) => p.type === "mobile").length, t(lang, "stat_mobile")],
    [projects.filter((p) => p.type === "desktop").length, t(lang, "stat_desktop")],
    [projects.filter((p) => p.type === "web").length, t(lang, "stat_web")],
    [projects.length, t(lang, "stat_total")],
  ] as const;

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <MotionConfig reducedMotion="user">
        <div className="portfolio-shell galaxy-shell">
          <a href="#main" className="skip-link">{t(lang, "skip")}</a>
          <div className="ambient-background galaxy-background" aria-hidden="true" />
          <header className="site-header observatory-header">
            <a className="brand" href="#inicio" aria-label="Francisco Guzmán"><span className="brand-symbol">fg<span>.</span></span><span className="brand-caption">ORBITAL<br />PORTFOLIO</span></a>
            <nav id="navigation" aria-label={t(lang, "nav_label")} className={`site-nav ${navOpen ? "is-open" : ""}`}>
              {nav.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setNavOpen(false)}>{label}</a>)}
              <a href="#contacto" className="nav-contact" onClick={() => setNavOpen(false)}>{t(lang, "nav_contact")}<ArrowUpRight size={15} /></a>
            </nav>
            <div className="nav-actions">
              <label className="language-select" aria-label={t(lang, "lang_label")}>
                <Globe size={15} />
                <select value={lang} onChange={(event) => setLang(event.target.value as Lang)}>
                  {languages.map((language) => <option key={language.code} value={language.code}>{language.short} · {language.label}</option>)}
                </select>
              </label>
              <button className="menu-button" onClick={() => setNavOpen(!navOpen)} aria-controls="navigation" aria-expanded={navOpen} aria-label={t(lang, "menu_label")}>{navOpen ? <X /> : <Menu />}</button>
            </div>
          </header>
          <main id="main">
            <section id="inicio" className="hero-section orbital-hero">
              <div className="hero-copy">
                <span className="eyebrow hero-eyebrow"><span className="status-dot" />{t(lang, "hero_badge")}</span>
                <p className="hero-intro">{t(lang, "hero_intro")}</p>
                <h1>{t(lang, "hero_title_a")}<br /><span className="gradient-text">{t(lang, "hero_title_b")}</span></h1>
                <p className="hero-description">{t(lang, "hero_desc")}</p>
                <div className="hero-actions"><a className="button button-primary" href="#mobile">{t(lang, "hero_primary")}<ArrowUpRight size={18} /></a><a className="button button-secondary" href="#contacto">{t(lang, "hero_secondary")}<Mail size={17} /></a></div>
                <div className="hero-stack"><span>Kotlin</span><i /> <span>Jetpack Compose</span><i /><span>React</span><i /><span>Vite</span><i /><span>Web</span></div>
              </div>
              <div className="hero-art space-observatory" aria-label="Digital observatory">
                <div className="star-orbit orbit-a" /><div className="star-orbit orbit-b" /><div className="star-orbit orbit-c" />
                <div className="planet-core"><span /></div>
                <div className="art-coordinate">FG — STAR MAP<br />CHILE · LATINOAMÉRICA</div>
                <div className="code-window telescope-window"><div className="window-bar"><span /><span /><span /><small>stellar-map.ts</small></div><div className="code-body"><span className="code-comment">// {t(lang, "hero_comment")}</span><p><b>const</b> observatory = {"{"}</p><p className="code-indent">pilot: <em>"Francisco"</em>,</p><p className="code-indent">orbit: [<em>"Android"</em>, <em>"Web"</em>],</p><p className="code-indent">identity: <strong>"space"</strong></p><p>{"}"};</p><div className="code-result"><span className="status-dot" />{t(lang, "hero_ready")}</div></div></div>
                <a href="#mobile" className="floating-label label-android"><Satellite size={20} /><span>Satellites<span>{t(lang, "hero_android_sub")}</span></span><ArrowUpRight size={16} /></a>
                <a href="#apps" className="floating-label label-web"><Code2 size={20} /><span>Nebula<span>{t(lang, "hero_web_sub")}</span></span><ArrowUpRight size={16} /></a>
                <span className="art-bottom">{t(lang, "art_bottom")}</span>
              </div>
              <div className="hero-bottom"><a href="#mobile" className="scroll-cue"><ArrowDown size={16} />{t(lang, "hero_scroll")}</a><div className="hero-stats">{stats.map(([count, label]) => <div key={label}><strong>{String(count).padStart(2, "0")}</strong><span>{label}</span></div>)}</div></div>
            </section>
            <MobileShowcase lang={lang} />
            <WindowsShowcase lang={lang} />
            <section id="servicios" className="section expertise-section space-section">
              <div className="editorial-heading"><div><span className="eyebrow">SERVICIOS</span><h2>Desarrollo de software para tu proyecto<br /><span className="gradient-text">Android · Web · PC · Automatización</span></h2></div><p>Servicios de programación a medida para emprendedores y empresas en Chile y Latinoamérica. Trabajo 100% remoto.</p></div>
              <div className="expertise-grid">{[
                { Icon: Smartphone, title: "Apps móviles Android", text: "Desarrollo de aplicaciones Android nativas con Kotlin y Jetpack Compose: catálogos, inventario, reservas, puntos de venta y apps offline con diseño moderno.", tech: ["Android", "Kotlin", "Jetpack Compose", "App móvil"] },
                { Icon: Globe, title: "Desarrollo web", text: "Sitios y aplicaciones web rápidas y responsivas: landing pages, dashboards, e-commerce y portales con SEO y buen rendimiento.", tech: ["React", "Vite", "JavaScript", "HTML & CSS", "SEO"] },
                { Icon: Code2, title: "Software de escritorio (PC)", text: "Programas para PC y Windows: herramientas internas, gestión, productividad y apps de IA local empaquetadas para instalar.", tech: ["Windows", "Tauri", "Rust", "Software PC"] },
                { Icon: Layers, title: "Automatización e integraciones", text: "Automatizo tareas repetitivas, conecto APIs y genero reportes para ahorrar tiempo y reducir errores operativos.", tech: ["Python", "APIs", "Automatización", "Scripts"] },
              ].map(({ Icon, title, text, tech }, i) => <article className="expertise-card" key={title}><div className="expertise-top"><Icon size={24} /><span>0{i + 1}</span></div><h3>{title}</h3><p>{text}</p><div className="expertise-tags">{tech.map(item => <span key={item}>{item}</span>)}</div></article>)}</div>
              <p className="section-note" style={{ marginTop: 20 }}>Desarrollador de software freelance disponible en remoto para clientes en Chile, Latinoamérica y cualquier país de habla hispana.</p>
            </section>
            <NebulaMap lang={lang} />
            <section id="habilidades" className="section expertise-section space-section">
              <div className="editorial-heading"><div><span className="eyebrow">{t(lang, "skills_kicker")}</span><h2>{t(lang, "skills_title_a")}<br /><span className="gradient-text">{t(lang, "skills_title_b")}</span></h2></div><p>{t(lang, "skills_desc")}</p></div>
              <div className="expertise-grid">{[
                { Icon: Smartphone, title: "Android", text: t(lang, "skill_android"), tech: ["Kotlin", "Jetpack Compose", "Android SDK", "Room", "Firebase"] },
                { Icon: Code2, title: "Frontend", text: t(lang, "skill_frontend"), tech: ["React", "Next.js", "JavaScript", "HTML & CSS", "Tailwind CSS"] },
                { Icon: Layers, title: "Backend", text: t(lang, "skill_backend"), tech: ["Python", "Django", "FastAPI", "PHP", "MySQL"] },
              ].map(({ Icon, title, text, tech }, i) => <article className="expertise-card" key={title}><div className="expertise-top"><Icon size={24} /><span>0{i + 1}</span></div><h3>{title}</h3><p>{text}</p><div className="expertise-tags">{tech.map(item => <span key={item}>{item}</span>)}</div></article>)}</div>
            </section>
            <section id="contacto" className="section contact-section"><div className="contact-panel command-panel"><div className="contact-grid"><div className="contact-intro"><span className="eyebrow">{t(lang, "contact_kicker")}</span><h2>{t(lang, "contact_title_a")}<br /><span className="gradient-text">{t(lang, "contact_title_b")}</span></h2><p>{t(lang, "contact_desc")}</p></div><div className="contact-rail"><a className="contact-email" href="mailto:familiazv2016@gmail.com"><span className="ce-icon"><Mail size={19} /></span><span className="ce-text"><small>{t(lang, "contact_email_label")}</small><strong>familiazv2016@gmail.com</strong></span><ArrowUpRight size={18} /></a><span className="contact-or">{t(lang, "contact_or_label")}</span><div className="contact-links"><a href="https://github.com/fguzman-stack" target="_blank" rel="noopener noreferrer"><Github size={16} /><span>GitHub</span></a><a href="https://www.linkedin.com/in/francisco-guzm%C3%A1n-745b5b372/" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span></a><a href="https://api.whatsapp.com/send?phone=56939439403" target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /><span>WhatsApp</span></a></div></div></div></div></section>
          </main>
          <footer className="site-footer"><a className="brand-symbol" href="#inicio">fg<span>.</span></a><p>© {new Date().getFullYear()} Francisco Guzmán <span>· {t(lang, "footer_text")}</span></p><a href="#inicio">{t(lang, "back_top")} ↑</a></footer>
        </div>
      </MotionConfig>
    </LangContext.Provider>
  );
}
