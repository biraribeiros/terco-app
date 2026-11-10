import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativo: o app roda empacotado no Capacitor (sem servidor).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'es2022',
    sourcemap: false,
  },
});
