<template>
  <section class="bg-[linear-gradient(135deg,#1a2744,#243f72)] py-16 text-white sm:py-20">
    <div class="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
        {{ $t('home.ctaSection.eyebrow') }}
      </p>
      <h2 class="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
        {{ $t('home.ctaSection.title') }}
      </h2>
      <p class="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
        {{ $t('home.ctaSection.description') }}
      </p>

      <div class="mt-10 grid gap-4 md:grid-cols-3">
        <article
          v-for="contact in contacts"
          :key="contact.key"
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
          :aria-label="$t('home.ctaSection.ctaAria')"
          class="!bg-white !text-primary hover:!bg-slate-100 focus-visible:!outline-white"
        >
          {{ $t('home.ctaSection.cta') }}
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import AppButton from '~/components/common/AppButton.vue'

interface ContactItem {
  key: string
  icon: string
  label: string
  value: string
}

const { t } = useI18n()

const contacts = computed<ContactItem[]>(() => [
  { key: 'phone', icon: '📞', label: t('home.ctaSection.contacts.phone'), value: '+86 13561559016' },
  { key: 'wechat', icon: '💬', label: t('home.ctaSection.contacts.wechat'), value: 'HUAYUN-MESH' },
  { key: 'email', icon: '📧', label: t('home.ctaSection.contacts.email'), value: 'sales@huayun-mesh.com' }
])
</script>

<style scoped>
</style>
