import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import 'react'
import 'react-dom'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 8080,
    strictPort: true,
    origin: 'http://localhost:8080',
  },
})
