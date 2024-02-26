import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/upload':'http://localhost:8000',
      '/deleteimage':'http://localhost:8000'
    },
  },
  plugins: [react()],
})
