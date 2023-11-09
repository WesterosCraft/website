import * as React from "react";

import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import Prose from "@components/prose.astro";

interface Props {
  data: {
    itemTrigger: string;
    itemContent: string;
  }[];
}

export function Accordion({ data }: Props) {
  return (
    <BaseAccordion type='single' collapsible className='w-full'>
      {data?.map((item, i) => {
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
