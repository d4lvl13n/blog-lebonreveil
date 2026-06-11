// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://blog.lebonreveil.com",
  trailingSlash: "always",
  output: "server",
  adapter: vercel(),
  // 301 — consolidation des doublons cannibalisants (2026-06-11).
  // Chaque slug perdant pointe vers la page canonique conservée.
  redirects: {
    "/12-reveils-pour-ado-en-2026-notre-selection/": {
      status: 301,
      destination: "/12-reveils-ado-2026-les-meilleurs-modeles-par/",
    },
    "/tableau-des-heures-de-coucher-par-age-guide-pratique-0-18-ans/": {
      status: 301,
      destination: "/heures-de-sommeil-par-age-pour-les-enfants/",
    },
    "/sonnerie-reveil-quels-sons-choisir-pour-bien-se/": {
      status: 301,
      destination: "/son-de-reveil-agreable-science-et-sons-a/",
    },
    "/power-nap-guide-pratique-de-la-sieste-eclair-efficace/": {
      status: 301,
      destination:
        "/sieste-ideale-pourquoi-26-minutes-est-le-chiffre-magique-et-60-minutes-une-catastrophe/",
    },
    // Catégorie "Non classé" vidée (27 posts reclassés 2026-06-11) — insurance
    // si Google avait indexé ce hub fin (la page 404 sinon).
    "/categorie/non-classe/": { status: 301, destination: "/" },
  },
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});
