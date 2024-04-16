import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path';
export default defineConfig({
  plugins: [react()],
  optimizeDeps:{
    esbuildOptions:{
      target: 'esnext'
    }
  },
  server: {
    port: 10003,
    proxy: {
      '/api/': {
        target: 'http://10.0.1.1:5000',
        ws: true,
        changeOrigin: true,
      },
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
