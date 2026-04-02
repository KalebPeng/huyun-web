<template>
  <div class="bg-slate-50">
    <section class="relative isolate overflow-hidden bg-[linear-gradient(135deg,#0f172a,#1e293b)] py-20 text-white sm:py-24">
      <div
        class="absolute inset-0 opacity-30"
        aria-hidden="true"
        style="background-image:
          linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px),
          radial-gradient(circle at top right, rgba(14,165,233,0.28), transparent 30%); background-size: 28px 28px, 28px 28px, auto;"
      />

      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">
            Content Standards
          </p>
          <h1 class="mt-4 text-4xl font-black sm:text-5xl">
            内容审核与编辑规范
          </h1>
          <p class="mt-5 text-base leading-8 text-slate-200 sm:text-lg">
            这页专门说明华云网业知识库内容由谁编写、由谁审核、依据哪些来源、何时更新，以及发现错误后怎么处理。别扯花活，先把可信度链条摆明白。
          </p>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="item in trustHighlights"
            :key="item.title"
            class="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
          >
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
              {{ item.title }}
            </p>
            <p class="mt-3 text-sm leading-7 text-slate-100">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="py-12 sm:py-16">
      <div class="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Roles
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            作者与审核角色
          </h2>
          <div class="mt-6 space-y-5 text-sm leading-7 text-slate-600">
            <div>
              <p class="font-bold text-slate-900">内容编写</p>
              <p class="mt-2">
                由站点内容编辑整理客户常见问题、产品规格表达和页面结构，负责把技术信息写成人能看懂的话。
              </p>
            </div>
            <div>
              <p class="font-bold text-slate-900">技术审核</p>
              <p class="mt-2">
                由“华云网业技术与质控联合审核”复核关键参数、材质描述、适用工况、计算逻辑与风险边界。
              </p>
            </div>
            <div>
              <p class="font-bold text-slate-900">发布责任</p>
              <p class="mt-2">
                只有在来源说明、审核信息和适用边界齐全后，相关文章才会正式发布到知识库页面。
              </p>
            </div>
          </div>
        </article>

        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Source Policy
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            来源使用原则
          </h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in sourcePolicy"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-slate-600"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Workflow
        </p>
        <h2 class="mt-2 text-3xl font-black text-slate-950">
          内容生产与复核流程
        </h2>

        <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="step in reviewWorkflow"
            :key="step.step"
            class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p class="text-sm font-black text-accent">0{{ step.step }}</p>
            <h3 class="mt-4 text-xl font-bold text-slate-900">
              {{ step.title }}
            </h3>
            <p class="mt-3 text-sm leading-7 text-slate-600">
              {{ step.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="pb-12 sm:pb-16">
      <div class="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Update Rules
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            更新与纠错机制
          </h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in updateRules"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-slate-600"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Boundary
          </p>
          <h2 class="mt-2 text-2xl font-black text-slate-950">
            适用边界说明
          </h2>
          <ul class="mt-6 space-y-4">
            <li
              v-for="item in boundaryNotes"
              :key="item"
              class="flex gap-3 text-sm leading-7 text-slate-600"
            >
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="pb-16 sm:pb-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-3xl bg-[linear-gradient(135deg,#1a2744,#243f72)] px-6 py-10 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] sm:px-10">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 class="text-2xl font-black sm:text-3xl">
                想核对某篇文章的依据和更新时间？
              </h2>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                文章页顶部已经展示来源、审核团队、最近复核时间和适用边界；如果你发现描述不清或参数可疑，直接通过联系页反馈，我们会人工复核。
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row">
              <NuxtLink
                to="/knowledge"
                class="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-slate-100"
              >
                查看知识库
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                反馈内容问题
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { usePageSeoMeta } from '~/composables/useSeoMeta'

interface TrustHighlight {
  title: string
  description: string
}

interface WorkflowStep {
  step: number
  title: string
  description: string
}

const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl.replace(/\/+$/, '')

const trustHighlights: TrustHighlight[] = [
  {
    title: '实名审核',
    description: '知识库文章会标注作者、审核团队和最近复核时间，不发匿名技术结论。'
  },
  {
    title: '来源可追溯',
    description: '涉及标准、材质、计算和工况判断的内容，会明确展示参考依据及用途说明。'
  },
  {
    title: '边界写清楚',
    description: '每篇文章都会说明适用场景和不适用场景，避免把经验判断硬写成绝对结论。'
  },
  {
    title: '纠错可触发',
    description: '发现参数、描述或结论有问题，可以直接反馈，内容会进入人工复核流程。'
  }
]

const sourcePolicy: string[] = [
  '优先引用国家标准、行业标准、测试规范、设备参数表和原材料规格书这类一手资料。',
  '涉及材质选择、寿命判断和工况建议时，会结合内部生产与质检经验，但不会把个别案例包装成通用结论。',
  '来源说明会同时写清“发布方”和“用途”，方便读者判断这条信息是用来定义术语、核对参数，还是限定边界。',
  'AI 工具可以辅助整理表达，但涉及规格、公式、材质建议和适用结论的内容，必须经过人工审核后才会发布。'
]

const reviewWorkflow: WorkflowStep[] = [
  {
    step: 1,
    title: '选题与初稿',
    description: '根据客户高频问题、产品规格解释和常见选型误区整理初稿，先明确文章要解决的具体问题。'
  },
  {
    step: 2,
    title: '来源核对',
    description: '对标准条款、产品参数、计算公式和工况描述逐项核对，补齐来源说明和使用目的。'
  },
  {
    step: 3,
    title: '技术复核',
    description: '由技术与质控联合审核关键参数、适用边界、误差范围和不适用条件，避免营销话术盖过技术事实。'
  },
  {
    step: 4,
    title: '发布与复审',
    description: '发布时同步写入最近复核时间；当标准版本、规格数据或工况结论变化时，会重新复审并更新页面。'
  }
]

const updateRules: string[] = [
  '文章页展示的“最后审核”时间，代表最近一次人工复核通过的日期。',
  '涉及标准版本、产品规格、计算逻辑或明显事实错误的内容，会优先更新，不拖着装死。',
  '如用户反馈存在歧义、缺失边界或示例不准确，相关内容会回到审核流程重新确认。',
  '若某条结论只适用于特定工况，会直接写进“适用边界”，而不是藏在脚注里糊弄人。'
]

const boundaryNotes: string[] = [
  '知识库内容用于帮助理解筛网规格、材质差异、常见工况与计算方法，不替代现场试筛、第三方检测或整机验证。',
  '涉及食品、医药、强腐蚀、高温高压或强制认证场景时，最终选型仍需依据实际介质、合规要求和项目图纸确认。',
  '寿命、处理量、开孔率和材质建议都受现场条件影响，页面中的经验值只能作为初步判断依据。'
]

const pageTitle = '内容审核与编辑规范'
const pageDescription = '说明华云网业知识库内容的作者角色、审核机制、来源使用原则、更新规则与纠错流程。'

usePageSeoMeta({
  title: pageTitle,
  description: pageDescription
})

useHead({
  script: [
    {
      key: 'content-standards-jsonld',
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'AboutPage',
            '@id': `${siteUrl}/content-standards#page`,
            name: pageTitle,
            description: pageDescription,
            url: `${siteUrl}/content-standards`,
            inLanguage: 'zh-CN',
            about: {
              '@id': `${siteUrl}#organization`
            },
            publisher: {
              '@id': `${siteUrl}#organization`
            }
          },
          {
            '@type': 'Organization',
            '@id': `${siteUrl}#organization`,
            name: '华云网业',
            url: siteUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/favicon.ico`
            },
            publishingPrinciples: `${siteUrl}/content-standards`
          }
        ]
      })
    }
  ]
})
</script>
