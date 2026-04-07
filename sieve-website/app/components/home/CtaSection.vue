<template>
  <section class="page-section pt-0">
    <div class="section-shell">
      <CtaBand
        :eyebrow="$t('home.ctaSection.eyebrow')"
        :title="$t('home.ctaSection.title')"
        :description="$t('home.ctaSection.description')"
        primary-to="/contact"
        :primary-label="$t('home.ctaSection.cta')"
      >
        <div class="grid gap-3 lg:min-w-[360px]">
          <div
            v-for="contact in contacts"
            :key="contact.key"
            class="surface-card-inset flex items-center gap-4 px-4 py-3"
          >
            <FeatureIcon :name="contact.icon" tone="accent" />
            <div>
              <p class="mono-meta text-brand-muted">{{ contact.label }}</p>
              <p class="mt-1 text-sm font-semibold text-brand-ink">
                {{ contact.value }}
              </p>
            </div>
          </div>
        </div>
      </CtaBand>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import CtaBand from '~/components/common/CtaBand.vue'
import FeatureIcon from '~/components/common/FeatureIcon.vue'

interface ContactItem {
  key: string
  icon: 'phone' | 'wechat' | 'email'
  label: string
  value: string
}

const { t } = useI18n()

const contacts = computed<ContactItem[]>(() => [
  { key: 'phone', icon: 'phone', label: t('home.ctaSection.contacts.phone'), value: '+86 13561559016' },
  { key: 'wechat', icon: 'wechat', label: t('home.ctaSection.contacts.wechat'), value: 'HUAYUN-MESH' },
  { key: 'email', icon: 'email', label: t('home.ctaSection.contacts.email'), value: 'sales@huayun-mesh.com' }
])
</script>
