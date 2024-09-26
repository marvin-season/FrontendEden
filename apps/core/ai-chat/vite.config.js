import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            plugins: [
                visualizer({
                    open: true, // 直接在浏览器中打开分析报告
                    filename: 'stats.html', // 输出文件的名称
                    gzipSize: true, // 显示gzip后的大小
                    brotliSize: true, // 显示brotli压缩后的大小
                })
            ]
        }
    },
    server: {
        port: 7777,
        proxy: {
            '/api': {
                target: 'http://10.0.44.34:5000', // 开发环境
                changeOrigin: true,
            },
            '/marvin/api': {
                target: 'http://localhost:6000',
                changeOrigin: true,
                rewrite: (path) => {
                    console.log('path', path)
                    return path.replace(/^\/marvin\/api/, '/api')
                }
            },

        }
    }
})
