# Design

Visual direction, exact tokens, animation recipes, and conventions in one
place — read this before adding a section, an animation, or a component so
new work reuses the established language instead of reinventing it.

Source of truth is always the code (`app/app.vue`, `app/assets/css/main.css`,
`app/components/*.vue`). If this file and the code disagree, the code wins —
update this file to match. Brand strategy, users, and anti-references live
separately in `PRODUCT.md`.

## Stack

Nuxt 4 (Vue 3, `<script setup>`), no UI framework, no Tailwind. GSAP 3.15
(`gsap`, `ScrollTrigger`, `SplitText` plugins) for JS-driven motion; plain CSS
transitions/`@keyframes` for hover/state motion. One hand-written raw-WebGL
shader (no Three.js). Everything self-contained — no component library, no
CSS framework, no animation library beyond GSAP.

## Theme

Dark, quiet, minimal (reference: antfu.me). Scene: a developer opens the link
at night; the page is calm and nearly monochrome, structure carried by
whitespace, with one barely-visible generative touch. Explicit
anti-preferences from the owner: no gold/brown "elegant" palette, no
brutalist shouting, nothing that reads templated or AI-generated.

## Color

Strategy: **restrained, near-monochrome** (named reference: antfu.me neutral
grays on near-black). Tokens declared in `:root` in `app/assets/css/main.css`.

| Token | Value | Use |
|---|---|---|
| `--bg` | `oklch(14.5% 0.002 250)` | Page background, near-black cool tint |
| `--fg` | `oklch(93% 0.002 250)` | Primary text, headings, hovered links |
| `--fg-muted` | `oklch(71% 0.003 250)` | Body prose, descriptions (~7.7:1 on bg) |
| `--fg-faint` | `oklch(45% 0.003 250)` | Mono labels, dates, quiet links (~2.7:1 — below AA, see known issue below) |
| `--line` | `oklch(25% 0.003 250)` | Declared, currently unused — no borders/rules in the design |
| `--accent` | `oklch(80% 0.045 160)` | Declared, currently unused — a faint green if ever needed, don't reach for it casually |
| `--font-sans` | `'Hanken Grotesk', system-ui, sans-serif` | Body |
| `--font-display` | `'Cabinet Grotesk', system-ui, sans-serif` | Identity moments only |
| `--font-mono` | `'Fragment Mono', ui-monospace, monospace` | Meta/labels |
| `--space-section` | `clamp(5rem, 12vh, 8rem)` | Vertical gap between top-level sections |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | The one CSS easing curve used everywhere — expo-out, same family as GSAP `power4.out` |

Selection is a monochrome inversion (`--fg` background, `--bg` text).

One-off value that recurs but isn't tokenized (a state color, not a surface
color): `oklch(36% 0.003 250)` — dimmed/start-state text (reading-highlight
start, `.say-name` idle). Never invent a new hue: every color in this project
sits on the same near-neutral 250° axis with chroma ≤ 0.045. If a new element
needs a color, pick a lightness step on this axis rather than a new hue —
that's what "near-monochrome" means here.

**Known issue** (open, don't silently "fix" without flagging it): `--fg-faint`
at 45% lightness is ~2.7:1 contrast on `--bg`, below the WCAG AA text claim in
PRODUCT.md. Raising it to ~58% would pass but changes the look Mateusz picked.
Leave as-is unless he asks to revisit it.

## Typography

Three voices, each with exactly one job — never mix them for emphasis within
a voice (e.g. don't bold body text for emphasis at display size).

| Voice | Font | Weight | Where | Notes |
|---|---|---|---|---|
| Display | Cabinet Grotesk | 800 | Hero name (`.hero-title`) | `clamp(2.6rem, 6.5vw, 4.1rem)`, `letter-spacing: -0.025em`, `line-height: 1.02` |
| Display | Cabinet Grotesk | 700 | Footer email (`.email-link`) | `clamp(1.4rem, 3.4vw, 1.9rem)`, `letter-spacing: -0.015em` |
| Body | Hanken Grotesk | 400 base, 600 for weight contrast | Prose, role line, descriptions | Variable font, 300–700 available; only 400/600 actually used |
| Meta | Fragment Mono | 400 | Section labels, dates, links, stack line, clock | Always lowercase, always small (0.7–0.78rem), always `--fg-faint` |

Rules:
- Display face is reserved for identity moments (name, email) — don't use it
  for section headers or body copy, however tempting for a "new hero moment."
- Body text stays modest; the display face carries the scale, not font-size hacks on body text.
- Mono is always small and lowercase. It reads as metadata, not as a heading style to reuse for emphasis.
- Self-hosted only, no font CDNs (dropped Google Fonts/Fontshare 2026-08). Each
  face is split into `latin` / `latin-ext` `@font-face` blocks via
  `unicode-range` so Polish-diacritic glyphs (ł, ż, etc.) don't ship to visitors
  who never trigger them.
- The three above-the-fold faces (`cabinet-grotesk-800`, `hanken-grotesk-latin`,
  `fragment-mono-latin`) are preloaded in `nuxt.config.ts` `app.head.link`. Adding
  a new above-the-fold font weight/face means adding both a `@font-face` block
  *and* a preload link, or it'll flash.

## Layout

- Single column, left-aligned, `max-width: 42rem`, centered (`.page`).
- No borders, no cards, no rules, no dividers — whitespace alone carries structure.
  `--line` exists but is unused; think twice before drawing one.
- Section rhythm: `var(--space-section)` as `padding-bottom` on every `section`.
  Don't hand-roll a different gap for a new section.
- Two-column row pattern (used by Experience): CSS grid,
  `grid-template-columns: 8.5rem 1fr` (mono meta column + content column),
  collapsing to `1fr` under 560px. Reuse this exact pattern for any future
  "label + content" list rather than inventing a new column width.
- Breakpoint in use: `560px` (only one in the codebase — this is a one-page,
  mostly-fluid layout via `clamp()`, not a multi-breakpoint grid system). Prefer
  `clamp()` for anything that scales continuously; reach for a `max-width`
  media query only for a genuine structural collapse like the xp grid.
- Prose measure: body text `max-width: 58ch` (`.prose`), descriptions
  `52–56ch`. Keep new paragraph content inside this range for readability.

## Motion

### Philosophy (non-negotiable, rejected twice already)

- Microanimations tied to **interaction or scroll** only. No on-load
  choreography, no staggered block reveals, no per-letter effects.
  Explicitly tried and rejected: per-letter hero skew-fade, per-letter raster
  pop-in, letter-spacing "settle" on headings ("scaling headings looks cheap").
  Do not re-propose these in any form.
- Everything sits behind `prefers-reduced-motion`. The pattern is: JS checks
  `matchMedia('(prefers-reduced-motion: reduce)').matches` and either no-ops
  (skip attaching listeners/animations entirely) or draws a single static
  state. See every `onMounted` in this codebase for the exact guard shape.
- No-JS / pre-hydration visitors must never see a "broken" mid-animation
  state. Where an animation has a dimmed/hidden start state (e.g. reading
  highlight), that start state is stamped via a tiny inline `<head>` script
  (see `nuxt.config.ts` `app.head.script`, the `html.anim` class) gated on the
  same reduced-motion check — so SSR/no-JS markup renders plain, final-state
  text, and only JS-and-motion visitors see the dimmed start.

### Durations & easing

- CSS transitions: `0.2s`–`0.3s` with `var(--ease-out)` for almost everything
  (hover color/underline/transform changes). `0.25s` for slightly larger moves
  (icon nudge, dates warming).
- GSAP eases in use: `power2.out` (trail dot fade-out), `power3.out` (cursor
  grow/shrink), `ease: 'none'` (scroll-scrubbed reveals — linear because
  ScrollTrigger's scrub supplies the easing via scroll position itself).
  Don't introduce `elastic`/`bounce`/`back` eases — nothing in this design
  overshoots.
- Keyframe animations (wink emoji moves, wave pulse): `0.9s`–`0.95s`
  `ease-in-out`, matching the "one deliberate beat" feel — not fast, not lingering.

### Effects catalogue

Everything currently on the page, description plus the recipe to reuse it.

**Reading highlight** — About prose brightens word by word as you scroll,
scrubbed but ratcheted (scrolling back up never re-dims):
```js
gsap.registerPlugin(ScrollTrigger, SplitText)
document.fonts.ready.then(() => {
  let reveal = null
  let maxProgress = 0
  SplitText.create(el.querySelectorAll('p'), {
    type: 'words', tag: 'span', aria: 'none', autoSplit: true,
    onSplit: (self) => {
      for (const w of self.words) w.style.display = 'inline' // keep line-wrap identical to raw text
      reveal = gsap.fromTo(self.words, { color: DIM }, { color: BRIGHT, stagger: 0.02, ease: 'none', paused: true })
      reveal.progress(maxProgress)
      return reveal
    },
  })
  const st = ScrollTrigger.create({
    trigger: el, start: 'top 82%', end: 'bottom 60%',
    onUpdate: (self) => { if (self.progress > maxProgress) { maxProgress = self.progress; reveal?.progress(maxProgress) } },
  })
})
```
Key ideas worth reusing elsewhere: split only after `document.fonts.ready`
(no re-wrap shift), `autoSplit: true` so resize doesn't break line boundaries,
`aria: 'none'` on word-level splits (Lighthouse flags `aria-label` on a `<p>`
role), and the "ratchet" (`maxProgress`) so scrolling back up never undoes a reveal.

**Wink words** — annotated words in the About prose ("a bike", "running",
"coffee.") swap to a monochrome emoji on hover for ~1s, with per-word movement
(ride, run, shake), then return. Pure CSS, state toggled by a tiny JS class
flip on `pointerenter` with a `setTimeout` per-element (see `app/app.vue`
`swapTimers` Map) — no GSAP needed for this one. Motion themes
(`data-move="ride|run|shake"`) are separate `@keyframes` per verb, travel
bounded to the word's own box. If adding a new annotated word, add
`data-emoji` + `data-move` and either reuse `ride`/`run`/`shake` or add one
matching `@keyframes wink-<verb>` following the same 0–18%–…–100% shape (rise
in, move, no exit — the reset is instant when the class is removed).

**Links & rows** — quiet links brighten + underline fade-in on hover, 200ms.
Experience dates warm up on row hover. Project links nudge their ↗ marker.
See Components below for the exact class recipes.

**Pronunciation button** — quiet speaker icon beside the hero name (a sibling
of the h1, not inside it, so the heading's accessible name stays just the
name); sound waves pulse while the clip plays via `@keyframes wave-pulse`,
paired with a `prefers-reduced-motion` override that stops the animation and
snaps to the hovered color.

**Custom cursor** (`CursorDot.vue`) — solid dot, 1:1 tracking, difference
blend, grows 2.6x over interactive elements, leaves a distance-spawned fading
dot trail. Fine pointers with motion allowed only. Use
`gsap.quickSetter(el, 'x', 'px')` for zero-lag position — never `gsap.to()`
position, any easing there reads as lag, this was tuned deliberately. Scale
changes (grow on hover, shrink on press) *do* use
`gsap.to(..., { duration: 0.3, ease: 'power3.out' })` — only position tracking
is instant. `mix-blend-mode: difference` gives the invert-what's-under-it
look — that's load-bearing, don't swap for opacity tricks.

**WebGL canvas** (`GlBackground.vue`) — halftone dot grid whose dot size
follows drifting fbm noise, faded down behind the text column; pointer swell
and an expanding click ripple. A `reduced` boolean picked once on mount
decides between `drawStatic()` (one frame, no rAF loop, redrawn on resize)
and `play()`/`pause()` (rAF loop, also paused on `visibilitychange` when the
tab is hidden — don't burn GPU on a hidden tab). If adding a second
canvas-driven effect, follow this exact play/pause/resize lifecycle rather
than a bare `requestAnimationFrame` loop.

**Reduced-motion CSS override pattern** — put the animated/interactive rule
first, then a `@media (prefers-reduced-motion: reduce)` block right after
that neutralizes it (`animation: none`, snaps to end state). See `.say-name`,
`.wink` in `main.css` for the shape.

## Components

- **Top row**: mono profile links (linkedin, email), left-aligned, no border.
- **Hero**: display name + pronunciation button, two-line role in muted body text.
- **Quiet link** (`.u-link`): `--fg-faint` idle → `--fg` + underline fade-in
  on hover, `text-decoration-color: transparent` → `--fg-faint`,
  `text-underline-offset: 4px`, `0.2s var(--ease-out)`. The default link
  treatment everywhere except the footer email and project names, which have
  their own slightly bigger variants of the same idea.
- **Section label** (`section h2`): mono, `0.75rem`, `--fg-faint`, lowercase,
  `margin-bottom: 2rem`. No numbering, no decorative kicker — a section is
  introduced by its label alone.
- **Experience rows / list-row-with-meta-column** (`.xp li`): mono dates
  (8.5rem column) + medium-weight role line in a content column (see Layout).
  Row hover brightens only the meta column (`--fg-faint` → `--fg-muted`), not
  the whole row — a restrained hover.
- **Projects**: name with underline-on-hover and an
  `<span aria-hidden="true">↗</span>` marker that nudges `translate(2px, -2px)`
  on hover for external links, plus a one-line description. Internal/
  non-outbound items (e.g. a project with no live URL) render as plain text,
  not a fake link.
- **Footer**: "contact" label (mono) → email at modest display size with
  underline on hover → a `bottom` row (flex, `justify-content: space-between`,
  wraps) with socials left and a live Kraków clock right. The clock is filled
  client-side only, post-mount, so SSR markup never disagrees with the
  visitor's clock (same "no hydration mismatch" principle as the `html.anim` stamp).
- **Console easter egg**: a two-line `console.info` signature with the email.

## Accessibility

WCAG AA contrast is the goal on all text (see the one known `--fg-faint`
exception above). Full keyboard navigability, visible focus states.
`prefers-reduced-motion` disables entrance animation and slows/stops the
canvas. Canvas is decorative only (`aria-hidden`), all content available as
plain HTML text. Language: English.

- `:focus-visible` gets a visible `2px solid var(--fg-muted)` outline with
  offset — never remove focus outlines, never rely on `:focus` alone.
- Decorative canvas/SVG gets `aria-hidden="true"`; all real content exists as
  plain HTML text underneath/alongside it, never *only* inside canvas or as
  an image.
- A button that sits beside a heading (e.g. `.say-name` next to `<h1>`) is a
  **sibling**, not nested inside the heading — keeps the heading's accessible
  name just the name, and the button's `aria-label` describes its own action.
- `SplitText` word splits use `aria: 'none'` — the default `'auto'` puts an
  `aria-label` on the `<p>`, which is invalid on the paragraph role and gets
  flagged by Lighthouse. Word-level spans read fine as plain text without it.
- Prefer real semantic structure (`nav[aria-label]`, `section[aria-labelledby]`
  pointing at its own `h2 id`) over `<div>` soup with visual-only headings.

## Conventions & idioms

- Comments are rare and only explain **why**, not what — a hidden constraint,
  a rejected alternative, an accessibility gotcha, a hydration-mismatch trap.
  Match that density; don't add narrating comments above obvious code.
- Every `window`/`document` listener attached in `onMounted` gets a matching
  `removeEventListener` in `onBeforeUnmount` — no exceptions, even for
  "it'll get GC'd anyway" cases.
- Feature-detect before attaching expensive behavior: `matchMedia('(pointer: fine)')`,
  `matchMedia('(prefers-reduced-motion: reduce)')`, checked once at mount, not
  reactively — these don't need to respond to a live media-query change on this site.
  IMPORTANT: for the reduced-motion CSS (`prefers-reduced-motion`), *do* implement
  it as a proper `@media` block (live, not JS-gated) so a mid-session OS toggle
  still works for pure-CSS motion.
- SSR-safety: any value that could differ between server-render and
  client-hydration (a clock, a "loaded" class, viewport-dependent state) is
  left empty/absent at render and filled only inside `onMounted` — never
  computed at setup-time. Two live examples: `krakowTime` ref starts `''`,
  and the `html.anim` class is stamped by an inline `<head>` script rather than
  applied via Vue.
- No CSS-in-JS, no scoped-by-default assumption: `main.css` is one global
  stylesheet with plain class selectors; components that need their own style
  (`CursorDot.vue`, `GlBackground.vue`) use `<style scoped>`/plain `<style>`
  locally instead of adding to the global sheet. Follow whichever the element
  belongs to — shared page chrome → `main.css`, a self-contained component → its own block.
- Class naming is plain lowercase, sometimes hyphenated (`.hero-title`,
  `.say-name`, `.stack-line`), not BEM. Keep it flat and readable, not `block__el--mod`.

## File map

```
app/app.vue                  page shell: SEO meta, all sections, hero/about/xp/projects/footer markup + their JS
app/assets/css/main.css      the only stylesheet — tokens, @font-face, every component's CSS
app/components/CursorDot.vue custom cursor + trail dots
app/components/GlBackground.vue  WebGL halftone shader background
nuxt.config.ts                head tags, font preloads, JSON-LD, the anim-class inline script, route headers
public/fonts/                 self-hosted woff2s (see Typography)
DESIGN.md                     this file — visual direction, tokens, recipes, conventions
PRODUCT.md                    brand strategy, users, anti-references (prose)
```

## Explicit anti-patterns (don't re-propose)

From prior review cycles — these were tried and rejected, or ruled out up front:

- Per-letter hero animations (skew-fade, raster pop-in) — rejected twice.
- Letter-spacing "settle" on headings — "looks cheap."
- On-load choreography of any kind (staggered section reveals, block fade-ins on mount).
- A hollow-ring cursor variant — the solid difference-blend dot won.
- Gradient text, glassmorphism cards, purple-blue SaaS gradients, skill
  progress bars, avatar rings, "MY SERVICES" card grids, testimonial carousels.
- Warm/gold/brown "elegant" palettes; the brutalist direction (tried, reverted).
- Decorative chrome: a top bar with a live clock was tried and removed —
  the clock now lives quietly in the footer instead.
- A branded 404/error page — declined when discussed 2026-08-10.
- GitHub links anywhere on the page.
- Numbered section kickers ("01 / About"), quippy AI-sounding copy,
  self-referential "here's the site you're looking at" content.
- New hues — stay on the single near-neutral 250° axis (see Color).

## Adding a new section — checklist

1. `<section aria-labelledby="id">` + `<h2 id="id">lowercase label</h2>` inside `main`, in `app.vue`.
2. Let `section { padding-bottom: var(--space-section) }` handle spacing — don't add a custom margin.
3. Body copy → `--font-sans`, `--fg-muted`, sits inside `max-width: 42rem` already enforced by `.page`; constrain prose itself to ~52–58ch if it's a paragraph block.
4. Any label/date/meta text → `--font-mono`, small, lowercase, `--fg-faint`.
5. Links → reuse `.u-link` unless it's a project-style named link (reuse `a.name` pattern with the ↗ marker).
6. If motion is warranted: interaction- or scroll-triggered only, guarded by
   the `prefers-reduced-motion` check, following one of the effects above
   rather than a new pattern. Ask "would Mateusz's stated philosophy allow an
   on-load version of this?" — if yes, it's probably not allowed.
7. Re-read the Explicit anti-patterns list before proposing any visual treatment.
