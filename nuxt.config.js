export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Flutterで始めるアプリ開発',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Flutterを使ったiOS/Android/Webアプリ開発への入門に必要な情報を分かりやすく紹介' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Flutterで始めるアプリ開発' },
      { hid: 'og:description', property: 'og:description', content: 'Flutterを使ったiOS/Android/Webアプリ開発への入門に必要な情報を分かりやすく紹介' },
      { hid: 'og:title', property: 'og:title', content: 'Flutterで始めるアプリ開発' },
      { hid: 'og:image', property: 'og:image', content: 'https://www.flutter-study.dev/images/banner.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://content.nuxtjs.org/
    '@nuxt/content',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap',
    // https://github.com/nuxt-community/google-gtag-module
    '@nuxtjs/google-gtag'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    // https://composition-api.nuxtjs.org/getting-started/setup
    interval: 50,

    async routes () {
      return (await getRoutes()).map(route => route.url)
    }
  },

  content: {
    liveEdit: false,
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-lucario.css'
      }
    }
  },

  async sitemap () {
    return {
      hostname: 'https://www.flutter-study.dev',
      defaults: {
        changefreq: 'monthly',
        lastmod: new Date()
      },
      routes: await getRoutes()
    }
  },

  'google-gtag': {
    id: 'G-289XFVSYNQ'
  }
}

async function getRoutes () {
  const { $content } = require('@nuxt/content')
  const articles = await $content('/', { deep: true })
    .where({ dir: { $ne: '/top' } })
    .without(['body'])
    .fetch()
  return [
    { url: '/' },
    { url: '/about' },
    ...articles.map((article) => {
      return {
        url: article.path,
        changefreq: 'weekly'
      }
    })
  ]
}
