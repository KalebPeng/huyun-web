import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,vue}',
    './plugins/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a2744',
        accent: '#2563eb',
        neutral: '#f4f4f0',
        dark: '#111827'
      }
    }
  }
} satisfies Config
