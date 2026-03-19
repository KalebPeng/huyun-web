import applicationsData from './data/applications.json'
import productsData from './data/products.json'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

const productUrls = (productsData as Array<{ slug: string }>).map((product) => ({
  loc: `/products/${product.slug}`,
  changefreq: 'weekly' as const
}))

const applicationUrls = (applicationsData as Array<{ slug: string }>).map((application) => ({
  loc: `/applications/${application.slug}`,
  changefreq: 'weekly' as const
}))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
    '@nuxt/image'
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  typescript: {
    strict: true
  },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
    notifyEmail: process.env.NOTIFY_EMAIL,
    fromEmail: process.env.FROM_EMAIL,
    public: {
      siteUrl
    }
  },

  site: {
    url: siteUrl,
    name: '筛网厂'
  },

  sitemap: {
    urls: [...productUrls, ...applicationUrls]
  },

  image: {
    format: ['webp'],
    quality: 80
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '筛网厂',
      titleTemplate: '%s | 筛网厂',
      meta: [
        { name: 'description', content: '专业筛网生产厂家，提供多规格筛网产品与定制化解决方案。' },
        { property: 'og:site_name', content: '筛网厂' },
        { property: 'og:type', content: 'website' }
      ]
    }
  }
})
