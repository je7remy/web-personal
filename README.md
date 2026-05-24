# Web Personal — Jeremy de la Cruz

[![HTML5](https://img.shields.io/badge/HTML5-%23E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-%231572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-green)](LICENSE)

Portfolio estático construido en HTML, CSS y JavaScript vanilla. Estética cibersec premium con paleta hacker green sobre dark mode.

**Demo en vivo:** https://je7remy.github.io/web-personal/

---

## Stack

- HTML5 semántico
- CSS3 modular (sistema de tokens, capas separadas por feature)
- JavaScript vanilla (sin frameworks, sin bundler)
- Tipografías: Space Grotesk + JetBrains Mono (Google Fonts)
- Iconos: devicon CDN + assets locales

## Estructura

```
web-personal/
├── index.html
├── styles.css                  # Capa 0 (legacy, preservado)
├── styles/
│   ├── tokens.css              # Variables: paleta, tipografía, easings
│   ├── base.css                # Reset, scan line, noise overlay, sistema reveal
│   ├── nav.css                 # Navbar fijo + menú mobile
│   ├── hero.css                # Hero cinematográfico con HUD
│   ├── sections.css            # Sobre mí, Habilidades, Servicios, Proyectos
│   └── hud.css                 # Cursor custom + overlays
├── scripts/
│   ├── script.js               # Legacy (typing legacy desactivado por rename de id)
│   ├── popup.js                # Legacy (popups de skills, inerte tras refactor)
│   ├── ver-mas.js              # Legacy (toggles de opiniones)
│   ├── nav.js                  # Scroll state, mobile toggle, active link tracking
│   └── effects.js              # Hero typing, reveal on scroll, magnetic buttons,
│                               #   parallax, stagger skills, cursor custom
└── images/                     # Assets locales (proyectos, fotos, iconos legacy)
```

## Características

- Dark mode con paleta hacker green (verde neón `#00FF6A` sobre negro profundo `#08090A`)
- Hero cinematográfico con grid animado, glow radial, video de fondo y coordenadas HUD
- Typing effect propio con las cuatro frases del README de GitHub
- Navbar con backdrop-blur, indicador `● ONLINE`, active link tracking via IntersectionObserver
- Reveal on scroll con stagger animations (`data-delay` + `--reveal-delay` automático)
- Magnetic buttons en CTAs (`data-magnetic`)
- Cursor custom con estado hover sobre elementos interactivos
- Scan line global + noise overlay sutil tipo film grain
- Botones de "Sobre mí" en estética Linear/Vercel (blanco sobre negro, sin glow)
- Iconos de habilidades en grid libre con hover drop-shadow verde
- Card destacada para el proyecto SGCM (FEATURED + status EN PRODUCCIÓN)
- Bloque `key : value` en formato terminal para el bio
- Responsive en breakpoints 360 / 480 / 768 / 1024 / 1440
- `prefers-reduced-motion` respetado en todos los keyframes y en el typing
- Accesibilidad: focus visible, `aria-label` en icónicos, contraste AA, touch targets ≥ 44px

## Secciones

1. **Hero** — Nombre, headline (`Backend Engineer · Infrastructure · La Vega, RD`), typing rotando 4 frases, CTA.
2. **Sobre mí** — Bio en dos párrafos + bloque `<dl class="about-meta mono">` con datos clave estilo terminal + botones LinkedIn / CV.
3. **Habilidades** — 4 grupos con label mono: Backend & Data, Infrastructure & DevOps, Frontend, Other.
4. **Servicios** — 4 tarjetas glass: Desarrollo Backend & APIs, Infraestructura & DevOps, Soporte Técnico Empresarial, Sistemas a Medida.
5. **Proyectos** — SGCM destacado (card extendida con stats, features, pills y cover real) + Libro de Ciberseguridad + Linux Knowledge Hub + Videojuego 2D.
6. **Referencias** — Opiniones de la comunidad con toggle "ver más / ver menos".
7. **Contacto** — Iconos sociales (GitHub, LinkedIn) + email.

## Desarrollo local

No requiere instalación ni build step. Para servir el sitio localmente:

```bash
python -m http.server 8765
```

Luego abrir `http://localhost:8765`.

## Decisiones técnicas

- **Vanilla por elección.** Sin frameworks, sin bundler, sin `npm`. El sitio carga directo y permanece fácil de mantener.
- **Capa legacy preservada.** `styles.css` y los tres JS legacy (`script.js`, `popup.js`, `ver-mas.js`) se conservan intactos. Los overrides nuevos usan specificity scoping (ej. `#sobre-mi .btn-primary`) para vencer al legacy sin tocarlo. Cuando un comportamiento legacy había que desactivar (typing viejo), se logró renombrando el `id` del elemento que el legacy buscaba — el `if (textElement)` del legacy se encarga del resto.
- **Sistema de tokens.** Toda la paleta, tipografía, espaciado y easings se definen en `tokens.css` para mantener consistencia y permitir cambios globales en un solo lugar.
- **Carga en cascada controlada.** Orden de los `<link>`: tokens → base → nav → hero → sections → hud. Cada capa puede asumir lo anterior.
- **Accesibilidad.** Focus visible con outline verde y offset, touch targets de 44px en mobile, contraste AA en texto sobre fondo, `prefers-reduced-motion` respetado, `aria-label` en elementos icónicos.
- **Imágenes externas.** El cover de SGCM viene de Unsplash vía CDN. Se planea descargar a `/images/sgcm-cover.jpg` para no depender de CDN externo.

## Autor

**Jeremy de la Cruz**
Backend Engineer · Infrastructure · La Vega, República Dominicana

- GitHub: [@je7remy](https://github.com/je7remy)
- LinkedIn: [Jeremy José de la Cruz Pérez](https://www.linkedin.com/in/jeremy-jos%C3%A9-de-la-cruz-p%C3%A9rez-0a49b9237/)
- Email: je7remy@gmail.com

## Licencia

MIT License — ver [LICENSE](LICENSE) para detalles completos.

---

*"Una web profesional es más que un portafolio; es una carta de presentación al mundo tecnológico."* — Jeremy
