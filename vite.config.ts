import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/nytimes': {
        target: 'https://api.nytimes.com/svc/archive/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nytimes/, ''),
      },
    },
  },
})
