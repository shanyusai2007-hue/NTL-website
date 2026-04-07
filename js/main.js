/* ═══════════════════════════════════════════════════════════
   PAGE LOAD CURTAIN
═══════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('curtain').classList.add('gone');
  }, 600);
});

/* ═══════════════════════════════════════════════════════════
   TOUCH DEVICE DETECTION
═══════════════════════════════════════════════════════════ */
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

/* ═══════════════════════════════════════════════════════════
   CUSTOM CURSOR - ENHANCED
═══════════════════════════════════════════════════════════ */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = -100, my = -100;
let rx = -100, ry = -100;
let rAFCursor;

// Compensate for body zoom so cursor stays accurate
const bodyZoom = parseFloat(getComputedStyle(document.body).zoom) || 1;

if (!isTouchDevice) {
  function lerpCursor() {
    rx += (mx - rx) * 0.10;
    ry += (my - ry) * 0.10;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    rAFCursor = requestAnimationFrame(lerpCursor);
  }
  lerpCursor();

  window.addEventListener('mousemove', e => { mx = e.clientX / bodyZoom; my = e.clientY / bodyZoom; }, { passive: true });

  // Hover state on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .quote-card, .team__panel, .words-strip__word, .marquee__item, .join__word');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
  window.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  window.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
} else {
  // Hide cursor elements on touch devices
  if (dot) dot.style.display = 'none';
  if (ring) ring.style.display = 'none';
}


/* ═══════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════ */
const progressBar = document.getElementById('progress-bar');
function updateProgress() {
  const total  = document.body.scrollHeight - window.innerHeight;
  const pct    = total > 0 ? (window.scrollY / total) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });


/* ═══════════════════════════════════════════════════════════
   NAVBAR: scroll state
═══════════════════════════════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
  updateProgress();
}, { passive: true });


/* ═══════════════════════════════════════════════════════════
   WORD-SPLIT TEXT ANIMATIONS
   Wraps each word in .hero section headings for staggered reveal
═══════════════════════════════════════════════════════════ */
function splitAndReveal(selector, baseDelay = 0, stagger = 80) {
  document.querySelectorAll(selector).forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) =>
      `<span class="split-word" style="transition-delay:${baseDelay + i * stagger}ms">` +
        `<span class="word-inner">${w}</span>` +
      `</span>`
    ).join(' ');
  });
}

// Apply to team title, section headings
splitAndReveal('.team__title', 100, 90);

// Observe split-word elements
const splitObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.split-word').forEach(sw => sw.classList.add('word-visible'));
      splitObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.team__title').forEach(el => splitObs.observe(el));


/* ═══════════════════════════════════════════════════════════
   CHAR SCRAMBLE — hover on nav logo + footer logo
═══════════════════════════════════════════════════════════ */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function scrambleText(el, finalText, duration = 600) {
  const len = finalText.length;
  let frame = 0;
  const totalFrames = Math.round(duration / 40);
  const interval = setInterval(() => {
    el.textContent = finalText
      .split('')
      .map((ch, i) => {
        if (frame / totalFrames > i / len) return ch;
        return ch === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join('');
    frame++;
    if (frame > totalFrames) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 40);
}

document.querySelectorAll('.footer__logo').forEach(el => {
  const orig = el.textContent;
  el.addEventListener('mouseenter', () => scrambleText(el, orig, 500));
});

// Also scramble JOIN words on hover
document.querySelectorAll('.join__word').forEach(el => {
  const orig = el.textContent;
  el.addEventListener('mouseenter', () => {
    if (el.classList.contains('revealed')) scrambleText(el, orig, 350);
  });
});

// Scramble stats labels on row hover
document.querySelectorAll('.stats__item').forEach(item => {
  const label = item.querySelector('.stats__label');
  if (label) {
    const orig = label.textContent;
    item.addEventListener('mouseenter', () => scrambleText(label, orig, 400));
  }
});


/* ═══════════════════════════════════════════════════════════
   GENERIC REVEAL (.reveal + .from-left)
   threshold: 0.12
═══════════════════════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal, .from-left');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));


/* ═══════════════════════════════════════════════════════════
   IMAGES: own opacity fade observer
═══════════════════════════════════════════════════════════ */
const imagesSection = document.getElementById('images-section');
if (imagesSection) {
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) imagesSection.classList.add('visible');
  }, { threshold: 0.08 }).observe(imagesSection);
}


/* ═══════════════════════════════════════════════════════════
   IMAGE PARALLAX: rAF scroll handler
   CSS var --py, composes with scale in CSS
═══════════════════════════════════════════════════════════ */
const img1   = document.getElementById('img-1');
const panel1 = document.getElementById('img-panel-1');
let rafPending = false;

function runParallax() {
  const vh = window.innerHeight;
  if (img1 && panel1) {
    const r = panel1.getBoundingClientRect();
    if (r.bottom > -100 && r.top < vh + 100) {
      const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const shift    = (progress - 0.5) * 40;
      img1.style.setProperty('--py', `${shift}px`);
    }
  }
  rafPending = false;
}

window.addEventListener('scroll', () => {
  if (!rafPending) { requestAnimationFrame(runParallax); rafPending = true; }
}, { passive: true });

runParallax();


/* ═══════════════════════════════════════════════════════════
   JOIN WORDS: clip-path stagger — EXACT 110ms
═══════════════════════════════════════════════════════════ */
const joinWords   = document.querySelectorAll('.join__word');
const joinSection = document.getElementById('join-words');

if (joinSection) {
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      joinWords.forEach((word, i) => {
        setTimeout(() => word.classList.add('revealed'), i * 110);
      });
    }
  }, { threshold: 0.15 }).observe(joinSection);
}


/* ═══════════════════════════════════════════════════════════
   HERO & SECTION PARALLAX on scroll
═══════════════════════════════════════════════════════════ */
const hOpen  = document.querySelector('.hero__quote-line--open');
const hClose = document.querySelector('.hero__quote-line--close');
const quotesSection = document.querySelector('.quotes');
const joinWordsWrapper = document.querySelector('.join__words');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const vh = window.innerHeight;

  if (y <= vh * 1.4) {
    if (hOpen)  hOpen.style.marginTop  = `${y * 0.055}px`;
    if (hClose) hClose.style.marginTop = `${y * 0.033}px`;
  }

  if (quotesSection) {
    const r = quotesSection.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) {
      const progress = (vh - r.top) / (vh + r.height);
      // Drift up
      quotesSection.style.transform = `translateY(${40 - progress * 40}px)`;
      // Fade in smoothly
      quotesSection.style.opacity = Math.min(1, progress * 2);
    }
  }

  if (joinWordsWrapper) {
    const r = joinWordsWrapper.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) {
      const progress = (vh - r.top) / (vh + r.height);
      joinWordsWrapper.style.transform = `translateY(${30 - progress * 30}px)`;
      joinWordsWrapper.style.opacity = Math.min(1, progress * 1.8 + 0.2);
    }
  }
}, { passive: true });


/* ═══════════════════════════════════════════════════════════
   SECTION ENTRY — add ambient class when sections enter view
═══════════════════════════════════════════════════════════ */
const sections = document.querySelectorAll('section, .marquee, .words-strip, .images, .finale');
const secObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    e.target.classList.toggle('in-view', e.isIntersecting);
  });
}, { threshold: 0.05 });
sections.forEach(s => secObs.observe(s));


/* ═══════════════════════════════════════════════════════════
   IMAGES PANELS — subtle cursor-tracking tilt
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.images__panel, .team__panel, .finale__image').forEach(panel => {
  panel.addEventListener('mousemove', e => {
    const r  = panel.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width  - 0.5;
    const cy = (e.clientY - r.top)  / r.height - 0.5;
    const img = panel.querySelector('img');
    if (img) {
      img.style.transition = 'transform 0.1s linear';
      const base = panel === document.getElementById('img-panel-1')
        ? `translateY(var(--py,0px)) scale(1.06)` : `scale(1.04)`;
      img.style.transform = `${base} translate(${cx * 7}px, ${cy * 4}px)`;
    }
  });
  panel.addEventListener('mouseleave', e => {
    const img = panel.querySelector('img');
    if (img) {
      img.style.transition = 'transform 0.9s cubic-bezier(0.22,1,0.36,1)';
      img.style.transform = '';
    }
  });
});


/* ═══════════════════════════════════════════════════════════
   MOBILE HAMBURGER MENU
═══════════════════════════════════════════════════════════ */
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.querySelector('.nav__links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
    document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked (mobile only)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('mobile-open');
        document.body.style.overflow = '';
      }
    });
  });
}


/* Smooth scroll handled by CSS: html { scroll-behavior: smooth; } */


/* ═══════════════════════════════════════════════════════════
   STATS COUNTER — count-up on scroll into view
═══════════════════════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic for smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsSection = document.getElementById('stats-section');
if (statsSection) {
  let statsCounted = false;
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !statsCounted) {
      statsCounted = true;
      document.querySelectorAll('.stats__item').forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('is-animating');
          const num = item.querySelector('.stats__number');
          if (num) animateCounter(num);
        }, i * 300);
      });
    }
  }, { threshold: 0.3 }).observe(statsSection);
}

/* ═══════════════════════════════════════════════════════════
   MAGNETIC HOVER ON CTAs
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('.join__btn, .nav__cta').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    btn.style.transition = 'transform 0.1s linear';
    btn.style.transform = `translate(${cx * 24}px, ${cy * 24}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
    btn.style.transform = '';
  });
});


/* ═══════════════════════════════════════════════════════════
   THEME TOGGLE EASTER EGG (Cinematic Shutter - Zero Lag)
═══════════════════════════════════════════════════════════ */
const themeToggleDot = document.getElementById('theme-toggle');
const themeShutter = document.getElementById('theme-shutter');

const toggleTheme = () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('ntl-theme', isLight ? 'light' : 'dark');
};

if (themeToggleDot && themeShutter) {
  themeToggleDot.addEventListener('click', () => {
    // 1. Activate shutter (fade to black)
    themeShutter.classList.add('active');

    // 2. Wait for shutter to cover view (matches CSS 0.35s)
    setTimeout(() => {
      // 3. Snap theme instantly behind the curtain
      toggleTheme();

      // 4. Brief hold for visual stability, then fade out
      setTimeout(() => {
        themeShutter.classList.remove('active');
      }, 100);
    }, 400);
  });

  // Restore theme on load
  if (localStorage.getItem('ntl-theme') === 'light') {
    document.body.classList.add('light-theme');
  }
}