import { fields, singleton } from "@keystatic/core";

export const mainnav = singleton({
  label: "Main Nav",
  path: "src/content/pages/",
  schema: {
    heading: fields.text({ label: "Heading" }),
    subheading: fields.text({ label: "Subheading" }),
  },
});
