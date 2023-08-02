import { fields, collection } from "@keystatic/core";
import { wysiwyg } from "../fields";

export const locations = collection({
  entryLayout: "content",
  label: "Locations",
  slugField: "title",
  path: "src/content/locations/*/",
  format: { contentField: "content" },
  schema: {
    title: fields.slug({ name: { label: "Title" } }),
    region: fields.select({
      label: "Region",
      description: "The region of Westeros the location is in",
      options: [
        {
          label: "Dorne",
          value: "dorne",
        },
        {
          label: "Riverlands",
          value: "riverlands",
        },
        {
          label: "The Wall",
          value: "theWall",
        },
        {
          label: "North",
          value: "north",
        },
        {
          label: "Vale",
          value: "vale",
        },
        {
          label: "Iron Islands",
          value: "ironIslands",
        },
        {
          label: "Westerlands",
          value: "westerlands",
        },
        {
          label: "Crownlands",
          value: "crownlands",
        },
        {
          label: "Stormlands",
          value: "stormlands",
        },
        {
          label: "Reach",
          value: "reach",
        },
        {
          label: "Beyond The Wall",
          value: "beyondTheWall",
        },
      ],
      defaultValue: "dorne",
    }),
    projectStatus: fields.select({
      label: "Project Status",
      description: "The status of the location",
      options: [
        { label: "Completed", value: "completed" },
        { label: "In Progress", value: "inProgress" },
        { label: "Not started", value: "notStarted" },
        { label: "Abandoned", value: "abandoned" },
        { label: "Redo in progress", value: "redoInProgress" },
      ],
      defaultValue: "notStarted",
    }),
    projectType: fields.select({
      label: "Project Type",
      description: "The type of location",
      options: [
        { label: "Castle", value: "castle" },
        { label: "Town", value: "town" },
        { label: "Village", value: "village" },
        { label: "City", value: "city" },
        { label: "Holdfast", value: "holdfast" },
        { label: "Keep", value: "keep" },
        { label: "Landmark", value: "landmark" },
        { label: "Ruin", value: "ruin" },
        { label: "Tower", value: "tower" },
        { label: "Clan", value: "clan" },
        { label: "Crannog", value: "crannog" },
        { label: "Miscellaneous", value: "miscellaneous" },
      ],
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
    bannerImage: fields.image({
      label: "Banner",
      description: "A banner associated with the location",
      directory: "src/assets/banners",
      publicPath: "/assets/banners/",
    }),
    locationImages: fields.array(
      fields.image({
        label: "Banner",
        description: "A banner associated with the location",
        directory: "src/assets/banners",
        publicPath: "/assets/banners/",
      }),
      // Labelling options
      {
        label: "Images",
        description: "Screenshots of the build",
        // itemLabel: (props) => props.value,
      }
    ),
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
    dynmap: fields.object({
      zoom: fields.integer({ label: "Zoom Level" }),
      xCoord: fields.integer({ label: "X Coordinate" }),
      yCoord: fields.integer({ label: "Y Coordinate" }),
    }),
    content: wysiwyg,
  },
});
