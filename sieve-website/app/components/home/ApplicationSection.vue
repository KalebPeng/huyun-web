<template>
  <section class="bg-white py-16 sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Application Scenarios
        </p>
        <h2 class="mt-3 text-3xl font-black text-primary sm:text-4xl">
          应用场景
        </h2>
        <p class="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
          面向粮食、矿山、工业过滤、养殖防护、建筑防护和机械配套等行业，提供匹配工况的筛网与配套方案。
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="application in displayedApplications"
          :key="application.slug"
          class="group rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
        >
          <div class="flex items-start gap-4 border-l-4 border-transparent pl-4 transition-colors duration-200 group-hover:border-primary">
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl"
              :aria-label="`${application.name} 图标`"
            >
              {{ application.icon }}
            </span>
            <div class="min-w-0">
              <h3 class="text-xl font-bold text-slate-900">
                {{ application.name }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                {{ application.summary }}
              </p>
              <NuxtLink
                :to="`/applications/${application.slug}`"
                class="mt-5 inline-flex items-center text-sm font-semibold text-primary transition-colors duration-200 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                :aria-label="`了解${application.name}详情`"
              >
                了解详情
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { ApplicationScene } from '~~/types'

interface ApplicationCardItem
  extends Pick<ApplicationScene, 'id' | 'slug' | 'name' | 'summary'> {
  icon: string
}

const { applications } = useApplications()

const iconMap: Record<string, string> = {
  'grain-screening': '🌾',
  'industrial-filtration': '🧪',
  'mining-screening': '⛏️',
  'breeding-protection': '🐓',
  'construction-protection': '🏗️',
  'machinery-support': '⚙️'
}

const staticApplications: ApplicationCardItem[] = [
  {
    id: 'app-breeding-protection',
    slug: 'breeding-protection',
    name: '养殖防护',
    summary: '适用于鸡舍、养殖围栏、隔离防护和通风护网等配套场景。',
    icon: '🐓'
  },
  {
    id: 'app-construction-protection',
    slug: 'construction-protection',
    name: '建筑防护',
    summary: '适用于脚手架围护、门窗防护、洞口隔离和施工区域安全防护。',
    icon: '🏗️'
  },
  {
    id: 'app-machinery-support',
    slug: 'machinery-support',
    name: '机械配套',
    summary: '适用于设备护罩、输送筛板、过滤组件和各类异形网件配套。',
    icon: '⚙️'
  }
]

const displayedApplications = computed<ApplicationCardItem[]>(() => {
  const fromData = applications.value.map((application) => ({
    id: application.id,
    slug: application.slug,
    name: application.name,
    summary: application.summary,
    icon: iconMap[application.slug] ?? '🏭'
  }))

  const existingSlugs = new Set(fromData.map((item) => item.slug))
  const supplements = staticApplications.filter((item) => !existingSlugs.has(item.slug))

  return [...fromData, ...supplements].slice(0, 6)
})
</script>

<style scoped>
</style>
