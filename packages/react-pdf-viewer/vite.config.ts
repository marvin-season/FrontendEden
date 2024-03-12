import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
      target: 'esnext'
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'esnext',
        },
    },
    server: {
        port: 10004,

    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
})
