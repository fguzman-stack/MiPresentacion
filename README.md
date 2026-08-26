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
    <a href="https://fguzman-stack.github.io/MiPresentacion/"><img src="https://img.shields.io/badge/Live-Demo-54DCFF?style=for-the-badge&logo=vercel&logoColor=white" /></a>
  </p>
  <br/>
</div>

---

## Portfolio — MiPresentacion

Portfolio personal donde muestro **3 apps nativas Android + 13 plantillas web** como proyectos de demostración para exhibir habilidades de desarrollo y diseño.  
Construido con **React 19 + Vite 6 + Tailwind CSS 4 + TypeScript**. Con **carga adaptativa** y **soporte ES/EN**.

Personal portfolio showcasing **3 native Android apps + 13 web templates** as demo projects to showcase dev & design skills.  
Built with **React 19 + Vite 6 + Tailwind CSS 4 + TypeScript**. With **adaptive loading** and **ES/EN i18n**.

> **Nota:** Todas las webs son **plantillas demo de portafolio**, no servicios reales. Las 3 apps móviles sí son proyectos nativos con Kotlin.

---

### Stats / Métricas

| Métrica | Valor |
|---------|-------|
| **Apps Nativas** | 3 (Kotlin · Compose) |
| **Proyectos totales** | 16 |
| **Apps Web (plantillas)** | 13 |

---

### Apps Destacadas / Featured Apps

| App | Stack | Descripción |
|-----|-------|-------------|
| **A Tiempo** | Kotlin · Compose · Room · Firebase | Recordatorios inteligentes con alarma, widget y diario personal |
| **Mitad y Mitad** | Kotlin · Firebase · Firestore | Split de gastos en pareja con sincronización multi-moneda |
| **Despensa al Día** | Kotlin · Compose · Retrofit · Firebase AI | Gestión de despensa con recetas generadas por IA + widget |

### Plantillas Web / Web Templates

13 demos en 3 constelaciones + 1 órbita móvil: `nebula-tech` (5 SaaS & IA), `orbita-reservas` (5 Booking), `aurora-creative` (3 Creative), `satellites` (3 Mobile). Todas marcadas como **Plantilla demo** en cards y modales.

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

> Antes con 15 idiomas, ahora enfocado en **ES/EN 100% traducido** sin hardcodes. Selector reparado.

---

### Estructura / Structure

```
MiPresentacion
 ┣ public/
 ┃ ┗ images/               → 13 WebP optimizados (public, Vite los sirve en /images/)
 ┣ src/
 ┃ ┣ components/           → NebulaMap, OrbitCard, MobileSheet, ProjectFilters...
 ┃ ┣ data/                 → projectsData.ts (16 proyectos)
 ┃ ┣ hooks/                → useConnectionQuality.ts (Network Info API + fallback)
 ┃ ┣ lib/                  → i18n.ts, previewImages.ts
 ┃ ┣ App.tsx               → Hero multiplataforma + stats 3/16/13, Galaxy bg
 ┃ ┗ index.css             → Tailwind + nebula/orbit styles
 ┣ vite.config.ts          → base: './' (GitHub Pages)
 ┣ package.json
 ┗ README.md
```

---

### Características / Features

- **Hero multiplataforma** — de "solo Kotlin" a "Kotlin + Web & Desktop"
- **i18n reparado** — 100% traducido ES/EN, sin hardcodes, `t(lang,key)`
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

**GitHub Pages:** `https://fguzman-stack.github.io/MiPresentacion/` (deploy automático vía GitHub Actions `main` → `gh-pages`)

---

<div align="center">
  <sub>
    Hecho con 💜 desde cero por Francisco Guzmán ·
    Made with 💜 from scratch by Francisco Guzmán
  </sub>
  <br/><br/>
  <img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Ffguzman-stack%2FMiPresentacion&label=Visitors&countColor=%239B7BFF" />
</div>
