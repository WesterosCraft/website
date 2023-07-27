// keystatic.config.ts
import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  singletons: {
    settings: singleton({
      label: "Rookery Page",
      schema: {
        editions: fields.array(
          fields.relationship({
            label: "Editions",
            description: "A list of past Rookery editions",
            collection: "rookeries",
          }),
          {
            label: "Rookeries",
            itemLabel: (props) => props.value,
          }
        ),
      },
    }),
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    rookeries: collection({
      label: "Rookeries",
      slugField: "title",
      path: "src/content/rookeries/*",
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
    }),
  },
});
