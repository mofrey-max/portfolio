# AI Engineer Portfolio — Next.js + Tailwind Starter

Production-ready portfolio for AI Engineers targeting LLM/RAG/Agent roles at AI-first startups.

## 🎯 Built from Strategy

This starter implements the complete **create-website methodology** (10 phases):
1. **One-Page Marketing** — Niche: LLM/RAG Applications & Agents | Avatar: Pre-seed AI founders
2. **StoryBrand Messaging** — Customer as hero, you as guide
3. **Made to Stick** — SUCCESs audit, concrete metrics, hero hook
4. **Top Design** — Signature "Gap" visualization (notebook vs production)
5. **Web Typography** — Geist variable font, fluid clamp scale, <50KB
6. **Refactoring UI** — Token system, component library, grayscale-first
7. **UX Heuristics** — 15 issues fixed, Trunk Test passes
8. **CRO Methodology** — Big-5 Objection/Counter table, proof hierarchy
9. **Scorecard Marketing** — Skipped (single direct CTA)
10. **Steve Jobs Review** — **Verdict: NOT DONE** → 11 fixes documented

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Add Geist fonts (see FONTS.md)
# Download from https://vercel.com/font/geist
# Place in /public/fonts/

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Single landing page
│   └── globals.css         # Tailwind + design tokens
├── components/
│   ├── ui/                 # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── MetricBar.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── Toast.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── Providers.tsx
│   └── sections/           # Page sections
│       ├── Hero.tsx        # Gap visualization + CTAs
│       ├── Problem.tsx     # Demo-to-prod wall
│       ├── Work.tsx        # 3 project cards with metrics
│       ├── Process.tsx     # 3-step + principles
│       ├── Proof.tsx       # GitHub stats, testimonials, OSS
│       └── CTA.tsx         # Resume download + contact
├── lib/
│   └── utils.ts            # cn(), helpers
└── styles/
    ├── tokens.css          # CSS custom properties (light/dark)
    └── globals.css         # Base styles, components
```

## 🎨 Design System

### Colors (Semantic Tokens)
```css
--bg, --bg-elevated, --border, --border-strong
--text, --text-strong, --text-muted
--primary, --primary-strong, --primary-bg
--success, --success-bg, --warning, --warning-bg, --error, --error-bg
```
Dark mode via `[data-theme="dark"]` or `prefers-color-scheme`

### Typography
- **Font**: Geist Variable (sans + mono) — single file, ~48KB
- **Scale**: Fluid clamp (step -2 to 5) — 320px → 1440px
- **Measure**: 65ch optimal, 45ch narrow, 75ch wide
- **Line heights**: 1.1 tight → 1.7 relaxed

### Spacing & Shadows
- **Spacing**: 4px base (4, 8, 12, 16, 24, 32, 48, 64)
- **Shadows**: 5 elevations (0-4), dark mode = higher opacity

## ♿ Accessibility (WCAG 2.1 AA)

- ✅ Semantic HTML, heading hierarchy
- ✅ Skip-to-main-content link
- ✅ Focus-visible states (3px ring)
- ✅ ARIA attributes on mobile nav, metric bars
- ✅ Screen-reader alternative for Hero Gap visualization
- ✅ `prefers-reduced-motion` respected
- ✅ Color + icon + text for trend indication
- ✅ Keyboard navigation, focus trapping

## ⚡ Performance

- **Target**: <100KB JS gzipped, <200KB total
- **Fonts**: Self-hosted WOFF2, preload, `font-display: swap`
- **Images**: WebP/AVIF, lazy-loaded, blur placeholders
- **No**: Heavy animations, third-party widgets, cookie banners
- **Analytics**: Plausible/Umami (privacy-first)

## 🔧 Customization Checklist

### Required (Before Launch)
- [ ] Replace `[Your Name]` throughout
- [ ] Add real testimonials (2) in `Proof.tsx`
- [ ] Add GitHub repo URLs in `Work.tsx` (3 projects)
- [ ] Add resume PDF at `/public/resume.pdf`
- [ ] Verify all metrics are accurate
- [ ] Update contact info (email, LinkedIn, GitHub, location)
- [ ] Add Geist fonts to `/public/fonts/`
- [ ] Generate OG image (screenshot `public/og-image.html`)
- [ ] Update `metadata` in `layout.tsx`

### Optional
- [ ] Add blog/posts in `Proof.tsx`
- [ ] Add conference talks
- [ ] Customize tech stack pills
- [ ] Add more project cards

## 📦 Deployment

```bash
# Build
npm run build

# Preview production build
npm run start

# Deploy to Vercel (recommended)
vercel deploy
```

### Vercel Settings
- Framework: Next.js
- Build Command: `npm run build`
- Output: `.next`
- Install: `npm install`

## 📄 License

MIT — Use freely for your own portfolio.

## 🙏 Credits

- **Methodology**: create-website skill (10-phase process)
- **Fonts**: Geist by Vercel
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge