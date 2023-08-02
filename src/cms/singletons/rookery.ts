import { config, fields, collection, singleton } from "@keystatic/core";

export const rookery = singleton({
  label: "Rookery Page",
  path: "src/content/pages/",
  schema: {
    editions: fields.array(
      fields.relationship({
        label: "Editions",
        description: "A list of past Rookery editions",
        collection: "rookeries",
      }),
      {
        label: "Rookeries",
        itemLabel: (props) => props.value || "",
      }
    ),
  },
});
