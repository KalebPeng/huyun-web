<template>
  <div class="bg-slate-50">
    <template v-if="product">
      <section class="border-b border-slate-200 bg-white">
        <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <nav aria-label="面包屑导航" class="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <NuxtLink to="/" class="transition-colors hover:text-primary">
              首页
            </NuxtLink>
            <span aria-hidden="true">/</span>
            <NuxtLink to="/products" class="transition-colors hover:text-primary">
              产品中心
            </NuxtLink>
            <span aria-hidden="true">/</span>
            <span class="font-medium text-slate-900">{{ product.name }}</span>
          </nav>
        </div>
      </section>

      <section class="py-12 sm:py-16">
        <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-8">
          <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div class="relative aspect-[4/3] bg-slate-100">
              <NuxtImg
                v-if="!imageFailed"
                :src="product.coverImage"
                width="1200"
                height="900"
                :alt="`${product.name} 产品主图`"
                class="h-full w-full object-cover"
                loading="eager"
                placeholder
                sizes="100vw lg:50vw"
                @error="imageFailed = true"
              />
              <div
                v-else
                class="flex h-full w-full items-end justify-start bg-[linear-gradient(135deg,#dbe4f0,#f4f4f0)] p-6"
                :aria-label="`${product.name} 图片占位`"
              >
                <span class="rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-600">
                  产品主图占位
                </span>
              </div>
            </div>
          </div>

          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Product Overview
            </p>
            <h1 class="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              {{ product.name }}
            </h1>

            <div class="mt-5 flex flex-wrap gap-2">
              <Badge
                v-for="material in product.materials.slice(0, 3)"
                :key="material"
                :label="material"
                variant="default"
              />
              <Badge
                v-if="product.customSupported"
                label="支持定制"
                variant="success"
              />
            </div>

            <p class="mt-5 text-base leading-8 text-slate-600">
              {{ product.summary }}
            </p>

            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <article
                v-for="item in quickSpecs"
                :key="item.label"
                class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {{ item.label }}
                </p>
                <p class="mt-3 text-lg font-bold text-slate-900">
                  {{ item.value }}
                </p>
              </article>
            </div>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <AppButton
                :to="`/contact?product=${product.slug}`"
                size="lg"
                :aria-label="`询价 ${product.name}`"
              >
                立即询价
              </AppButton>

              <a
                href="tel:4001234567"
                class="inline-flex min-h-12 items-center justify-center rounded-md border border-primary bg-white px-6 text-base font-semibold text-primary transition-colors duration-200 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                :aria-label="`联系客服咨询 ${product.name}`"
              >
                联系客服
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-12 sm:pb-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  Specifications
                </p>
                <h2 class="mt-2 text-2xl font-black text-slate-950">
                  产品参数
                </h2>
              </div>
              <p class="text-sm text-slate-500">
                空值字段统一显示为 /
              </p>
            </div>

            <div class="mt-6 overflow-hidden rounded-2xl border border-slate-200">
              <table class="min-w-full divide-y divide-slate-200 text-sm">
                <tbody class="divide-y divide-slate-200">
                  <tr
                    v-for="row in specificationRows"
                    :key="row.label"
                    class="bg-white even:bg-slate-50"
                  >
                    <th scope="row" class="w-36 px-4 py-4 text-left font-semibold text-slate-900 sm:w-48 sm:px-6">
                      {{ row.label }}
                    </th>
                    <td class="px-4 py-4 leading-7 text-slate-600 sm:px-6">
                      {{ row.value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-12 sm:pb-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Applications
            </p>
            <h2 class="mt-2 text-2xl font-black text-slate-950">
              应用场景
            </h2>
            <div class="mt-6 flex flex-wrap gap-3">
              <Badge
                v-for="application in applicationBadges"
                :key="application.id"
                :label="application.name"
                variant="primary"
              />
            </div>
            <p class="mt-5 max-w-4xl text-base leading-8 text-slate-600">
              {{ applicationSummary }}
            </p>
          </div>
        </div>
      </section>

      <section class="pb-12 sm:pb-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl bg-[linear-gradient(135deg,#111827,#1a2744)] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Advantages
            </p>
            <h2 class="mt-2 text-2xl font-black">
              产品优势
            </h2>

            <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <article
                v-for="(advantage, index) in product.advantages"
                :key="advantage"
                class="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-blue-100">
                  {{ advantageIcons[index % advantageIcons.length] }}
                </div>
                <p class="mt-4 text-base font-semibold text-white">
                  {{ advantage }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-12 sm:pb-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              FAQ
            </p>
            <h2 class="mt-2 text-2xl font-black text-slate-950">
              常见问题
            </h2>

            <div v-if="relatedFaqs.length" class="mt-6 space-y-4">
              <article
                v-for="faq in relatedFaqs"
                :key="faq.id"
                class="overflow-hidden rounded-2xl border border-slate-200"
              >
                <button
                  type="button"
                  class="flex w-full items-center justify-between gap-4 bg-white px-5 py-4 text-left transition-colors duration-200 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  :aria-expanded="openFaqId === faq.id"
                  :aria-controls="`faq-panel-${faq.id}`"
                  @click="toggleFaq(faq.id)"
                >
                  <span class="text-base font-semibold text-slate-900">{{ faq.question }}</span>
                  <span class="text-xl font-light text-slate-500" aria-hidden="true">
                    {{ openFaqId === faq.id ? '−' : '+' }}
                  </span>
                </button>
                <div
                  v-show="openFaqId === faq.id"
                  :id="`faq-panel-${faq.id}`"
                  class="border-t border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600"
                >
                  {{ faq.answer }}
                </div>
              </article>
            </div>

            <div
              v-else
              class="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500"
            >
              暂无相关 FAQ，可直接联系我们获取详细说明。
            </div>
          </div>
        </div>
      </section>

      <section class="pb-16 sm:pb-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Related Products
              </p>
              <h2 class="mt-2 text-2xl font-black text-slate-950">
                关联产品推荐
              </h2>
            </div>
            <NuxtLink to="/products" class="text-sm font-semibold text-primary transition-colors hover:text-blue-600">
              查看更多产品
            </NuxtLink>
          </div>

          <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article
              v-for="related in relatedProducts"
              :key="related.id"
              class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
            >
              <NuxtLink
                :to="`/products/${related.slug}`"
                class="flex h-full flex-col"
                :aria-label="`查看 ${related.name} 详情`"
              >
                <div class="aspect-[4/3] bg-[linear-gradient(135deg,#dbe4f0,#f4f4f0)]">
                  <NuxtImg
                    :src="related.coverImage"
                    width="640"
                    height="480"
                    :alt="`${related.name} 关联产品图片`"
                    class="h-full w-full object-cover"
                    loading="lazy"
                    sizes="100vw md:50vw xl:25vw"
                    placeholder
                  />
                </div>
                <div class="flex flex-1 flex-col p-5">
                  <h3 class="text-lg font-bold text-slate-900 transition-colors group-hover:text-primary">
                    {{ related.name }}
                  </h3>
                  <p class="summary-clamp mt-3 text-sm leading-7 text-slate-600">
                    {{ related.summary }}
                  </p>
                  <span class="mt-5 text-sm font-semibold text-primary">
                    查看详情
                  </span>
                </div>
              </NuxtLink>
            </article>
          </div>
        </div>
      </section>
    </template>

    <section v-else class="py-24">
      <div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Product Not Found
        </p>
        <h1 class="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
          产品未找到
        </h1>
        <p class="mt-5 text-base leading-8 text-slate-600">
          当前链接对应的产品不存在、已下线，或参数地址有误。您可以返回产品中心继续查看。
        </p>
        <div class="mt-8 flex justify-center">
          <AppButton to="/products" size="lg" aria-label="返回产品中心">
            返回产品中心
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { usePageSeoMeta } from '~/composables/useSeoMeta'
import AppButton from '~/components/common/AppButton.vue'
import Badge from '~/components/common/Badge.vue'
import type { FAQ, Product } from '~~/types'

interface SpecificationRow {
  label: string
  value: string
}

interface QuickSpec {
  label: string
  value: string
}

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { getProductBySlug, getProductsByIds, products } = useProducts()
const { getApplicationsByIds } = useApplications()
const { getFaqsByIds, getFaqsByProductId } = useFaq()

const openFaqId = ref<string | null>(null)
const imageFailed = ref(false)
const advantageIcons = ['01', '02', '03', '04', '05', '06']

const toAbsoluteUrl = (value: string) => {
  const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')
  return value.startsWith('http') ? value : `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`
}

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

const product = computed<Product | undefined>(() => {
  return slug.value ? getProductBySlug(slug.value) : undefined
})

if (!product.value) {
  setResponseStatus(404, 'Product Not Found')
}

const resolveDisplayValue = (value?: string | null) => {
  if (!value) {
    return '/'
  }

  const normalized = value.trim()
  return normalized.length ? normalized : '/'
}

const resolveWidth = (item?: Product) => {
  if (!item?.sizes?.length) {
    return '/'
  }

  const matchedSize = item.sizes.find((size) => /m\s*x\s*\d/i.test(size))
  return resolveDisplayValue(matchedSize ?? item.sizes[0])
}

const resolveWeaveMethod = (item?: Product) => {
  if (!item) {
    return '/'
  }

  const map: Record<string, string> = {
    'stainless-woven-mesh': '平纹 / 斜纹',
    'welded-wire-mesh': '自动排焊',
    'crimped-wire-mesh': '先轧后编',
    'mine-screen-mesh': '重型轧花 / 张紧结构',
    'filter-disc': '多层复合 / 包边冲片'
  }

  return map[item.slug] ?? '/'
}

const quickSpecs = computed<QuickSpec[]>(() => {
  if (!product.value) {
    return []
  }

  return [
    { label: '目数范围', value: resolveDisplayValue(product.value.meshRange) },
    { label: '孔径范围', value: resolveDisplayValue(product.value.apertureRange) },
    { label: '主要材质', value: resolveDisplayValue(product.value.materials.slice(0, 2).join(' / ')) }
  ]
})

const specificationRows = computed<SpecificationRow[]>(() => {
  if (!product.value) {
    return []
  }

  return [
    { label: '材质', value: resolveDisplayValue(product.value.materials.join(' / ')) },
    { label: '丝径范围', value: resolveDisplayValue(product.value.wireDiameterRange) },
    { label: '目数范围', value: resolveDisplayValue(product.value.meshRange) },
    { label: '孔径范围', value: resolveDisplayValue(product.value.apertureRange) },
    { label: '宽幅', value: resolveWidth(product.value) },
    { label: '编织方式', value: resolveWeaveMethod(product.value) },
    { label: '是否支持定制', value: product.value.customSupported ? '支持' : '不支持' }
  ]
})

const applicationBadges = computed(() => {
  if (!product.value) {
    return []
  }

  return getApplicationsByIds(product.value.applications)
})

const applicationSummary = computed(() => {
  if (!product.value) {
    return '当前产品信息不可用。'
  }

  if (!applicationBadges.value.length) {
    return product.value.description
  }

  const names = applicationBadges.value.map((item) => item.name).join('、')
  return `该产品常用于${names}等场景，${product.value.description}`
})

const relatedFaqs = computed<FAQ[]>(() => {
  if (!product.value) {
    return []
  }

  const selectedFaqs = product.value.faqs?.length
    ? getFaqsByIds(product.value.faqs)
    : getFaqsByProductId(product.value.id)

  return selectedFaqs.slice(0, 5)
})

const relatedProducts = computed<Product[]>(() => {
  if (!product.value) {
    return []
  }

  const preferred = product.value.relatedProducts?.length
    ? getProductsByIds(product.value.relatedProducts)
    : []

  if (preferred.length >= 3) {
    return preferred.slice(0, 4)
  }

  const fallback = products.value.filter(
    (item) =>
      item.id !== product.value?.id &&
      !preferred.some((related) => related.id === item.id)
  )

  return [...preferred, ...fallback].slice(0, 4)
})

const productJsonLd = computed(() => {
  if (!product.value) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.value.name,
    description: product.value.seoDescription || product.value.description,
    image: product.value.coverImage ? [toAbsoluteUrl(product.value.coverImage)] : undefined,
    url: `${runtimeConfig.public.siteUrl}/products/${product.value.slug}`,
    category: product.value.category,
    material: product.value.materials.join(' / '),
    brand: {
      '@type': 'Brand',
      name: '筛网厂'
    },
    additionalProperty: specificationRows.value
      .filter((row) => row.value !== '/')
      .map((row) => ({
        '@type': 'PropertyValue',
        name: row.label,
        value: row.value
      }))
  }
})

const toggleFaq = (faqId: string) => {
  openFaqId.value = openFaqId.value === faqId ? null : faqId
}

watch(
  () => product.value?.coverImage,
  () => {
    imageFailed.value = false
  },
  { immediate: true }
)

watch(
  relatedFaqs,
  (faqs) => {
    openFaqId.value = faqs[0]?.id ?? null
  },
  { immediate: true }
)

usePageSeoMeta({
  title: product.value ? `${product.value.name} - 规格参数与应用场景` : '产品未找到',
  description:
    product.value?.seoDescription ||
    '当前产品不存在或已下线，可返回产品中心查看更多筛网产品。',
  image: product.value?.coverImage
})

useHead(() => ({
  script: productJsonLd.value
    ? [
        {
          key: 'product-jsonld',
          type: 'application/ld+json',
          textContent: JSON.stringify(productJsonLd.value)
        }
      ]
    : []
}))
</script>

<style scoped>
.summary-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
