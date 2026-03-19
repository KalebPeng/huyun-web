import { useHead, useRuntimeConfig, useSeoMeta as useNuxtSeoMeta } from '#imports'

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
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://yourdomain.com'
  const imageUrl = image ? toAbsoluteUrl(image, siteUrl) : undefined

  useHead({
    title
  })

  useNuxtSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: imageUrl,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
    twitterCard: imageUrl ? 'summary_large_image' : 'summary'
  })
}
