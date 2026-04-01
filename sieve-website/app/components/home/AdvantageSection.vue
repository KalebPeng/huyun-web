<template>
  <section class="bg-primary py-16 text-white sm:py-20">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
          Why Choose Us
        </p>
        <h2 class="mt-3 text-3xl font-black sm:text-4xl">
          为什么选择我们
        </h2>
        <p class="mt-4 text-base leading-8 text-slate-200 sm:text-lg">
          从产品规格、定制能力、工厂直供到交付保障，围绕矿山与工业筛网采购场景把可靠性和响应速度做扎实。
        </p>
      </div>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="advantage in advantages"
          :key="advantage.title"
          class="rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm"
        >
          <div class="flex items-start gap-4">
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-2xl"
              :aria-label="`${advantage.title} 图标`"
            >
              {{ advantage.icon }}
            </span>
            <div>
              <h3 class="text-xl font-bold text-white">
                {{ advantage.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-slate-200">
                {{ advantage.description }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface AdvantageItem {
  icon: string
  title: string
  description: string
}

const advantages: AdvantageItem[] = [
  {
    icon: '📏',
    title: '规格多样',
    description: '目数 1-400 目，孔径 0.1mm 起，覆盖矿山筛分、洗煤、脱水等重载工况。'
  },
  {
    icon: '🛠️',
    title: '支持定制',
    description: '来图来样即可评估，支持尺寸、材质、结构和边框方式的定制加工。'
  },
  {
    icon: '🏭',
    title: '工厂直供',
    description: '自有生产与加工能力，无中间商层层加价，报价逻辑更直接透明。'
  },
  {
    icon: '⏱️',
    title: '快速响应',
    description: '48小时内报价，7天内发货，紧急项目优先评估排产与打样。'
  },
  {
    icon: '✅',
    title: '品控稳定',
    description: '严格质检控制丝径、孔径和结构一致性，减少批次间波动带来的风险。'
  },
  {
    icon: '🚚',
    title: '交付可靠',
    description: '支持零担、整车和国际物流，适配不同体量订单与跨区域交付需求。'
  }
]
</script>

<style scoped>
</style>
