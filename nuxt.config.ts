// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Mateusz Zahel – Frontend Developer',
      meta: [
        {
          name: 'description',
          content:
            'Frontend developer in Kraków, Poland. Seven years of building for the web: Vue, Nuxt, TypeScript, GSAP, WebGL.',
        },
        { property: 'og:title', content: 'Mateusz Zahel – Frontend Developer' },
        {
          property: 'og:description',
          content:
            'Frontend developer in Kraków, Poland. Interfaces where the details are the point.',
        },
        { name: 'theme-color', content: '#121316' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://cdn.fontshare.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300..700&family=Fragment+Mono&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800&display=swap',
        },
      ],
    },
  },
})
