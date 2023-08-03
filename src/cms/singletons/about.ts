import { fields, singleton } from "@keystatic/core";

export const about = singleton({
  label: "About Page",
  path: "src/content/pages/about",
  schema: {
    heading: fields.text({ label: "Heading" }),
    subheading: fields.text({ label: "Subheading" }),
  },
});
