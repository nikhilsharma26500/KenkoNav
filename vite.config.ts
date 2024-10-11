import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_PUBLIC_ID': JSON.stringify(process.env.VITE_PUBLIC_ID),
    'process.env.VITE_SERVICE_ID': JSON.stringify(process.env.VITE_SERVICE_ID),
    'process.env.VITE_TEMPLATE_ID': JSON.stringify(process.env.VITE_TEMPLATE_ID),
    'process.env.PRODUCTION_URL': JSON.stringify(process.env.PRODUCTION_URL),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
