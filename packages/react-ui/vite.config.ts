import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import {libInjectCss} from 'vite-plugin-lib-inject-css'

// The glob library helps you to specify a set of filenames. In this case it selects all files ending with .ts or .tsx
import {glob} from "glob";
import {fileURLToPath} from 'node:url'
import {extname, relative, resolve} from 'path'

console.log("🚀  ", resolve(__dirname, 'lib'))
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        libInjectCss(),
        dts({include: ['lib'], exclude: ['src']}) as any,
    ],
    server: {
        port: 10006,
        host: true
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'lib'),
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/main.ts'),
            formats: ['es']
        },
        copyPublicDir: false,
        rollupOptions: {
            external: ['react', 'react/jsx-runtime'],
            input: Object.fromEntries(
                glob.sync('lib/**/*.{ts,tsx}').map(file => [
                    // The name of the entry point
                    // lib/nested/foo.ts becomes nested/foo
                    relative('lib', file.slice(0, file.length - extname(file).length)),
                    // The absolute path to the entry file
                    // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
                    fileURLToPath(new URL(file, import.meta.url))
                ])
            ),
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: (chunkInfo) => `${chunkInfo.name}.js`
            }
        }
    }
})
