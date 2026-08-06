# Product

## Register

brand

## Users

Hiring managers, recruiters, and fellow developers who open the link between other tabs and give it 30–60 seconds. Secondary: potential freelance clients and conference/community contacts. They skim first, then dig into work history if the first impression lands. Many of them see dozens of templated dev portfolios a week; the job here is to be the one that feels handmade.

## Product Purpose

A one-page personal portfolio for Mateusz Zahel, frontend developer from Kraków, Poland (~7 years of experience: Tagvenue, Boldare, Owls Department, co-founder of informatyk.edu.pl). The page itself is the proof of craft: if it doesn't demonstrate taste and frontend skill, no bullet list will. Success = visitor thinks "this person sweats details" and reaches out via email or LinkedIn.

## Brand Personality

Quiet, precise, alive. Minimal surfaces with one ambient generative touch (WebGL) and subtle, exact motion (GSAP). Confidence through restraint, not volume. Named reference lane: antfu.me-style tech-minimal personal site (user-chosen reference), NOT editorial-magazine, NOT agency-loud.

## Anti-references

- Templated dev portfolios: hero with avatar ring, skill progress bars, "MY SERVICES" card grids, testimonial carousels.
- Loud agency sites: full-screen video, aggressive scroll-jacking, preloader counters.
- Editorial-magazine affectation: italic display serifs, drop caps, ruled three-column layouts.
- Anything a visitor would identify as "AI made that": gradient text, glassmorphism cards, purple-blue SaaS gradients.

## Design Principles

1. **The page is the CV.** Every implementation detail (canvas, easing, kerning) is a work sample. Nothing decorative that isn't also well-built.
2. **One special touch per fold.** A single ambient WebGL scene and precise micro-interactions beat ten competing effects.
3. **Content-first minimalism.** Text reads like a person talking, short and specific. No section exists to fill a template slot.
4. **Motion is punctuation, not fireworks.** Staggered reveals and hover details with exponential ease-outs; everything respects prefers-reduced-motion.
5. **Fast and self-contained.** No heavy frameworks for the visuals: hand-written shader, GSAP only where it earns its bytes.

## Accessibility & Inclusion

WCAG AA contrast on all text. Full keyboard navigability, visible focus states. `prefers-reduced-motion` disables entrance animation and slows/stops the canvas. Canvas is decorative only (`aria-hidden`), all content available as plain HTML text. Language: English.
