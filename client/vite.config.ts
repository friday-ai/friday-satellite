import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    https: process.env.HTTPS === 'true'
  },
  plugins: [
    react(),
  ]
})
