import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    proxy: {
      '/api5002': {
        target: 'http://192.168.10.128:5002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api5002/, '')
      },
      '/api5004': {
        target: 'http://192.168.10.128:5004',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api5004/, '')
      }
    }
 },
})
