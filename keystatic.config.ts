import { config } from "@keystatic/core";
import { footer } from "./src/cms/singletons/footer";
import { mainnav } from "./src/cms/singletons/main-nav";
import { join } from "./src/cms/singletons/join";
import { about } from "./src/cms/singletons/about";
import { banner } from "./src/cms/singletons/banner";
import { locations, docs } from "./src/cms/collections";
import { rookery, home } from "./src/cms/singletons";

export default config({
  storage: {
    kind: import.meta.env.DEV ? "local" : "cloud",
  },
  cloud: {
    project: "westeroscraft/website",
  },
  singletons: {
    rookery,
    home,
    about,
    join,
    mainnav,
    footer,
    banner,
  },
  collections: {
    locations,
    docs,
  },
});
