import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt(
  {
    dirs: {
      root: ['.'],
      src: ['app'],
      pages: ['app/pages'],
      layouts: ['app/layouts'],
      components: ['app/components'],
      composables: ['app/composables'],
      servers: ['server']
    }
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  }
)
