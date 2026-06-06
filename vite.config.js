import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/mock-frontend/', // กำหนดชื่อให้ตรงกับชื่อ Repository บน GitHub 
})