import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/navira/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
});
