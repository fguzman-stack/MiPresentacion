import { useEffect, useState } from "react";
import { ArrowUpRight, Code2, Globe, ShieldCheck } from "lucide-react";
import { useConnectionQuality } from "../hooks/useConnectionQuality";
import { t, type Lang } from "../lib/i18n";

export function Collaborations({ lang }: { lang: Lang }) {
  const connectionQuality = useConnectionQuality();
  const [iframeFailed, setIframeFailed] = useState(false);
  const shouldTryLivePreview = connectionQuality !== "slow" && !iframeFailed;

  useEffect(() => {
    if (!shouldTryLivePreview) return;
    const fallbackTimer = window.setTimeout(() => {
      setIframeFailed(true);
    }, 2600);
    return () => window.clearTimeout(fallbackTimer);
  }, [shouldTryLivePreview]);

  return (
    <section id="colaboraciones" className="section space-section collaborations-section" aria-labelledby="collaborations-title">
      <div className="editorial-heading">
        <div><span className="eyebrow">{t(lang, "collab_kicker")}</span><h2 id="collaborations-title">{t(lang, "collab_title_a")}<br /><span className="gradient-text">{t(lang, "collab_title_b")}</span></h2></div>
        <p>{t(lang, "collab_intro")}</p>
      </div>
      <article className="collaboration-card">
        <div className="collaboration-copy">
          <span className="collaboration-badge"><span className="status-dot" />{t(lang, "collab_badge")}</span>
          <span className="eyebrow collaboration-sector">{t(lang, "collab_sector")}</span>
          <h3>Clínica Veterinaria <span>Felycan</span></h3>
          <p>{t(lang, "collab_description")}</p>
          <dl className="collaboration-facts">
            <div><Code2 size={19} aria-hidden="true" /><div><dt>{t(lang, "collab_role_label")}</dt><dd>{t(lang, "collab_role")}</dd></div></div>
            <div><Globe size={19} aria-hidden="true" /><div><dt>{t(lang, "collab_result_label")}</dt><dd>{t(lang, "collab_result")}</dd></div></div>
          </dl>
          <div className="collaboration-actions">
            <a className="button button-primary" href="https://clinicaveterinariafelycan.cl/" target="_blank" rel="noopener noreferrer">{t(lang, "collab_visit")}<ArrowUpRight size={18} aria-hidden="true" /></a>
            <a className="collaboration-contact" href="#contacto">{t(lang, "collab_contact")}<ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
          <p className="collaboration-permission"><ShieldCheck size={16} aria-hidden="true" />{t(lang, "collab_permission")}</p>
        </div>
        <figure className="collaboration-preview">
          <div className="collaboration-browser"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>clinicaveterinariafelycan.cl</span><Globe size={13} aria-hidden="true" /></div>
          <div className="collaboration-frame-wrap">
            {shouldTryLivePreview ? (
              <iframe
                src="https://clinicaveterinariafelycan.cl/"
                title="Clínica Veterinaria Felycan"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onError={() => setIframeFailed(true)}
              />
            ) : (
              <a className="collaboration-image-link" href="https://clinicaveterinariafelycan.cl/" target="_blank" rel="noopener noreferrer">
                <img src="/images/felycan-preview.webp" srcSet="/images/felycan-preview-small.webp 800w, /images/felycan-preview.webp 1597w" sizes="(max-width: 1000px) calc(100vw - 48px), 650px" width="1597" height="785" alt={t(lang, "collab_alt")} loading="eager" decoding="async" />
              </a>
            )}
          </div>
          <figcaption><strong>{t(lang, "collab_preview")}</strong><span>{t(lang, "collab_preview_note")}</span></figcaption>
        </figure>
      </article>
    </section>
  );
}
