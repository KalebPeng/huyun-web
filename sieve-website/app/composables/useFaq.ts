import { computed } from 'vue'

import faqData from '~~/data/faq.json'
import type { FAQ } from '~~/types'

const faqs = faqData as FAQ[]

export const useFaq = () => {
  const allFaqs = computed(() => faqs)

  const getFaqById = (id: string) => faqs.find((faq) => faq.id === id)

  const getFaqsByCategory = (category: string) =>
    faqs.filter((faq) => faq.category === category)

  const getFaqsByIds = (ids: string[]) =>
    faqs.filter((faq) => ids.includes(faq.id))

  const getFaqsByProductId = (productId: string) =>
    faqs.filter((faq) => faq.relatedProductIds?.includes(productId))

  const getFaqsByApplicationId = (applicationId: string) =>
    faqs.filter((faq) => faq.relatedApplicationIds?.includes(applicationId))

  return {
    faqs: allFaqs,
    getFaqById,
    getFaqsByCategory,
    getFaqsByIds,
    getFaqsByProductId,
    getFaqsByApplicationId
  }
}
