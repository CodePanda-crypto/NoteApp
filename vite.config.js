import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssExport from 'vite-plugin-css-export';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    cssExport(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'ReactTemplateApp',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
  },
  build: {
    sourcemap: true,
  },
});
