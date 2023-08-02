import { fields, collection } from "@keystatic/core";
import { wysiwyg } from "../fields";

export const guides = collection({
  label: "Guides",
  slugField: "title",
  path: "src/content/guides/*/",
  schema: {
    title: fields.slug({
      name: {
        label: "Title",
      },
    }),
    content: wysiwyg,
  },
});
