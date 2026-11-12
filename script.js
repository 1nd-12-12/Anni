/* =========================================================
   A MAGICAL WORLD OF ANNI ❤️ — INTERACTIVE ENGINE
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initUniverseStarfield();
  initCinematicIntro();
  initMusicController();
  initMagicalAmbientLayer();
  initParallax();
  initPhotoGallery();
  initScrollRevealAndTyping();
  initHeartExperience();
  initSurpriseBox();
  initFinaleScene();
});

/* =========================================================
   1. CUSTOM CURSOR (DESKTOP)
========================================================= */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactables = 'a, button, .photo-frame, .gift-box-container';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactables)) ring.classList.add('active');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactables)) ring.classList.remove('active');
  });
}

/* =========================================================
   2. GLOBAL STARFIELD & FLOATING PARTICLES CANVAS
========================================================= */
function initUniverseStarfield() {
  const canvas = document.getElementById('universeCanvas');
  const ctx = canvas.getContext('2d');
  let width, height, stars = [], motes = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const starCount = Math.min(180, Math.floor((window.innerWidth * window.innerHeight) / 8000));
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.004,
      hue: Math.random() > 0.7 ? '#ffb6d9' : '#ffffff'
    });
  }

  for (let i = 0; i < 32; i++) {
    motes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1.2,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.45 - 0.15,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (const s of stars) {
      s.alpha += s.speed;
      const opacity = (Math.sin(s.alpha) + 1) * 0.45 + 0.1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.hue;
      ctx.globalAlpha = opacity;
      ctx.fill();
    }

    for (const m of motes) {
      m.x += m.vx;
      m.y += m.vy;
      if (m.y < -10) m.y = height + 10;
      if (m.x < -10) m.x = width + 10;
      if (m.x > width + 10) m.x = -10;

      const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 3);
      grad.addColorStop(0, 'rgba(255, 182, 217, 0.85)');
      grad.addColorStop(1, 'rgba(255, 95, 162, 0)');
      ctx.globalAlpha = m.alpha;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(render);
  }
  render();
}

/* =========================================================
   3. CINEMATIC INTRO & PRELOADER SEQUENCE (FIXED)
========================================================= */
function initCinematicIntro() {
  const preloader = document.getElementById('preloader');
  const subtitle = document.getElementById('introSubtitle');
  const titleWrap = document.getElementById('introTitleWrap');
  const startBtn = document.getElementById('startJourneyBtn');
  const introScreen = document.getElementById('cinematicIntro');
  const mainWorld = document.getElementById('mainWorld');
  const topNav = document.getElementById('topNav');

  setTimeout(() => {
    if (preloader) preloader.classList.add('fade-out');
    setTimeout(() => subtitle.classList.add('visible'), 400);
    setTimeout(() => titleWrap.classList.add('visible'), 1600);
    setTimeout(() => startBtn.classList.add('visible'), 2800);
  }, 800);

  startBtn.addEventListener('click', () => {
    introScreen.classList.add('dismissed');
    mainWorld.classList.remove('locked');
    topNav.classList.remove('hidden');

    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    const musicBars = document.getElementById('musicBars');
    const musicLabel = document.getElementById('musicLabel');

    if (bgMusic && !musicBtn.classList.contains('hidden')) {
      bgMusic.volume = 0.55;
      bgMusic.play().then(() => {
        musicBars.classList.add('playing');
        musicLabel.textContent = 'Pause Music';
      }).catch(() => {});
    }
  });
}

/* =========================================================
   4. BACKGROUND MUSIC CONTROLLER
========================================================= */
function initMusicController() {
  const bgMusic = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicToggle');
  const musicBars = document.getElementById('musicBars');
  const musicLabel = document.getElementById('musicLabel');

  if (!bgMusic || !musicBtn) return;

  bgMusic.addEventListener('loadedmetadata', () => {
    if (bgMusic.duration > 0) {
      musicBtn.classList.remove('hidden');
    }
  });

  musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBars.classList.add('playing');
      musicLabel.textContent = 'Pause Music';
    } else {
      bgMusic.pause();
      musicBars.classList.remove('playing');
      musicLabel.textContent = 'Play Music';
    }
  });
}

/* =========================================================
   5. MAGICAL HOME AMBIENT LAYER
========================================================= */
function initMagicalAmbientLayer() {
  const canvas = document.getElementById('magicalAmbientCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const entities = [];
  const types = ['petal', 'heart', 'butterfly'];

  for (let i = 0; i < 34; i++) {
    const type = types[i % types.length];
    entities.push({
      type,
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 8 + 6,
      vx: (Math.random() - 0.5) * 0.9,
      vy: type === 'petal' ? Math.random() * 0.7 + 0.35 : -Math.random() * 0.6 - 0.25,
      phase: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.55 + 0.35
    });
  }

  function drawHeart(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.3);
    ctx.bezierCurveTo(x, y, x - s, y, x - s, y + s * 0.45);
    ctx.bezierCurveTo(x - s, y + s * 0.85, x, y + s * 1.15, x, y + s * 1.35);
    ctx.bezierCurveTo(x, y + s * 1.15, x + s, y + s * 0.85, x + s, y + s * 0.45);
    ctx.bezierCurveTo(x + s, y, x, y, x, y + s * 0.3);
    ctx.fill();
  }

  function drawButterfly(x, y, s, flap) {
    const wingSpan = s * (0.45 + Math.abs(Math.sin(flap)) * 0.75);
    ctx.beginPath();
    ctx.ellipse(x - wingSpan * 0.6, y, wingSpan, s * 0.6, -0.35, 0, Math.PI * 2);
    ctx.ellipse(x + wingSpan * 0.6, y, wingSpan, s * 0.6, 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPetal(x, y, s, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.9, s * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    for (const e of entities) {
      e.phase += 0.045;
      e.x += e.vx + Math.sin(e.phase * 0.6) * 0.45;
      e.y += e.vy;

      if (e.y < -30) e.y = h + 30;
      if (e.y > h + 30) e.y = -30;
      if (e.x < -30) e.x = w + 30;
      if (e.x > w + 30) e.x = -30;

      ctx.save();
      ctx.globalAlpha = e.alpha;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ff5fa2';

      if (e.type === 'heart') {
        ctx.fillStyle = '#ff7eb9';
        drawHeart(e.x, e.y, e.size * 0.75);
      } else if (e.type === 'butterfly') {
        ctx.fillStyle = '#f4c2c2';
        drawButterfly(e.x, e.y, e.size, e.phase * 2.2);
      } else {
        ctx.fillStyle = '#ffb3d9';
        drawPetal(e.x, e.y, e.size, e.phase);
      }
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }
  animate();
}

/* =========================================================
   6. SUBTLE MOUSE PARALLAX
========================================================= */
function initParallax() {
  const layers = document.querySelectorAll('[data-parallax]');
  window.addEventListener('mousemove', (e) => {
    const cx = (e.clientX - window.innerWidth / 2);
    const cy = (e.clientY - window.innerHeight / 2);
    layers.forEach((el) => {
      const factor = parseFloat(el.getAttribute('data-parallax'));
      el.style.transform = `translate3d(${cx * factor}px, ${cy * factor}px, 0)`;
    });
  });
}

/* =========================================================
   7. PREMIUM PHOTO GALLERY + LIGHTBOX (DIRECT ROOT FILES)
========================================================= */
function initPhotoGallery() {
  const grid = document.getElementById('galleryGrid');
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  // Seedha root folder wali Photo1.jpg se Photo6.jpg uthayega
  const memories = [
    { src: 'Photo1.jpg', caption: 'A Smile That Lights Up Every Room' },
    { src: 'Photo2.jpg', caption: 'Effortless Grace & Stardust' },
    { src: 'Photo3.jpg', caption: 'Golden Hour Magic' },
    { src: 'Photo4.jpg', caption: 'Pure Joy in Every Moment' },
    { src: 'Photo5.jpg', caption: 'Unforgettable Radiance' },
    { src: 'Photo6.jpg', caption: 'Forever One of a Kind' }
  ];

  function createFallbackArt(index) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
        <defs>
          <radialGradient id="g${index}" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stop-color="#4e1869"/>
            <stop offset="55%" stop-color="#1e0836"/>
            <stop offset="100%" stop-color="#090212"/>
          </radialGradient>
        </defs>
        <rect width="800" height="1000" fill="url(#g${index})"/>
        <circle cx="400" cy="420" r="170" fill="none" stroke="#f4c2c2" stroke-opacity="0.35" stroke-width="2"/>
        <circle cx="400" cy="420" r="120" fill="none" stroke="#ff5fa2" stroke-opacity="0.45" stroke-width="1.5"/>
        <text x="400" y="415" text-anchor="middle" fill="#f4c2c2" font-family="Georgia, serif" font-size="42" letter-spacing="8">ANNI</text>
        <text x="400" y="465" text-anchor="middle" fill="#ffb6d9" font-family="sans-serif" font-size="18" letter-spacing="4">MEMORY 0${index + 1}</text>
        <text x="400" y="880" text-anchor="middle" fill="#ffffff" fill-opacity="0.55" font-family="sans-serif" font-size="16">Upload Photo${index + 1}.jpg in root folder</text>
      </svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  let currentIndex = 0;
  const resolvedSources = [];

  memories.forEach((item, idx) => {
    const fallback = createFallbackArt(idx);
    resolvedSources[idx] = item.src;

    const card = document.createElement('div');
    card.className = 'photo-frame reveal';

    const inner = document.createElement('div');
    inner.className = 'photo-inner';

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.caption;
    img.loading = 'lazy';
    img.onerror = () => {
      img.src = fallback;
      resolvedSources[idx] = fallback;
    };

    const overlay = document.createElement('div');
    overlay.className = 'photo-overlay';
    overlay.innerHTML = `
      <span class="photo-caption">${item.caption}</span>
      <span class="photo-zoom-hint">Tap to View Fullscreen ✦</span>
    `;

    inner.appendChild(img);
    inner.appendChild(overlay);
    card.appendChild(inner);
    grid.appendChild(card);

    card.addEventListener('click', () => openLightbox(idx));
  });

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    modalImg.style.opacity = '0';
    setTimeout(() => {
      modalImg.src = resolvedSources[currentIndex];
      modalCaption.textContent = memories[currentIndex].caption;
      modalImg.style.opacity = '1';
    }, 150);
  }

  closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + memories.length) % memories.length;
    updateLightbox();
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % memories.length;
    updateLightbox();
  });
}

/* =========================================================
   8. SCROLL REVEAL & TYPING MESSAGE ANIMATION
========================================================= */
function initScrollRevealAndTyping() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  const container = document.getElementById('typewriterContainer');
  const lines = Array.from(container.querySelectorAll('.typed-line'));
  const replayBtn = document.getElementById('replayTypingBtn');
  let typingActive = false;
  let hasTypedOnce = false;

  async function runTypingSequence() {
    if (typingActive) return;
    typingActive = true;
    lines.forEach((line) => {
      line.textContent = '';
      line.classList.remove('typing');
    });

    for (const line of lines) {
      const fullText = line.getAttribute('data-text');
      line.classList.add('typing');
      for (let i = 0; i < fullText.length; i++) {
        line.textContent += fullText[i];
        await new Promise((r) => setTimeout(r, 42));
      }
      line.classList.remove('typing');
      await new Promise((r) => setTimeout(r, 420));
    }
    typingActive = false;
  }

  const msgObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !hasTypedOnce) {
        hasTypedOnce = true;
        runTypingSequence();
      }
    },
    { threshold: 0.45 }
  );

  msgObserver.observe(container);
  replayBtn.addEventListener('click', runTypingSequence);
}

/* =========================================================
   9. INTERACTIVE 3D HEART EXPERIENCE
========================================================= */
function initHeartExperience() {
  const heartBtn = document.getElementById('interactiveHeartBtn');
  const banner = document.getElementById('heartRevealBanner');
  const canvas = document.getElementById('heartBurstCanvas');
  const ctx = canvas.getContext('2d');

  let w, h;
  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let particles = [];
  const colors = ['#ff5fa2', '#ffb6d9', '#f4c2c2', '#ffffff', '#e04f8a', '#d88cff'];

  function spawnHeartShower(originX, originY, count = 160) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 2.5;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.012 + 0.007,
        gravity: 0.08,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1
      });
    }
  }

  function drawMiniHeart(x, y, s, color, alpha, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle = color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = color;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(0, 0, -s, 0, -s, s * 0.45);
    ctx.bezierCurveTo(-s, s * 0.85, 0, s * 1.15, 0, s * 1.35);
    ctx.bezierCurveTo(0, s * 1.15, s, s * 0.85, s, s * 0.45);
    ctx.bezierCurveTo(s, 0, 0, 0, 0, s * 0.3);
    ctx.fill();
    ctx.restore();
  }

  function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.985;
      p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
      } else {
        drawMiniHeart(p.x, p.y, p.size * 0.7, p.color, p.alpha, p.rotation);
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  heartBtn.addEventListener('click', () => {
    heartBtn.classList.remove('beat');
    void heartBtn.offsetWidth;
    heartBtn.classList.add('beat');

    const rect = heartBtn.getBoundingClientRect();
    const sectionRect = canvas.getBoundingClientRect();
    const cx = rect.left - sectionRect.left + rect.width / 2;
    const cy = rect.top - sectionRect.top + rect.height / 2;

    spawnHeartShower(cx, cy, 180);
    banner.classList.add('revealed');
  });
}

/* =========================================================
   10. SURPRISE GIFT BOX SECTION
========================================================= */
function initSurpriseBox() {
  const boxContainer = document.getElementById('giftBoxContainer');
  const revealCard = document.getElementById('surpriseRevealCard');
  const titleEl = document.getElementById('surpriseSlideTitle');
  const textEl = document.getElementById('surpriseSlideText');
  const stepEl = document.getElementById('surpriseStepIndicator');
  const nextBtn = document.getElementById('surpriseNextBtn');

  const surprises = [
    {
      title: 'A Little Reminder ✨',
      text: 'No matter where life takes you, never forget how rare your warmth, your smile, and your spirit truly are.'
    },
    {
      title: 'Why You Shine 🌙',
      text: 'In a world that moves too fast, your presence feels like starlight—calm, effortless, and impossible to forget.'
    },
    {
      title: 'Always Rooted For ❤️',
      text: 'May every dream you whisper to the night sky find its way straight into your hands, Anni.'
    }
  ];

  let slideIdx = 0;

  function openGift() {
    if (boxContainer.classList.contains('opening')) return;
    boxContainer.classList.add('opening');

    setTimeout(() => {
      boxContainer.classList.add('hidden');
      revealCard.classList.remove('hidden');
    }, 650);
  }

  boxContainer.addEventListener('click', openGift);
  nextBtn.addEventListener('click', () => {
    slideIdx = (slideIdx + 1) % surprises.length;
    titleEl.style.opacity = '0';
    textEl.style.opacity = '0';
    titleEl.style.transform = 'translateY(8px)';
    textEl.style.transform = 'translateY(8px)';

    setTimeout(() => {
      titleEl.textContent = surprises[slideIdx].title;
      textEl.textContent = surprises[slideIdx].text;
      stepEl.textContent = `${slideIdx + 1} / ${surprises.length}`;
      titleEl.style.opacity = '1';
      textEl.style.opacity = '1';
      titleEl.style.transform = 'translateY(0)';
      textEl.style.transform = 'translateY(0)';
    }, 260);
  });
}

/* =========================================================
   11. FINAL CINEMATIC SCENE
========================================================= */
function initFinaleScene() {
  const section = document.getElementById('finale');
  const celebrateBtn = document.getElementById('finaleCelebrateBtn');
  const canvas = document.getElementById('finaleExplosionCanvas');
  const ctx = canvas.getContext('2d');

  let w, h;
  function resize() {
    w = canvas.width = section.offsetWidth;
    h = canvas.height = section.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let fireworks = [];
  const palette = ['#ff5fa2', '#ffb6d9', '#f4c2c2', '#ffffff', '#ff85c0', '#c77dff'];

  function launchHeartExplosion(x, y, count = 130) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 8 + 3;
      fireworks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 8 + 4,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 1,
        decay: Math.random() * 0.01 + 0.006,
        gravity: 0.045
      });
    }
  }

  function renderFinaleCanvas() {
    ctx.clearRect(0, 0, w, h);
    for (let i = fireworks.length - 1; i >= 0; i--) {
      const f = fireworks[i];
      f.x += f.vx;
      f.y += f.vy;
      f.vy += f.gravity;
      f.vx *= 0.985;
      f.alpha -= f.decay;

      if (f.alpha <= 0) {
        fireworks.splice(i, 1);
      } else {
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.globalAlpha = Math.max(0, f.alpha);
        ctx.fillStyle = f.color;
        ctx.shadowBlur = 14;
        ctx.shadowColor = f.color;
        const s = f.size * 0.65;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(0, 0, -s, 0, -s, s * 0.45);
        ctx.bezierCurveTo(-s, s * 0.85, 0, s * 1.15, 0, s * 1.35);
        ctx.bezierCurveTo(0, s * 1.15, s, s * 0.85, s, s * 0.45);
        ctx.bezierCurveTo(s, 0, 0, 0, 0, s * 0.3);
        ctx.fill();
        ctx.restore();
      }
    }
    requestAnimationFrame(renderFinaleCanvas);
  }
  renderFinaleCanvas();

  let autoTriggered = false;
  const finaleObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !autoTriggered) {
        autoTriggered = true;
        setTimeout(() => launchHeartExplosion(w * 0.5, h * 0.42, 150), 400);
      }
    },
    { threshold: 0.45 }
  );
  finaleObserver.observe(section);

  celebrateBtn.addEventListener('click', () => {
    launchHeartExplosion(w * 0.5, h * 0.45, 180);
  });
}
