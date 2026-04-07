import { computed } from 'vue'

import faqData from '~~/data/faq.json'
import type { LocalizedFAQ } from '~~/types'
import { localizeFaq } from '~~/utils/catalog'
import { normalizeLocale } from '~~/utils/localized'

const faqs = faqData as LocalizedFAQ[]

export const useFaq = () => {
  const { locale } = useI18n()
  const currentLocale = computed(() => normalizeLocale(locale.value))
  const allFaqs = computed(() =>
    faqs.map((faq) => localizeFaq(faq, currentLocale.value))
  )

  const getFaqById = (id: string) => allFaqs.value.find((faq) => faq.id === id)

  const getFaqsByCategory = (category: string) =>
    allFaqs.value.filter((faq) => faq.category === category)

  const getFaqsByIds = (ids: string[]) =>
    allFaqs.value.filter((faq) => ids.includes(faq.id))

  const getFaqsByProductId = (productId: string) =>
    allFaqs.value.filter((faq) => faq.relatedProductIds?.includes(productId))

  const getFaqsByApplicationId = (applicationId: string) =>
    allFaqs.value.filter((faq) => faq.relatedApplicationIds?.includes(applicationId))

  return {
    faqs: allFaqs,
    getFaqById,
    getFaqsByCategory,
    getFaqsByIds,
    getFaqsByProductId,
    getFaqsByApplicationId
  }
}
