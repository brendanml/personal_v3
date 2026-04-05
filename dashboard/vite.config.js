import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 6700,
        proxy: {
            "/api": {
                target: "http://localhost:6800",
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
})
