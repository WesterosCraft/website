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
        directory: "src/assets/pages/home",
        validation: {
          isRequired: true,
        },
      }),
      heading: fields.text({ label: "Heading" }),
      highlighted: fields.text({
        label: "Highlighted",
        description:
          "The portion of the heading that is highlighted a different color",
      }),
      subheading: fields.text({ label: "Subheading" }),
      buttons,
    }),

    animatedHeader1: animatedHeader,
    bannerGrid,
  },
});
