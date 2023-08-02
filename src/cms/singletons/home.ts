import { fields, singleton } from "@keystatic/core";
import { buttons } from "./../fields";

export const home = singleton({
  label: "Home Page",
  path: "src/content/pages/",
  schema: {
    heroImage: fields.image({
      label: "Hero Image",
    }),
    heading: fields.text({ label: "Heading" }),
    subheading: fields.text({ label: "Subheading" }),
    buttons,
  },
});
