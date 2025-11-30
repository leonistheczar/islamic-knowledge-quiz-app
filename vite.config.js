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
        open: true,
        host: true,
    }
});