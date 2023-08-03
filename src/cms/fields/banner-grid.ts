import { fields } from "@keystatic/core";

export const bannerGrid = fields.object({
  bannerHeading: fields.text({ label: "Heading", multiline: true }),
  items: fields.array(
    fields.object({
      image: fields.image({ label: "Image" }),
      subheading: fields.text({ label: "Heading" }),
      description: fields.text({ label: "Description" }),
    }),
    {
      label: "Items",
      itemLabel: (props) => "Item: " + props?.fields?.subheading?.value,
    }
  ),
});
