import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://westeroscraft.com",
  integrations: [react(), tailwind(), markdoc(), keystatic()],
  adapter: vercel(),
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
