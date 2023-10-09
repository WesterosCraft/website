import { fields } from "@keystatic/core";
import { links } from "./links";

export const featuredServers = fields.object(
  {
    baratheonImage: fields.image({
      label: "Baratheon",
      directory: "src/assets/pages/home",
    }),
    targImage: fields.image({
      label: "Targaryen",
      directory: "src/assets/pages/home",
    }),
    heading: fields.text({ label: "Heading" }),
    items: fields.array(
      fields.object({
        icon: fields.image({
          label: "Icon",
          directory: "src/assets/pages/home",
        }),
        subheading: fields.text({ label: "Subheading" }),
        description: fields.text({ label: "Description" }),
        links: links,
      }),
      {
        label: "Items",
        itemLabel: (props) => "Item: " + props?.fields?.subheading?.value,
      }
    ),
  },
  { label: "Featured Servers" }
);
