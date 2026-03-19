// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/google-fonts'],

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  typescript: {
    strict: true
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '筛网企业官网',
      meta: [
        { name: 'description', content: '专业筛网制造企业' }
      ]
    }
  }
})
