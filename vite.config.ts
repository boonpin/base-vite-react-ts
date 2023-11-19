import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    build: {emptyOutDir: true, outDir: "build"},
    plugins: [react()],
    resolve: {
        alias: {
            "@/root": path.resolve(__dirname, "."),
            "@/src": path.resolve(__dirname, "src")
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        },
        modules: {
            localsConvention: "camelCase"
        }
    }
});
