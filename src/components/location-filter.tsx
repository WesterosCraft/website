"use client";

import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

interface LocationFilterProps {
  title: string;
  items: Array<{ label: string; value: string }>;
}

export function LocationFilter({ title, items }: LocationFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className='space-y-2'>
      <div className='flex items-center justify-between'>
        <CollapsibleTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='w-full flex items-center justify-start p-0 hover:bg-transparent'
          >
            <ChevronRight />
            <span className='text-md '>{title}</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className='space-y-2'>
        {items?.map((item) => (
          <CheckboxWithText
            key={item?.value}
            label={item?.label}
            value={item?.value}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function CheckboxWithText({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <label
      htmlFor={value}
      className='bg-primaryLightBorder/10 hover:bg-primaryLightBorder/30 items-top flex space-x-2 rounded-md border p-2 font-mono text-sm mb-2 transition-all cursor-pointer'
    >
      <Checkbox id={value} />
      <div className='grid gap-1.5 leading-none pointer-events-none'>
        <label
          htmlFor={value}
          className='text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          {label}
        </label>
      </div>
    </label>
  );
}
