import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: path.resolve(__dirname, "client"), // Set the root to client folder
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"), // Adjust this alias if src is inside client folder
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"), // Ensure output directory is correct
    rollupOptions: {
      input: path.resolve(__dirname, "client/index.html"), // Ensure it finds index.html correctly
    },
  },
});
