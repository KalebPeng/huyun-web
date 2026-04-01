<template>
  <section class="bg-[linear-gradient(135deg,#1a2744,#243f72)] py-16 text-white sm:py-20">
    <div class="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
        Get A Quote
      </p>
      <h2 class="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
        准备好开始了吗？
      </h2>
      <p class="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
        告诉我们您的需求，48小时内给您专业报价，支持常规规格快速响应与非标产品定制评估。
      </p>

      <div class="mt-10 grid gap-4 md:grid-cols-3">
        <article
          v-for="contact in contacts"
          :key="contact.label"
          class="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-sm"
        >
          <p class="text-3xl">{{ contact.icon }}</p>
          <p class="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
            {{ contact.label }}
          </p>
          <p class="mt-2 text-lg font-bold text-white">
            {{ contact.value }}
          </p>
        </article>
      </div>

      <div class="mt-10">
        <AppButton
          to="/contact"
          size="lg"
          aria-label="立即提交需求"
          class="!bg-white !text-primary hover:!bg-slate-100 focus-visible:!outline-white"
        >
          立即提交需求
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppButton from '~/components/common/AppButton.vue'

interface ContactItem {
  icon: string
  label: string
  value: string
}

const contacts: ContactItem[] = [
  { icon: '📞', label: '电话', value: '+86 13561559016' },
  { icon: '💬', label: '微信', value: 'HUAYUN-MESH' },
  { icon: '📧', label: '邮件', value: 'sales@huayun-mesh.com' }
]
</script>

<style scoped>
</style>
