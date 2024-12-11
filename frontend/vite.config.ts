import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsConfigPaths()],
  resolve: {
    alias: [{ find: '@/', replacement: path.resolve(__dirname, './src/') }],
  },
});
