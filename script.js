const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Scroll-spy ──────────────────────────────────────────
const tabs     = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('section[id]');

function setActive(id) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === id));
}

if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach(s => spy.observe(s));
}

// ── Scroll reveal ───────────────────────────────────────
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  document.querySelectorAll('.project, .about-grid, .intro-card').forEach(el => {
    el.classList.add('reveal');
  });
  const rev = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); rev.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => rev.observe(el));
}

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => setActive('home'));
