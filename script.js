const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCounter(element) {
  const target = parseInt(element.dataset.count);
  if (!target) return;
  element.textContent = '0';
  if (prefersReducedMotion) {
    element.textContent = target + (target >= 1000 ? '+' : '');
    return;
  }
  const duration = 2000;
  const start = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * target);
    element.textContent = current + (target >= 1000 ? '+' : '');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty('--aos-delay', (entry.target.dataset.aosDelay || 0) + 'ms');
        entry.target.classList.add('aos-animate');
        entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('[data-aos]').forEach(el => revealObserver.observe(el));
} else {
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.classList.add('aos-animate');
    el.querySelectorAll('.stat-number').forEach(animateCounter);
  });
}

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const langCurrent = document.getElementById('langCurrent');

let currentLang = localStorage.getItem('lang') || 'es';

const heroContent = document.querySelector('.hero-content');

const EMAIL_USER = 'familiazv2016';
const EMAIL_DOMAIN = 'gmail.com';
const EMAIL = `${EMAIL_USER}@${EMAIL_DOMAIN}`;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 50);

  if (heroContent && scrollY < window.innerHeight) {
    const progress = scrollY / window.innerHeight;
    heroContent.style.transform = `translateY(${progress * -20}px)`;
    heroContent.style.opacity = 1 - progress * 0.3;
  } else if (heroContent) {
    heroContent.style.transform = '';
    heroContent.style.opacity = '';
  }

  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) current = section.getAttribute('id');
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navItems.forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = langDropdown.classList.toggle('open');
  langBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', () => {
  langDropdown.classList.remove('open');
  langBtn.setAttribute('aria-expanded', 'false');
});

langDropdown.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    switchLang(lang);
    langDropdown.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  });
});

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  langCurrent.textContent = lang.toUpperCase();
  document.documentElement.lang = lang;

  const rtlLangs = ['ar'];
  document.documentElement.dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr';

  const langText = translations[lang];
  if (!langText) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (langText[key] !== undefined) {
      if (el.tagName === 'META') {
        el.setAttribute('content', langText[key]);
      } else if (el.tagName === 'TITLE') {
        el.textContent = langText[key];
      } else {
        el.innerHTML = langText[key];
      }
    }
  });
}

switchLang(currentLang);

document.getElementById('emailLink').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = `mailto:${EMAIL}`;
});
document.getElementById('footerEmailLink').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = `mailto:${EMAIL}`;
});
document.getElementById('emailDisplay').textContent = EMAIL;

function getPhoneNumber() {
  const el = document.querySelector('.phone-digits');
  return el.dataset.phone.split('').reverse().join('');
}

function openWhatsApp(e) {
  e.preventDefault();
  const phone = getPhoneNumber();
  window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank');
}

document.getElementById('phoneLink').addEventListener('click', openWhatsApp);
document.getElementById('footerPhoneLink').addEventListener('click', openWhatsApp);

const shootingStarsContainer = document.querySelector('.shooting-stars');
for (let i = 0; i < 6; i++) {
  const star = document.createElement('div');
  star.className = 'shooting-star';
  star.style.setProperty('--dx', -(Math.random() * 300 + 100) + 'px');
  star.style.setProperty('--dy', Math.random() * 300 + 100 + 'px');
  star.style.setProperty('--dur', (Math.random() * 4 + 3) + 's');
  star.style.top = Math.random() * 60 + '%';
  star.style.left = Math.random() * 80 + 10 + '%';
  star.style.animationDelay = (Math.random() * 12) + 's';
  shootingStarsContainer.appendChild(star);
}

// ===== NEBULA GALAXY PREMIUM — Vanilla JS/CSS Grid (spec exacto) =====
const projectsData = [
  { id: "ai-boost", name: "AI-Boost", taglineES: "Plantilla premium para negocios de IA", taglineEN: "Premium template for AI businesses", url: "https://fguzman-stack.github.io/Ai-Boost/", type: "web", tech: ["HTML","CSS","JS"], constellation: "nebula-tech", color: "#54dcff", color2: "#00c8ff", preview: "linear-gradient(135deg, #667eea, #764ba2)", feature: "Demo interactivo con modo simulado" },
  { id: "aimpact", name: "AImpact", taglineES: "AI Startup & SaaS Landing Template", taglineEN: "AI Startup & SaaS Landing Template", url: "https://fguzman-stack.github.io/Aimpact/pages/index.html", type: "web", tech: ["HTML","CSS","JS"], constellation: "nebula-tech", color: "#54dcff", color2: "#00c8ff", preview: "linear-gradient(135deg, #4facfe, #00f2fe)", feature: "ML, NLP y Predictive Analytics" },
  { id: "nexusstream", name: "NexusStream", taglineES: "Event Streaming en tiempo real a escala", taglineEN: "Real-time event streaming at scale", url: "https://fguzman-stack.github.io/nexusstream/", type: "web", tech: ["HTML","CSS","JS"], constellation: "nebula-tech", color: "#54dcff", color2: "#00c8ff", preview: "linear-gradient(135deg, #8b6cff, #ffd166)", feature: "WebSocket + SSE + API Gateway funcional" },
  { id: "promptflow", name: "PromptFlow", taglineES: "Librería de prompts premium con 500+ prompts", taglineEN: "Premium AI prompt library with 500+ prompts", url: "https://fguzman-stack.github.io/PromptFlow/", type: "web", tech: ["HTML","CSS","JS"], constellation: "nebula-tech", color: "#54dcff", color2: "#00c8ff", preview: "linear-gradient(135deg, #f093fb, #f5576c)", feature: "Filtros por modelo IA y dificultad" },
  { id: "reviewroom", name: "Reviewroom", taglineES: "AI code review para equipos que shippean", taglineEN: "AI code review for teams that ship", url: "https://fguzman-stack.github.io/reviewroom/", type: "web", tech: ["HTML","CSS","JS"], constellation: "nebula-tech", color: "#54dcff", color2: "#00c8ff", preview: "linear-gradient(135deg, #4facfe, #00f2fe)", feature: "Score de review y insights automáticos" },
  { id: "latambooker", name: "LatamBooker Pro", taglineES: "Multi-tenant Booking Platform para LatAm", taglineEN: "Multi-tenant booking platform for LatAm", url: "https://fguzman-stack.github.io/LatamBooker/", type: "web", tech: ["HTML","CSS","JS"], constellation: "orbita-reservas", color: "#9b7bff", color2: "#c4a8ff", preview: "linear-gradient(135deg, #667eea, #764ba2)", feature: "Pagos locales, WhatsApp y multi-sede" },
  { id: "bookingsuite", name: "BookingSuite Pro", taglineES: "Barber · Spa · Clinic · Fitness en un template", taglineEN: "Barber · Spa · Clinic · Fitness — one template", url: "https://fguzman-stack.github.io/BookingSuite-Pro/", type: "web", tech: ["HTML","CSS","JS"], constellation: "orbita-reservas", color: "#9b7bff", color2: "#c4a8ff", preview: "linear-gradient(135deg, #f093fb, #f5576c)", feature: "4 nichos + dark mode + dashboard" },
  { id: "nichebooker", name: "NicheBooker", taglineES: "Gestión de agenda visual para nichos boutique", taglineEN: "Visual agenda management for boutique niches", url: "https://fguzman-stack.github.io/NicheBooker/", type: "web", tech: ["HTML","CSS","JS"], constellation: "orbita-reservas", color: "#9b7bff", color2: "#c4a8ff", preview: "linear-gradient(135deg, #4facfe, #00f2fe)", feature: "Agenda drag & drop + recordatorios WhatsApp" },
  { id: "barberia", name: "Barbería El Clásico", taglineES: "Reservas sin fricción para barberías tradicionales", taglineEN: "Frictionless booking for traditional barbershops", url: "https://fguzman-stack.github.io/Barberia-Plantilla/", type: "web", tech: ["HTML","CSS","JS"], constellation: "orbita-reservas", color: "#9b7bff", color2: "#c4a8ff", preview: "linear-gradient(135deg, #8b6cff, #ffd166)", feature: "Flujo de 3 pasos: elige, confirmá, disfrutá" },
  { id: "vetflow", name: "VetFlow Pro", taglineES: "Sistema operativo humano para clínicas veterinarias", taglineEN: "Human operating system for veterinary clinics", url: "https://fguzman-stack.github.io/VetFlow-Pro/", type: "web", tech: ["HTML","CSS","JS"], constellation: "orbita-reservas", color: "#9b7bff", color2: "#c4a8ff", preview: "linear-gradient(135deg, #667eea, #764ba2)", feature: "Diseño warm paper, no cold software" },
  { id: "auradesign", name: "AuraDesign", taglineES: "Arquitectura y Diseño de Interiores Premium", taglineEN: "Premium Architecture & Interior Design", url: "https://fguzman-stack.github.io/AuraDesing/", type: "web", tech: ["HTML","CSS","JS"], constellation: "aurora-creative", color: "#ff63b8", color2: "#ff9ec8", preview: "linear-gradient(135deg, #f093fb, #f5576c)", feature: "150+ proyectos, estética editorial" },
  { id: "creatorflow", name: "CreatorFlow", taglineES: "Monetiza tu conocimiento — todo para creadores", taglineEN: "Monetize your knowledge — everything for creators", url: "https://fguzman-stack.github.io/CreatorFlow/", type: "web", tech: ["HTML","CSS","JS"], constellation: "aurora-creative", color: "#ff63b8", color2: "#ff9ec8", preview: "linear-gradient(135deg, #4facfe, #00f2fe)", feature: "Funnels de venta + checkout + i18n" },
  { id: "comidacallejera", name: "Ruta Callejera", taglineES: "Guía gastronómica de Santiago — street food", taglineEN: "Santiago street food guide", url: "https://fguzman-stack.github.io/ComidaCallejera/", type: "web", tech: ["HTML","CSS","JS"], constellation: "aurora-creative", color: "#ff63b8", color2: "#ff9ec8", preview: "linear-gradient(135deg, #8b6cff, #ffd166)", feature: "Mapa interactivo + curaduría semanal" },
  { id: "a-tiempo", name: "A Tiempo", taglineES: "App de productividad — 10 pantallas, MVVM, Firebase", taglineEN: "Productivity app — 10 screens, MVVM, Firebase", url: "#", type: "mobile", tech: ["Kotlin","Compose","Firebase"], constellation: "satellites", color: "#ffca6b", color2: "#ffe4a0", preview: "linear-gradient(135deg, #667eea, #764ba2)", feature: "Arquitectura MVVM + Room + AdMob" },
  { id: "mitad-mitad", name: "Mitad y Mitad", taglineES: "Finanzas compartidas multi-moneda con Firestore", taglineEN: "Shared multi-currency finances with Firestore", url: "#", type: "mobile", tech: ["Kotlin","Compose","Firestore"], constellation: "satellites", color: "#ffca6b", color2: "#ffe4a0", preview: "linear-gradient(135deg, #f093fb, #f5576c)", feature: "Multi-moneda en tiempo real" },
  { id: "despensa-dia", name: "Despensa al Día", taglineES: "Gestión inteligente del hogar con IA y widgets", taglineEN: "Smart home management with AI and widgets", url: "#", type: "mobile", tech: ["Kotlin","Compose","AI","Retrofit"], constellation: "satellites", color: "#ffca6b", color2: "#ffe4a0", preview: "linear-gradient(135deg, #4facfe, #00f2fe)", feature: "IA integrada + widget home screen" }
];

(function() {
  const map = document.getElementById('nebulaMap');
  if (!map) return;

  function getTagline(p) {
    const lang = localStorage.getItem('lang') || 'es';
    return lang === 'en' && p.taglineEN ? p.taglineEN : p.taglineES;
  }

  function renderProjects(filter = 'all') {
    map.innerHTML = '';
    const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.constellation === filter);
    filtered.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'orbit-card';
      card.style.setProperty('--card-glow', p.color);
      card.style.setProperty('--card-glow-2', p.color2);
      card.style.animationDelay = `${i * 0.07}s`;
      const isMobile = p.type === 'mobile';
      const ctaText = isMobile ? 'Solicitar APK' : 'Abrir proyecto ↗';
      const mobileIcon = `<svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`;
      card.innerHTML = `
        <div class="card-preview" style="--preview-bg: ${p.preview}">
          ${!isMobile ? `<iframe src="${p.url}" loading="lazy" title="${p.name} preview" sandbox="allow-same-origin allow-scripts"></iframe>` : ''}
          <div class="card-preview-overlay"></div>
          ${isMobile ? `<div class="mobile-ring"></div><div class="card-preview-fallback">${mobileIcon}<span style="font-family:'JetBrains Mono',monospace;font-size:0.75rem">APK disponible</span></div>` : ''}
        </div>
        <div class="card-content">
          <div class="card-header"><div class="card-title">${p.name}</div><div class="card-type">${p.type}</div></div>
          <div class="card-desc">${getTagline(p)}</div>
          <div class="card-feature">${p.feature}</div>
          <div class="card-tech">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
        </div>
        <div class="card-hover-hud"><button class="hud-cta" data-project="${p.id}">${ctaText}</button></div>
      `;
      map.appendChild(card);
    });
    // click en card completa para web abre modal iframe
    map.querySelectorAll('.orbit-card').forEach(card => {
      const id = card.querySelector('.hud-cta')?.dataset.project;
      if (!id) return;
      card.addEventListener('click', (e) => {
        if (e.target.closest('.hud-cta')) return; // ya manejado arriba
        const p = projectsData.find(x => x.id === id);
        if (!p) return;
        if (p.type === 'mobile') showMobileModal(p);
        else openPreviewModal(p);
      });
    });
    map.querySelectorAll('.hud-cta').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.project;
        const p = projectsData.find(x => x.id === id);
        if (!p) return;
        if (p.type === 'mobile') {
          showMobileModal(p);
        } else {
          openPreviewModal(p);
        }
      });
    });
  }

  function openPreviewModal(p) {
    // crear overlay premium con iframe
    let overlay = document.getElementById('previewOverlay');
    if (overlay) overlay.remove();
    overlay = document.createElement('div');
    overlay.id = 'previewOverlay';
    overlay.className = 'preview-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <div class="preview-modal">
        <div class="preview-header">
          <div class="preview-header-left">
            <div class="preview-header-title">${p.name}</div>
            <div class="preview-header-sub">${getTagline(p)} · ${p.feature}</div>
          </div>
          <div class="preview-header-actions">
            <a href="${p.url}" target="_blank" rel="noopener" class="preview-btn-external">Abrir ↗</a>
            <button class="preview-btn-close" aria-label="Cerrar">✕</button>
          </div>
        </div>
        <div class="preview-iframe-wrap">
          <iframe src="${p.url}" title="${p.name} preview" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    const close = () => { overlay.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('.preview-btn-close').addEventListener('click', close);
  }

  function showMobileModal(p) {
    // Use SweetAlert2 if available, else fallback
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: `<span style="font-family:Orbitron,sans-serif;font-size:1.1rem">${p.name}</span>`,
        html: `<div style="text-align:left;font-family:Inter,sans-serif"><p style="margin-bottom:14px;color:rgba(244,241,255,0.7);font-size:0.9rem;line-height:1.5">${getTagline(p)}</p><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">${p.tech.map(t => `<span style="background:rgba(155,123,255,0.12);padding:4px 10px;border-radius:6px;font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#9b7bff;border:1px solid rgba(155,123,255,0.2)">${t}</span>`).join('')}</div><p style="font-size:0.82rem;color:rgba(244,241,255,0.4);line-height:1.4">${p.feature}. El APK está disponible bajo solicitud.</p></div>`,
        showCancelButton: true,
        confirmButtonText: 'Solicitar APK',
        cancelButtonText: 'Cerrar',
        background: '#0e0e25',
        color: '#f4f1ff',
        confirmButtonColor: '#9b7bff',
        cancelButtonColor: 'rgba(255,255,255,0.08)',
        customClass: { popup: 'rounded-2xl border border-white/10 backdrop-blur-xl', confirmButton: 'swal2-confirm-custom', cancelButton: 'swal2-cancel-custom' }
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'mailto:familiazv2016@gmail.com?subject=Solicitud%20APK%20' + encodeURIComponent(p.name);
        }
      });
    }
  }

  const filterContainer = document.querySelector('.nebula-filters');
  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      filterContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  }

  renderProjects();

  const origSwitchLang = window.switchLang;
  if (origSwitchLang) {
    window.switchLang = function(lang) {
      origSwitchLang(lang);
      const activeFilter = document.querySelector('.filter-pill.active');
      renderProjects(activeFilter ? activeFilter.dataset.filter : 'all');
    };
  } else {
    // Hook for React: re-render on lang change via storage event
    window.addEventListener('storage', (e) => {
      if (e.key === 'lang') {
        const activeFilter = document.querySelector('.filter-pill.active');
        renderProjects(activeFilter ? activeFilter.dataset.filter : 'all');
      }
    });
  }
})();





