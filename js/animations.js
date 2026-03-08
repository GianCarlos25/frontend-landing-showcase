/* ── Intersection Observer Entrance Animations ───────── */
(function () {

  /* ── Entrance observer ───────────────────────────── */
  const entranceObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entranceObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document
    .querySelectorAll('.animate-fade-up, .animate-slide-right, .animate-slide-left')
    .forEach(el => entranceObserver.observe(el));

  /* ── Stat counter animation ──────────────────────── */
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el, target, duration = 1600) {
    const start = performance.now();
    const isDecimal = String(target).includes('.');

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = easeOutQuart(progress) * target;
      el.textContent = isDecimal
        ? value.toFixed(1)
        : Math.round(value).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
            const target = parseFloat(el.dataset.target);
            animateCounter(el, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const aboutVisual = document.querySelector('.about__visual');
  if (aboutVisual) statsObserver.observe(aboutVisual);

  /* ── Hero word-by-word reveal ────────────────────── */
  function revealHeroHeadline() {
    const headline = document.querySelector('.hero__headline');
    if (!headline) return;

    // Wrap each word in a span
    const html = headline.innerHTML;
    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Process text nodes, preserve HTML tags (like <em>)
    function processNode(node, target) {
      node.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const words = child.textContent.split(/(\s+)/);
          words.forEach(part => {
            if (/^\s+$/.test(part)) {
              target.appendChild(document.createTextNode(part));
            } else if (part.length > 0) {
              const wrap = document.createElement('span');
              wrap.className = 'word';
              wrap.textContent = part;
              target.appendChild(wrap);
            }
          });
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const clone = child.cloneNode(false);
          processNode(child, clone);
          target.appendChild(clone);
        }
      });
    }

    processNode(tempDiv, fragment);
    headline.innerHTML = '';
    headline.appendChild(fragment);

    // Reveal words with stagger
    const words = headline.querySelectorAll('.word');
    words.forEach((word, i) => {
      setTimeout(() => word.classList.add('reveal'), 200 + i * 65);
    });

    // Also immediately reveal badge and sub (they're below fold animations)
    document.querySelectorAll('.hero__content .animate-fade-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('is-visible'), 300 + i * 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealHeroHeadline);
  } else {
    revealHeroHeadline();
  }

})();
