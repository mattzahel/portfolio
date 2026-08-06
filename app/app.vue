<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// receives via email forwarding (e.g. Cloudflare Email Routing)
const EMAIL = 'hello@mzahel.dev'

const TITLE = 'Mateusz Zahel – Frontend Developer'
const DESCRIPTION =
  'Frontend developer in Kraków, Poland. Seven years of building web products: Vue, Nuxt, TypeScript.'
const SITE_URL = 'https://mzahel.dev'

useSeoMeta({
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: TITLE,
  ogDescription: DESCRIPTION,
  ogType: 'website',
  ogUrl: SITE_URL,
  ogImage: `${SITE_URL}/og.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Mateusz Zahel, frontend developer who thinks in products',
  twitterCard: 'summary_large_image',
  twitterTitle: TITLE,
  twitterDescription: DESCRIPTION,
  twitterImage: `${SITE_URL}/og.png`,
})

useHead({
  link: [{ rel: 'canonical', href: SITE_URL }],
})

// footer clock: filled on mount only, so SSR markup never disagrees
const krakowTime = ref('')

// name pronunciation: tiny TTS clip, fetched only on first click
const namePlaying = ref(false)
let nameAudio: HTMLAudioElement | null = null

function sayName() {
  if (!nameAudio) {
    nameAudio = new Audio('/name.m4a')
    nameAudio.addEventListener('ended', () => (namePlaying.value = false))
  }
  nameAudio.currentTime = 0
  nameAudio.play().then(
    () => (namePlaying.value = true),
    () => {},
  )
}

onMounted(() => {
  console.info(
    '%cmade by hand: nuxt · gsap · one small shader\n%csay hi → ' + EMAIL,
    'color:#82858c;font-family:monospace',
    'color:#e9eaec;font-family:monospace',
  )

  const fmtKrakow = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Warsaw',
  })
  const tick = () => (krakowTime.value = fmtKrakow.format(new Date()))
  tick()
  const clock = setInterval(tick, 1000)
  onBeforeUnmount(() => clearInterval(clock))

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
  // prose block, scrubbed to scroll, so the highlight moves in reading order.
  // split only after fonts load (no re-wrap shift); autoSplit re-splits on
  // resize so mobile address-bar changes don't break line boundaries
  const prose = document.querySelector<HTMLElement>('.prose')
  if (prose) {
    document.fonts.ready.then(() => {
      // the reveal only ratchets forward: scrolling back up never re-dims
      let reveal: gsap.core.Tween | null = null
      let maxProgress = 0

      SplitText.create(prose.querySelectorAll('p'), {
        type: 'words',
        tag: 'span',
        autoSplit: true,
        onSplit: (self) => {
          // inline, not SplitText's default inline-block: keeps line
          // breaking identical to raw text (inline-block words are atomic,
          // so hyphenated words would jump to the next line)
          for (const w of self.words as HTMLElement[]) w.style.display = 'inline'
          reveal = gsap.fromTo(
            self.words,
            { color: 'oklch(36% 0.003 250)' },
            { color: 'oklch(71% 0.003 250)', stagger: 0.02, ease: 'none', paused: true },
          )
          reveal.progress(maxProgress)
          return reveal
        },
      })

      const st = ScrollTrigger.create({
        trigger: prose,
        start: 'top 82%',
        end: 'bottom 60%',
        onUpdate: (self) => {
          if (self.progress > maxProgress) {
            maxProgress = self.progress
            reveal?.progress(maxProgress)
          }
        },
      })
      // apply the position the page loaded at (e.g. reload mid-page)
      maxProgress = st.progress
      reveal?.progress(maxProgress)
    })
  }
})
</script>

<template>
  <div>
    <GlBackground />
    <CursorDot />

    <div class="page">
      <nav class="links top-links" aria-label="Profiles">
        <a class="u-link" href="https://www.linkedin.com/in/mateusz-zahel/" target="_blank" rel="noopener">linkedin</a>
        <a class="u-link" :href="`mailto:${EMAIL}`">email</a>
      </nav>

      <main>
        <section class="hero" aria-label="Intro">
          <h1>
            Mateusz Zahel<button
              class="say-name"
              :class="{ 'is-playing': namePlaying }"
              type="button"
              aria-label="Hear how to pronounce my name"
              @click="sayName"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M11 5 6 9H3v6h3l5 4z" />
                <path class="wave wave-1" d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path class="wave wave-2" d="M18.8 5.7a9.5 9.5 0 0 1 0 12.6" />
              </svg>
            </button>
          </h1>
          <p class="role">
            <span>Frontend developer who thinks in products.</span>
            <span>Seven years of shipping, now at Tagvenue in Kraków.</span>
          </p>
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
              <span class="wink" data-emoji="☕" data-move="shake"><span class="w">coffee.</span></span>
            </p>
          </div>
          <p class="stack-line">
            vue · nuxt · typescript · animations · headless cms · node · databases
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
          <span v-if="krakowTime" class="clock">{{ krakowTime }} in Kraków</span>
        </div>
      </footer>
    </div>
  </div>
</template>
