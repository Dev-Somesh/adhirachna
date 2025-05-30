import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  define: {
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  preview: {
    port: 8080,
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
          'ui-core': [
            '@/components/ui/button',
            '@/components/ui/input',
            '@/components/ui/form',
            '@/components/ui/label'
          ],
          'ui-feedback': [
            '@/components/ui/alert',
            '@/components/ui/toast',
            '@/components/ui/toaster',
            '@/components/ui/progress'
          ],
          'ui-overlay': [
            '@/components/ui/dialog',
            '@/components/ui/dropdown-menu',
            '@/components/ui/popover',
            '@/components/ui/tooltip'
          ],
          'ui-layout': [
            '@/components/ui/card',
            '@/components/ui/tabs',
            '@/components/ui/scroll-area'
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
}));
