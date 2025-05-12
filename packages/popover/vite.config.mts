import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "@vbss-ui/popover",
      formats: ['es'],
      fileName: (format) => `vbss-ui-popover.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        },
      },
    },
    cssCodeSplit: false,
  },
  plugins: [
    react(),
    dts({ rollupTypes: true }),
    cssInjectedByJsPlugin(),
  ],
});
