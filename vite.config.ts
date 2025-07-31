import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    modules: false,
  },
  optimizeDeps: {
    include: ["@sendbird/uikit-react"],
  },
  define: {
    "process.env.NODE_ENV": '"development"',
  },
});
