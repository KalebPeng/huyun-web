import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import applicationsData from './data/applications.json'
import productsData from './data/products.json'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://huayun-mesh.com'

const productUrls = (productsData as Array<{ slug: string }>).map((product) => ({
  loc: `/products/${product.slug}`,
  changefreq: 'weekly' as const
}))

const applicationUrls = (applicationsData as Array<{ slug: string }>).map((application) => ({
  loc: `/applications/${application.slug}`,
  changefreq: 'weekly' as const
}))

const staticUrls = [
  {
    loc: '/content-standards',
    changefreq: 'monthly' as const
  }
]

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxt/image'
  ],

  css: ['katex/dist/katex.min.css'],

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
    name: '华云网业'
  },

  sitemap: {
    urls: [...staticUrls, ...productUrls, ...applicationUrls],
    sources: ['/api/__sitemap__/knowledge']
  },

  content: {
    build: {
      markdown: {
        contentHeading: false,
        remarkPlugins: {
          'remark-math': {
            instance: remarkMath
          }
        },
        rehypePlugins: {
          'rehype-katex': {
            instance: rehypeKatex
          }
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },

  image: {
    format: ['webp'],
    quality: 80,
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    },
    presets: {
      hero: {
        modifiers: {
          width: 960,
          height: 720,
          fit: 'cover'
        }
      },
      card: {
        modifiers: {
          width: 800,
          height: 560,
          fit: 'cover'
        }
      }
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '华云网业',
      titleTemplate: '%s | 华云网业',
      meta: [
        {
          name: 'description',
          content: '华云网业 - 专注矿用焊接筛网、65Mn编织网及聚氨酯筛板生产，为矿山、洗煤与骨料分级提供高耐磨、长寿命的筛分解决方案。'
        },
        { property: 'og:site_name', content: '华云网业' },
        { property: 'og:type', content: 'website' }
      ]
    }
  }
})
