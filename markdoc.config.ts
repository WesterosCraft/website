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
    stepper: {
      render: component("./src/components/rich-text/stepper/stepper.astro"),
      attributes: {
        steps: {
          type: Array,
        },
        orientation: {
          type: String,
          default: "vertical",
          required: true,
          matches: ["vertical", "horizontal"],
        },
      },
    },
    spoiler: {
      render: component("./src/components/rich-text/spoiler.astro"),
      attributes: {
        content: { type: String },
      },
    },
    relationshipCard: {
      render: component("./src/components/rich-text/relationship-card.astro"),
      attributes: {
        card: {
          type: Object,
          // default: "none",
          // required: true,
          // matches: ["location", "doc", "none"],
        },
      },
    },
    clue: {
      render: component("./src/components/rich-text/clue.astro"),
      attributes: {
        steps: {
          type: Array,
        },
      },
    },
  },
});
