<div align="center">
  <br/>
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=800&size=32&duration=3000&pause=500&color=9B7BFF&center=true&vCenter=true&width=600&lines=%3C+FG+%2F%3E;Francisco+Guzm%C3%A1n;Desarrollador+Multiplataforma" alt="Typing SVG" />
  <br/><br/>
  <p>
    <strong>Desarrollador Multiplataforma · Kotlin · React · Web & Desktop</strong>
  </p>
  <p>
    <a href="https://github.com/fguzman-stack"><img src="https://img.shields.io/badge/GitHub-fguzman--stack-9B7BFF?style=for-the-badge&logo=github&logoColor=white" /></a>
    <a href="mailto:familiazv2016@gmail.com"><img src="https://img.shields.io/badge/Email-Contact-FF63B8?style=for-the-badge&logo=gmail&logoColor=white" /></a>
    <a href="https://miportafolio-fguz.vercel.app/"><img src="https://img.shields.io/badge/Live-Demo-54DCFF?style=for-the-badge&logo=vercel&logoColor=white" /></a>
  </p>
  <br/>
</div>

---

## Portfolio — MiPresentacion

Portfolio personal donde muestro **3 apps nativas Android, 13 sistemas/plantillas web y 2 apps de Windows (en desarrollo)**.  
Construido con **React 19 + Vite 6 + Tailwind CSS 4 + TypeScript**. Con **carga adaptativa** y **soporte ES/EN/PT/FR**.

Personal portfolio showcasing **3 native Android apps, 13 web systems/templates and 2 Windows apps (in development)**.  
Built with **React 19 + Vite 6 + Tailwind CSS 4 + TypeScript**. With **adaptive loading** and **ES/EN/PT/FR i18n**.

> **Experiencia profesional:** El sitio de **Clínica Veterinaria Felycan** es un proyecto real desarrollado y publicado para la empresa, mostrado con su autorización en la sección **Colaboraciones con empresas**. Las webs del mapa de constelaciones son plantillas demo. Las apps móviles son proyectos nativos con Kotlin; las de Windows están en desarrollo activo.

### Colaboraciones, temas y página 404

- **Felycan:** [clinicaveterinariafelycan.cl](https://clinicaveterinariafelycan.cl/), con captura local responsive generada desde `felycan.png`. El sitio de la clínica bloquea iframes mediante `frame-ancestors 'none'`, por lo que la vista previa usa imágenes WebP ligeras para cualquier conexión.
- Para actualizar las capturas: `node scripts/optimize-felycan.mjs` desde la raíz.
- **Selector de temas:** icono de pincel junto al idioma, con cinco paletas oscuras espaciales: Morado (predeterminada), Verde, Rojo, Celeste y Supernova (dorado/naranja eléctrico). La preferencia se guarda en `localStorage` bajo `space-theme` y se comparte con la página 404.
- **404 independiente:** `404.html` tiene su propia entrada React (`src/notfound.tsx`) y se genera en `dist/404.html`. `vercel.json` sirve los archivos existentes y responde con esta página y estado HTTP 404 para las rutas inexistentes. En desarrollo, la app también muestra la pantalla 404 para rutas desconocidas.
- La nueva sección, el selector y los mensajes de error están traducidos a ES/EN/PT/FR.

---

### Stats / Métricas

| Métrica | Valor |
|---------|-------|
| **Apps Nativas Android** | 3 (Kotlin · Compose) |
| **Proyectos totales** | 18 |
| **Sistemas web (plantillas demo)** | 13 |
| **Software Windows (en proceso)** | 2 |

---

### Apps Destacadas / Featured Apps

| App | Stack | Descripción |
|-----|-------|-------------|
| **CodePet** | Kotlin · Compose · Room · Koin | Mascota virtual que evoluciona al programar: Pomodoro, 88+ retos, 100% offline |
| **A Tiempo** | Kotlin · Compose · Room · Firebase | Recordatorios inteligentes con alarma, widget y diario personal |
| **Despensa al Día** | Kotlin · Compose · Retrofit · Firebase AI | Gestión de despensa con recetas generadas por IA + widget |

### Plantillas Web / Web Templates

13 demos en 3 constelaciones: `nebula-tech` (5 SaaS & IA), `orbita-reservas` (5 Booking), `aurora-creative` (3 Creative). Todas marcadas como **Plantilla demo** en cards y modales. El mapa "Sistemas descubiertos" muestra solo proyectos web; Android y Windows viven en sus propias secciones.

### Software Windows

**DocuMind AI** y **ScreenScript Studio** en desarrollo activo (IA local), con badge "En proceso" honesto.

---

### Stack / Tech Stack

```
Frontend  → React 19 · Vite 6 · Tailwind CSS 4 · TypeScript · Framer Motion · Lenis
Mobile    → Kotlin · Jetpack Compose · Android SDK · Room · Firebase · Firestore
Backend   → PHP · Python · Django · FastAPI
Database  → MySQL · Firestore · SQLite · Room
UI/Icons  → Lucide React · @tsparticles/slim · SweetAlert2
Perf      → WebP (88% ahorro) · Network Information API + fallback · Lazy + Load More
```

---

### Idiomas / Languages

| | Language | Código |
|---|----------|--------|
| 🇪🇸 | Español | `es` |
| 🇺🇸 | English | `en` |
| 🇧🇷 | Português | `pt` |
| 🇫🇷 | Français | `fr` |

> **ES/EN/PT/FR 100% traducido** sin hardcodes, vía `t(lang, key)` en `src/lib/i18n.ts`.

---

### SEO / Descubribilidad

- `title`, `description`, canonical y JSON-LD (`Person`) en `index.html`
- OpenGraph + Twitter Card con imagen social 1200×630 (`public/og-image.png`)
- `robots.txt` + `sitemap.xml` registrados en Google Search Console
- Páginas SEO estáticas para intención de búsqueda: `/servicios.html`, `/desarrollo-web-chile.html`, `/apps-android-kotlin-chile.html` y `/software-windows.html`
- Contenido HTML inicial en la home para que Google lea servicios, experiencia real y FAQ incluso antes de renderizar React
- JSON-LD adicional de servicios y FAQPage para reforzar búsquedas por desarrollo web, apps Android Kotlin y software Windows en Chile

---

### Estructura / Structure

```
MiPresentacion
 ┣ src/
 ┃ ┣ components/           → NebulaMap, OrbitCard, MobileShowcase, Hero, Skills...
 ┃ ┣ data/                 → projectsData.ts (18 proyectos)
 ┃ ┣ hooks/                → useConnectionQuality.ts (Network Info API + fallback)
 ┃ ┣ lib/                  → i18n.ts (4 idiomas), previewImages.ts
 ┃ ┗ App.tsx               → Hero multiplataforma + fondo galaxia
 ┣ public/                 → og-image, robots, sitemap, verificación GSC, images/
 ┣ vite.config.ts
 ┣ package.json
 ┗ README.md
```

---

### Características / Features

- **Hero multiplataforma** — de "solo Kotlin" a "Kotlin + Web & Desktop"
- **i18n completo** — 100% traducido ES/EN/PT/FR, sin hardcodes, `t(lang,key)`
- **Lucide icons** — reemplazo total de emojis por iconografía consistente
- **Carga adaptativa** — `navigator.connection` + medición manual → iframe (rápido) o WebP estático (lento)
- **Load More galáctico** — 6 iniciales, +6 por clic, contador `Mostrando X de Y`
- **Plantilla demo badge** — disclaimer profesional en cards y modales

---

### Ver el proyecto / View Live

```bash
# Desarrollo / Development
npm run dev          # http://localhost:5173

# Build producción / Production build
npm run build        # → dist/

# Preview build
npm run preview
```

**Vercel (producción):** `https://miportafolio-fguz.vercel.app/` — deploy automático desde `main`.

> Índice en Google Search Console con sitemap + imagen social para compartir.

---

<div align="center">
  <sub>
    Hecho con 💜 desde cero por Francisco Guzmán ·
    Made with 💜 from scratch by Francisco Guzmán
  </sub>
</div>
