import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path';
import generateRoutesPlugin from "./plugins/vite-plugin-generate-routes";
export default defineConfig({
  plugins: [react(), generateRoutesPlugin()],
  optimizeDeps:{
    esbuildOptions:{
      target: 'esnext'
    }
  },
  server: {
    port: 10003,
    proxy: {
      '/api/': {
        target: 'http://10.0.44.34:5000', // 开发环境
        ws: true,
        changeOrigin: true,
      },
      '/api_/' : {
        target: 'https://mock.mengxuegu.com/mock/6618fb2ad985433db203dcb9/',
        changeOrigin: true,
        rewrite: path => path.replace('/api/', '')
      },
      '/v2/' : {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        rewrite: path => path.replace('/v2/', '')
      },
      '/w3c/' : {
        target: 'https://www.w3.org',
        changeOrigin: true,
        rewrite: path => path.replace('/w3c/', '')
      },
      '/api2/' : {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: path => path.replace('/api2/', '')
      },

    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
