# Design

## Theme

Dark, quiet, minimal (reference: antfu.me). Scene: a developer opens the link at night; the page is calm and nearly monochrome, structure carried by whitespace, with one barely-visible generative touch. Explicit anti-preferences from the owner: no gold/brown "elegant" palette, no brutalist shouting, nothing that reads templated or AI-generated.

## Color

Strategy: **Restrained, near-monochrome** (named reference: antfu.me neutral grays on near-black).

- `--bg`: oklch(14.5% 0.002 250) – neutral near-black, faint cool tint
- `--fg`: oklch(93% 0.002 250)
- `--fg-muted`: oklch(71% 0.003 250) – body prose, descriptions (~7.7:1 on bg)
- `--fg-faint`: oklch(45% 0.003 250) – mono labels, dates, quiet links (~2.7:1 on bg; below WCAG AA — open decision whether to brighten to ~58% or accept)
- `--line` and `--accent` are declared in `:root` but currently unused
- Selection: monochrome inversion (fg background, bg text)

## Typography

Three voices, each with one job. All self-hosted woff2 (no font CDNs), split into latin / latin-ext subsets via `unicode-range`; the three files that paint above the fold are preloaded.

- **Display (identity moments only)**: Cabinet Grotesk — hero name at 800, footer email link at 700. Tight tracking (-0.025em / -0.015em).
- **Body**: Hanken Grotesk (variable 300–700), weight contrast 400/600.
- **Meta/labels**: Fragment Mono, small, lowercase (dates, section labels, links, stack line, clock).
- Hero name ~clamp(2.6rem, 6.5vw, 4.1rem); body 1rem/1.7. The display face carries the scale; body stays modest.

## Layout

Single column, left-aligned, max-width 42rem. No borders, no cards, no rules: whitespace is the structure. Sections clamp(5rem, 12vh, 8rem) apart. Experience uses a mono date column (8.5rem) + content column, collapsing to one column under 560px.

## Motion

Microanimations only — NO on-load choreography, no block reveals, no per-letter effects (owner explicitly rejected these; twice). Everything sits behind `prefers-reduced-motion` guards; the dimmed-prose start state is stamped by an inline head script so no-JS visitors get plain bright text.

- Reading highlight: About prose brightens word by word (SplitText, color oklch 36% → 71%), scrubbed to scroll but ratcheted — scrolling back up never re-dims.
- Wink words: annotated words in the About prose ("a bike", "running", "coffee.") swap to a monochrome emoji on hover for ~1s, with per-word movement (ride, run, shake), then return.
- Links: color brighten + underline fade-in, 200ms. Experience dates warm up on row hover. Project links nudge their ↗ marker.
- Pronunciation button: quiet speaker icon beside the hero name (a sibling of the h1, not inside it); sound waves pulse while the clip plays.
- Custom cursor: solid dot, 1:1 tracking, difference blend, grows 2.6x over interactive elements, leaves a distance-spawned fading dot trail. Fine pointers with motion allowed only.
- WebGL canvas: halftone dot grid whose dot size follows drifting fbm noise, faded down behind the text column; pointer swell and an expanding click ripple. Under reduced motion: one static frame, redrawn on resize.

## Components

- Top row: mono profile links (linkedin, email), left-aligned. No border.
- Hero: display name + pronunciation button, two-line role in muted body text.
- Section label: lowercase mono, faint.
- Experience rows: mono dates + medium-weight role line, whitespace-separated.
- Projects: name with underline-on-hover and ↗ for external links, one-line description.
- Footer: "contact" label, email at modest display size with underline on hover; bottom row with socials left and a live Kraków clock right (filled on mount only, so SSR markup never disagrees).
- Console easter egg: a two-line `console.info` signature with the email.
