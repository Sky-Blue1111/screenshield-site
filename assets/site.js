// ScreenShield website: store links with campaign tags, the live demo and the examples table.

const STORE = 'https://chromewebstore.google.com/detail/lnnmacapfomfnfnmejcofohhimoebafk';
const SUPPORT_TAB = `${STORE}/support`;
// Google Form for feedback and support requests, and its pre-filled "I removed ScreenShield"
// link for the uninstall page. Until they exist, links fall back to the store's Support tab.
const FEEDBACK_FORM = '';
const FEEDBACK_FORM_REMOVED = '';

// <a data-store="hero"> → store URL tagged with where on the site it was clicked.
for (const a of document.querySelectorAll('a[data-store]')) {
  const url = new URL(STORE);
  url.searchParams.set('utm_source', 'screenshield.app');
  url.searchParams.set('utm_medium', a.dataset.store || 'link');
  url.searchParams.set('utm_campaign', 'site');
  a.href = url.href;
}
for (const a of document.querySelectorAll('a[data-feedback]')) {
  a.href = (a.dataset.feedback === 'removed' && FEEDBACK_FORM_REMOVED) || FEEDBACK_FORM || SUPPORT_TAB;
}
for (const a of document.querySelectorAll('a[data-support-tab]')) a.href = SUPPORT_TAB;

// Hero demo: starts exposed, then protection sweeps in once. The switch flips it after that.
const screen = document.querySelector('[data-demo-screen]');
const toggle = document.querySelector('[data-demo-switch]');
if (screen && toggle) {
  screen.querySelectorAll('.s').forEach((el, i) => el.style.setProperty('--i', String(i)));
  let touched = false;
  const set = (on) => {
    screen.classList.toggle('is-protected', on);
    toggle.setAttribute('aria-checked', String(on));
  };
  toggle.addEventListener('click', () => {
    touched = true;
    set(toggle.getAttribute('aria-checked') !== 'true');
  });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) set(true);
  else setTimeout(() => touched || set(true), 1200);
}

// "What it finds": examples start hidden, the button shows them.
const table = document.querySelector('[data-specimen]');
const reveal = document.querySelector('[data-specimen-toggle]');
if (table && reveal) {
  reveal.addEventListener('click', () => {
    const hidden = table.classList.toggle('is-hidden');
    reveal.textContent = hidden ? reveal.dataset.show : reveal.dataset.hide;
    reveal.setAttribute('aria-pressed', String(!hidden));
  });
}
