<template>
  <div class="min-h-screen bg-[#f8f9fb]">
    <section class="bg-[linear-gradient(135deg,#111827,#1a2744)] py-16 text-white sm:py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">
          Technical Knowledge
        </p>
        <h1 class="mt-4 text-4xl font-black sm:text-5xl">
          技术知识库
        </h1>
        <p class="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          覆盖 ISO/ASTM 标准、材质选型逻辑、筛分工艺原理和工况分析，知识库现在直接由 Markdown 内容驱动，新增文章不用再碰代码。
        </p>

        <div class="mt-8 max-w-xl">
          <div class="relative">
            <input
              v-model.trim="searchKeyword"
              type="search"
              placeholder="搜索文章标题或关键词"
              class="min-h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-5 pr-12 text-base text-white placeholder:text-slate-400 backdrop-blur-sm outline-none transition focus:border-white/40"
            >
            <svg class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <div class="border-b border-slate-200 bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div class="inline-flex min-w-full gap-1 py-3 sm:min-w-0 sm:flex-wrap">
            <button
              v-for="tab in categoryTabs"
              :key="tab.value"
              type="button"
              class="shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200"
              :class="activeCategory === tab.value
                ? 'bg-primary text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-primary'"
              @click="activeCategory = tab.value"
            >
              {{ tab.label }}
              <span class="ml-1 text-xs opacity-60">{{ tabCount(tab.value) }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <section class="py-12 sm:py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p v-if="searchKeyword" class="mb-6 text-sm text-slate-500">
          搜索“{{ searchKeyword }}”，共找到 {{ filteredArticles.length }} 篇文章
        </p>

        <div v-if="filteredArticles.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="article in filteredArticles"
            :key="article.path"
            :to="article.path"
            class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
          >
            <div class="flex items-center justify-between">
              <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-accent">
                {{ article.category }}
              </span>
              <time class="text-xs text-slate-400" :datetime="article.publishedAt">
                {{ formatDate(article.publishedAt) }}
              </time>
            </div>

            <h2 class="mt-4 line-clamp-2 text-base font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-accent">
              {{ article.title }}
            </h2>

            <p class="mt-3 flex-1 line-clamp-3 text-sm leading-7 text-slate-500">
              {{ article.summary }}
            </p>

            <div class="mt-4 flex flex-wrap gap-1.5">
              <span
                v-for="tag in article.tags.slice(0, 3)"
                :key="tag"
                class="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-5 flex items-center gap-1 text-sm font-semibold text-accent">
              阅读全文
              <svg class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>
        </div>

        <div
          v-else
          class="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center"
        >
          <p class="text-lg font-bold text-slate-900">暂无匹配文章</p>
          <p class="mt-2 text-sm text-slate-500">换个关键词试试，或者直接浏览全部分类。</p>
        </div>
      </div>
    </section>

    <section class="pb-16 sm:pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl bg-[linear-gradient(135deg,#1a2744,#243f72)] px-8 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 class="text-2xl font-black sm:text-3xl">有具体选型问题？</h2>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                把工况、物料和设备参数告诉我们，技术工程师会给出针对性的筛网选型建议。
              </p>
            </div>
            <div class="flex shrink-0 flex-col gap-3 sm:flex-row">
              <AppButton to="/tools" size="lg" class="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20">
                技术计算工具
              </AppButton>
              <AppButton to="/contact" size="lg" class="!bg-white !text-primary hover:!bg-slate-100">
                联系我们
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppButton from '~/components/common/AppButton.vue'
import { useArticles } from '~/composables/useArticles'
import { usePageSeoMeta } from '~/composables/useSeoMeta'

const { getAllArticles } = useArticles()
const { data } = await useAsyncData('knowledge-articles', () => getAllArticles())

const articles = computed(() => data.value || [])
const searchKeyword = ref('')
const activeCategory = ref('全部')

const allCategories = computed(() => {
  const categories = new Set(articles.value.map(article => article.category))
  return ['全部', ...categories]
})

const categoryTabs = computed(() => allCategories.value.map(category => ({
  label: category,
  value: category
})))

const tabCount = (category: string) => {
  if (category === '全部') {
    return articles.value.length
  }

  return articles.value.filter(article => article.category === category).length
}

const filteredArticles = computed(() => {
  const keyword = searchKeyword.value.toLowerCase()
  const keywordMatches = keyword
    ? articles.value.filter(article =>
        `${article.title} ${article.summary} ${article.tags.join(' ')}`
          .toLowerCase()
          .includes(keyword)
      )
    : articles.value

  if (keyword) {
    return keywordMatches
  }

  if (activeCategory.value !== '全部') {
    return keywordMatches.filter(article => article.category === activeCategory.value)
  }

  return keywordMatches
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

usePageSeoMeta({
  title: '技术知识库',
  description: '华云网业技术文章：覆盖 ISO 9044、ASTM E11、材质选型、条缝筛原理和开孔率计算等工业筛网知识。'
})
</script>
