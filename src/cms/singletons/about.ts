import { fields, singleton } from "@keystatic/core";
import { link } from "./../fields/links";

export const about = singleton({
  label: "About Page",
  path: "src/content/pages/about",
  schema: {
    heading: fields.text({ label: "Heading" }),
    subheading: fields.text({ label: "Subheading" }),
    banner: fields.image({
      label: "Banner",
      directory: "src/assets/pages/about",
    }),
    cta: fields.object(
      {
        heading: fields.text({ label: "Heading" }),
        subheading: fields.text({ label: "Subheading", multiline: true }),
        link,
      },
      { label: "CTA" }
    ),
  },
});
