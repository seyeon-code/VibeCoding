import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/VibeCoding/mini_sns/',
  server: { port: 5175 },
})
