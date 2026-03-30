# TradeNest Design System — CLAUDE.md

## Project Overview
Pure HTML/CSS/vanilla JS design system showcase for a B2B marketplace (TradeNest — Indian marketplace theme). No build tools, no frameworks, no dependencies except Inter font from Google Fonts.

## File Structure
```
designsystem/
├── index.html                  ← Cover/nav hub
├── design-tokens.html          ← Developer token reference (click-to-copy, scroll-spy TOC)
├── shared/
│   ├── tokens.css              ← All CSS custom properties (125 tokens)
│   ├── nav.css                 ← Sticky top nav bar styles
│   └── nav.js                  ← Theme toggle + mobile toggle logic
├── components/
│   ├── foundations.html        ← Colors, type, spacing (incl. 8pt grid demo), shadows, radius (incl. concentric rule)
│   ├── atoms.html              ← Buttons, badges, inputs, toggles, avatars
│   ├── molecules.html          ← Product cards, seller cards, search, filters
│   └── organisms.html          ← Site headers, footer, filter bar, hero
└── pages/
    ├── homepage.html           ← Full homepage, desktop + mobile toggle
    ├── pdp.html                ← SMD Capacitors 100µF product detail page
    ├── category.html           ← Electrical Components listing page
    └── seller-profile.html     ← Shree Electricals Mumbai profile
```

## Architecture Rules

### Stylesheet Loading Order (every HTML file)
```html
<link rel="stylesheet" href="../shared/tokens.css" />
<link rel="stylesheet" href="../shared/nav.css" />
<style>/* Page-specific styles inline */</style>
```
- `index.html` and `design-tokens.html` use `./shared/` (root level)
- All others use `../shared/` (one level deep)

### Script Loading (bottom of body, every HTML file)
```html
<script src="../shared/nav.js"></script>
```

### Page Boilerplate
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Page] — TradeNest DS</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../shared/tokens.css" />
  <link rel="stylesheet" href="../shared/nav.css" />
  <style>/* page styles */</style>
</head>
<body>
  <nav class="ds-nav">...</nav>
  <div class="ds-page" id="ds-page-container">
    <div id="phone-frame" class="phone-frame"></div>
    <div class="ds-mobile-content">
      <!-- content here -->
    </div>
  </div>
  <script src="../shared/nav.js"></script>
</body>
</html>
```

### Navigation Pattern (required in every file)
```html
<nav class="ds-nav">
  <div class="ds-nav-inner">
    <a class="ds-nav-logo" href="../index.html">
      <span class="ds-nav-logo-icon">TN</span>
      Design System
    </a>
    <div class="ds-nav-controls">
      <button class="ds-mobile-toggle" id="ds-mobile-toggle">Mobile View</button>
      <button class="ds-theme-toggle" id="ds-theme-toggle"></button>
    </div>
    <div class="ds-nav-links">
      <a class="ds-nav-link" data-page="foundations" href="./foundations.html">Foundations</a>
      <a class="ds-nav-link" data-page="atoms" href="./atoms.html">Atoms</a>
      <a class="ds-nav-link" data-page="molecules" href="./molecules.html">Molecules</a>
      <a class="ds-nav-link" data-page="organisms" href="./organisms.html">Organisms</a>
      <span class="ds-nav-divider"></span>
      <a class="ds-nav-link" data-page="homepage" href="../pages/homepage.html">Homepage</a>
      <a class="ds-nav-link" data-page="category" href="../pages/category.html">Category</a>
      <a class="ds-nav-link" data-page="pdp" href="../pages/pdp.html">PDP</a>
      <a class="ds-nav-link" data-page="seller-profile" href="../pages/seller-profile.html">Seller Profile</a>
    </div>
  </div>
</nav>
```
- Active link uses `class="ds-nav-link active"` — `nav.js` sets this automatically via `data-page` matching the filename

## Design Tokens (tokens.css)

### Color Palettes
- **Desktop primary (Indigo):** `--color-primary: #2e3192`, scale 50–900
- **Mobile primary (Teal):** `--color-primary-mobile: #1d8480`, scale 50–900, activated via `.surface-mobile`
- **Semantic:** success `#16a34a`, warning `#d97706`, error `#dc2626`, info `#0284c7`
- **Neutral grays:** `--gray-50` (#f8fafc) through `--gray-900` (#0f172a)

### Surface Variables (auto-switch with dark mode)
| Token | Light | Dark |
|-------|-------|------|
| `--bg-page` | `#f8fafc` | `#0f0f0f` |
| `--bg-card` | `#ffffff` | `#1a1a1a` |
| `--bg-subtle` | `#f1f5f9` | `#262626` |
| `--border` | `#e2e8f0` | `#262626` |
| `--text-primary` | `#0f172a` | `#ededed` |
| `--text-secondary` | `#475569` | `#a3a3a3` |
| `--text-muted` | `#94a3b8` | `#6b7280` |

### Spacing (8pt grid)
`--space-1: 4px` · `--space-2: 8px` · `--space-3: 12px` · `--space-4: 16px` · `--space-5: 20px` · `--space-6: 24px` · `--space-8: 32px` · `--space-10: 40px` · `--space-12: 48px` · `--space-16: 64px` · `--space-20: 80px`

### Typography (Purpose-Based)
- **Font:** Inter only, both `--font-heading` and `--font-body`
- **Desktop (24px max to 11px min):** Purpose-driven scale ordered by priority
- **Mobile (18px max to 12px min):** Constrained scale, auto-applied at ≤768px via `@media (max-width: 768px)` in `tokens.css`
- **Naming rule:** Style names reflect **purpose, not HTML tag**. The same `<h2>` tag may correctly use `--text-heading-featured` on a listing page and `--text-product-name` on a hero. Choose the token by what the text *means*, not by what element renders it.
- **Token coverage:** Every `font-size` across all 10 HTML files uses a CSS variable — no hardcoded `px` values anywhere.

| Token | Desktop | Mobile | Purpose (highest → lowest priority) |
|-------|---------|--------|--------------------------------------|
| `--text-product-name` | 24px | 18px | **Product / Company Name** |
| `--text-heading-featured` | 22px | 16px | **Non Hero Heading** |
| `--text-heading` | 20px | 14px | **Product Name / Hero Price / Section Heading** |
| `--text-body-large` | 16px | 13px | **Text / Primary** |
| `--text-cta` | 14px | 12px | **Primary Text (CTAs etc.)** |
| `--text-body-small` | 13px | 12px | **Subtext** |
| `--text-spec` | 12px | 12px | **Listing Spec / Seller Location / Fact Sheet / Pop-up** |
| `--text-caption` | 11px | 12px | **Caption / Small Textual Elements** |

### Border Radius
`--radius-xs: 2px` · `--radius-sm: 4px` · `--radius-md: 6px` · `--radius-lg: 8px` · `--radius-xl: 12px` · `--radius-2xl: 16px` · `--radius-full: 9999px`

#### Concentric Radius Rule (box inside a box)
`inner radius = outer radius − gap`

When a rounded element sits inside another, the inner radius must equal the outer radius minus the distance between them. This keeps both arcs concentric (same centre point) so the corridor between them is a uniform band.

| Outer | Gap | Inner | Token |
|-------|-----|-------|-------|
| `--radius-2xl` 16px | `--space-2` 8px | 8px | `--radius-lg` |
| `--radius-2xl` 16px | `--space-3` 12px | 4px | `--radius-sm` |
| `--radius-2xl` 16px | `--space-4` 16px | 0 | sharp |
| `--radius-xl` 12px | `--space-2` 8px | 4px | `--radius-sm` |
| `--radius-xl` 12px | `--space-3` 12px | 0 | sharp |
| `--radius-lg` 8px | `--space-1` 4px | 4px | `--radius-sm` |
| `--radius-lg` 8px | `--space-2` 8px | 0 | sharp |

If `gap ≥ outer radius`, use sharp corners or `--radius-xs` (2px) as the minimum. Never apply a negative result.

### Shadows
- `--shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)`
- `--shadow-md: 0 4px 12px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)`
- `--shadow-lg: 0 12px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)`

### Z-Index Scale
`--z-base: 0` · `--z-raised: 10` · `--z-dropdown: 100` · `--z-sticky: 200` · `--z-overlay: 300` · `--z-modal: 400` · `--z-toast: 500`

### Transitions
`--transition-fast: 150ms ease` · `--transition-normal: 250ms ease` · `--transition-slow: 400ms ease`

## CSS Naming Conventions

### Prefix System
| Prefix | Domain |
|--------|--------|
| `ds-` | Design system core (nav, layout, utilities) |
| `site-` | Marketplace-level (header, search, account) |
| `product-` | Product cards and details |
| `category-` | Category listing and filters |
| `seller-` | Seller profile and cards |
| `hero-` | Hero/banner sections |
| `btn-` | Button variants and sizes |
| `badge-` | Status badges and labels |
| `avatar-` | Avatar sizes and styles |
| `footer-` | Footer layout |

### BEM-inspired Pattern
- `block-element-modifier`
- Sizes: `-sm`, `-md`, `-lg`
- States: `.active`, `.disabled`, `.checked` (modifier classes, not data attributes)
- Variants: `-primary`, `-secondary`, `-ghost` (displayed as "Tertiary" in showcase), `-destructive`

### Core Layout Classes
```css
.ds-container   /* max-width: 1280px, centered, 32px horizontal padding */
.ds-page        /* top padding offset for fixed nav (92px) */
.ds-section     /* content section with border and padding */
.ds-row         /* flex row, align-center, gap-4, flex-wrap */
.ds-grid        /* css grid, gap-4 */
.ds-label       /* uppercase caption, letter-spacing 0.06em, text-muted */
```

## Theming System

### How Themes Work
1. **Light (default):** `:root` vars, no attribute needed
2. **Dark:** `[data-theme="dark"]` on `<html>` — applied by `nav.js`, persisted to `localStorage('ds-theme')`
3. **Mobile (teal):** `.surface-mobile` on `#ds-page-container` — applied by `nav.js` mobile toggle

### Mobile View Mode
- Adds `.surface-mobile` to `#ds-page-container` + `.active` to `#ds-mobile-toggle`
- Constrains `.ds-mobile-content` to `max-width: 375px`, centered with shadow
- Shows `#phone-frame` decoration (fixed, z-index: -1)
- Swaps `--color-primary` from Indigo → Teal throughout

## B2B Content & Brand

### Fictional Companies Used
- **TradeNest** — the marketplace brand (primary B2B platform)
- **Shree Electricals** — seller, Mumbai (seller-profile.html)
- **Electronica Components** — seller, Bengaluru
- **Featured product:** SMD Capacitors 100µF (PDP page)
- **Category featured:** Electrical Components

### Content Conventions
- Prices in INR (₹), quantities in bulk (e.g. "Min order: 500 units")
- Indian city names, GST, Indian phone formats
- Trust signals: verified badges, GST verified, TrustSeal

## Component Reference

### Buttons
```html
<button class="btn btn-primary btn-md">Call Now</button>
<button class="btn btn-secondary btn-sm">Get Best Price</button>
<button class="btn btn-ghost btn-lg">Save</button>
<button class="btn btn-destructive btn-md">Delete</button>
```
- Button matrix in atoms.html: **3 Sizes × 4 Variants — Default / Hover / Disabled** (no Loading state)
- The third variant is displayed as **Tertiary** in the showcase column header, but the CSS class remains `btn-ghost`
- Standard CTA labels: Primary → **Call Now**, Secondary → **Get Best Price**

### Badges
```html
<span class="badge badge-verified">Verified</span>
<span class="badge badge-in-stock">In Stock</span>
<span class="badge badge-low-stock">Low Stock</span>
<span class="badge badge-out-of-stock">Out of Stock</span>
<span class="badge badge-new">New</span>
<span class="badge badge-featured">Featured</span>
```
- `.badge` always uses `--radius-full` (9999px) — this is intentional and must never be changed to a square-derived radius
- Pill shape is the hard visual rule that differentiates badges (read-only status) from buttons/CTAs (interactive)
- `.badge` includes `line-height: 1` for consistent vertical text centering

### Avatars
```html
<div class="avatar avatar-md avatar-circle avatar-gradient-indigo">SE</div>
<div class="avatar avatar-lg avatar-square avatar-gradient-teal">EC</div>
```

### Tabs (canonical — use these, not custom tab classes)
```html
<div class="tab-bar">
  <button class="tab active">Overview</button>
  <button class="tab">Specifications</button>
  <button class="tab">Reviews</button>
</div>
```

### Product Card
```html
<div class="product-card">
  <div class="product-card-img"><!-- image or bg --></div>
  <div class="product-card-body">
    <div class="product-card-badge">Badge</div>
    <div class="product-card-name">Product Name</div>
    <div class="product-card-seller">Seller Name</div>
    <div class="product-card-price">₹2,450 <span class="product-card-unit">/unit</span></div>
  </div>
  <div class="product-card-atc">
    <button class="btn btn-primary btn-sm">Call Now</button>
  </div>
</div>
```

### Input with Adornments (prefix + suffix)
Use `.input-adorn-group` wrapper with `.input-adorn-prefix` and `.input-adorn-suffix` spans — never inline border styles on adornment elements. The group uses `:focus-within` to apply a uniform focus ring across all three parts.
```html
<div class="input-adorn-group">
  <span class="input-adorn-prefix">&#8377;</span>
  <input type="text" class="input-field" placeholder="0.00">
  <span class="input-adorn-suffix">per unit</span>
</div>
```
- `.input-adorn-group:focus-within` applies `box-shadow` to the whole group and `border-color: var(--color-primary)` to prefix, input, and suffix uniformly
- `.input-adorn-group .input-field` suppresses its own `box-shadow` on focus (the group handles it)

### Tooltips (In-Context Showcase Rule)
In the "In Context — Icon Buttons with Tooltips" showcase, only **one** tooltip should be visible at a time. Having multiple `tooltip-top` tooltips visible simultaneously causes overlap. Remove `tooltip-box` from secondary and tertiary icon buttons in the group.

## Design Guidelines (documented in foundations.html)

### Spacing in Practice — 8pt Grid
Every `padding`, `gap`, and `margin` value must use a `--space-*` token. Image heights should be multiples of 8px. Two spacing densities are defined for product cards:

| Density | Padding | Internal gaps | Image height | Use when |
|---------|---------|--------------|--------------|----------|
| **Compact** | `--space-3` (12px) | `--space-2` (8px) between sections, `--space-3` before buttons | 128px (16 × 8pt) | Listing grids, category pages |
| **Comfortable** | `--space-5` (20px) | `--space-3` (12px) between sections, `--space-4` before buttons | 160px (20 × 8pt) | Featured placements, detail views |

Visual convention in foundations.html: **indigo strips** = padding zones, **amber strips** = gap zones.

### Concentric Border Radius
See Border Radius token section above. The rule is: `inner radius = outer radius − gap`. Always pick the nearest token; use `--radius-xs` (2px) as the minimum if the calculation goes to 0 or negative. Documented as Wrong vs Right comparison + three-level product card example in foundations.html.

## JavaScript (nav.js)

Five functions, IIFE pattern:
1. `initThemeToggle()` — reads/writes `localStorage('ds-theme')`, toggles `[data-theme]` on `<html>`
2. `updateThemeIcon(btn, theme)` — swaps SVG sun/moon icon
3. `initMobileToggle()` — toggles `.surface-mobile` on `#ds-page-container`, shows phone frame
4. `initActiveNavLink()` — matches `data-page` attribute against current pathname, sets `.active`
5. `init()` — orchestrates all, runs on `DOMContentLoaded` or immediately

**Do not modify nav.js behavior without updating all 10 HTML files.**

## Constraints & Rules

- **No frameworks** — no React, Vue, Tailwind, Bootstrap
- **No build step** — files are opened directly in browser
- **Inter only** — DM Sans was removed; do not add other fonts
- **No MOQ** — "Minimum Order Quantity" was removed sitewide; do not re-add
- **No loading states** — Loading state was removed from the button matrix; do not re-add spinner/loading variants to the Buttons showcase
- **No inline adornment borders** — Input prefix/suffix elements must use `.input-adorn-prefix` / `.input-adorn-suffix` classes, not inline border styles
- **Inline styles** — page-specific CSS goes in `<style>` in `<head>`, not separate files
- **Shared CSS** — only `tokens.css` and `nav.css` are shared; do not create more shared files
- **Tab classes** — use canonical `.tab` / `.tab-bar` atoms; do not create custom tab variants
- **Path convention** — component/page files reference `../shared/`; root files reference `./shared/`
