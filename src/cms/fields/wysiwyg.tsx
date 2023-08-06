import React from "react";
import { fields, component } from "@keystatic/core";

const VideoPreview = (props: any) => {
  return (
    <div>
      <h4>{`URL: ${props?.fields?.id?.value}`}</h4>
      <img
        src={`https://i1.ytimg.com/vi/${props?.fields?.id?.value
          ?.split?.("/")
          ?.pop()}/default.jpg`}
      />
    </div>
  );
};

const CalloutPreview = (props: any) => {
  return (
    <div>
      <h4>{`Type: ${props?.fields?.type?.value}`}</h4>
      <h4>{`${props?.fields?.text?.value.slice(0, 180)}...`}</h4>
    </div>
  );
};

export const wysiwyg = fields.document({
  label: "Content",
  formatting: true,
  dividers: true,
  links: true,
  images: true,
  tables: true,
  componentBlocks: {
    video: component({
      preview: (args) => <VideoPreview {...args} />,
      label: "Video",
      schema: {
        id: fields.text({
          label: "Video link",
          description:
            "Link to embed of Youtube video - example format: https://www.youtube.com/embed/youtubeIDhere ",
        }),
      },
    }),
    callout: component({
      preview: (args) => <CalloutPreview {...args} />,
      label: "Callout",
      schema: {
        text: fields.text({ label: "Text", multiline: true }),
        type: fields.select({
          label: "Type",
          options: [
            {
              label: "Default",
              value: "default",
            },
            {
              label: "Error",
              value: "error",
            },
            {
              label: "Info",
              value: "info",
            },
            {
              label: "Warning",
              value: "warning",
            },
          ],
          defaultValue: "default",
        }),
      },
    }),
  },
});
