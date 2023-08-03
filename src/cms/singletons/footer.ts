import { fields, singleton } from "@keystatic/core";

export const footer = singleton({
  label: "Footer",
  path: "src/content/pages/footer",
  schema: {
    heading: fields.text({ label: "Heading" }),
    subheading: fields.text({ label: "Subheading" }),
  },
});
