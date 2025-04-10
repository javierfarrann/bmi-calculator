// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import history from 'connect-history-api-fallback';
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: 'dist',
  },
  // 👇 penting ini bro
  preview: {
    port: 4173,
  },
  // 👇 ini bagian paling penting biar route SPA gak error pas ketik manual
  base: '/',
})
