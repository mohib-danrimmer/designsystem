/* ============================================================
   TradeNest Design System — Shared Navigation Logic
   nav.js
   ============================================================ */

(function () {
  'use strict';

  /* ===================================================
     THEME TOGGLE
     =================================================== */
  function initThemeToggle() {
    const root = document.documentElement;
    const saved = localStorage.getItem('ds-theme') || 'light';
    root.setAttribute('data-theme', saved);

    const btn = document.getElementById('ds-theme-toggle');
    if (!btn) return;

    updateThemeIcon(btn, saved);

    btn.addEventListener('click', function () {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('ds-theme', next);
      updateThemeIcon(btn, next);
    });
  }

  function updateThemeIcon(btn, theme) {
    btn.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /* ===================================================
     MOBILE SURFACE TOGGLE
     =================================================== */
  function initMobileToggle() {
    const btn = document.getElementById('ds-mobile-toggle');
    if (!btn) return;

    const pageContainer = document.getElementById('ds-page-container');
    const phoneFrame = document.getElementById('phone-frame');
    if (!pageContainer) return;

    btn.addEventListener('click', function () {
      const isActive = pageContainer.classList.toggle('surface-mobile');
      btn.classList.toggle('active', isActive);
      btn.innerHTML = isActive
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> Desktop View'
        : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> Mobile View';

      if (phoneFrame) {
        phoneFrame.classList.toggle('visible', isActive);
      }

      // Scroll back to top when toggling
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===================================================
     ACTIVE NAV LINK
     =================================================== */
  function initActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';

    const links = document.querySelectorAll('.ds-nav-link[data-page]');
    links.forEach(function (link) {
      const page = link.getAttribute('data-page');
      if (page && currentFile.includes(page)) {
        link.classList.add('active');
      }
    });
  }

  /* ===================================================
     INIT
     =================================================== */
  function init() {
    initThemeToggle();
    initMobileToggle();
    initActiveNavLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
