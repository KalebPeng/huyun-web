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
  const siteUrl = config.public.siteUrl || 'https://huayun-mesh.com'
  const canonicalUrl = toAbsoluteUrl(route.path || '/', siteUrl)
  const imageUrl = image ? toAbsoluteUrl(image, siteUrl) : undefined

  useHead({
    title,
    link: [
      {
        key: 'canonical',
        rel: 'canonical',
        href: canonicalUrl
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
