// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///Users/marvin010528/workspace/2023-2024/front/front-based/node_modules/.pnpm/vite@5.2.6_@types+node@20.11.30_sass@1.72.0_terser@5.31.1/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/marvin010528/workspace/2023-2024/front/front-based/node_modules/.pnpm/vite-plugin-dts@2.3.0_@types+node@20.11.30_rollup@4.18.0_vite@5.2.6_@types+node@20.11.30_sass@1.72.0_terser@5.31.1_/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/marvin010528/workspace/2023-2024/front/front-based/packages/shared";
var vite_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "shared",
      fileName: "shared",
      formats: ["es", "cjs", "iife"]
    }
  },
  plugins: [dts({
    outputDir: "./dist/types",
    insertTypesEntry: true
  })]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFydmluMDEwNTI4L3dvcmtzcGFjZS8yMDIzLTIwMjQvZnJvbnQvZnJvbnQtYmFzZWQvcGFja2FnZXMvc2hhcmVkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWFydmluMDEwNTI4L3dvcmtzcGFjZS8yMDIzLTIwMjQvZnJvbnQvZnJvbnQtYmFzZWQvcGFja2FnZXMvc2hhcmVkL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYXJ2aW4wMTA1Mjgvd29ya3NwYWNlLzIwMjMtMjAyNC9mcm9udC9mcm9udC1iYXNlZC9wYWNrYWdlcy9zaGFyZWQvdml0ZS5jb25maWcudHNcIjsvLyB2aXRlLmNvbmZpZy5qc1xuaW1wb3J0IHtyZXNvbHZlfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBidWlsZDoge1xuICAgICAgICBsaWI6IHtcbiAgICAgICAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgICAgICAgbmFtZTogJ3NoYXJlZCcsXG4gICAgICAgICAgICBmaWxlTmFtZTogXCJzaGFyZWRcIixcbiAgICAgICAgICAgIGZvcm1hdHM6IFtcImVzXCIsIFwiY2pzXCIsIFwiaWlmZVwiXVxuICAgICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW2R0cyh7XG4gICAgICAgIG91dHB1dERpcjogJy4vZGlzdC90eXBlcycsXG4gICAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWVcbiAgICB9KV1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUSxlQUFjO0FBQ3RCLFNBQVEsb0JBQW1CO0FBQzNCLE9BQU8sU0FBUztBQUhoQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixPQUFPO0FBQUEsSUFDSCxLQUFLO0FBQUEsTUFDRCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ3hDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxNQUFNLE9BQU8sTUFBTTtBQUFBLElBQ2pDO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLGtCQUFrQjtBQUFBLEVBQ3RCLENBQUMsQ0FBQztBQUNOLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
