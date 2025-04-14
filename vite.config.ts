import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-slot",
            "class-variance-authority",
            "clsx",
            "tailwind-merge"
          ],
          forms: [
            "@radix-ui/react-checkbox",
            "@radix-ui/react-label",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-select",
            "@radix-ui/react-slider",
            "@radix-ui/react-switch"
          ],
          layout: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-aspect-ratio",
            "@radix-ui/react-avatar",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-tabs"
          ]
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    target: "esnext",
    modulePreload: {
      polyfill: false,
    },
    reportCompressedSize: true,
    cssCodeSplit: true,
    cssMinify: true,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip"
    ],
    esbuildOptions: {
      target: "esnext",
      minify: true,
    },
  },
});
