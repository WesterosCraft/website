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

const AccordionPreview = (props: any) => {
  return (
    <div>
      <NotEditable>
        <ul>
          {props?.fields?.items?.elements?.map((item) => (
            <li key={item?.key}>
              <p className='text-sm'>{item.fields.itemTrigger?.value}</p>
            </li>
          ))}
        </ul>
      </NotEditable>
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
    accordion: component({
      preview: (args) => <AccordionPreview {...args} />,
      label: "Accordion",
      schema: {
        items: fields.array(
          fields.object({
            itemTrigger: fields.text({
              label: "Item Trigger",
              description:
                "The text that goes inside the accordion button. EX: A question",
            }),
            itemContent: fields.text({
              label: "Item Content",
              multiline: true,
              description:
                "The content of the accordion item. EX: An answer to a question",
            }),
          }),
          {
            label: "Accordion Items",
            itemLabel: (props) => props.fields.itemTrigger.value,
          }
        ),
      },
    }),
  },
});
