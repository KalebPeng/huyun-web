<template>
  <div class="cta-band">
    <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div class="max-w-3xl">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
          {{ title }}
        </h2>
        <p class="mt-4 text-base leading-8 text-brand-muted">
          {{ description }}
        </p>
      </div>

      <div class="flex shrink-0 flex-col gap-3 sm:flex-row">
        <slot>
          <AppButton
            v-if="primaryTo && primaryLabel"
            :to="primaryTo"
            size="lg"
            class="sm:min-w-[170px]"
          >
            {{ primaryLabel }}
          </AppButton>
          <AppButton
            v-if="secondaryTo && secondaryLabel"
            :to="secondaryTo"
            variant="outline"
            size="lg"
            class="sm:min-w-[170px]"
          >
            {{ secondaryLabel }}
          </AppButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '~/components/common/AppButton.vue'

interface Props {
  eyebrow: string
  title: string
  description: string
  primaryTo?: string
  primaryLabel?: string
  secondaryTo?: string
  secondaryLabel?: string
}

withDefaults(defineProps<Props>(), {
  primaryTo: '',
  primaryLabel: '',
  secondaryTo: '',
  secondaryLabel: ''
})
</script>
