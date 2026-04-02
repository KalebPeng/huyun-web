import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import applicationsData from './data/applications.json'
import productsData from './data/products.json'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://huayunmesh.com'

const createLocalizedEntries = (path: string, changefreq: 'daily' | 'weekly' | 'monthly' = 'monthly') => {
  const normalizedPath = path === '/' ? '' : path

  return [
    {
      loc: normalizedPath || '/',
      changefreq
    },
    {
      loc: `/en${normalizedPath}`,
      changefreq
    }
  ]
}

const productUrls = (productsData as Array<{ slug: string }>).flatMap((product) =>
  createLocalizedEntries(`/products/${product.slug}`, 'weekly')
)

const applicationUrls = (applicationsData as Array<{ slug: string }>).flatMap((application) =>
  createLocalizedEntries(`/applications/${application.slug}`, 'weekly')
)

const staticUrls = [
  ...createLocalizedEntries('/', 'weekly'),
  ...createLocalizedEntries('/products', 'weekly'),
  ...createLocalizedEntries('/applications', 'weekly'),
  ...createLocalizedEntries('/knowledge', 'weekly'),
  ...createLocalizedEntries('/faq', 'weekly'),
  ...createLocalizedEntries('/tools', 'weekly'),
  ...createLocalizedEntries('/about', 'monthly'),
  ...createLocalizedEntries('/contact', 'weekly'),
  ...createLocalizedEntries('/content-standards', 'monthly')
]

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
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

  i18n: {
    baseUrl: siteUrl,
    lazy: true,
    // Nuxt i18n v10 resolves langDir relative to the layer i18n directory (`<root>/i18n`).
    // Keeping it empty loads locale files from `sieve-website/i18n/*.json`.
    langDir: '',
    strategy: 'prefix_except_default',
    defaultLocale: 'zh',
    locales: [
      {
        code: 'zh',
        name: '中文',
        language: 'zh-CN',
        file: 'zh.json'
      },
      {
        code: 'en',
        name: 'English',
        language: 'en',
        file: 'en.json'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'zh'
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
          content:
            '华云网业专注矿用筛网、65Mn 编织网、条缝筛与聚氨酯筛板，提供矿山、选煤、骨料与工业过滤场景的筛分解决方案。'
        },
        { property: 'og:site_name', content: '华云网业' },
        { property: 'og:type', content: 'website' }
      ]
    }
  }
})
