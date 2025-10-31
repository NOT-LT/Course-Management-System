/*Vite is a Development Server & Bundler. It helps in using node packages in js files and produce an optimized code for production*/

import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from '@tailwindcss/vite'
import fs from "fs";

function getHtmlEntries(dir, entries = {}) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = resolve(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            getHtmlEntries(fullPath, entries);
        } else if (file.endsWith(".html")) {
            const name = fullPath
                .replace(resolve(__dirname), "")
                .replace(/^\//, "");
            entries[name] = fullPath;
        }
    }
    return entries;
}

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                ...getHtmlEntries(resolve(__dirname, "src")),
            },
        },
    },
    plugins: [
        tailwindcss(),
    ]
});
