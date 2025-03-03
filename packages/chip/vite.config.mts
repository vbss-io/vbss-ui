import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "vbss-ui/chip",
      formats: ['es', 'umd'],
      fileName: (format) => `vbss-ui-chip.${format}.js`
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src", import.meta.url)),
    }
  },
  plugins: [
    react(),
    dts({ rollupTypes: true }),
    cssInjectedByJsPlugin(),
  ],
});
