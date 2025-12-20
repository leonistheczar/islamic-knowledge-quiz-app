import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite"
export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        outDir: 'build',
        sourcemap: true,
        minify: 'esbuild',
        rolldownOptions:{
            input:[
                resolve(__dirname, "index.html"),
                resolve(__dirname, "quiz.html"),
                resolve(__dirname, "contact.html"),
                resolve(__dirname, "about.html"),
            ]
        }
    },
    server: {
        port: 5170,
        open: true,
        host: true,
    }
});