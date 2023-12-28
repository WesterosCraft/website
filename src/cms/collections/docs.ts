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
    description: fields.text({
      label: "Description",
      description:
        "A short default description of the doc. Will be used in SEO description.",
      validation: {
        length: {
          min: 3,
        },
      },
    }),
    docCategory: fields.select({
      label: "Category",
      description: "The category of doc",
      options: DOC_CATEGORIES,
      defaultValue: "gettingStarted",
    }),
    isHidden: fields.checkbox({
      label: "Is Hidden",
      description: "Hides this doc from the navigation bar",
    }),
    // parentDoc: fields.relationship({
    //   label: "Parent Doc",
    //   description: "If applicable, select a parent doc to nest them in the nav",
    //   collection: "docs",
    // }),
    content: wysiwyg("src/content/docs"),
  },
});
