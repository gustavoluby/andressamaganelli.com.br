/* ════════════════════════════════════════════════════════
   ANDRESSA MAGANELLI · NEGÓCIOS IMOBILIÁRIOS — Main JS
   ════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── LOADER ────────────────────────────────────────────
  const loader = document.getElementById('loader');
  if (loader) {
    document.body.classList.add('loading');
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        // Trigger hero reveals
        triggerHeroReveals();
      }, 2600);
    });
    // Fallback
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      triggerHeroReveals();
    }, 4000);
  }

  function triggerHeroReveals() {
    const heroEls = document.querySelectorAll('.hero .reveal, .hero-stats');
    heroEls.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 200 + i * 180);
    });
  }

  // ── HERO IMAGE KEN BURNS ──────────────────────────────
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
    if (heroImg.complete) heroImg.classList.add('loaded');
  }

  // ── HEADER SCROLL ─────────────────────────────────────
  const header = document.getElementById('header');
  const handleHeaderScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ── ACTIVE NAV LINKS ──────────────────────────────────
  const navLinks = document.querySelectorAll('.nav-desktop a:not(.nav-cta)');
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ── MOBILE MENU ───────────────────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── SMOOTH SCROLL ─────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

  // ── REVEAL ON SCROLL ──────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ── NÚMERO COUNTER ANIMATION ──────────────────────────
  const numValues = document.querySelectorAll('.num-value[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current);
          if (current >= target) clearInterval(interval);
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  numValues.forEach(el => counterObserver.observe(el));

  // ── BACK TO TOP ───────────────────────────────────────
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── CONTACT FORM ──────────────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate required
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'rgba(201,80,80,0.5)';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) {
        form.style.animation = 'shake 0.4s ease';
        setTimeout(() => form.style.animation = '', 400);
        return;
      }

      // Loading state
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-flex';
      submitBtn.disabled = true;

      await new Promise(r => setTimeout(r, 1400));

      // Compose WhatsApp message
      const nome = document.getElementById('nome').value;
      const wpp = document.getElementById('whatsapp').value;
      const interesse = document.getElementById('interesse').value;
      const perfil = document.getElementById('perfil').value;
      const mensagem = document.getElementById('mensagem').value;

      const msg = encodeURIComponent(
        `Olá Andressa! Me chamo *${nome}*.\n\n` +
        `Tenho interesse em: *${interesse}*\n` +
        (perfil ? `\nPerfil buscado: ${perfil}` : '') +
        (mensagem ? `\n\n${mensagem}` : '') +
        `\n\nMeu WhatsApp: ${wpp}`
      );

      // Show success
      btnText.style.display = '';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
      submitBtn.style.display = 'none';
      formSuccess.style.display = 'flex';
      form.reset();

      setTimeout(() => {
        window.open(`https://wa.me/5542999367671?text=${msg}`, '_blank');
      }, 1200);

      setTimeout(() => {
        formSuccess.style.display = 'none';
        submitBtn.style.display = '';
      }, 7000);
    });

    // Clear field error on input
    form.querySelectorAll('input, select, textarea').forEach(f => {
      f.addEventListener('input', () => { if (f.value.trim()) f.style.borderColor = ''; });
    });
  }

  // ── PARALLAX SUBTLE ───────────────────────────────────
  if (window.innerWidth > 768) {
    const heroImg2 = document.querySelector('.hero-img');
    window.addEventListener('scroll', () => {
      if (heroImg2) {
        heroImg2.style.transform = `scale(1.02) translateY(${window.scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

  // ── CURSOR PREMIUM — MIRA GEOMÉTRICA (Desktop) ───────
  // Estilo arquitetônico: cursor em cruz com quadrado central rotacionado
  if (window.innerWidth > 1024) {
    document.body.style.cursor = 'none';

    // SVG inline da mira — quadrado rotacionado 45° + linhas cruzadas
    const cursorSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="14" y="14" width="8" height="8" transform="rotate(45 18 18)"
              stroke="#C9A96E" stroke-width="1.2" fill="none"/>
        <line x1="18" y1="0" x2="18" y2="11" stroke="#C9A96E" stroke-width="1" stroke-linecap="round"/>
        <line x1="18" y1="25" x2="18" y2="36" stroke="#C9A96E" stroke-width="1" stroke-linecap="round"/>
        <line x1="0" y1="18" x2="11" y2="18" stroke="#C9A96E" stroke-width="1" stroke-linecap="round"/>
        <line x1="25" y1="18" x2="36" y2="18" stroke="#C9A96E" stroke-width="1" stroke-linecap="round"/>
      </svg>`;

    // SVG hover — mira expandida com diamante maior
    const cursorHoverSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect x="17" y="17" width="10" height="10" transform="rotate(45 22 22)"
              stroke="#E8C98A" stroke-width="1.4" fill="rgba(201,169,110,0.08)"/>
        <line x1="22" y1="0" x2="22" y2="13" stroke="#E8C98A" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="22" y1="31" x2="22" y2="44" stroke="#E8C98A" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="0" y1="22" x2="13" y2="22" stroke="#E8C98A" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="31" y1="22" x2="44" y2="22" stroke="#E8C98A" stroke-width="1.2" stroke-linecap="round"/>
        <circle cx="22" cy="22" r="1.5" fill="#E8C98A"/>
      </svg>`;

    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      top: 0; left: 0;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.15s ease;
      will-change: left, top;
      mix-blend-mode: normal;
    `;
    cursor.innerHTML = cursorSVG;
    document.body.appendChild(cursor);

    let mx = 0, my = 0;
    let isHover = false;
    let rotation = 0;
    let raf;

    const updateCursor = () => {
      cursor.style.left = `${mx}px`;
      cursor.style.top = `${my}px`;

      // Leve rotação contínua quando em hover
      if (isHover) {
        rotation += 0.6;
        cursor.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
      } else {
        cursor.style.transform = `translate(-50%, -50%) rotate(0deg)`;
      }
      raf = requestAnimationFrame(updateCursor);
    };
    raf = requestAnimationFrame(updateCursor);

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });

    // Esconder cursor nativo nos elementos interativos também
    const interactives = document.querySelectorAll('a, button, input, select, textarea, .service-card, .dep-card, .numero-card, .canal-item');
    interactives.forEach(el => {
      el.style.cursor = 'none';

      el.addEventListener('mouseenter', () => {
        isHover = true;
        cursor.innerHTML = cursorHoverSVG;
      });
      el.addEventListener('mouseleave', () => {
        isHover = false;
        rotation = 0;
        cursor.innerHTML = cursorSVG;
        cursor.style.transform = 'translate(-50%, -50%) rotate(0deg)';
      });
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.75) rotate(45deg)';
      setTimeout(() => {
        cursor.style.transform = isHover
          ? `translate(-50%, -50%) rotate(${rotation}deg)`
          : 'translate(-50%, -50%) rotate(0deg)';
      }, 150);
    });
  }

  // ── SHAKE KEYFRAME ────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100% { transform:translateX(0); }
      20% { transform:translateX(-5px); }
      40% { transform:translateX(5px); }
      60% { transform:translateX(-3px); }
      80% { transform:translateX(3px); }
    }
  `;
  document.head.appendChild(style);

  // ── PRESENÇA IMAGES OBSERVER ──────────────────────────
  // already handled by main reveal observer

  // ── SERVICE CARD MICRO-INTERACTION ───────────────────
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `translateY(-6px) perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
