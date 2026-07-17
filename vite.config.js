import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env.development
dotenv.config({ path: '.env.development' });

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-infinite-scroller': 'react-infinite-scroller/dist/InfiniteScroll.js',
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  define: {
    global: 'window',
    'process.env.TMDB_API_KEY': JSON.stringify(process.env.TMDB_API_KEY),
  },
  build: {
    outDir: 'dist',
  },
});
