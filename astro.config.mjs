import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://website-amber-six.vercel.app",
  integrations: [react(), tailwind(), markdoc(), keystatic()],
  adapter: vercel(),
});
