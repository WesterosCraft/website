import { fields, singleton } from "@keystatic/core";

export const join = singleton({
  label: "Join Page",
  path: "src/content/pages/join",
  schema: {
    heading: fields.text({ label: "Heading" }),
    subheading: fields.text({ label: "Subheading" }),
    banner: fields.image({
      label: "Banner",
      directory: "src/assets/pages/join",
    }),
  },
});
