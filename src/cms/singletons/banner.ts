import { link } from "./../fields/links";
import { singleton } from "@keystatic/core";

export const banner = singleton({
  label: "Global Banner",
  path: "src/content/settings/banner",
  schema: {
    link,
  },
});
