import { fields, singleton } from "@keystatic/core";
import { link } from "./../fields/links";

export const rookery = singleton({
  label: "Rookery Page",
  path: "src/content/pages/rookery",
  schema: {
    heading: fields.text({ label: "Heading" }),
    subheading: fields.text({ label: "Subheading" }),
    banner: fields.image({
      label: "Banner",
      directory: "src/assets/pages/rookery",
    }),
    editions: fields.array(
      fields.object({
        title: fields.slug({
          name: {
            label: "Title",
          },
        }),
        link: fields.object({
          url: fields.url({ label: "Link", validation: { isRequired: true } }),
          isExternal: fields.checkbox({
            label: "Is external link?",
            defaultValue: true,
          }),
        }),
        thumbnail: fields.image({
          label: "Thumbnail",
          directory: "src/assets/pages/rookery/thumbnails",
          description:
            "Maximum upload file size: 12MB. Recommended file size for images is <500KB.",
        }),
      }),
      {
        label: "Editions",
        description: "A list of all rookery editions",
        itemLabel: (props) => props?.fields?.title?.value?.name || "Edition",
      }
    ),
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
