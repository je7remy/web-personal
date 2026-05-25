/* ============================================================
   EFFECTS — vanilla JS para animaciones premium
   - Reveal on scroll con stagger
   - Botones magneticos
   - Parallax sutil en hero (mouse move)
   - Cursor custom suave (desktop)
   - Respeta prefers-reduced-motion
   ============================================================ */
(function () {
    'use strict';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = matchMedia('(hover: none) and (pointer: coarse)').matches;

    /* ----------------------------------------------------------
       1) Reveal on scroll
       ---------------------------------------------------------- */
    function initReveal() {
        const targets = document.querySelectorAll('.reveal');
        if (!targets.length) return;

        if (reduced || !('IntersectionObserver' in window)) {
            targets.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.15
        });

        targets.forEach(function (el) { io.observe(el); });
    }

    /* ----------------------------------------------------------
       2) Magnetic buttons
       ---------------------------------------------------------- */
    function initMagnetic() {
        if (reduced || isTouch) return;
        const buttons = document.querySelectorAll('[data-magnetic]');
        const STRENGTH = 0.28;
        const MAX = 12;

        buttons.forEach(function (btn) {
            let rect = null;

            function update() { rect = btn.getBoundingClientRect(); }

            btn.addEventListener('mouseenter', update);
            btn.addEventListener('mousemove', function (e) {
                if (!rect) update();
                const cx = rect.left + rect.width  / 2;
                const cy = rect.top  + rect.height / 2;
                let dx = (e.clientX - cx) * STRENGTH;
                let dy = (e.clientY - cy) * STRENGTH;
                dx = Math.max(Math.min(dx,  MAX), -MAX);
                dy = Math.max(Math.min(dy,  MAX), -MAX);
                btn.style.transform = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
            });
            btn.addEventListener('mouseleave', function () {
                btn.style.transform = '';
                rect = null;
            });
            window.addEventListener('resize', function () { rect = null; });
        });
    }

    /* ----------------------------------------------------------
       3) Mouse parallax en hero
       ---------------------------------------------------------- */
    function initHeroParallax() {
        if (reduced || isTouch) return;
        const hero = document.querySelector('.principal');
        if (!hero) return;

        const layers = [
            { el: hero.querySelector('.hero-fx__grid'),  depth: 8  },
            { el: hero.querySelector('.hero-fx__glow'),  depth: 14 }
        ].filter(function (l) { return l.el; });

        let raf = 0;
        let tx = 0, ty = 0;
        let targetX = 0, targetY = 0;

        function loop() {
            tx += (targetX - tx) * 0.08;
            ty += (targetY - ty) * 0.08;
            layers.forEach(function (l) {
                l.el.style.transform =
                    'translate3d(' + (tx * l.depth) + 'px,' + (ty * l.depth) + 'px,0)';
            });
            raf = 0;
        }

        hero.addEventListener('mousemove', function (e) {
            const rect = hero.getBoundingClientRect();
            const nx = (e.clientX - rect.left) / rect.width  - 0.5; /* -0.5..0.5 */
            const ny = (e.clientY - rect.top)  / rect.height - 0.5;
            targetX = nx;
            targetY = ny;
            if (!raf) raf = requestAnimationFrame(loop);
        });
        hero.addEventListener('mouseleave', function () {
            targetX = 0;
            targetY = 0;
            if (!raf) raf = requestAnimationFrame(loop);
        });
    }

    /* ----------------------------------------------------------
       4) Cursor custom (punto pequeno verde, desktop)
       ---------------------------------------------------------- */
    function initCursor() {
        if (reduced || isTouch) return;

        const dot = document.createElement('div');
        dot.className = 'fx-cursor';
        dot.setAttribute('aria-hidden', 'true');
        const ring = document.createElement('div');
        ring.className = 'fx-cursor__ring';
        ring.setAttribute('aria-hidden', 'true');
        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let rx = mx, ry = my;
        let raf = 0;

        function loop() {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            dot.style.transform  = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%)';
            ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
            raf = requestAnimationFrame(loop);
        }

        window.addEventListener('mousemove', function (e) {
            mx = e.clientX;
            my = e.clientY;
            if (!raf) raf = requestAnimationFrame(loop);
        });
        window.addEventListener('mouseout', function (e) {
            if (!e.relatedTarget) {
                dot.style.opacity = 0;
                ring.style.opacity = 0;
            }
        });
        window.addEventListener('mouseover', function () {
            dot.style.opacity = '';
            ring.style.opacity = '';
        });

        /* Hover state sobre interactivos */
        const HOVERABLE = 'a, button, [data-magnetic], .skill-item, .project-item, .opinión, .social-icon';
        document.addEventListener('mouseover', function (e) {
            if (e.target.closest(HOVERABLE)) {
                ring.classList.add('is-hover');
            }
        });
        document.addEventListener('mouseout', function (e) {
            if (e.target.closest(HOVERABLE)) {
                ring.classList.remove('is-hover');
            }
        });
    }

    /* ----------------------------------------------------------
       4b) Hero typing — reemplazo del legacy script.js
       El elemento usa id="hero-typed-text" (renombrado del viejo
       "dynamic-text") para que el legacy no se active. Aqui
       implementamos las 4 frases inglesas literales del README.
       Misma cadencia que el legacy: 50ms char, 2000ms pausa al
       terminar, 500ms entre frases.
       ---------------------------------------------------------- */
    function initHeroTyping() {
        const el = document.getElementById('hero-typed-text');
        if (!el) return;

        const phrases = [
            'building systems that explain themselves —',
            'FastAPI · PostgreSQL · Docker · Linux · CI/CD',
            'quality over volume. always.',
            'currently shipping SGCM for HTQPJB'
        ];

        /* Si el usuario prefiere reducir movimiento, mostrar la
           primera frase estatica y no animar. */
        if (reduced) {
            el.textContent = phrases[0];
            return;
        }

        let phraseIdx = 0;
        let charIdx = 0;
        let deleting = false;

        const SPEED_TYPE   = 50;    /* ms por char escribiendo */
        const SPEED_DELETE = 50;    /* ms por char borrando */
        const PAUSE_END    = 2000;  /* ms al terminar de escribir */
        const PAUSE_NEXT   = 500;   /* ms entre frases */

        el.textContent = '';

        function tick() {
            const current = phrases[phraseIdx];

            if (deleting) {
                charIdx -= 1;
                el.textContent = current.substring(0, charIdx);
                if (charIdx <= 0) {
                    deleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                    setTimeout(tick, PAUSE_NEXT);
                } else {
                    setTimeout(tick, SPEED_DELETE);
                }
            } else {
                charIdx += 1;
                el.textContent = current.substring(0, charIdx);
                if (charIdx >= current.length) {
                    deleting = true;
                    setTimeout(tick, PAUSE_END);
                } else {
                    setTimeout(tick, SPEED_TYPE);
                }
            }
        }

        tick();
    }

    /* ----------------------------------------------------------
       5) Stagger automatico para .skill-icon (50ms entre cada uno)
       ---------------------------------------------------------- */
    function initSkillStagger() {
        const grids = document.querySelectorAll('#skills .skills-grid');
        grids.forEach(function (grid) {
            const icons = grid.querySelectorAll('.skill-icon');
            icons.forEach(function (icon, i) {
                icon.style.setProperty('--reveal-delay', (i * 50) + 'ms');
            });
        });
    }

    /* ----------------------------------------------------------
       Init
       ---------------------------------------------------------- */
    function init() {
        initHeroTyping();
        initSkillStagger();
        initReveal();
        initMagnetic();
        initHeroParallax();
        initCursor();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
