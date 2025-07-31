import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      'simple-app-1.preview.emergentagent.com',
      '18ec1705-5bd2-4cd0-8fed-560e7125a002.preview.emergentagent.com',
      '978f33ce-f69b-467c-818a-94460a84ddcd.preview.emergentagent.com',
      /\.preview\.emergentagent\.com$/,
      /\.emergentagent\.com$/,
      'all'
    ],
    cors: true,
    hmr: {
      port: 3000,
      host: '0.0.0.0'
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
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
