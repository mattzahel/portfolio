// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/fonts/**': {
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
    },
    // pronunciation clip: browsers refuse to embed it from other origins,
    // and search engines are told not to index the file itself
    '/name.m4a': {
      headers: {
        'Cross-Origin-Resource-Policy': 'same-origin',
        'X-Robots-Tag': 'noindex',
      },
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      script: [
        {
          // stamp before first paint so the reading-highlight start state
          // (dimmed prose) applies without a flash; skipped for reduced motion
          innerHTML:
            "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('anim')",
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Mateusz Zahel',
            jobTitle: 'Frontend Developer',
            url: 'https://mzahel.dev',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kraków',
              addressCountry: 'PL',
            },
            sameAs: ['https://www.linkedin.com/in/mateusz-zahel/'],
          }),
        },
      ],
      meta: [{ name: 'theme-color', content: '#121316' }],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // self-hosted fonts (declared in main.css); preload the three that
        // paint above the fold so text renders in one pass
        ...['cabinet-grotesk-800', 'hanken-grotesk-latin', 'fragment-mono-latin'].map((f) => ({
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: `/fonts/${f}.woff2`,
          crossorigin: '',
        })),
      ],
    },
  },
})
