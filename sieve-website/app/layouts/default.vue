<template>
  <div class="min-h-screen page-shell">
    <AppHeader />
    <main id="main-content" class="min-h-[calc(100vh-18rem)] pt-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '~/components/common/AppFooter.vue'
import AppHeader from '~/components/common/AppHeader.vue'
</script>
