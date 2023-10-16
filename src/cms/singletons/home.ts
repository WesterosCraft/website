import { link, links } from "./../fields/links";
import { featuredServers } from "./../fields/featured-servers";
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
            directory: "src/assets/pages/home",
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
    featuredServers,
    video: fields.object(
      {
        heading: fields.text({ label: "Heading" }),
        description: fields.text({ label: "Description", multiline: true }),
        videoUrl: fields.url({ label: "Video Url" }),
        thumbnail: fields.image({
          label: "Thumbnail image",
          directory: "src/assets/pages/home",
        }),
      },
      { label: "Video Block" }
    ),
    featuredLocations: fields.object(
      {
        heading: fields.text({ label: "Heading" }),
        highlight: fields.text({
          label: "Highlight",
          description: "Choose a portion of the heading string to highlight",
        }),
        description: fields.text({ label: "Description", multiline: true }),
        links,
        imageGrid: fields.array(
          fields.image({
            label: "Image",
            directory: "src/assets/pages/home",
          }),
          {
            label: "Image Grid",
          }
        ),
      },
      { label: "Featured Locations Block" }
    ),
    alternatingFeatures: fields.object(
      {
        features: fields.array(
          fields.object({
            heading: fields.text({ label: "Heading" }),
            description: fields.text({ label: "Description", multiline: true }),
            link,
            image: fields.image({
              label: "Image",
              directory: "src/assets/pages/home",
            }),
          }),
          {
            itemLabel: (props) => "Feature: " + props?.fields?.heading?.value,
          }
        ),
      },
      {
        label: "Alternating Features Block",
      }
    ),
    testimonials: fields.array(
      fields.object(
        {
          quote: fields.text({ label: "Quote", multiline: true }),
          author: fields.text({ label: "Author" }),
          source: fields.text({ label: "Source" }),
        },
        { label: "Testimonial" }
      ),
      {
        label: "Testimonials Block",
        itemLabel: (props) => "Quote: " + props?.fields?.author?.value,
      }
    ),
  },
});
