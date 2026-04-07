import type {
  ApplicationScene,
  FAQ,
  LocalizedApplicationScene,
  LocalizedFAQ,
  LocalizedProduct,
  LocalizedProductSelectionGuide,
  Product,
  ProductSelectionGuide
} from '~~/types'

import { resolveLocalizedValue, type SupportedLocale } from './localized'

const localizeSelectionGuide = (
  guide: LocalizedProductSelectionGuide | undefined,
  locale: SupportedLocale
): ProductSelectionGuide | undefined => {
  if (!guide) {
    return undefined
  }

  return {
    abrasion: guide.abrasion,
    corrosion: guide.corrosion,
    temperature: guide.temperature,
    moisture: guide.moisture,
    note: guide.note ? resolveLocalizedValue(guide.note, locale) : undefined
  }
}

export const localizeProduct = (
  product: LocalizedProduct,
  locale: SupportedLocale
): Product => ({
  ...product,
  name: resolveLocalizedValue(product.name, locale),
  category: resolveLocalizedValue(product.category, locale),
  summary: resolveLocalizedValue(product.summary, locale),
  description: resolveLocalizedValue(product.description, locale),
  materials: resolveLocalizedValue(product.materials, locale),
  sizes: product.sizes ? resolveLocalizedValue(product.sizes, locale) : undefined,
  tensileStrength: product.tensileStrength
    ? resolveLocalizedValue(product.tensileStrength, locale)
    : undefined,
  hardness: product.hardness ? resolveLocalizedValue(product.hardness, locale) : undefined,
  standard: product.standard ? resolveLocalizedValue(product.standard, locale) : undefined,
  advantages: resolveLocalizedValue(product.advantages, locale),
  seoTitle: product.seoTitle ? resolveLocalizedValue(product.seoTitle, locale) : undefined,
  seoDescription: product.seoDescription
    ? resolveLocalizedValue(product.seoDescription, locale)
    : undefined,
  selectionGuide: localizeSelectionGuide(product.selectionGuide, locale)
})

export const localizeApplication = (
  application: LocalizedApplicationScene,
  locale: SupportedLocale
): ApplicationScene => ({
  ...application,
  name: resolveLocalizedValue(application.name, locale),
  summary: resolveLocalizedValue(application.summary, locale),
  description: resolveLocalizedValue(application.description, locale),
  useCases: resolveLocalizedValue(application.useCases, locale),
  considerations: resolveLocalizedValue(application.considerations, locale),
  seoTitle: application.seoTitle
    ? resolveLocalizedValue(application.seoTitle, locale)
    : undefined,
  seoDescription: application.seoDescription
    ? resolveLocalizedValue(application.seoDescription, locale)
    : undefined
})

export const localizeFaq = (faq: LocalizedFAQ, locale: SupportedLocale): FAQ => ({
  ...faq,
  category: resolveLocalizedValue(faq.category, locale),
  question: resolveLocalizedValue(faq.question, locale),
  answer: resolveLocalizedValue(faq.answer, locale)
})
