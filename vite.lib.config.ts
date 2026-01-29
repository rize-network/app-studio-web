import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/components'],
      outDir: 'dist',
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.tsx'),
      name: 'AppStudioWeb',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'web.esm.js';
        if (format === 'cjs') return 'web.cjs.js';
        if (format === 'umd') return 'web.umd.js';
        return `web.${format}.js`;
      },
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-router-dom',
        'react/jsx-runtime',
        'app-studio',
        'formik',
        'zustand',
        'date-fns',
        'lucide-react',
        'lucide-react/dynamicIconImports',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react-router-dom': 'ReactRouterDOM',
          'app-studio': 'appStudio',
          formik: 'Formik',
          zustand: 'zustand',
          'date-fns': 'dateFns',
          'lucide-react': 'lucideReact',
          'lucide-react/dynamicIconImports': 'lucideReactDynamicIconImports',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
});
