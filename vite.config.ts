import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/tilt-wrapper.ts',
      formats: ['es', 'umd', 'iife'],
      name: "TiltWrapper",
      fileName: (format) => `tilt-wrapper.${format}.js`
    },
    rollupOptions: {
      external: /^lit/,
    }
  }
})
