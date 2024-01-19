import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import cloudflare from "@astrojs/cloudflare";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  output: "server",
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
    "/progress": {
      status: 302,
      destination: "/locations",
    },
  },
});
