import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ChatWidget",
      fileName: (format) => `index.${format === "es" ? "esm" : format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    outDir: "dist",
    sourcemap: true,
  },
  css: {
    modules: false,
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  optimizeDeps: {
    include: ["@sendbird/chat", "@sendbird/uikit-react"],
  },
});
