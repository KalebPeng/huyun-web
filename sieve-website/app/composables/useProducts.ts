import { computed } from 'vue'

import productsData from '~~/data/products.json'
import type { LocalizedProduct } from '~~/types'
import { localizeProduct } from '~~/utils/catalog'
import { normalizeLocale } from '~~/utils/localized'

const products = productsData as LocalizedProduct[]

export const useProducts = () => {
  const { locale } = useI18n()
  const currentLocale = computed(() => normalizeLocale(locale.value))
  const allProducts = computed(() =>
    products.map((product) => localizeProduct(product, currentLocale.value))
  )
  const fetchProducts = async () => allProducts.value

  const getProductById = (id: string) =>
    allProducts.value.find((product) => product.id === id)

  const getProductBySlug = (slug: string) =>
    allProducts.value.find((product) => product.slug === slug)

  const getProductsByCategory = (category: string) =>
    allProducts.value.filter((product) => product.category === category)

  const getProductsByIds = (ids: string[]) =>
    allProducts.value.filter((product) => ids.includes(product.id))

  const getRelatedProducts = (productId: string) => {
    const product = getProductById(productId)

    if (!product?.relatedProducts?.length) {
      return []
    }

    return getProductsByIds(product.relatedProducts)
  }

  return {
    products: allProducts,
    fetchProducts,
    getProductById,
    getProductBySlug,
    getProductsByCategory,
    getProductsByIds,
    getRelatedProducts
  }
}
