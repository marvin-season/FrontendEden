import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle.esm.js",
      format: "es",
    },
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
    },
  ],
  plugins: [resolve()],
};
