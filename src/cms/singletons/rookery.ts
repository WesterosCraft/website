import { fields, singleton } from "@keystatic/core";

export const rookery = singleton({
  label: "Rookery Page",
  path: "src/content/pages/rookery",
  schema: {
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
  },
});
