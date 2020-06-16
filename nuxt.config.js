import * as firebase from 'firebase/app'
import 'firebase/firestore'

require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather|Muli&display=swap' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/fuzzyset.js/0.0.1/fuzzyset.min.js' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // CSS file in the project
    '@/assets/css/style.css',
    '@/assets/line-awesome/css/line-awesome.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/directives.js',
    '~/plugins/firebase.js',
    '~/plugins/vueformulate.js',
    '~/plugins/vue2touchevents.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt/components
    '@nuxt/components'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'nuxt-clipboard2'
  ],

  axios: {
    // proxyHeaders: false
  },
  /*
  ** Build configuration
  */
  components: true,
  /*
   ** Customize the generated output folder
   */
  generate: {
    dir: 'public',
    async routes () {
      let app = null
      if (!firebase.apps.length) {
        app = firebase.initializeApp({
          apiKey: process.env.NUXT_ENV_FB_APIKEY,
          authDomain: process.env.NUXT_ENV_FB_AUTHDOMAIN,
          databaseURL: process.env.NUXT_ENV_FB_DATABASEURL,
          projectId: process.env.NUXT_ENV_FB_PROJECTID,
          storageBucket: process.env.NUXT_ENV_FB_STORAGEBUCKET,
          messagingSenderId: process.env.NUXT_ENV_FB_MESSAGINGSENDERID,
          appId: process.env.NUXT_ENV_FB_APPID,
          measurementId: process.env.NUXT_ENV_FB_MEASUREMENTID
        })
      }
      const idQuery = await firebase.firestore().collection('quotes').orderBy('created').get()
      .then((res) => {
        const idArray = []
        res.forEach((doc) => {
          idArray.push(`/${doc.data().id}`)
          idArray.push(`/admin/${doc.data().id}`)
        })
        return idArray
      })
      .catch(e => context.error(e))
      return idQuery
    }
  },
  
  /*
  ** Customize the base url
  */
  router: {
    base: '/' //this is whatever the project is named
  },

  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  }
}
