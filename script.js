const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Scroll-spy ───────────────────────────────────────────
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

// ── Hero entrance stagger ────────────────────────────────
function runHeroEntrance() {
  document.querySelectorAll('[data-animate]').forEach(el => {
    if (reduced) { el.classList.add('visible'); return; }
    setTimeout(() => el.classList.add('visible'), 80);
  });
}

// ── Project scroll reveal ────────────────────────────────
if (!reduced && 'IntersectionObserver' in window) {
  const rev = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); rev.unobserve(e.target); }
    }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.project').forEach(el => rev.observe(el));
} else {
  document.querySelectorAll('.project').forEach(el => el.classList.add('visible'));
}

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setActive('home');
  runHeroEntrance();
});
