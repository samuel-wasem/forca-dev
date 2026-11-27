import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // o front chama /api/... e o Vite repassa para o backend (sem problema de CORS)
  server: { proxy: { '/api': 'http://127.0.0.1:3333' } },
});
