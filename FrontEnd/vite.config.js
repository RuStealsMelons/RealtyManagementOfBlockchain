import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    proxy: {
      '/api5002': {
        target: 'http://frp-fit.top:62786',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api5002/, '')
      },
      '/api5004': {
        target: 'http://frp-fit.top:17129',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api5004/, '')
      }
    }
 },
})
