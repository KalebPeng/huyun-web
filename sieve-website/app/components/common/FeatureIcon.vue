<template>
  <span
    class="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-line/80 bg-brand-surface-strong text-primary"
    :class="toneClass"
    aria-hidden="true"
  >
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path v-for="(path, index) in iconPaths" :key="index" :d="path" />
      <circle v-for="(circle, index) in iconCircles" :key="`c-${index}`" :cx="circle.cx" :cy="circle.cy" :r="circle.r" />
      <rect
        v-for="(rect, index) in iconRects"
        :key="`r-${index}`"
        :x="rect.x"
        :y="rect.y"
        :width="rect.width"
        :height="rect.height"
        :rx="rect.rx"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type IconName =
  | 'mining'
  | 'water'
  | 'industry'
  | 'specs'
  | 'custom'
  | 'factory'
  | 'response'
  | 'quality'
  | 'delivery'
  | 'woven'
  | 'welded'
  | 'crimped'
  | 'filter'
  | 'support'
  | 'phone'
  | 'wechat'
  | 'email'
  | 'certification'
  | 'service'
  | 'calculator'

type Tone = 'default' | 'accent' | 'dark'

interface RectShape {
  x: string
  y: string
  width: string
  height: string
  rx: string
}

interface CircleShape {
  cx: string
  cy: string
  r: string
}

interface IconShape {
  paths?: string[]
  circles?: CircleShape[]
  rects?: RectShape[]
}

interface Props {
  name: IconName
  tone?: Tone
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'default'
})

const icons: Record<IconName, IconShape> = {
  mining: { paths: ['M3 20h18', 'M7 20V8l5 3 5-7v16', 'M12 11v9'] },
  water: { paths: ['M12 3C9 7 6 10 6 14a6 6 0 0 0 12 0c0-4-3-7-6-11Z'] },
  industry: { paths: ['M3 20h18', 'M5 20V9l5 3V9l5 3V4l4 2v14', 'M8 14h.01', 'M12 14h.01', 'M16 14h.01'] },
  specs: { paths: ['M4 7h16', 'M4 12h16', 'M4 17h10'], rects: [{ x: '3', y: '3', width: '18', height: '18', rx: '2' }] },
  custom: { paths: ['M4 14l6-6 4 4 6-6', 'M18 8h2v2', 'M4 20h16'] },
  factory: { paths: ['M3 20h18', 'M6 20V8h5v12', 'M11 12h4v8', 'M15 9h3v11', 'M8 11h.01', 'M8 15h.01'] },
  response: { paths: ['M12 6v6l4 2', 'M3 12a9 9 0 1 0 3-6.7', 'M3 4v4h4'] },
  quality: { paths: ['M12 3l7 3v6c0 4.2-2.6 7.7-7 9-4.4-1.3-7-4.8-7-9V6l7-3', 'M9 12l2 2 4-4'] },
  delivery: { paths: ['M3 7h12v8H3z', 'M15 10h3l3 3v2h-6', 'M7 19a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z', 'M17 19a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'] },
  woven: { paths: ['M4 6h16', 'M4 12h16', 'M4 18h16', 'M7 3v18', 'M13 3v18', 'M19 3v18'] },
  welded: { paths: ['M5 7h14', 'M5 12h14', 'M5 17h14', 'M8 4v16', 'M12 4v16', 'M16 4v16'] },
  crimped: { paths: ['M4 7c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2', 'M4 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2', 'M4 17c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2'] },
  filter: { paths: ['M4 5h16l-6 7v5l-4 2v-7L4 5Z'] },
  support: { paths: ['M4 12a8 8 0 0 1 16 0', 'M6 15v1a2 2 0 0 0 2 2h2', 'M18 15v1a2 2 0 0 1-2 2h-2'] },
  phone: { paths: ['M5 4h4l2 5-2 2a14 14 0 0 0 6 6l2-2 5 2v4c0 1-1 2-2 2C10 23 1 14 1 6c0-1 1-2 2-2Z'] },
  wechat: { paths: ['M9 8c-3.3 0-6 2.2-6 5 0 1.6.8 3 2.3 4L5 20l3-1.6c.3.1.7.1 1 .1 3.3 0 6-2.2 6-5s-2.7-5.5-6-5.5Z', 'M15.5 10.5c2.8 0 5 1.9 5 4.3 0 1.4-.8 2.7-2.2 3.5l.7 2.2-2.2-1.2c-.4.1-.8.1-1.3.1-2.8 0-5-1.9-5-4.3s2.2-4.6 5-4.6Z'], circles: [{ cx: '7.5', cy: '12', r: '0.6' }, { cx: '11', cy: '12', r: '0.6' }, { cx: '14.5', cy: '13', r: '0.6' }, { cx: '17.5', cy: '13', r: '0.6' }] },
  email: { paths: ['M4 6h16v12H4z', 'm4 8 8 5 8-5'] },
  certification: { paths: ['M12 3l7 4v5c0 4.2-2.6 7.6-7 9-4.4-1.4-7-4.8-7-9V7l7-4', 'M9 12l2 2 4-4'] },
  service: { paths: ['M4 12h16', 'M12 4v16', 'M7 7h.01', 'M17 7h.01', 'M7 17h.01', 'M17 17h.01'] },
  calculator: { rects: [{ x: '5', y: '3', width: '14', height: '18', rx: '2' }], paths: ['M8 7h8', 'M8 11h2', 'M14 11h2', 'M8 15h2', 'M14 15h2', 'M11 15h2', 'M11 11h2'] }
}

const toneClass = computed(() => {
  if (props.tone === 'accent') {
    return 'border-accent/20 bg-accent/10 text-accent'
  }

  if (props.tone === 'dark') {
    return 'border-white/10 bg-primary text-white'
  }

  return ''
})

const iconPaths = computed(() => icons[props.name].paths || [])
const iconCircles = computed(() => icons[props.name].circles || [])
const iconRects = computed(() => icons[props.name].rects || [])
</script>
