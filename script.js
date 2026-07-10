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




