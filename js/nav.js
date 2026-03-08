/* ── Navigation ─────────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const drawer = document.querySelector('.nav__drawer');
  const overlay = document.querySelector('.nav__drawer-overlay');
  const drawerLinks = document.querySelectorAll('.nav__drawer-link');
  const drawerCta = document.querySelector('.nav__drawer-cta');
  const closeBtn = document.querySelector('.nav__close');
  const progressBar = document.querySelector('.scroll-progress');

  let isOpen = false;
  let ticking = false;

  /* ── Sticky Nav ─────────────────────────────────── */
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Sticky blur
        if (scrollY > 60) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }

        // Scroll progress bar
        if (progressBar) {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const pct = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
          progressBar.style.width = pct + '%';
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  /* ── Hamburger / Drawer ──────────────────────────── */
  function openDrawer() {
    isOpen = true;
    nav.classList.add('nav--open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    // Focus first focusable element
    const firstFocusable = drawer.querySelector('a, button');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeDrawer() {
    isOpen = false;
    nav.classList.remove('nav--open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      isOpen ? closeDrawer() : openDrawer();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  if (drawerCta) {
    drawerCta.addEventListener('click', closeDrawer);
  }

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeDrawer();
  });

  // Focus trap inside drawer
  document.addEventListener('keydown', e => {
    if (!isOpen || e.key !== 'Tab') return;
    const focusable = drawer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ── Smooth Scroll for Anchor Links ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();
