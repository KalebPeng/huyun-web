<template>
  <section class="hero-grid relative overflow-hidden bg-primary text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.28),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.12),transparent_24%)]" />
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

    <div
      class="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:min-h-[720px] lg:px-8"
    >
      <div class="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <div class="max-w-3xl">
          <p
            class="fade-in-up delay-1 mb-4 inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-200"
          >
            Industrial Mesh Solutions
          </p>
          <h1
            class="fade-in-up delay-2 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            专业筛网生产厂家
          </h1>
          <p
            class="fade-in-up delay-3 mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg"
          >
            支持多规格与定制化解决方案，服务矿山、粮食、工业、养殖等行业，覆盖筛分、过滤、防护与设备配套需求。
          </p>

          <div class="fade-in-up delay-4 mt-8 flex flex-col gap-4 sm:flex-row">
            <AppButton
              to="/contact"
              size="lg"
              aria-label="跳转到立即询价页面"
              class="w-full sm:w-auto"
            >
              立即询价
            </AppButton>
            <AppButton
              to="/products"
              variant="outline"
              size="lg"
              aria-label="跳转到产品中心页面"
              class="w-full sm:w-auto"
            >
              查看产品
            </AppButton>
          </div>
        </div>

        <div class="fade-in-up delay-5">
          <div
            class="relative overflow-hidden rounded-3xl border border-white/12 bg-slate-900/60 p-4 shadow-[0_30px_80px_rgba(2,8,23,0.45)] backdrop-blur"
          >
            <div
              class="relative min-h-[320px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(145deg,rgba(37,99,235,0.24),rgba(15,23,42,0.9)_48%,rgba(51,65,85,0.88))] sm:min-h-[420px]"
            >
              <NuxtImg
                src="/images/placeholders/hero-factory.svg"
                alt="工厂实景占位图"
                preset="hero"
                width="960"
                height="720"
                loading="eager"
                fetchpriority="high"
                placeholder
                class="absolute inset-0 h-full w-full object-cover opacity-85"
              />
              <div
                class="absolute -right-10 top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                class="absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-slate-200/10 blur-3xl"
                aria-hidden="true"
              />
              <div
                class="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.12)_50%,transparent_100%)] opacity-40"
                aria-hidden="true"
              />

              <div class="relative flex h-full min-h-[320px] flex-col justify-between p-8 sm:min-h-[420px]">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-xs uppercase tracking-[0.32em] text-slate-300">
                      Factory Visual Placeholder
                    </p>
                    <h2 class="mt-3 text-2xl font-bold text-white sm:text-3xl">
                      此处放工厂实景图
                    </h2>
                  </div>
                  <span
                    class="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-200"
                  >
                    PRODUCTION
                  </span>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="rounded-2xl border border-white/12 bg-white/6 p-4">
                    <p class="text-xs uppercase tracking-[0.24em] text-slate-300">
                      Core Capability
                    </p>
                    <p class="mt-2 text-lg font-semibold text-white">
                      筛分、过滤、防护产品一体化配套
                    </p>
                  </div>
                  <div class="rounded-2xl border border-white/12 bg-white/6 p-4">
                    <p class="text-xs uppercase tracking-[0.24em] text-slate-300">
                      Delivery Focus
                    </p>
                    <p class="mt-2 text-lg font-semibold text-white">
                      快速打样、定制加工、稳定交付
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fade-in-up delay-6 mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-2xl border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-sm"
        >
          <p class="text-3xl font-black text-white sm:text-4xl">{{ stat.value }}</p>
          <p class="mt-2 text-sm font-medium tracking-[0.12em] text-slate-300">
            {{ stat.label }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppButton from '~/components/common/AppButton.vue'

interface TrustStat {
  value: string
  label: string
}

const stats: TrustStat[] = [
  { value: '20年+', label: '生产经验' },
  { value: '500+', label: '合作客户' },
  { value: '200+', label: '产品规格' },
  { value: '48h', label: '快速响应' }
]
</script>

<style scoped>
.hero-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(180deg, rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.55));
  background-position: center;
  background-size: 32px 32px, 32px 32px, 100% 100%;
}

.fade-in-up {
  animation: fade-in-up 0.8s ease forwards;
  opacity: 0;
  transform: translateY(24px);
}

.delay-1 {
  animation-delay: 0.1s;
}

.delay-2 {
  animation-delay: 0.2s;
}

.delay-3 {
  animation-delay: 0.3s;
}

.delay-4 {
  animation-delay: 0.4s;
}

.delay-5 {
  animation-delay: 0.5s;
}

.delay-6 {
  animation-delay: 0.6s;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
