/* ============================================================
   NAV — scroll state, active link, mobile toggle
   Vanilla, sin dependencias.
   ============================================================ */
(function () {
    'use strict';

    const nav = document.getElementById('site-nav');
    if (!nav) return;

    const toggle = document.getElementById('site-nav-toggle');
    const linksWrap = document.getElementById('site-nav-links');
    const links = nav.querySelectorAll('.site-nav__link');

    /* ---- Scroll: shrink + style change ---- */
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                const y = window.scrollY || window.pageYOffset;
                nav.classList.toggle('is-scrolled', y > 24);
                ticking = false;
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Mobile toggle ---- */
    if (toggle) {
        toggle.addEventListener('click', function () {
            const open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Cerrar menu' : 'Abrir menu');
            document.body.style.overflow = open ? 'hidden' : '';
        });

        /* cerrar al hacer click en un link */
        links.forEach(function (a) {
            a.addEventListener('click', function () {
                if (nav.classList.contains('is-open')) {
                    nav.classList.remove('is-open');
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.setAttribute('aria-label', 'Abrir menu');
                    document.body.style.overflow = '';
                }
            });
        });

        /* cerrar con ESC */
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Abrir menu');
                document.body.style.overflow = '';
            }
        });
    }

    /* ---- Active link tracking via IntersectionObserver ---- */
    const sectionIds = Array.from(links)
        .map(function (a) {
            const href = a.getAttribute('href') || '';
            return href.startsWith('#') ? href.slice(1) : null;
        })
        .filter(Boolean);

    const sections = sectionIds
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const map = new Map();
        links.forEach(function (a) {
            const href = a.getAttribute('href') || '';
            map.set(href.slice(1), a);
        });

        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                const link = map.get(entry.target.id);
                if (!link) return;
                if (entry.isIntersecting) {
                    links.forEach(function (l) { l.classList.remove('is-active'); });
                    link.classList.add('is-active');
                }
            });
        }, {
            rootMargin: '-40% 0px -55% 0px',
            threshold: 0
        });

        sections.forEach(function (s) { io.observe(s); });
    }
})();
