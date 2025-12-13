import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite"
export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        outDir: 'build',
        sourcemap: true,
        minify: 'esbuild'
    },
    server: {
        port: 5170,
        open: true,
        host: true,
    }
});