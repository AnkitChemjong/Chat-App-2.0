import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [react()],
  root:'.',
  server:{port:process.env.FPORT},
  resolve: {
    alias: {
      //eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
