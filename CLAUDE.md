# The Forge Digital — Project CLAUDE.md

## Project Overview

Small local business website for web design + IT support in Farmington Valley, Connecticut. Live at **theforgedigital.net** via Netlify with GitHub deployment.

---

## Critical: Brand Color System

⚠️ **DO NOT CHANGE THE BRAND COLORS WITHOUT EXPLICIT APPROVAL**

The site uses a carefully researched heritage color palette that directly addresses market research findings about small-town Connecticut preferences. Changing colors breaks the brand positioning.

### Brand Colors (See BrandColors.md for full palette)

**Primary Colors - Never Change:**
- **Warm Cream:** `#f5f1e8` (primary background)
- **Deep Pine Green:** `#2d5a3d` (primary brand accent)
- **Dark Walnut:** `#4a3f35` (structural depth, text)
- **Muted Brass:** `#a89668` (secondary accent, buttons)

**These colors were chosen because:**
- Deep pine green signals Connecticut woods, trust, and stability (NOT corporate/techy)
- Warm cream creates an inviting, heritage feel (like old paper, mill-town signage)
- Dark walnut grounds the design in natural materials, not digital coldness
- Muted brass conveys hand-crafted quality without being flashy or corporate

Market research showed that 74% of New England consumers are skeptical of flashy brands. The color system reinforces "local, trustworthy neighbor" positioning, not "slick tech startup."

### If You Need to Update the Site

**Before touching CSS colors:**
1. Check `BrandColors.md` for the approved palette
2. Use the design token variables in `:root` (e.g., `var(--color-accent)`)
3. If adding new colors, add them to `:root` with a clear variable name
4. **Do not** replace brand colors with tech startup aesthetics (cool grays, neons, bright blues)
5. **Do not** use arbitrary hex codes outside the palette

### Color Change Restrictions

❌ **Prohibited changes:**
- Replacing pine green with a cooler blue-green (reads as tech, not heritage)
- Using gold instead of brass (reads as luxury/flashy, not craft)
- Lightening cream further (loses warmth and heritage feel)
- Adding neon or bright accents (contradicts "understated, trustworthy" positioning)
- Switching to dark gray or black backgrounds (loses the Farmington Valley identity)

✅ **Allowed adjustments:**
- Adjusting opacity/transparency of existing colors
- Creating lighter/darker variants of the core palette (see `:root` for variants)
- Refining text contrast ratios to improve readability (like the hero accent change)
- Using RGBA versions of colors for subtle effects

---

## Project Structure

- **index.html** — Main site (semantic HTML, accessibility built-in)
- **style.css** — Design system (design tokens, responsive, heritage aesthetic)
- **script.js** — Interactions (smooth scroll, mobile menu, scroll reveals)
- **BrandColors.md** — Color documentation and usage guidelines
- **GitHub:** `git@github.com:TerminallyChaotic/theForgeDigital-website.git`
- **Hosting:** Netlify (auto-deploys on `git push`)

---

## Brand Identity

### Visual
- **Typography:** Libre Baskerville (headings — workmanlike, mill-town letterhead feel), Inter (body — clean, readable)
- **Vibe:** Farmington Valley heritage meets modern tech
- **Logo:** Anvil with root/circuit elements
- **Textures:** Subtle wood-grain, no excessive effects

### Voice & Tone
- Plainspoken, helpful, sturdy
- Local and trustworthy, not corporate
- Business-owner friendly, no jargon
- Practical over flashy

### Positioning
- "More than a template. Less than agency bloat."
- Made right here in Connecticut
- Agency-level expertise with neighbor-friendly service

---

## Deployment Workflow

```bash
# Make changes locally
git add .
git commit -m "description"
git push origin main
# → Automatically deploys to theforgedigital.net
```

---

## Important Notes

- **Formspree form ID:** Currently `YOUR_FORM_ID` in contact section — must be updated with actual endpoint
- **Accessibility:** Site meets WCAG AA standards — test with `prefers-reduced-motion` before deploying
- **Mobile:** Breakpoints at 1024px (tablet) and 768px (mobile) — test responsiveness
- **Fonts:** Libre Baskerville + Inter loaded from Google Fonts — verify on deploy

---

## When Adding Features

1. **Check BrandColors.md first** for color decisions
2. **Use design token variables** from `:root` in CSS
3. **Test on mobile** (hamburger menu, form, buttons)
4. **Verify contrast ratios** for text on backgrounds
5. **Test with `prefers-reduced-motion`** (disable animations)
6. **Push to GitHub** to auto-deploy

---

## Future Portfolio

When adding client work samples or before/after case studies:
- Use consistent visual style with brand colors
- Include service description + location (for local SEO)
- Collect testimonials for proof
- Update Google Business Profile with case studies

---

*Last updated: March 2026*
*Brand color system finalized: March 2026*
*Live site: theforgedigital.net*
