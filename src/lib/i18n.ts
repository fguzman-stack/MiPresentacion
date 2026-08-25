export type Lang = "es" | "en";
export const defaultLang: Lang = "es";

const translations: Record<Lang, Record<string, string>> = {
  es: {
    nav_inicio: "Inicio", nav_apps: "Apps", nav_habilidades: "Habilidades", nav_contacto: "Contacto",
    hero_badge: "Desarrollador Android",
    hero_nombre: "Francisco", hero_apellido: " Guzmán",
    hero_sub: "Creo <strong>apps móviles nativas</strong> con Kotlin y Jetpack Compose. Convertir ideas en <span class='gradient-text'>experiencias</span> que caben en tu bolsillo.",
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
  },
  en: {
    nav_inicio: "Home", nav_apps: "Apps", nav_habilidades: "Skills", nav_contacto: "Contact",
    hero_badge: "Android Developer",
    hero_nombre: "Francisco", hero_apellido: " Guzmán",
    hero_sub: "I build <strong>native mobile apps</strong> with Kotlin and Jetpack Compose. Turning ideas into <span class='gradient-text'>experiences</span> that fit in your pocket.",
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
  }
};

export function t(lang: Lang, key: string): string {
  return translations[lang]?.[key] ?? translations[defaultLang][key] ?? key;
}

export function getProjectI18n(project: { taglineES: string; taglineEN: string }, lang: Lang) {
  return lang === "en" ? project.taglineEN : project.taglineES;
}

import { createContext, useContext, useState } from "react";
export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: defaultLang, setLang: () => {} });
export function useLang() { return useContext(LangContext); }
