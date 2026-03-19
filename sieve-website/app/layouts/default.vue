<template>
  <div class="min-h-screen bg-slate-100 text-slate-900">
    <AppHeader />
    <main id="main-content" class="min-h-[calc(100vh-18rem)]">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '~/components/common/AppFooter.vue'
import AppHeader from '~/components/common/AppHeader.vue'
</script>
