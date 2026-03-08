/* ── Interactions ─────────────────────────────────────── */
(function () {

  /* ── Billing Toggle ────────────────────────────────── */
  const billingToggle = document.getElementById('billing-toggle');
  const monthlyLabel = document.querySelector('.pricing__toggle .label-monthly');
  const annualLabel  = document.querySelector('.pricing__toggle .label-annual');

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateNumber(el, from, to, duration = 400) {
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const value = Math.round(from + (to - from) * easeOutCubic(t));
      el.textContent = value;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (billingToggle) {
    billingToggle.addEventListener('change', () => {
      const isAnnual = billingToggle.checked;

      document.querySelectorAll('.price-amount').forEach(el => {
        const from = parseInt(el.textContent) || 0;
        const to   = parseInt(el.dataset[isAnnual ? 'annual' : 'monthly']) || 0;
        animateNumber(el, from, to);
      });

      document.querySelectorAll('.price-period').forEach(el => {
        el.textContent = isAnnual ? '/mo, billed annually' : '/month';
      });

      if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
      if (annualLabel)  annualLabel.classList.toggle('active', isAnnual);
    });

    // Set initial active state
    if (monthlyLabel) monthlyLabel.classList.add('active');
  }

  /* ── Testimonial Carousel (mobile) ────────────────── */
  const track = document.querySelector('.testimonials__track');
  const dots  = document.querySelectorAll('.testimonials__dot');
  let currentDot = 0;

  function updateDots(index) {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentDot = index;
  }

  if (track && dots.length) {
    // Update dots on scroll
    let dotTicking = false;
    track.addEventListener('scroll', () => {
      if (dotTicking) return;
      dotTicking = true;
      requestAnimationFrame(() => {
        const cards = track.querySelectorAll('.testimonial-card');
        if (!cards.length) { dotTicking = false; return; }
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).columnGap || 0);
        const index = Math.round(track.scrollLeft / cardWidth);
        updateDots(Math.max(0, Math.min(index, dots.length - 1)));
        dotTicking = false;
      });
    }, { passive: true });

    // Dot click navigation
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const cards = track.querySelectorAll('.testimonial-card');
        if (!cards.length) return;
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).columnGap || 0);
        track.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
        updateDots(i);
      });
    });

    // Initialize
    updateDots(0);
  }

  /* ── Hover tilt on feature cards ─────────────────── */
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── Pricing card highlight on hover ─────────────── */
  document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      document.querySelectorAll('.pricing-card').forEach(c => {
        if (c !== card) c.style.opacity = '0.7';
      });
    });
    card.addEventListener('mouseleave', () => {
      document.querySelectorAll('.pricing-card').forEach(c => {
        c.style.opacity = '';
      });
    });
  });

})();
