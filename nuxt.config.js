const pkg = require("./package");

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: 'Mateusz Zahel',
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: pkg.description
      },
      {
        name: 'og:image',
        content: '/og.png'
      },
      {
        name: 'theme-color',
        content: '#242423'
      }
    ],
    link: [{
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap&subset=latin-ext"
      }
    ]
  },
  router: {
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = async (hash, x) => {
        return document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => {
              resolve(findEl(hash, ++x || 1))
            }, 100)
          })
      }

      if (to.hash) {
        let el = await findEl(to.hash)
        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({
            top: el.offsetTop,
            behavior: 'smooth'
          })
        } else {
          return window.scrollTo(0, el.offsetTop)
        }
      }

      return {
        x: 0,
        y: 0
      }
    }
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },

  /*
   ** Global CSS
   */
  css: ["~/assets/scss/main.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/apollo",
    "@nuxtjs/svg-sprite",
    "@nuxtjs/style-resources",
    ['@nuxtjs/google-analytics', {
      id: 'UA-144363105-1',
      dev: false
    }]
  ],
  apollo: {
    clientConfigs: {
      default: "~/plugins/apollo/config.js"
    }
  },
  svgSprite: {
    input: "~/assets/svg",
    output: "~/assets/svg/sprite"
  },
  styleResources: {
    // your settings here
    scss: ["~/assets/scss/_variables.scss"]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
