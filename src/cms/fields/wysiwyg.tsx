import React from "react";
import { fields, component, NotEditable } from "@keystatic/core";

export const wysiwyg = (imageFolderLocation: string) =>
  fields.document({
    label: "Content",
    formatting: true,
    dividers: true,
    links: true,
    // layouts: [[1], [1, 1]],
    images: {
      directory: imageFolderLocation,
      publicPath: "../",
      schema: {
        title: fields.text({
          label: "Caption",
          description: "The text to display under the image in a caption.",
        }),
      },
    },
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
      stepper: component({
        preview: (args) => <StepperPreview {...args} />,
        label: "Stepper",
        schema: {
          orientation: fields.select({
            label: "Orientation",
            defaultValue: "vertical",
            options: [
              { label: "Vertical", value: "vertical" },
              { label: "Horizontal", value: "horizontal" },
            ],
          }),
          step: fields.object({
            label: fields.text({
              label: "Step Label",
            }),
            content: fields.child({
              kind: "block",
              placeholder: "Quote...",
              formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
              links: "inherit",
            }),
          }),
        },
      }),
      spoiler: component({
        preview: (args) => <SpoilerPreview {...args} />,
        label: "Spoiler",
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
        },
      }),
      relationshipCard: component({
        label: "Relationship Card",
        preview: (args) => <RelationshipCardPreview {...args} />,
        schema: {
          card: fields.conditional(
            fields.select({
              label: "Type",
              description: "Select a type of relationship",
              options: [
                {
                  label: "Select a type",
                  value: "none",
                },
                {
                  label: "Location",
                  value: "location",
                },
                {
                  label: "Doc",
                  value: "doc",
                },
              ],
              defaultValue: "none",
            }),
            {
              // "none" condition
              none: fields.empty(),
              location: fields.relationship({
                label: "Location",
                collection: "locations",
              }),
              doc: fields.relationship({
                label: "Doc",
                collection: "docs",
              }),
            }
          ),
        },
      }),
      clue: component({
        preview: (args) => <CluePreview {...args} />,
        label: "Clue",
        schema: {
          steps: fields.array(
            fields.object({
              label: fields.text({
                label: "Clue Label",
              }),
              description: fields.text({
                label: "Clue Description",
              }),
              content: fields.text({
                label: "Clue content",
                multiline: true,
              }),
              // image: fields.cloudImage({
              //   label: "Clue image",
              //   description: "A banner associated with the location",
              // }),
            }),
            {
              label: "Clues",
              itemLabel: (props) =>
                `${
                  props?.fields?.label?.value
                }: ${props?.fields?.content?.value?.slice(0, 80)}`,
            }
          ),
        },
      }),
    },
  });

const RelationshipCardPreview = (props) => {
  return (
    <NotEditable>
      <div>
        <p>{`Card: ${props?.fields.card.value.value}`}</p>
      </div>
    </NotEditable>
  );
};

const VideoPreview = (props) => {
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

const CalloutPreview = (props) => {
  return (
    <div>
      <NotEditable>
        <h4>{`Type: ${props?.fields?.type?.value}`}</h4>
      </NotEditable>
      <div>{props.fields.content.element}</div>
    </div>
  );
};

const AccordionPreview = (props) => {
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

const StepperPreview = (props) => {
  return (
    <div>
      <NotEditable>
        <h4>{`${props?.fields?.step?.fields?.label?.value}`}</h4>
      </NotEditable>
      <div>{props?.fields?.step?.fields?.content?.element}</div>
    </div>
  );
};

const SpoilerPreview = (props) => {
  return (
    <div>
      <div>{props.fields.content.element}</div>
    </div>
  );
};

const CluePreview = (props) => {
  return (
    <div>
      <NotEditable>
        <ul>
          {props?.fields?.steps?.elements?.map((step, index) => (
            <li key={step?.key}>
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                {step.fields?.label?.value || `Clue ${index + 1}`}
              </p>
              <p
                style={{
                  fontSize: "12px",
                }}
              >
                {step.fields?.content?.value?.slice(0, 80)}
              </p>
            </li>
          ))}
        </ul>
      </NotEditable>
    </div>
  );
};
