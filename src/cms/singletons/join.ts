import { fields, singleton } from "@keystatic/core";

export const join = singleton({
  label: "Join Page",
  path: "src/content/pages/",
  schema: {
    heading: fields.text({ label: "Heading" }),
    subheading: fields.text({ label: "Subheading" }),
  },
});
