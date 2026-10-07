import { useEffect, useState } from "react";
import { ArrowUpRight, Home } from "lucide-react";
import { ThemePicker } from "./ThemePicker";
import { languages, t, type Lang } from "../lib/i18n";

export default function NotFound() {
  const [lang] = useState<Lang>(() => {
    try {
      return languages.find((language) => language.code === localStorage.getItem("lang"))?.code ?? "es";
    } catch { return "es"; }
  });

  useEffect(() => {
    document.title = t(lang, "notfound_title");
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
    // The dev server may serve index.html for an unknown URL.
    document.querySelector('meta[name="robots"]')?.setAttribute("content", "noindex, follow");
    document.querySelector('link[rel="canonical"]')?.remove();
  }, [lang]);

  return (
    <div className="portfolio-shell galaxy-shell notfound-shell">
      <a href="#main" className="skip-link">{t(lang, "skip")}</a>
      <div className="ambient-background galaxy-background" aria-hidden="true" />
      <header className="site-header observatory-header">
        <a className="brand" href="/" aria-label="Francisco Guzmán"><span className="brand-symbol">fg<span>.</span></span><span className="brand-caption">ORBITAL<br />PORTFOLIO</span></a>
        <ThemePicker lang={lang} />
      </header>
      <main id="main" className="notfound-main">
        <span className="eyebrow">{t(lang, "notfound_kicker")}</span>
        <div className="notfound-code" aria-hidden="true"><span className="gradient-text">404</span><span className="notfound-orbit" /></div>
        <h1>{t(lang, "notfound_heading")}<br /><span className="gradient-text">{t(lang, "notfound_highlight")}</span></h1>
        <p>{t(lang, "notfound_description")}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="/"><Home size={17} aria-hidden="true" />{t(lang, "notfound_home")}</a>
          <a className="button button-secondary" href="/#colaboraciones">{t(lang, "notfound_collab")}<ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </main>
    </div>
  );
}
