<template>
  <footer class="bg-dark text-white">
    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
        <section aria-labelledby="footer-company">
          <h2 id="footer-company" class="text-lg font-semibold tracking-[0.16em] text-white">
            华云网业
          </h2>
          <p class="mt-4 text-sm leading-7 text-slate-300">
            专注矿用、工业级高效筛分方案，提供聚氨酯筛网、编织筛网与焊接条缝筛的定制化交付。
          </p>
        </section>

        <nav aria-labelledby="footer-products">
          <h2 id="footer-products" class="text-sm font-semibold tracking-[0.2em] text-slate-200">
            产品分类
          </h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-300">
            <li v-for="item in productLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-applications">
          <h2
            id="footer-applications"
            class="text-sm font-semibold tracking-[0.2em] text-slate-200"
          >
            技术服务
          </h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-300">
            <li v-for="item in applicationLinks" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" class="text-sm font-semibold tracking-[0.2em] text-slate-200">
            联系方式
          </h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-300">
            <li><span class="font-medium text-white">电话：</span>+86 13561559016</li>
            <li><span class="font-medium text-white">微信：</span>HUAYUN-MESH</li>
            <li>
              <span class="font-medium text-white">邮箱：</span>
              <a
                href="mailto:sales@huayun-mesh.com"
                class="transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                sales@huayun-mesh.com
              </a>
            </li>
            <li><span class="font-medium text-white">地址：</span>山东省滨州市华云网业</li>
          </ul>
        </section>
      </div>

      <div
        class="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-400 sm:text-left"
      >
        2026 华云网业 版权所有
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterLink {
  label: string
  to: string
}

const productLinks: FooterLink[] = [
  { label: '矿用焊接筛网', to: '/products/mining-welded-screen' },
  { label: '65锰编织筛网', to: '/products/65mn-woven-screen' },
  { label: '聚氨酯筛网', to: '/products/polyurethane-screen' },
  { label: '重型轧花网', to: '/products/crimped-wire-mesh' }
]

const applicationLinks: FooterLink[] = [
  { label: '矿山骨料分级', to: '/applications/mining-grading' },
  { label: '选煤洗选脱水', to: '/applications/coal-dewatering' },
  { label: '技术知识库', to: '/knowledge' },
  { label: '立即询价', to: '/contact' }
]
</script>

<style scoped>
</style>