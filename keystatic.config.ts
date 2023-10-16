import { progress } from "./src/cms/singletons/progress";
import { footer } from "./src/cms/singletons/footer";
import { mainnav } from "./src/cms/singletons/main-nav";
import { join } from "./src/cms/singletons/join";
import { about } from "./src/cms/singletons/about";
import { banner } from "./src/cms/singletons/banner";
import { config } from "@keystatic/core";
import { locations, docs } from "./src/cms/collections";
import { rookery, home } from "./src/cms/singletons";

export default config({
  storage: {
    kind: import.meta.env.DEV ? "local" : "cloud",
    // kind: import.meta.env.DEV ? "local" : "github",
  },
  // repo: {
  //   owner: "WesterosCraft",
  //   name: "website",
  // },
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
    progress,
  },
  collections: {
    locations,
    docs,
  },
});
