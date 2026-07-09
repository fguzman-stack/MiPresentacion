AOS.init({
  duration: 800,
  once: true,
  offset: 100,
});

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const langCurrent = document.getElementById('langCurrent');

let currentLang = localStorage.getItem('lang') || 'es';

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navItems.forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle('open');
});

document.addEventListener('click', () => langDropdown.classList.remove('open'));

langDropdown.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    switchLang(lang);
    langDropdown.classList.remove('open');
  });
});

function switchLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  langCurrent.textContent = lang.toUpperCase();
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });
}

switchLang(currentLang);

const particlesContainer = document.getElementById('heroParticles');
if (particlesContainer) {
  for (let i = 0; i < 80; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 15) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    particlesContainer.appendChild(particle);
  }
}

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

function animateCounter(element) {
  const target = parseInt(element.dataset.count);
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.stat-number');
      numbers.forEach(animateCounter);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) observer.observe(statsSection);

function copiarEmail() {
  navigator.clipboard.writeText('fguzman.dev@email.com');
  const toast = document.createElement('div');
  const key = 'cont_copiar';
  const text = translations[currentLang]?.[key] || 'Copiar Email';
  toast.textContent = text + ' ✓';
  toast.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: var(--bg-card); color: var(--text-primary);
    padding: 12px 24px; border-radius: 12px;
    border: 1px solid var(--border); z-index: 9999;
    font-family: 'Inter', sans-serif; font-size: 0.9rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    animation: fadeInUp 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;
document.head.appendChild(style);