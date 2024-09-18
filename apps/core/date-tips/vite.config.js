import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 7777,
        proxy: {
            '/api': {
                target: 'http://10.0.44.34:5000', // 开发环境
                changeOrigin: true,
            },
            '/maws/api': {
                target: 'http://localhost:6000',
                changeOrigin: true,
                rewrite: (path) => {
                    console.log('path', path)
                    return path.replace(/^\/maws\/api/, '/api')
                }
            },

        }
    }
})
