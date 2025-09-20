import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/div-tilt.ts',
      formats: ['es', 'umd'],
      name: "TiltWrapper",
      fileName: (format) => `div-tilt.${format}.js`
    },
    rollupOptions: {
      external: /^lit/,
    }
  }
})
