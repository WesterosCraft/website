import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";

// Markdoc requires type defs for each attribute.
// These should mirror the `Props` type of the component
// you are rendering.
// See Markdoc's documentation on defining attributes
// https://markdoc.dev/docs/attributes#defining-attributes
export default defineMarkdocConfig({
  tags: {
    video: {
      render: component("./src/components/rich-text/video.astro"),
      attributes: {
        platform: { type: String, default: "youtube" },
        id: { type: String },
      },
    },
    callout: {
      render: component("./src/components/rich-text/callout.astro"),
      attributes: {
        content: { type: String },
        type: { type: String, default: "default" },
      },
    },
    accordion: {
      render: component("./src/components/rich-text/richtext-accordion.astro"),
      attributes: {
        items: {
          type: Array,
        },
        type: { type: String, default: "default" },
      },
    },
  },
});
