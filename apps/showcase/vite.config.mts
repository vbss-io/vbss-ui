import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL("./src", import.meta.url)),
    }
  },
  plugins: [react()],
})
