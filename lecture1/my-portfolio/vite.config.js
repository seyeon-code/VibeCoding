import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // 로컬 dev는 '/', 프로덕션 빌드는 배포 경로
  base: command === 'serve' ? '/' : '/VibeCoding/portfolio/',
}))
