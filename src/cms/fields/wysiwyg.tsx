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
  },
});
