import { fields } from "@keystatic/core";

// Single link
export const link = fields.object({
  linkText: fields.text({ label: "Link Text" }),
  isExternal: fields.conditional(
    // First, we define a checkbox to drive the yes/no condition
    fields.checkbox({
      label: "Check if link is external or not",
      defaultValue: true,
    }),
    // Then, we provide a set of fields for both the `true` and `false` scenarios
    {
      true: fields.url({ label: "External Link" }),
      // Empty fields are useful to show... no fields!
      false: fields.relationship({
        label: "Internal Link",
        collection: "locations",
      }),
    }
  ),
});

// Multiple links
export const links = fields.array(link, {
  label: "Links",
  itemLabel: (props) => "Link: " + props?.fields?.linkText?.value,
});
