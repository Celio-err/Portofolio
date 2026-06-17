import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <-- Diperbaiki ke nama yang benar
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})