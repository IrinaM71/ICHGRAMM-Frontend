import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  appType: "spa", // ← ВАЖНО! Включает fallback для всех маршрутов
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:5000",
        ws: true,
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/users": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/posts": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/likes": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/comments": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/search": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/messages": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/follow": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/notifications": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
