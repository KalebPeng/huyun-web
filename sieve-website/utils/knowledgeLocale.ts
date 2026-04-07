export const DEFAULT_LOCALE = 'en'
export const SUPPORTED_LOCALES = ['en', 'zh'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

const normalizePath = (value: string) => {
  const [path] = value.split(/[?#]/)
  const trimmed = path.replace(/\/+$/, '')

  return trimmed || '/'
}

export const getLocaleFromContentPath = (path: string): SupportedLocale => {
  const segments = normalizePath(path).split('/').filter(Boolean)

  return segments[0] === 'zh' ? 'zh' : 'en'
}

export const getPublicPathFromContentPath = (path: string) => {
  const normalizedPath = normalizePath(path)
  const segments = normalizedPath.split('/').filter(Boolean)

  if (!segments.length) {
    return '/'
  }

  const [locale, ...rest] = segments

  if (locale === 'zh') {
    return rest.length ? `/zh/${rest.join('/')}` : '/zh'
  }

  if (locale === 'en') {
    return rest.length ? `/${rest.join('/')}` : '/'
  }

  return normalizedPath
}

export const getContentPathFromPublicPath = (path: string, locale: SupportedLocale) => {
  const normalizedPath = normalizePath(path)
  const segments = normalizedPath.split('/').filter(Boolean)
  const normalizedSegments =
    segments[0] === 'zh' || segments[0] === 'en' ? segments.slice(1) : segments

  return `/${locale}${normalizedSegments.length ? `/${normalizedSegments.join('/')}` : ''}`
}

