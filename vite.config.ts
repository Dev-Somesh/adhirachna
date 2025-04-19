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
    port: 5173,
    host: true,
    strictPort: true,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  preview: {
    port: 5173,
    host: true,
    strictPort: true,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['@/components/ui'],
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
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    target: "esnext",
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
  },
});
