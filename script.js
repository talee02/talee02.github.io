// ===========================================================
// Respect reduced motion preference
// ===========================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===========================================================
// Hero terminal typing effect
// ===========================================================
const terminalLines = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Nurmalita Fitri Ramadani — Data Analyst' },
  { type: 'cmd', text: 'skills --list' },
  { type: 'out', text: 'SQL · Power BI · Python · Excel' },
  { type: 'cmd', text: 'status' },
  { type: 'out', text: 'Open to Business Intelligence roles' },
];

const terminalEl = document.getElementById('terminal-output');

function renderStatic() {
  terminalEl.innerHTML = terminalLines
    .map(l => l.type === 'cmd'
      ? `<span class="lbl">$ </span>${l.text}`
      : `<span class="out">${l.text}</span>`)
    .join('\n');
}

async function typeTerminal() {
  if (!terminalEl) return;
  if (prefersReducedMotion) { renderStatic(); return; }

  for (const line of terminalLines) {
    const lineEl = document.createElement('div');
    terminalEl.appendChild(lineEl);

    if (line.type === 'cmd') {
      const prompt = document.createElement('span');
      prompt.className = 'lbl';
      prompt.textContent = '$ ';
      lineEl.appendChild(prompt);

      for (const ch of line.text) {
        lineEl.append(ch);
        await sleep(28);
      }
      await sleep(280);
    } else {
      const out = document.createElement('span');
      out.className = 'out';
      out.textContent = line.text;
      lineEl.appendChild(out);
      await sleep(320);
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ===========================================================
// Scroll-spy for nav tabs
// ===========================================================
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('main section[id]');

function setActiveTab(id) {
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === id);
  });
}

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveTab(entry.target.id);
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach(section => observer.observe(section));
}

// ===========================================================
// Subtle reveal-on-scroll for project rows
// ===========================================================
const revealTargets = document.querySelectorAll('.project, .about-grid');

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach(el => revealObserver.observe(el));
}

// ===========================================================
// Init
// ===========================================================
document.addEventListener('DOMContentLoaded', () => {
  setActiveTab('home');
  typeTerminal();
});
