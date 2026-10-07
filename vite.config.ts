import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: 'index.html',
        notfound: '404.html',
        services: 'servicios.html',
        web: 'desarrollo-web-chile.html',
        android: 'apps-android-kotlin-chile.html',
        windows: 'software-windows.html',
      },
    },
  },
});
