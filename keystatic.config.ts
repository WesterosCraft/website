import { config } from "@keystatic/core";
import { footer } from "./src/cms/singletons/footer";
import { mainnav } from "./src/cms/singletons/main-nav";
import { join } from "./src/cms/singletons/join";
import { about } from "./src/cms/singletons/about";
import { banner } from "./src/cms/singletons/banner";
import { locations, docs, projects } from "./src/cms/collections";
import { rookery, home } from "./src/cms/singletons";

export default config({
  ui: {
    brand: { name: "WesterosCraft" },
    navigation: {
      Collections: ["projects", "locations", "docs"],
      Pages: ["home", "rookery", "about", "join"],
      Settings: ["mainnav", "footer", "banner"],
    },
  },
  storage: {
    kind: "github",
    repo: {
      owner: "WesterosCraft",
      name: "website",
    },
  },
  // cloud: {
  //   project: "westeroscraft/website",
  // },
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
    projects,
  },
});
