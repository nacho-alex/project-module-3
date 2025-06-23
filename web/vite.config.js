import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      url: false,  // Esto evita que Vite incluya el módulo url de Node
    },
  },
  define: {
  'process.env': {},
},
})
