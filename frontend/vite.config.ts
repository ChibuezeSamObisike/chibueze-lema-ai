import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), svgr(), tsConfigPaths()],
    resolve: {
      alias: [{ find: '@/', replacement: path.resolve(__dirname, './src/') }],
    },
    define: {
      'process.env': env,
    },
  };
});
