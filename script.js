/* ============================================================
   PORTFOLIO — script.js
   Handles: Custom cursor, scroll reveal, skill bar animation,
            staggered card delays, active nav highlighting
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. CUSTOM CURSOR
     ---------------------------------------------------------- */
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth ring lag via rAF
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;

    cur.style.transform  = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
    ring.style.transform = `translate(${ringX - 17}px, ${ringY - 17}px)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Expand ring on hover over interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .proj-card, .cert-card, .tchip, .pill, .nav-hire, .btn-p, .btn-s, .cf-btn'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '52px';
      ring.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '34px';
      ring.style.height = '34px';
    });
  });


  /* ----------------------------------------------------------
     2. INTERSECTION OBSERVER — SCROLL REVEAL (.rv)
     ---------------------------------------------------------- */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.rv, .exp-item').forEach(el => revealObs.observe(el));


  /* ----------------------------------------------------------
     3. SKILL BAR ANIMATION
     Bars start at width:0 in CSS (set via data-w attribute),
     then animate to their target width when scrolled into view.
     ---------------------------------------------------------- */
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.fill[data-w]').forEach(bar => {
          bar.style.width = bar.dataset.w;
        });
        barObs.unobserve(entry.target); // animate once only
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-list').forEach(el => barObs.observe(el));


  /* ----------------------------------------------------------
     4. STAGGERED ANIMATION DELAYS
     ---------------------------------------------------------- */
  // Project cards
  document.querySelectorAll('.proj-grid .proj-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
  });

  // Certificate cards
  document.querySelectorAll('.cert-grid .cert-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.07) + 's';
  });

  // Tool chips
  document.querySelectorAll('.tool-chips .tchip').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.04) + 's';
  });


  /* ----------------------------------------------------------
     5. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--teal)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => navObs.observe(sec));


  /* ----------------------------------------------------------
     6. CONTACT FORM — simple UX feedback
     ---------------------------------------------------------- */
  const cfBtn = document.querySelector('.cf-btn');
  if (cfBtn) {
    cfBtn.addEventListener('click', () => {
      const inputs   = document.querySelectorAll('.cf-input');
      const textarea = document.querySelector('.cf-textarea');
      const allFilled = [...inputs].every(i => i.value.trim() !== '') &&
                        textarea.value.trim() !== '';

      if (allFilled) {
        cfBtn.textContent = 'Message Sent ✓';
        cfBtn.style.background = 'var(--teal2)';
        setTimeout(() => {
          cfBtn.textContent  = 'Send Message →';
          cfBtn.style.background = '';
          inputs.forEach(i => i.value = '');
          textarea.value = '';
        }, 3000);
      } else {
        cfBtn.textContent = 'Fill all fields ✕';
        cfBtn.style.background = 'var(--coral)';
        setTimeout(() => {
          cfBtn.textContent = 'Send Message →';
          cfBtn.style.background = '';
        }, 2000);
      }
    });
  }

});
