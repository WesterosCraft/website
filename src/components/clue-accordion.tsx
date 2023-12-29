import * as React from "react";

import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";

interface Props {
  steps: {
    label?: string;
    description?: string;
    content?: string;
  }[];
}

export function ClueAccordion({ steps }: Props) {
  return (
    <BaseAccordion type='multiple' className='w-full'>
      {steps?.map((step, index) => {
        return (
          <AccordionItem key={index} value={`item-${index.toFixed()}`}>
            <AccordionTrigger>
              {step?.label || `Clue ${index + 1}`}
              {step?.description && <span>{step.description}</span>}
            </AccordionTrigger>
            <AccordionContent>{step?.content}</AccordionContent>
          </AccordionItem>
        );
      })}
    </BaseAccordion>
  );
}
