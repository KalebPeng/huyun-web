import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,vue}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    extend: {
      colors: {
        primary: '#16304F',
        accent: '#2563eb',
        neutral: '#f5f7fa',
        dark: '#10233A',
        brand: {
          surface: '#F5F7FA',
          'surface-strong': '#EEF3F8',
          ink: '#1F2937',
          muted: '#526273',
          line: '#D9E2EC'
        }
      },
      fontFamily: {
        sans: [
          'IBM Plex Sans',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'ui-sans-serif',
          'system-ui',
          'sans-serif'
        ],
        mono: [
          'IBM Plex Mono',
          'SFMono-Regular',
          'ui-monospace',
          'Consolas',
          'monospace'
        ]
      },
      boxShadow: {
        brand: '0 16px 40px rgba(22, 48, 79, 0.08)',
        'brand-soft': '0 8px 24px rgba(22, 48, 79, 0.06)'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  }
} satisfies Config
