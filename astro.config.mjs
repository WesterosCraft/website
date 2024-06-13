import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import partytown from "@astrojs/partytown";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://westeroscraft.com",
  image: {
    domains: ["westeroscraft.com", "bxf03rev1vvg.keystatic.net"],
  },
  integrations: [
    react(),
    tailwind(),
    markdoc(),
    keystatic(),
    partytown({
      config: {
        debug: false,
        forward: ["dataLayer.push"],
      },
    }),
  ],
  adapter: cloudflare(),
  redirects: {
    "/modpack": {
      status: 302,
      destination: "/join",
    },
  },
});
