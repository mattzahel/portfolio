<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// TODO: replace with your real email
const EMAIL = 'hello@mzahel.pl'

onMounted(() => {
  console.info(
    '%cmade by hand: nuxt · gsap · one small shader\n%csay hi → ' + EMAIL,
    'color:#82858c;font-family:monospace',
    'color:#e9eaec;font-family:monospace',
  )

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // annotated words swap to their emoji for a beat on hover, then back
  const swapTimers = new Map<Element, ReturnType<typeof setTimeout>>()
  for (const wink of document.querySelectorAll<HTMLElement>('.wink')) {
    wink.addEventListener('pointerenter', () => {
      if (wink.classList.contains('is-swapped')) return
      wink.classList.add('is-swapped')
      clearTimeout(swapTimers.get(wink))
      swapTimers.set(wink, setTimeout(() => wink.classList.remove('is-swapped'), 950))
    })
  }

  gsap.registerPlugin(ScrollTrigger, SplitText)

  // words brighten as you read: one continuous sequence across the whole
  // prose block, scrubbed to scroll, so the highlight moves in reading order
  const prose = document.querySelector<HTMLElement>('.prose')
  if (prose) {
    const split = new SplitText(prose.querySelectorAll('p'), { type: 'words' })
    gsap.fromTo(
      split.words,
      { color: 'oklch(36% 0.003 250)' },
      {
        color: 'oklch(71% 0.003 250)',
        stagger: 0.02,
        ease: 'none',
        scrollTrigger: { trigger: prose, start: 'top 82%', end: 'bottom 60%', scrub: true },
      },
    )
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
          <h1>Mateusz Zahel</h1>
          <p class="role">
            <span>Frontend developer who thinks in products.</span>
            <span>Seven years of shipping, now at Tagvenue in Kraków.</span>
          </p>
          <nav class="links" aria-label="Profiles">
            <a class="u-link" href="https://www.linkedin.com/in/mateusz-zahel/" target="_blank" rel="noopener">linkedin</a>
            <!-- TODO: replace with your real email -->
            <a class="u-link" href="mailto:hello@mzahel.pl">email</a>
          </nav>
        </section>

        <section aria-labelledby="about">
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
              something users actually touch:
              sketching flows with a
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
              Off the computer, you can find me on
              <span class="wink" data-emoji="🚲" data-move="ride"><span class="w">a bike</span></span>,
              <span class="wink" data-emoji="🏃" data-move="run"><span class="w">running</span></span>
              somewhere around Kraków, or drinking
              <span class="wink" data-emoji="☕" data-move="shake"><span class="w">coffee</span></span>.
            </p>
          </div>
          <p class="stack-line">
            vue · nuxt · typescript · gsap · node · headless cms · databases
          </p>
        </section>

        <section aria-labelledby="experience">
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
                <div class="role-line">Junior Frontend Developer <span class="co">· Owls Department</span></div>
                <p>
                  Creative studio. Built design-heavy marketing sites and web
                  apps with Vue, TypeScript and WordPress.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section aria-labelledby="projects">
          <h2 id="projects">personal projects</h2>
          <ul class="projects">
            <li>
              <a class="name" href="https://bikelens.app" target="_blank" rel="noopener">
                <span class="label">BikeLens</span> <span class="ext" aria-hidden="true">↗</span>
              </a>
              <p>
                Compares frame geometry across bike brands, so you can tell
                how a bike will actually fit before you buy it.
              </p>
            </li>
            <li>
              <a class="name" href="https://www.zahel.pl/" target="_blank" rel="noopener">
                <span class="label">Ubezpieczenia Zahel</span> <span class="ext" aria-hidden="true">↗</span>
              </a>
              <p>
                Website for an insurance brokerage, designed and built end
                to end, optimised for local search.
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
        <a class="email-link" :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
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
