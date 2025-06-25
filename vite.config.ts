import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import dts from "vite-plugin-dts"; // 타입 정의(.d.ts) 파일을 생성해주는 플러그인
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), dts(), svgr()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "fla-dashboard",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
