import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.tsx', './src/**/*.jsx', 'node_modules/@marvin/react-ai/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

