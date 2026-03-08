# Aura Wellness Studio — Modern Landing Page

A premium, fully responsive landing page built with pure **HTML**, **CSS**, and **vanilla JavaScript**. No frameworks. No build step. Open `index.html` in any browser and it works.

---

## Preview

> **Brand:** Aura Wellness Studio — *"Elevate Your Every Day"*
> A fictional premium urban wellness studio offering yoga, sound healing, and breathwork experiences for modern professionals in New York City.

---

## Sections

| Section | Description |
|---|---|
| **Navigation** | Fixed header with scroll-aware backdrop blur, scroll progress bar, and responsive hamburger drawer with focus trapping |
| **Hero** | Full-viewport with ambient CSS orbs, cinematic background photo, gradient headline, social proof avatar stack |
| **Marquee** | CSS-only infinite scrolling text strip |
| **Features** | 6-card responsive grid with inline SVGs and 3D tilt hover effect |
| **About** | Two-column layout with real studio photo, animated stat counters |
| **Testimonials** | Glassmorphism cards with mobile scroll-snap carousel and dot navigation |
| **Pricing** | 3-tier membership with monthly/annual billing toggle and animated number rollup |
| **CTA Banner** | Full-width call to action with decorative ring pseudo-elements |
| **Footer** | Social media icons, 3-column link grid |

---

## File Structure

```
frontend-landing-showcase/
├── index.html                  # Main document — all sections and semantic markup
├── assets/
│   ├── favicon.svg             # SVG favicon (ellipse/lotus mark)
│   └── images/
│       ├── hero-bg.jpg         # Hero section background (cinematic atmosphere)
│       ├── about-studio.jpg    # About section — studio interior
│       └── about-practice.jpg  # About section — instructor in practice
├── css/
│   ├── reset.css               # Modern minimal CSS reset
│   ├── variables.css           # All design tokens (colors, spacing, typography)
│   ├── base.css                # Body, container, typography scale, buttons, badges
│   ├── components.css          # Nav, cards, pricing, toggle, testimonials, avatars
│   ├── sections.css            # Per-section layout, hero orbs, marquee, footer
│   └── animations.css          # Keyframes, entrance animation classes, stagger delays
└── js/
    ├── nav.js                  # Sticky nav, hamburger drawer, focus trap, smooth scroll
    ├── animations.js           # IntersectionObserver entrance system, stat counters, headline reveal
    └── interactions.js         # Billing toggle, testimonial carousel, hover tilt, pricing highlight
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0D0D12` | Page background (deep indigo) |
| `--color-surface` | `#16161F` | Cards and nav |
| `--color-accent` | `#C8A97E` | Warm gold — primary accent |
| `--color-accent-2` | `#9B7FD4` | Soft violet — secondary accent |
| `--color-text-primary` | `#F2EDE7` | Warm off-white for headings |
| `--color-text-muted` | `#8A8699` | Body and secondary text |

### Typography

- **Headlines:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) — high-contrast serif, ultra-luxury feel
- **Body / UI:** [Inter](https://fonts.google.com/specimen/Inter) — clean, legible, professional
- **Fluid type:** All headings use `clamp()` to scale smoothly from mobile to desktop

### Spacing

8px base unit — tokens from `--space-1` (8px) to `--space-16` (128px).

---

## JavaScript Features

### `js/nav.js`
- Sticky header with backdrop-filter blur at 60px scroll
- Real-time scroll progress bar (3px, gold gradient, top of viewport)
- Hamburger menu: ARIA attributes, focus trap, Escape key, overlay click to close
- Smooth anchor scroll with sticky nav height offset

### `js/animations.js`
- `IntersectionObserver` fires entrance animations once per element (threshold 0.12)
- Animated stat counters: 0 → target with easeOutQuart easing on scroll into view
- Hero headline word-by-word reveal on page load

### `js/interactions.js`
- Billing toggle: smooth number rollup animation between monthly/annual prices
- Testimonial carousel: CSS scroll-snap + dot indicators synced via scroll event
- Feature cards: 3D tilt on mouse movement with `rotateX`/`rotateY`
- Pricing cards: sibling dimming on hover for focus effect

---

## CSS Techniques

- **CSS custom properties** as a single design token source (`variables.css`)
- **Gradient text** via `background-clip: text; -webkit-text-fill-color: transparent`
- **Animated orbs** — blurred pseudo-elements with `@keyframes orbFloat`
- **Glassmorphism** on testimonial cards — `backdrop-filter: blur(20px)`
- **Card hover depth** — `translateY(-6px)` + shadow increase + border-color shift
- **CSS scroll-snap** for mobile testimonial carousel — no JS carousel library needed
- **Responsive** with breakpoints at 640px / 768px / 1024px (mobile-first)

---

## How to Run

No installation required. Just open the file:

```bash
# Option 1: Open directly
open index.html

# Option 2: Serve locally (avoids any CORS for fonts)
npx serve .
# or
python3 -m http.server 8080
```

> **Note:** Google Fonts (Cormorant Garamond + Inter) require an internet connection to load. The page falls back to Georgia and system-ui without them.

---

## Browser Support

| Feature | Support |
|---|---|
| CSS Custom Properties | All modern browsers |
| `backdrop-filter` | Chrome, Edge, Safari (Firefox with flag) |
| `IntersectionObserver` | All modern browsers |
| CSS scroll-snap | All modern browsers |
| `clamp()` | All modern browsers |

---

## Credits

- **Photography:** [Unsplash](https://unsplash.com) — free to use under the [Unsplash License](https://unsplash.com/license)
- **Icons:** Custom inline SVG (no icon library dependency)
- **Fonts:** [Google Fonts](https://fonts.google.com) — Cormorant Garamond, Inter

---

## License

This project is a fictional design showcase. Feel free to use it as a template or learning reference.
