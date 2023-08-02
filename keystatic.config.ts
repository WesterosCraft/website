import { footer } from "./src/cms/singletons/footer";
import { mainnav } from "./src/cms/singletons/main-nav";
import { join } from "./src/cms/singletons/join";
import { about } from "./src/cms/singletons/about";
import { config } from "@keystatic/core";
import { locations, rookeries, guides } from "./src/cms/collections";
import { rookery, home } from "./src/cms/singletons";

export default config({
  storage: {
    kind: "local",
  },
  singletons: {
    rookery,
    home,
    about,
    join,
    mainnav,
    footer,
  },
  collections: {
    locations,
    guides,
    rookeries,
  },
});