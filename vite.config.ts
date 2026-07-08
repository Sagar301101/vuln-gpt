import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // Split vendor code so the initial bundle stays lean (Lighthouse-friendly).
    rollupOptions: {
      output: {
        manualChunks: {
          chakra: ["@chakra-ui/react", "@emotion/react", "@emotion/styled"],
          motion: ["framer-motion"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});
