import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ChatWidget",
      fileName: (format) => `index.${format === "es" ? "esm" : format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@sendbird/chat",
        "@sendbird/uikit-react",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@sendbird/chat": "SendbirdChat",
          "@sendbird/uikit-react": "SendbirdUIKitReact",
        },
      },
    },
    outDir: "dist",
    sourcemap: true,
  },
  css: {
    modules: false,
  },
});
