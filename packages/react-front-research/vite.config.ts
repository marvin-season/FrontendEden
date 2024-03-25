import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path';
// https://vitejs.dev/config/
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
      '/tenant-api': {
        target: 'http://10.3.73.222:48080',
        changeOrigin: true,
      },
      '/api/': {
        target: 'http://10.0.44.34:5000', // 开发环境
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
