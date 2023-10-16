import { link } from "./../fields/links";
import { fields, singleton } from "@keystatic/core";

export const progress = singleton({
  label: "Progress Page",
  path: "src/content/pages/progress",
  schema: {
    heading: fields.text({ label: "Heading" }),
    subheading: fields.text({ label: "Subheading" }),
    banner: fields.image({
      label: "Banner",
      directory: "src/assets/pages/progress",
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
