// vite.config.ts
import { defineConfig } from "file:///Users/marvin010528/workspace/2023-2024/front/front-based/node_modules/.pnpm/vite@5.2.6_@types+node@20.12.13_sass@1.72.0_terser@5.31.1/node_modules/vite/dist/node/index.js";
import react from "file:///Users/marvin010528/workspace/2023-2024/front/front-based/node_modules/.pnpm/@vitejs+plugin-react@4.3.0_vite@5.2.6_@types+node@20.12.13_sass@1.72.0_terser@5.31.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///Users/marvin010528/workspace/2023-2024/front/front-based/node_modules/.pnpm/vite-plugin-dts@2.3.0_@types+node@20.12.13_rollup@4.18.0_vite@5.2.6_@types+node@20.12.13_sass@1.72.0_terser@5.31.1_/node_modules/vite-plugin-dts/dist/index.mjs";
import { libInjectCss } from "file:///Users/marvin010528/workspace/2023-2024/front/front-based/node_modules/.pnpm/vite-plugin-lib-inject-css@2.1.1_vite@5.2.6_@types+node@20.12.13_sass@1.72.0_terser@5.31.1_/node_modules/vite-plugin-lib-inject-css/dist/index.js";
import { glob } from "file:///Users/marvin010528/workspace/2023-2024/front/front-based/node_modules/.pnpm/glob@10.4.1/node_modules/glob/dist/esm/index.js";
import { fileURLToPath } from "node:url";
import { extname, relative, resolve } from "path";
var __vite_injected_original_dirname = "/Users/marvin010528/workspace/2023-2024/front/front-based/packages/react-ai";
var __vite_injected_original_import_meta_url = "file:///Users/marvin010528/workspace/2023-2024/front/front-based/packages/react-ai/vite.config.ts";
console.log("\u{1F680}  ", resolve(__vite_injected_original_dirname, "lib"));
var vite_config_default = defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ["lib"], exclude: ["src"] })
  ],
  server: {
    port: 10006,
    host: true
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "lib")
    }
  },
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/main.ts"),
      formats: ["es"]
    },
    copyPublicDir: false,
    rollupOptions: {
      external: (id) => {
        return [
          "react",
          "react/jsx-runtime",
          "antd",
          "@ant-design/icons",
          "@uiw/react-markdown-preview",
          "nanoid",
          "use-immer",
          "moment"
        ].includes(id);
      },
      input: Object.fromEntries(
        glob.sync("lib/**/*.{ts,tsx}").map((file) => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative("lib", file.slice(0, file.length - extname(file).length)),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
        ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: (chunkInfo) => `${chunkInfo.name}.js`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFydmluMDEwNTI4L3dvcmtzcGFjZS8yMDIzLTIwMjQvZnJvbnQvZnJvbnQtYmFzZWQvcGFja2FnZXMvcmVhY3QtYWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYXJ2aW4wMTA1Mjgvd29ya3NwYWNlLzIwMjMtMjAyNC9mcm9udC9mcm9udC1iYXNlZC9wYWNrYWdlcy9yZWFjdC1haS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWFydmluMDEwNTI4L3dvcmtzcGFjZS8yMDIzLTIwMjQvZnJvbnQvZnJvbnQtYmFzZWQvcGFja2FnZXMvcmVhY3QtYWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xuaW1wb3J0IHtsaWJJbmplY3RDc3N9IGZyb20gJ3ZpdGUtcGx1Z2luLWxpYi1pbmplY3QtY3NzJ1xuXG4vLyBUaGUgZ2xvYiBsaWJyYXJ5IGhlbHBzIHlvdSB0byBzcGVjaWZ5IGEgc2V0IG9mIGZpbGVuYW1lcy4gSW4gdGhpcyBjYXNlIGl0IHNlbGVjdHMgYWxsIGZpbGVzIGVuZGluZyB3aXRoIC50cyBvciAudHN4XG5pbXBvcnQge2dsb2J9IGZyb20gXCJnbG9iXCI7XG5pbXBvcnQge2ZpbGVVUkxUb1BhdGh9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHtleHRuYW1lLCByZWxhdGl2ZSwgcmVzb2x2ZX0gZnJvbSAncGF0aCdcblxuY29uc29sZS5sb2coXCJcdUQ4M0RcdURFODAgIFwiLCByZXNvbHZlKF9fZGlybmFtZSwgJ2xpYicpKVxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCgpLFxuICAgICAgICBsaWJJbmplY3RDc3MoKSxcbiAgICAgICAgZHRzKHtpbmNsdWRlOiBbJ2xpYiddLCBleGNsdWRlOiBbJ3NyYyddfSkgYXMgYW55LFxuICAgIF0sXG4gICAgc2VydmVyOiB7XG4gICAgICAgIHBvcnQ6IDEwMDA2LFxuICAgICAgICBob3N0OiB0cnVlXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnbGliJyksXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIGxpYjoge1xuICAgICAgICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnbGliL21haW4udHMnKSxcbiAgICAgICAgICAgIGZvcm1hdHM6IFsnZXMnXVxuICAgICAgICB9LFxuICAgICAgICBjb3B5UHVibGljRGlyOiBmYWxzZSxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgZXh0ZXJuYWw6IChpZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBbJ3JlYWN0JywgJ3JlYWN0L2pzeC1ydW50aW1lJywgJ2FudGQnLCAnQGFudC1kZXNpZ24vaWNvbnMnLCAnQHVpdy9yZWFjdC1tYXJrZG93bi1wcmV2aWV3JywgJ25hbm9pZCcsICd1c2UtaW1tZXInLCAnbW9tZW50J1xuICAgICAgICAgICAgICAgIF0uaW5jbHVkZXMoaWQpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5wdXQ6IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgICAgICAgICAgICBnbG9iLnN5bmMoJ2xpYi8qKi8qLnt0cyx0c3h9JykubWFwKGZpbGUgPT4gW1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbmFtZSBvZiB0aGUgZW50cnkgcG9pbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gbGliL25lc3RlZC9mb28udHMgYmVjb21lcyBuZXN0ZWQvZm9vXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlKCdsaWInLCBmaWxlLnNsaWNlKDAsIGZpbGUubGVuZ3RoIC0gZXh0bmFtZShmaWxlKS5sZW5ndGgpKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGFic29sdXRlIHBhdGggdG8gdGhlIGVudHJ5IGZpbGVcbiAgICAgICAgICAgICAgICAgICAgLy8gbGliL25lc3RlZC9mb28udHMgYmVjb21lcyAvcHJvamVjdC9saWIvbmVzdGVkL2Zvby50c1xuICAgICAgICAgICAgICAgICAgICBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoZmlsZSwgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXVtleHRuYW1lXScsXG4gICAgICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IGAke2NodW5rSW5mby5uYW1lfS5qc2BcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1aLFNBQVEsb0JBQW1CO0FBQzlhLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsU0FBUSxvQkFBbUI7QUFHM0IsU0FBUSxZQUFXO0FBQ25CLFNBQVEscUJBQW9CO0FBQzVCLFNBQVEsU0FBUyxVQUFVLGVBQWM7QUFSekMsSUFBTSxtQ0FBbUM7QUFBcU4sSUFBTSwyQ0FBMkM7QUFVL1MsUUFBUSxJQUFJLGVBQVEsUUFBUSxrQ0FBVyxLQUFLLENBQUM7QUFFN0MsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLElBQ2IsSUFBSSxFQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBQyxDQUFDO0FBQUEsRUFDNUM7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ2pDO0FBQUEsRUFDSjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsS0FBSztBQUFBLE1BQ0QsT0FBTyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUN2QyxTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2xCO0FBQUEsSUFDQSxlQUFlO0FBQUEsSUFDZixlQUFlO0FBQUEsTUFDWCxVQUFVLENBQUMsT0FBTztBQUNkLGVBQU87QUFBQSxVQUFDO0FBQUEsVUFBUztBQUFBLFVBQXFCO0FBQUEsVUFBUTtBQUFBLFVBQXFCO0FBQUEsVUFBK0I7QUFBQSxVQUFVO0FBQUEsVUFBYTtBQUFBLFFBQ3pILEVBQUUsU0FBUyxFQUFFO0FBQUEsTUFDakI7QUFBQSxNQUNBLE9BQU8sT0FBTztBQUFBLFFBQ1YsS0FBSyxLQUFLLG1CQUFtQixFQUFFLElBQUksVUFBUTtBQUFBO0FBQUE7QUFBQSxVQUd2QyxTQUFTLE9BQU8sS0FBSyxNQUFNLEdBQUcsS0FBSyxTQUFTLFFBQVEsSUFBSSxFQUFFLE1BQU0sQ0FBQztBQUFBO0FBQUE7QUFBQSxVQUdqRSxjQUFjLElBQUksSUFBSSxNQUFNLHdDQUFlLENBQUM7QUFBQSxRQUNoRCxDQUFDO0FBQUEsTUFDTDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLFVBQVUsSUFBSTtBQUFBLE1BQ3BEO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
