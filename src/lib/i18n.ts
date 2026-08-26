import { createContext, useContext } from "react";

export type Lang = "es" | "en";
export const defaultLang: Lang = "es";

const translations: Record<Lang, Record<string, string>> = {
  es: {
    nav_inicio: "Inicio", nav_apps: "Apps", nav_habilidades: "Habilidades", nav_contacto: "Contacto",
    hero_badge: "Desarrollador Multiplataforma",
    hero_nombre: "Francisco", hero_apellido: " Guzmán",
    hero_sub: "Desarrollador <strong>multiplataforma</strong>: de <strong>apps nativas con Kotlin y Jetpack Compose</strong> a <strong>aplicaciones web y de escritorio</strong> de alto rendimiento. Transformo ideas en <span class='gradient-text'>productos digitales</span> sólidos, útiles y listos para escalar.",
    hero_btn_apps: "Ver mis Apps", hero_btn_contacto: "Contáctame",
    stat_apps: "Apps Nativas", stat_proyectos: "+ Proyectos", stat_web: "+ Apps Web",
    hab_label: "Stack Tecnológico", hab_title: "Lo que <span class='gradient-text'>domino</span>",
    cat_mobile: "Mobile", cat_frontend: "Frontend Web", cat_backend: "Backend & Otros",
    nivel_av: "Avanzado", nivel_med: "Medio",
    cont_label: "Contacto", cont_title: "Trabajemos <span class='gradient-text'>juntos</span>",
    cont_desc: "¿Tienes una idea para una app? Hablemos y la hacemos realidad.",
    cont_email_tit: "Email", cont_phone_tit: "WhatsApp / Teléfono",
    footer_text: "Construyendo apps que marcan la diferencia",
    apps_badge: "Portfolio / Galaxy",
    apps_title: "Sistemas Descubiertos",
    apps_subtitle: "16 proyectos en 3 constelaciones. Explora cada sistema.",
    filter_all: "Todos", filter_tech: "SaaS & IA", filter_booking: "Booking", filter_creative: "Creative", filter_mobile: "Apps Móviles", filter_kotlin: "Kotlin", filter_react: "React",
    hud_open: "Abrir proyecto", hud_apk: "APK disponible",
    modal_mobile_title: "APK disponible bajo solicitud", modal_mobile_desc: "Estas apps móviles están disponibles como APK. Contáctame para solicitar acceso o más detalles.", modal_mobile_btn: "Solicitar APK",
    live_demo: "Live Demo", year: "2025", feature: "Feature",
    close: "Cerrar",
    preview_open_external: "Abrir ↗",
    preview_open_new_tab: "Abrir proyecto en nueva pestaña ↗",
    preview_iframe_error_title: "No se pudo embeber la vista previa",
    preview_iframe_error_desc: "Este sitio bloquea iframes (X-Frame-Options). Ábrelo en una pestaña externa para verlo completo.",
    type_web: "WEB", type_mobile: "MOBILE",
    connection_slow_notice: "Vista previa optimizada",
    load_more: "Ver más proyectos",
    showing: "Mostrando",
    of: "de",
    projects: "proyectos",
    template_badge: "Plantilla demo",
    template_disclaimer: "Proyecto de portafolio — plantilla para demostrar habilidades de desarrollo y diseño",
  },
  en: {
    nav_inicio: "Home", nav_apps: "Apps", nav_habilidades: "Skills", nav_contacto: "Contact",
    hero_badge: "Multiplatform Developer",
    hero_nombre: "Francisco", hero_apellido: " Guzmán",
    hero_sub: "Multiplatform developer — from <strong>native apps with Kotlin & Jetpack Compose</strong> to high-performance <strong>web and desktop applications</strong>. I turn ideas into <span class='gradient-text'>digital products</span> that are robust, useful and ready to scale.",
    hero_btn_apps: "View My Apps", hero_btn_contacto: "Contact Me",
    stat_apps: "Native Apps", stat_proyectos: "+ Projects", stat_web: "+ Web Apps",
    hab_label: "Tech Stack", hab_title: "What I <span class='gradient-text'>master</span>",
    cat_mobile: "Mobile", cat_frontend: "Frontend Web", cat_backend: "Backend & Others",
    nivel_av: "Advanced", nivel_med: "Intermediate",
    cont_label: "Contact", cont_title: "Let's Work <span class='gradient-text'>Together</span>",
    cont_desc: "Have an idea for an app? Let's talk and make it happen.",
    cont_email_tit: "Email", cont_phone_tit: "WhatsApp / Phone",
    footer_text: "Building apps that make a difference",
    apps_badge: "Portfolio / Galaxy",
    apps_title: "Discovered Systems",
    apps_subtitle: "16 projects in 3 constellations. Explore each system.",
    filter_all: "All", filter_tech: "SaaS & AI", filter_booking: "Booking", filter_creative: "Creative", filter_mobile: "Mobile Apps", filter_kotlin: "Kotlin", filter_react: "React",
    hud_open: "Open project", hud_apk: "APK available",
    modal_mobile_title: "APK available on request", modal_mobile_desc: "These mobile apps are available as APK. Contact me to request access or more details.", modal_mobile_btn: "Request APK",
    live_demo: "Live Demo", year: "2025", feature: "Feature",
    close: "Close",
    preview_open_external: "Open ↗",
    preview_open_new_tab: "Open project in new tab ↗",
    preview_iframe_error_title: "Preview unavailable",
    preview_iframe_error_desc: "This site blocks iframes (X-Frame-Options). Open it in a new tab to view it fully.",
    type_web: "WEB", type_mobile: "MOBILE",
    connection_slow_notice: "Optimized preview",
    load_more: "Load more projects",
    showing: "Showing",
    of: "of",
    projects: "projects",
    template_badge: "Demo template",
    template_disclaimer: "Portfolio project — template to showcase development & design skills",
  }
};

export function t(lang: Lang, key: string): string {
  return translations[lang]?.[key] ?? translations[defaultLang][key] ?? key;
}

export function getProjectI18n(project: { taglineES: string; taglineEN: string }, lang: Lang) {
  return lang === "en" ? project.taglineEN : project.taglineES;
}

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: defaultLang, setLang: () => {} });
export function useLang() { return useContext(LangContext); }
