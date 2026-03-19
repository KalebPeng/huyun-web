import { computed } from 'vue'

import productsData from '~~/data/products.json'
import type { Product } from '~~/types'

const products = productsData as Product[]

export const useProducts = () => {
  const allProducts = computed(() => products)

  const getProductById = (id: string) =>
    products.find((product) => product.id === id)

  const getProductBySlug = (slug: string) =>
    products.find((product) => product.slug === slug)

  const getProductsByCategory = (category: string) =>
    products.filter((product) => product.category === category)

  const getProductsByIds = (ids: string[]) =>
    products.filter((product) => ids.includes(product.id))

  const getRelatedProducts = (productId: string) => {
    const product = getProductById(productId)

    if (!product?.relatedProducts?.length) {
      return []
    }

    return getProductsByIds(product.relatedProducts)
  }

  return {
    products: allProducts,
    getProductById,
    getProductBySlug,
    getProductsByCategory,
    getProductsByIds,
    getRelatedProducts
  }
}
