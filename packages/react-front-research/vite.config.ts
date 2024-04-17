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
      '/api/' : {
        target: 'https://mock.mengxuegu.com/mock/6618fb2ad985433db203dcb9/',
        changeOrigin: true,
        rewrite: path => path.replace('/api/', '')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
