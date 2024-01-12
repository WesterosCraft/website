import { fields } from "@keystatic/core";

// Single button
export const button = fields.object({
  buttonText: fields.text({ label: "Button Text" }),
  buttonType: fields.select({
    label: "Button Type",
    defaultValue: "default",
    options: [
      { value: "default", label: "Primary" },
      { value: "secondary", label: "Secondary" },
      { value: "outline", label: "Outline" },
    ],
  }),
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
        label: "Doc Link",
        collection: "docs",
      }),
    }
  ),
});

// Multiple buttons
export const buttons = fields.array(button, {
  label: "Buttons",
  itemLabel: (props) => "Button: " + props?.fields?.buttonText?.value,
});
