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
    sourcemap: process.env.NODE_ENV !== 'production',
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      },
      format: {
        comments: false,
      },
      mangle: {
        keep_fnames: true,
        keep_classnames: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || 
                id.includes('@tanstack/react-query') ||
                id.includes('@radix-ui') ||
                id.includes('class-variance-authority') ||
                id.includes('clsx') ||
                id.includes('tailwind-merge') ||
                id.includes('tailwindcss-animate') ||
                id.includes('lucide-react') ||
                id.includes('date-fns') ||
                id.includes('zod') ||
                id.includes('@hookform/resolvers') ||
                id.includes('react-hook-form')) {
              return 'vendor';
            }
          }
          return null;
        },
        inlineDynamicImports: false,
        preserveModules: false,
        format: 'es',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      preserveEntrySignatures: 'strict',
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
    exclude: [],
    esbuildOptions: {
      target: "esnext",
      minify: true,
      keepNames: true,
    },
  },
});
