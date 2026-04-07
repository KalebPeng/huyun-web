export const DEFAULT_LOCALE = 'en'
export const SUPPORTED_LOCALES = ['en', 'zh'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]
export type LocalizedValue<T> = Record<SupportedLocale, T>

export const normalizeLocale = (locale?: string): SupportedLocale =>
  locale === 'zh' ? 'zh' : DEFAULT_LOCALE

export const resolveLocalizedValue = <T>(value: LocalizedValue<T>, locale?: string) =>
  value[normalizeLocale(locale)] ?? value[DEFAULT_LOCALE]
