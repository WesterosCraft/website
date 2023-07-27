import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [react(), tailwind(), markdoc()],
  experimental: {
    assets: true
  }
});