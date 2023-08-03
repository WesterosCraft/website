import { bannerGrid } from "./../fields/banner-grid";
import { animatedHeader } from "./../fields/animated-header";
import { fields, singleton } from "@keystatic/core";
import { buttons } from "./../fields";

export const home = singleton({
  label: "Home Page",
  path: "src/content/pages/home",
  schema: {
    hero: fields.object({
      heroImage: fields.image({
        label: "Hero Image",
      }),
      heading: fields.text({ label: "Heading" }),
      subheading: fields.text({ label: "Subheading" }),
      buttons,
    }),
    animatedHeader1: animatedHeader,
    bannerGrid,
  },
});
