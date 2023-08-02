import { fields } from "@keystatic/core";

// Single button
export const button = fields.object({
  buttonText: fields.text({ label: "Button Text" }),
  buttonType: fields.select({
    label: "Button Type",
    defaultValue: "primary",
    options: [
      { value: "primary", label: "Primary" },
      { value: "secondary", label: "Secondary" },
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
        label: "Internal Link",
        collection: "locations",
      }),
    }
  ),
});

// Multiple buttons
export const buttons = fields.array(button, {
  label: "Buttons",
  // itemLabel: (props) => props.value,
});
