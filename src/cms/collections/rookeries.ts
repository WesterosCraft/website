import { fields, collection } from "@keystatic/core";

export const rookeries = collection({
  label: "Rookeries",
  slugField: "title",
  path: "src/content/rookeries/*/",
  schema: {
    title: fields.slug({
      name: {
        label: "Title",
      },
    }),
    description: fields.text({ label: "Description" }),
    link: fields.object({
      url: fields.url({ label: "Link", validation: { isRequired: true } }),
      isExternal: fields.checkbox({
        label: "Is external link?",
        defaultValue: true,
      }),
    }),
    thumbnail: fields.image({
      label: "Thumbnail",
      description:
        "Maximum upload file size: 12MB. Recommended file size for images is <500KB.",
    }),
  },
});
