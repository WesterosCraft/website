import { fields, collection } from "@keystatic/core";
import { wysiwyg } from "../fields";
import { REGIONS, PROJECT_STATUS, PROJECT_TYPES } from "@constants/index";

const locationSchema = fields.object({
  description: fields.text({
    label: "Description",
    description: "A short description of the location",
  }),
  region: fields.select({
    label: "Region",
    description: "The region of Westeros the location is in",
    options: REGIONS,
    defaultValue: "dorne",
  }),
  projectStatus: fields.select({
    label: "Project Status",
    description: "The status of the location",
    options: PROJECT_STATUS,
    defaultValue: "notStarted",
  }),
  projectType: fields.select({
    label: "Project Type",
    description: "The type of location",
    options: PROJECT_TYPES,
    defaultValue: "miscellaneous",
  }),
  warp: fields.text({
    label: "Warp",
    description: "In game warp, if available",
  }),
  house: fields.text({
    label: "House",
    description: "If location has a House, list it here",
  }),
  application: fields.url({
    label: "Application",
    description: "Link to users project application, if available",
  }),
  projectLeads: fields.text({
    label: "Project Lead(s)",
    description: "Leader(s) or contributors of the project",
  }),
  dateStarted: fields.date({
    label: "Date Started",
  }),
  dateCompleted: fields.date({
    label: "Date Completed",
  }),
  bannerImage: fields.cloudImage({
    label: "Banner",
    description: "A banner associated with the location",
  }),
  locationImages: fields.array(
    fields.cloudImage({
      label: "Image",
    }),
    {
      label: "Images",
      description: "Screenshots of the build",
      // itemLabel: (props) => props.value,
    }
  ),
  //   server builds
  // mega builds
  // canon projects
  // immersion build
  // mini builds (aka sub project)
  // special builds
  category: fields.select({
    label: "Category",
    description:
      "A categorization of the location in order to more accurately calculate overall project completion",
    options: [
      { label: "Server Builds", value: "1" },
      { label: "Mega Builds", value: "2" },
      { label: "Canon Builds", value: "3" },
      { label: "Immersion Builds", value: "4" },
      { label: "Mini Builds", value: "5" },
      { label: "Special Builds", value: "6" },
    ],
    defaultValue: "1",
  }),
  difficultyLevel: fields.select({
    label: "Difficulty Level",
    description:
      "A categorization of the location in order to more accurately calculate overall project completion",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
    ],
    defaultValue: "1",
  }),
  redoAvailable: fields.checkbox({
    label: "Redo Available?",
    description: "Check if this project is currently open to redo",
    defaultValue: false,
  }),
  serverProject: fields.checkbox({
    label: "Server Project?",
    description: "Check whether this project was a server wide effort",
    defaultValue: false,
  }),
  dynmapLink: fields.url({
    label: "Dynmap URL",
    description:
      "The link to a zoomed in location on Dynmap. To get the link, zoom to the location you want and click the link icon in bottom left of dynmap.",
  }),
});

export const projects = collection({
  entryLayout: "content",
  format: { contentField: "content" },
  label: "Projects",
  slugField: "title",
  path: "src/content/projects/*/",
  schema: {
    title: fields.slug({ name: { label: "Title" } }),
    parentProject: fields.relationship({
      label: "Projects",
      description:
        "If chosen, this project becomes a sub-project of the parent project",
      collection: "projects",
    }),
    projectType: fields.conditional(
      fields.select({
        label: "Project Type",
        options: [
          { label: "Select a project type", value: "none" },
          { label: "Build", value: "build" },
        ],
        defaultValue: "none",
      }),
      {
        none: fields.empty(),
        build: locationSchema,
      }
    ),
    content: wysiwyg("src/content/projects"),
  },
});
