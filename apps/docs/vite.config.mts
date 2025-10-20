import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src", import.meta.url)),
    }
  },
  plugins: [react()],
  server: {
    port: 3333,
  },
})
