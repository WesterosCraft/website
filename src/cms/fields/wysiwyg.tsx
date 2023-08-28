import React from "react";
import { fields, component, NotEditable } from "@keystatic/core";

const VideoPreview = (props: any) => {
  return (
    <NotEditable>
      <div>
        <h4>{`URL: ${props?.fields?.id?.value}`}</h4>
        <img
          src={`https://i1.ytimg.com/vi/${props?.fields?.id?.value
            ?.split?.("/")
            ?.pop()}/default.jpg`}
        />
      </div>
    </NotEditable>
  );
};

const CalloutPreview = (props: any) => {
  return (
    <div>
      <NotEditable>
        <h4>{`Type: ${props?.fields?.type?.value}`}</h4>
      </NotEditable>
      <div>{props.fields.content.element}</div>
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
        content: fields.child({
          kind: "block",
          placeholder: "Content...",
          formatting: {
            inlineMarks: "inherit",
            softBreaks: "inherit",
            listTypes: "inherit",
          },
          links: "inherit",
        }),
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
