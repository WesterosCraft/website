import * as React from "react";

import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";

interface Props {
  items: {
    itemTrigger: string;
    itemContent: string;
  }[];
}

export function Accordion({ items }: Props) {
  return (
    <BaseAccordion type='single' collapsible className='w-full'>
      {items?.map((item, i) => {
        return (
          <AccordionItem key={i} value={`item-${i.toFixed()}`}>
            <AccordionTrigger>{item?.itemTrigger || ""}</AccordionTrigger>
            <AccordionContent>
              {item?.itemContent}
              {/* <Prose>
                <slot />
              </Prose> */}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </BaseAccordion>
  );
}
