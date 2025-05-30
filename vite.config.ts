import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all addresses including LAN and public
    port: 3000,
    strictPort: false,
    allowedHosts: 'all', // Allow all hosts for preview compatibility
    cors: true,
    hmr: {
      port: 3000,
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  build: {
    sourcemap: true,
  },
});
