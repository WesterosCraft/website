import { bannerGrid } from "../fields/banner-grid";
import { animatedHeader } from "../fields/animated-header";
import { fields, singleton } from "@keystatic/core";
import { buttons } from "../fields";

export const home = singleton({
  label: "Home Page",
  path: "src/content/pages/home",
  schema: {
    hero: fields.object({
      sliderImages: fields.array(
        fields.object({
          image: fields.image({
            label: "Slide image",
            directory: "src/content/pages/home",
          }),
          alt: fields.text({ label: "Alt" }),
        }),

        {
          label: "Slider Images",
          itemLabel: (props) => "Slide: " + props?.fields?.alt?.value,
          validation: {
            length: {
              min: 2,
            },
          },
        }
      ),
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
