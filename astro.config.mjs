// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://blog.lebonreveil.com",
  trailingSlash: "always",
  output: "server",
  adapter: vercel(),
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});
