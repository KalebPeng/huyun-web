import { useHead, useRoute, useRuntimeConfig, useSeoMeta as useNuxtSeoMeta } from '#imports'

interface SeoMetaOptions {
  title: string
  description: string
  image?: string
  robots?: string
}

const DEFAULT_SHARE_IMAGE = '/images/products/stainless-woven-mesh/cover.webp'
const LOCALE_LANGUAGE_MAP: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en-US'
}

const toAbsoluteUrl = (value: string, siteUrl: string) => {
  if (!value) {
    return ''
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  const normalizedSiteUrl = siteUrl.replace(/\/+$/, '')
  const normalizedValue = value.startsWith('/') ? value : `/${value}`

  return `${normalizedSiteUrl}${normalizedValue}`
}

export function usePageSeoMeta({ title, description, image, robots }: SeoMetaOptions) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const { locale, localeProperties } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  const siteUrl = config.public.siteUrl || 'https://huayunmesh.com'
  const currentLocale = locale.value === 'zh' ? 'zh' : 'en'
  const currentLocaleTag = localeProperties.value.language || LOCALE_LANGUAGE_MAP[currentLocale]
  const alternateLocaleTag = currentLocale === 'zh' ? LOCALE_LANGUAGE_MAP.en : LOCALE_LANGUAGE_MAP.zh
  const currentPath = switchLocalePath(locale.value) || route.path || '/'
  const zhPath = switchLocalePath('zh') || '/zh'
  const enPath = switchLocalePath('en') || '/'
  const canonicalUrl = toAbsoluteUrl(currentPath, siteUrl)
  const imageUrl = toAbsoluteUrl(image || DEFAULT_SHARE_IMAGE, siteUrl)

  useHead({
    title,
    htmlAttrs: {
      lang: currentLocaleTag
    },
    link: [
      {
        key: 'canonical',
        rel: 'canonical',
        href: canonicalUrl
      },
      {
        key: 'alternate-zh',
        rel: 'alternate',
        hreflang: LOCALE_LANGUAGE_MAP.zh,
        href: toAbsoluteUrl(zhPath, siteUrl)
      },
      {
        key: 'alternate-en',
        rel: 'alternate',
        hreflang: LOCALE_LANGUAGE_MAP.en,
        href: toAbsoluteUrl(enPath, siteUrl)
      },
      {
        key: 'alternate-x-default',
        rel: 'alternate',
        hreflang: 'x-default',
        href: toAbsoluteUrl(enPath, siteUrl)
      }
    ]
  })

  useNuxtSeoMeta({
    title,
    description,
    robots: robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogTitle: title,
    ogDescription: description,
    ogSiteName: 'Huayun Wire Mesh',
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    ogImageAlt: title,
    ogLocale: currentLocaleTag,
    ogLocaleAlternate: alternateLocaleTag,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
    twitterImageAlt: title,
    twitterCard: 'summary_large_image'
  })
}
