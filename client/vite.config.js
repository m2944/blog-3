import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 1. Add this 'server' object
  server: {
    proxy: {
      // 2. Any request starting with '/api'
      '/api': {
        // 3. Will be proxied to your backend server
        target: 'http://localhost:5001',
        // 4. This is needed for the server to accept the request
        changeOrigin: true,
      },
    },
  },
})