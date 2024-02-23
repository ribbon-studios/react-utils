import { resolve } from 'path';
import { copyFileSync } from 'fs';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { dependencies, peerDependencies } from './package.json';

export default defineConfig({
  build: {
    minify: false,
    outDir: './dist',
    emptyOutDir: false,
    lib: {
      entry: [
        resolve(__dirname, './src/index.ts'),
        resolve(__dirname, './src/react-router.ts'),
        resolve(__dirname, './src/react-helmet-async.ts'),
        resolve(__dirname, './src/react-query.ts'),
      ],
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./__tests__/setup-tests.ts'],
    include: ['./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      afterBuild: () => {
        copyFileSync('dist/index.d.ts', 'dist/index.d.cts');
        copyFileSync('dist/react-helmet-async.d.ts', 'dist/react-helmet-async.d.cts');
        copyFileSync('dist/react-query.d.ts', 'dist/react-query.d.cts');
        copyFileSync('dist/react-router.d.ts', 'dist/react-router.d.cts');
      },
    }),
  ],
});
