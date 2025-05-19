import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // @ → src/
    },
  },
   server: {
    proxy: {
      '/api': {
        target: 'http://ec2-43-203-7-170.ap-northeast-2.compute.amazonaws.com:8080',
        changeOrigin: true,
      },
    },
  },
});
