import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],

  resolve: {
    alias: {
      // Алиас @/ → src/. Дублируется в tsconfig.app.json — это нормально.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    open: true,
    strictPort: false,
  },

  preview: {
    port: 4173,
    open: true,
  },

  build: {
    target: "es2023",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
