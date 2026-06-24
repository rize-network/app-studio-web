import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

/**
 * Dedicated SSR build used only by scripts/prerender.mjs to render the home
 * page hero to static HTML at build time. `noExternal: app-studio` bundles the
 * library so it shares a single React instance (otherwise app-studio's dist
 * resolves its own copy of react and hook calls throw during SSR), and
 * `dedupe` guarantees one react/react-dom across the graph.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { src: resolve(__dirname, 'src') },
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  },
  ssr: {
    noExternal: ['app-studio', 'react-router-dom'],
  },
  build: {
    ssr: 'src/entry-hero.tsx',
    outDir: 'build-ssr',
    minify: false,
    rollupOptions: {
      output: { entryFileNames: 'entry-hero.js' },
    },
  },
});
