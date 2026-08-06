<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.registerPlugin(ScrollTrigger)

  gsap.from('[data-hero]', {
    y: 16,
    opacity: 0,
    duration: 0.9,
    ease: 'expo.out',
    stagger: 0.08,
    delay: 0.1,
  })

  for (const el of gsap.utils.toArray<HTMLElement>('[data-reveal]')) {
    gsap.from(el, {
      y: 12,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  }
})
</script>

<template>
  <div>
    <GlBackground />
    <CursorDot />

    <div class="page">
      <main>
        <section class="hero" aria-label="Intro">
          <h1 data-hero>Mateusz Zahel</h1>
          <p class="role" data-hero>
            <span>Frontend developer who thinks in products.</span>
            <span>Seven years of shipping, now at Tagvenue in Kraków.</span>
          </p>
          <nav class="links" data-hero aria-label="Profiles">
            <a class="u-link" href="https://www.linkedin.com/in/mateusz-zahel/" target="_blank" rel="noopener">linkedin</a>
            <!-- TODO: replace with your real email -->
            <a class="u-link" href="mailto:hello@mzahel.pl">email</a>
          </nav>
        </section>

        <section aria-labelledby="about" data-reveal>
          <h2 id="about">about</h2>
          <div class="prose">
            <p>
              I've spent the last seven years building web products:
              first at a creative studio doing design-heavy marketing sites,
              then at a product studio, now at Tagvenue, a venue-hire
              marketplace.
            </p>
            <p>
              I think of myself as a product developer: I want to know why a
              feature exists and what it should improve before writing any
              code. The part I enjoy most is the path from an idea to
              something users actually touch: sketching flows with a
              designer, cutting scope with a product manager, shipping an
              early version behind an experiment and letting real usage
              decide what happens next.
            </p>
            <p>
              The craft still matters to me: performance, accessibility,
              motion, the details most people only notice when they're
              missing. But it's in service of the product, not the other way
              around.
            </p>
            <p>
              Off the computer, you can find me on a bike or running
              somewhere around Kraków.
            </p>
          </div>
          <p class="stack-line">
            vue · nuxt · typescript · gsap · node · headless cms · databases
          </p>
        </section>

        <section aria-labelledby="experience" data-reveal>
          <h2 id="experience">experience</h2>
          <ul class="xp">
            <li>
              <span class="dates">2024 – now</span>
              <div class="what">
                <div class="role-line">Frontend Developer <span class="co">· Tagvenue</span></div>
                <p>
                  Venue-hire marketplace operating across six countries.
                  Building the client-facing search and booking experience
                  together with product and design, with changes validated
                  through A/B testing.
                </p>
              </div>
            </li>
            <li>
              <span class="dates">2022 – 2024</span>
              <div class="what">
                <div class="role-line">Frontend Developer <span class="co">· Boldare</span></div>
                <p>
                  Digital product studio. Shipped web apps for international
                  clients in cross-functional teams of engineers, designers
                  and product people; owned frontend architecture decisions
                  from framework choice to release.
                </p>
              </div>
            </li>
            <li>
              <span class="dates">2020 – 2022</span>
              <div class="what">
                <div class="role-line">Frontend Developer <span class="co">· Owls Department</span></div>
                <p>
                  Creative studio. Built design-heavy marketing sites and web
                  apps with Vue, TypeScript and WordPress.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section aria-labelledby="projects" data-reveal>
          <h2 id="projects">personal projects</h2>
          <ul class="projects">
            <li>
              <a class="name" href="https://bikelens.app" target="_blank" rel="noopener">
                BikeLens <span class="ext" aria-hidden="true">↗</span>
              </a>
              <p>
                Compares frame geometry across bike brands, so you can tell
                how a bike will actually fit before you buy it.
              </p>
            </li>
            <li>
              <a class="name" href="https://www.zahel.pl/" target="_blank" rel="noopener">
                zahel.pl <span class="ext" aria-hidden="true">↗</span>
              </a>
              <p>
                Website for an insurance brokerage, designed and built end to
                end and optimised for local search: structured data, solid
                Web Vitals, and content organised around what people
                actually search for.
              </p>
            </li>
            <li>
              <span class="name">informatyk.edu.pl <span class="year">2017 – 2020</span></span>
              <p>
                Exam-prep platform for Polish IT students. Co-founded it,
                built the entire front end.
              </p>
            </li>
          </ul>
        </section>
      </main>

      <footer>
        <p class="cta-label">contact</p>
        <!-- TODO: replace with your real email -->
        <a class="email-link" href="mailto:hello@mzahel.pl">hello@mzahel.pl</a>
        <div class="bottom">
          <div class="socials">
            <a class="u-link" href="https://www.linkedin.com/in/mateusz-zahel/" target="_blank" rel="noopener">linkedin</a>
          </div>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  </div>
</template>
