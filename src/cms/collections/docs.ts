import { fields, collection } from "@keystatic/core";
import { wysiwyg } from "../fields";
import { DOC_CATEGORIES } from "@constants/index";

export const docs = collection({
  entryLayout: "content",
  label: "Docs",
  slugField: "title",
  path: "src/content/docs/*/",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({
      name: {
        label: "Title",
      },
    }),
    docCategory: fields.select({
      label: "Category",
      description: "The category of doc",
      options: DOC_CATEGORIES,
      defaultValue: "gettingStarted",
    }),
    content: wysiwyg,
  },
});
