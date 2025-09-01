import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/tilt-wrapper.ts',
      formats: ['iife'],
      name: "TiltWrapper",
    },
    outDir: 'dist/browser',
  }
})
