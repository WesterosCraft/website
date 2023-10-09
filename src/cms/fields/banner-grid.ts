import { fields } from "@keystatic/core";

export const bannerGrid = fields.object(
  {
    bannerHeading: fields.text({ label: "Heading", multiline: true }),
    items: fields.array(
      fields.object({
        image: fields.image({
          label: "Image",
          directory: "src/assets/pages/home",
        }),
        subheading: fields.text({ label: "Heading" }),
        description: fields.text({ label: "Description" }),
      }),
      {
        label: "Banner Items",
        itemLabel: (props) => "Item: " + props?.fields?.subheading?.value,
      }
    ),
  },
  { label: "Banner Grid" }
);
