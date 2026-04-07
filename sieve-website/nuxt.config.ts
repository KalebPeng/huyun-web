import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import applicationsData from './data/applications.json'
import productsData from './data/products.json'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://huayunmesh.com'
const stripUtf8Bom = (value: string) => value.replace(/^\uFEFF/, '')

const createLocalizedEntries = (path: string, changefreq: 'daily' | 'weekly' | 'monthly' = 'monthly') => {
  const normalizedPath = path === '/' ? '' : path

  return [
    {
      loc: normalizedPath || '/',
      changefreq
    },
    {
      loc: `/zh${normalizedPath}`,
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

  hooks: {
    'content:file:beforeParse'(ctx) {
      if (typeof ctx.file.body === 'string') {
        ctx.file.body = stripUtf8Bom(ctx.file.body)
      }
    }
  },

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
    defaultLocale: 'en',
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
      fallbackLocale: 'en'
    }
  },

  site: {
    url: siteUrl,
    name: 'Huayun Wire Mesh'
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
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Huayun Wire Mesh',
      titleTemplate: '%s | Huayun Wire Mesh',
      meta: [
        {
          name: 'description',
          content:
            'Huayun Wire Mesh specializes in mining screens, 65Mn woven mesh, welded slot screens, and polyurethane panels for aggregate, coal washing, and industrial filtration.'
        },
        { property: 'og:site_name', content: 'Huayun Wire Mesh' },
        { property: 'og:type', content: 'website' }
      ]
    }
  }
})

