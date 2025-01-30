import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        // tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/auth": "http://localhost:3000",
      // "/login": "http://localhost:3000",
      "/api": "http://localhost:3000",
      "/auth/kakao": {
        target: "http://localhost:3000", // ✅ 백엔드로 프록시
        changeOrigin: true,
        secure: false
      }
    }
    
  }
});
