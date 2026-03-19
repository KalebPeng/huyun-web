<template>
  <div class="bg-slate-50">
    <section class="relative isolate overflow-hidden bg-[linear-gradient(135deg,#0f172a,#1a2744)] py-20 text-white sm:py-24">
      <div
        class="absolute inset-0 opacity-30"
        aria-hidden="true"
        style="background-image:
          linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px),
          radial-gradient(circle at top right, rgba(37,99,235,0.32), transparent 32%); background-size: 28px 28px, 28px 28px, auto;"
      />
      <div class="absolute inset-y-0 right-0 hidden w-[44%] md:block" aria-hidden="true">
        <div class="h-full bg-[linear-gradient(135deg,rgba(148,163,184,0.12),rgba(37,99,235,0.28))]" />
        <div class="absolute bottom-8 left-8 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-white/90 backdrop-blur-sm">
          工厂全景图占位
        </div>
      </div>

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
            About Us
          </p>
          <h1 class="mt-4 text-4xl font-black sm:text-5xl">
            关于我们
          </h1>
          <p class="mt-5 text-base leading-8 text-slate-200 sm:text-lg">
            专注筛网制造与定制化解决方案，服务矿山、粮食、工业过滤、养殖防护等多类行业场景。
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Company Profile
          </p>
          <h2 class="mt-3 text-3xl font-black text-slate-950">
            企业简介
          </h2>

          <div class="mt-6 space-y-5 text-base leading-8 text-slate-600">
            <p v-for="paragraph in companyParagraphs" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <article
            v-for="stat in companyStats"
            :key="stat.label"
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p class="text-3xl font-black text-primary sm:text-4xl">
              {{ stat.value }}
            </p>
            <p class="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              {{ stat.label }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Product Focus
            </p>
            <h2 class="mt-2 text-3xl font-black text-slate-950">
              核心产品方向
            </h2>
          </div>
          <p class="max-w-2xl text-sm leading-7 text-slate-500">
            围绕不同工况和行业需求，覆盖常规规格到定制加工的多类筛网产品。
          </p>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <article
            v-for="item in productDirections"
            :key="item.name"
            class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
              {{ item.icon }}
            </div>
            <h3 class="mt-4 text-lg font-bold text-slate-900">
              {{ item.name }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-slate-600">
              {{ item.summary }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Factory & Equipment
        </p>
        <h2 class="mt-2 text-3xl font-black text-slate-950">
          工厂与设备展示
        </h2>

        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="item in factoryGallery"
            :key="item.label"
            class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div
              class="flex aspect-[4/3] items-end bg-[linear-gradient(135deg,var(--from),var(--to))] p-5"
              :style="{ '--from': item.from, '--to': item.to }"
            >
              <span class="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-white backdrop-blur-sm">
                {{ item.label }}
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Custom Capability
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            定制能力
          </h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in customCapabilities"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-slate-600"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Delivery Capability
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            交付能力
          </h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in deliveryCapabilities"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-slate-600"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Quality Promise
        </p>
        <h2 class="mt-2 text-3xl font-black text-slate-950">
          品质承诺
        </h2>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="item in qualityPromises"
            :key="item.title"
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-xl text-white">
              {{ item.icon }}
            </div>
            <h3 class="mt-5 text-xl font-bold text-slate-900">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-slate-600">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-16 sm:pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl bg-[linear-gradient(135deg,#1a2744,#243f72)] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:px-10">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 class="text-2xl font-black sm:text-3xl">
                需要进一步了解我们的工厂能力？
              </h2>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                把您的使用场景、采购规模和定制要求发过来，我们会尽快安排业务与技术支持对接。
              </p>
            </div>

            <AppButton
              to="/contact"
              size="lg"
              aria-label="前往联系我们页面"
              class="!bg-white !text-primary hover:!bg-slate-100 focus-visible:!outline-white"
            >
              联系我们
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import AppButton from '~/components/common/AppButton.vue'

interface CompanyStat {
  label: string
  value: string
}

interface ProductDirection {
  icon: string
  name: string
  summary: string
}

interface GalleryItem {
  label: string
  from: string
  to: string
}

interface QualityPromise {
  icon: string
  title: string
  description: string
}

const companyParagraphs: string[] = [
  '筛网厂成立于 2004 年，总部与生产基地位于河北安平，长期专注于金属筛网、过滤网片、矿筛网和定制异形件的研发与生产。',
  '公司配备多条编织、排焊、冲片、包边与整形产线，覆盖常规批量生产和非标定制加工，能够兼顾交付效率与规格稳定性。',
  '服务客户涵盖矿山筛分、粮食清理、工业过滤、养殖防护、建筑配套及设备制造等行业，既做标准件，也承接来图来样项目。',
  '我们坚持把选型、制造、质检和交付做扎实，少整虚的，靠稳定品质、清晰沟通和长期合作把客户留下来。'
]

const companyStats: CompanyStat[] = [
  { label: '行业经验', value: '20年+' },
  { label: '服务客户', value: '500+' },
  { label: '产品规格', value: '200+' },
  { label: '生产基地', value: '15000㎡' }
]

const productDirections: ProductDirection[] = [
  { icon: '🧵', name: '不锈钢编织网', summary: '适用于过滤、筛分、防护等精细工况。' },
  { icon: '🧱', name: '电焊网', summary: '适合围护、隔离和建筑配套等常规需求。' },
  { icon: '⚙️', name: '轧花网', summary: '承载能力强，常用于中粗颗粒筛分。' },
  { icon: '⛏️', name: '矿筛网', summary: '面向重载、耐磨、高冲击矿山场景。' },
  { icon: '🫧', name: '过滤网片', summary: '支持冲片、包边和多层复合加工。' },
  { icon: '🧩', name: '定制异形件', summary: '按设备图纸加工特殊结构筛网部件。' }
]

const factoryGallery: GalleryItem[] = [
  { label: '数控织网机', from: '#314867', to: '#152235' },
  { label: '自动化生产线', from: '#2563eb', to: '#1a2744' },
  { label: '质检工位', from: '#0f766e', to: '#1a2744' },
  { label: '打包发货区', from: '#475569', to: '#111827' }
]

const customCapabilities: string[] = [
  '支持来图来样生产，可按孔径、丝径、尺寸和边框结构做针对性加工。',
  '常规规格可快速匹配库存与标准生产参数，减少重复沟通成本。',
  '针对耐腐蚀、耐磨、高温等特殊工况，可协助选择不锈钢、高锰钢及复合材质。'
]

const deliveryCapabilities: string[] = [
  '常规规格支持库存发货，紧急项目优先协调排产与出货节奏。',
  '定制产品根据加工复杂度安排周期，明确交期节点，避免嘴上乱承诺。',
  '支持零担、整车及国际物流发运，配合木箱、托盘和防护包装要求。'
]

const qualityPromises: QualityPromise[] = [
  {
    icon: '✓',
    title: '品质管控',
    description: '从原料入厂到成品抽检，围绕材质、孔径、尺寸和平整度建立多环节质控流程。'
  },
  {
    icon: '⏱',
    title: '交期保证',
    description: '明确生产排期与节点反馈，常规单和定制单分别管理，尽量把交付节奏控在预期内。'
  },
  {
    icon: '☎',
    title: '售后服务',
    description: '提供选型沟通、样品确认、使用建议和售后跟进，发现问题及时协同处理，不打太极。'
  }
]

useHead({
  title: '关于我们 - 筛网厂',
  meta: [
    {
      name: 'description',
      content:
        '了解筛网厂的发展历程、生产能力、核心产品方向、工厂设备与品质承诺，查看企业实力与服务能力。'
    }
  ]
})
</script>

<style scoped>
</style>
