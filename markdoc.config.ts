import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  tags: {
    video: {
      render: component("./src/components/rich-text/video.astro"),
      attributes: {
        // Markdoc requires type defs for each attribute.
        // These should mirror the `Props` type of the component
        // you are rendering.
        // See Markdoc's documentation on defining attributes
        // https://markdoc.dev/docs/attributes#defining-attributes
        platform: { type: String, default: "youtube" },
        id: { type: String },
      },
    },
    callout: {
      render: component("./src/components/rich-text/callout.astro"),
      attributes: {
        // Markdoc requires type defs for each attribute.
        // These should mirror the `Props` type of the component
        // you are rendering.
        // See Markdoc's documentation on defining attributes
        // https://markdoc.dev/docs/attributes#defining-attributes
        text: { type: String },
        type: { type: String, default: "default" },
      },
    },
  },
});
