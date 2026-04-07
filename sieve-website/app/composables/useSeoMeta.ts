import { useHead, useRoute, useRuntimeConfig, useSeoMeta as useNuxtSeoMeta } from '#imports'

interface SeoMetaOptions {
  title: string
  description: string
  image?: string
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

export function usePageSeoMeta({ title, description, image }: SeoMetaOptions) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const { locale, localeProperties } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  const siteUrl = config.public.siteUrl || 'https://huayunmesh.com'
  const currentPath = switchLocalePath(locale.value) || route.path || '/'
  const zhPath = switchLocalePath('zh') || '/zh'
  const enPath = switchLocalePath('en') || '/'
  const canonicalUrl = toAbsoluteUrl(currentPath, siteUrl)
  const imageUrl = image ? toAbsoluteUrl(image, siteUrl) : undefined

  useHead({
    title,
    htmlAttrs: {
      lang: localeProperties.value.language || (locale.value === 'zh' ? 'zh-CN' : 'en')
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
        hreflang: 'zh',
        href: toAbsoluteUrl(zhPath, siteUrl)
      },
      {
        key: 'alternate-en',
        rel: 'alternate',
        hreflang: 'en',
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
    ogTitle: title,
    ogDescription: description,
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
    twitterCard: imageUrl ? 'summary_large_image' : 'summary'
  })
}
