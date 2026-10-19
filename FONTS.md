# Geist Fonts Setup

The portfolio uses **Geist Variable** (sans + mono) — a single variable font file that covers all weights.

## Download

1. Go to: https://vercel.com/font/geist
2. Click "Download" for both:
   - Geist Variable (sans)
   - Geist Mono Variable
3. Extract the `.woff2` files

## Required Files

Place in `/public/fonts/`:

```
/public/fonts/
├── geist-variable-latin.woff2      # Sans variable font
└── geist-mono-variable-latin.woff2 # Mono variable font
```

## Subsetting (Recommended)

The full variable fonts include many Unicode ranges. For a portfolio, you only need Latin + Latin Extended.

### Using `pyftsubset` (fonttools)

```bash
pip install fonttools brotli

# Subset sans
pyftsubset \
  GeistVF.woff \
  --output-file=public/fonts/geist-variable-latin.woff2 \
  --flavor=woff2 \
  --unicodes="U+0020-007F,U+00A0-00FF,U+0100-017F,U+0180-024F,U+2000-206F,U+2070-209F,U+20A0-20CF,U+2100-214F" \
  --layout-features="kern,liga,calt,rvrn" \
  --no-hinting \
  --desubroutinize

# Subset mono
pyftsubset \
  GeistMonoVF.woff \
  --output-file=public/fonts/geist-mono-variable-latin.woff2 \
  --flavor=woff2 \
  --unicodes="U+0020-007F,U+00A0-00FF,U+0100-017F,U+0180-024F,U+2000-206F,U+2070-209F,U+20A0-20CF,U+2100-214F" \
  --layout-features="kern,liga,calt,rvrn" \
  --no-hinting \
  --desubroutinize
```

### Expected Sizes

| Font | Full Size | Subset (Latin) |
|------|-----------|----------------|
| Geist Variable | ~180 KB | ~48 KB |
| Geist Mono Variable | ~160 KB | ~42 KB |

**Total: ~90 KB** (well under 200 KB budget)

## Fallback Fonts

The CSS includes system font fallbacks that match Geist metrics:

```css
html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

With `font-display: swap` and `size-adjust`, there's zero layout shift.

## Verify

After adding fonts, run:

```bash
npm run dev
```

Check Network tab → Fonts:
- Should see 2 WOFF2 files (~48KB + ~42KB)
- Status: 200 (not 404)
- `font-display: swap` working (text visible immediately)

## Troubleshooting

**Fonts not loading?**
- Check `/public/fonts/` exists and files are named exactly
- Verify `next/font` config in `layout.tsx` matches filenames
- Clear browser cache

**Layout shift on font load?**
- Ensure `font-display: swap` in `tokens.css`
- Check `size-adjust` fallback metrics in `@font-face`
- Verify `preload` links in `layout.tsx` head

**Build errors?**
- Next.js 14+ required for `next/font` variable font support
- Ensure `variable: '--font-geist-sans'` matches CSS variable name