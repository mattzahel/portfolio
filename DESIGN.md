# Design

## Theme

Dark, quiet, minimal (reference: antfu.me). Scene: a developer opens the link at night; the page is calm and nearly monochrome, structure carried by whitespace, with one barely-visible generative touch. Explicit anti-preferences from the owner: no gold/brown "elegant" palette, no brutalist shouting, nothing that reads templated or AI-generated.

## Color

Strategy: **Restrained, near-monochrome** (named reference: antfu.me neutral grays on near-black).

- `--bg`: oklch(14.5% 0.002 250) – neutral near-black, faint cool tint
- `--fg`: oklch(91% 0.002 250)
- `--fg-muted`: oklch(64% 0.003 250)
- `--fg-faint`: oklch(45% 0.003 250)
- `--line`: oklch(25% 0.003 250) (used almost nowhere)
- `--accent`: oklch(80% 0.045 160) – muted mint-gray; selection and micro-details only
- Selection: monochrome inversion (fg background, bg text)

## Typography

Three voices, each with one job. Natural mix, not costume:

- **Display (identity moments only)**: Erode (Fontshare serif, weights 400–600), used for the hero name and the footer email link. Weight 500, normal case.
- **Body**: Hanken Grotesk (quiet humanist grotesk), weight contrast 400/600.
- **Meta/labels**: Fragment Mono, small, lowercase (dates, section labels, links, stack line).
- Hero name ~clamp(2.6rem, 6.5vw, 4.1rem) serif 500; body 1rem/1.7. The serif carries the scale; body stays modest.

## Layout

Single column, left-aligned, max-width ~42rem. No borders, no cards, no rules: whitespace is the structure. Sections ~clamp(5rem, 12vh, 8rem) apart. Experience uses a mono date column + content column.

## Motion

- GSAP load: hero elements rise gently (0.9s, expo.out, stagger 0.08).
- ScrollTrigger reveal per section only (not per item), subtle, once.
- Links: color brighten + underline fade-in, 200ms. No block inversions.
- WebGL canvas: hand-written shader, slow drifting monochrome fbm, barely visible (+4% luminance max), fine grain, soft pointer parallax. Static under prefers-reduced-motion.

## Components

- Top row: mono, name left, place + live local time right. No border.
- Section label: lowercase mono, faint.
- Experience rows: mono dates + medium-weight role, whitespace-separated.
- Footer: email link at modest display size, underline on hover.
