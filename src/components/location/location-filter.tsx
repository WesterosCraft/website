"use client";

import React, { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible";
import { Button } from "../ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";

interface LocationFilterProps {
  title: string;
  items: Array<{ label: string; value: string }>;
  slug: string;
  setClickCount: (arg: number) => void;
  clickCount: number;
}

export function LocationFilter({
  title,
  items,
  slug,
  clickCount,
  setClickCount,
}: LocationFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [numberOfTags, setNumberOfTags] = useState(0);

  const counter = (params: URLSearchParams) => {
    let count = 0;

    for (const key of params.keys()) {
      if (key === slug) {
        count++;
      }
    }

    setNumberOfTags(count);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const regionParams = queryParams.getAll(slug);
    const regionCount = regionParams.length;
    setNumberOfTags(regionCount);
  }, [clickCount]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className='space-y-2'>
      <div className='flex items-center justify-between'>
        <CollapsibleTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='w-full flex items-center justify-start p-0 hover:bg-transparent'
          >
            {isOpen ? <ChevronDown /> : <ChevronRight />}
            <div className='flex flex-row justify-between w-full ml-2'>
              <span className='text-md'>{title}</span>
              {numberOfTags <= 0 ? null : (
                <span className='bg-red'>
                  <Badge variant='destructive'>{numberOfTags}</Badge>
                </span>
              )}
            </div>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className='space-y-2'>
        {items?.map((item) => (
          <CheckboxWithText
            key={item?.value}
            label={item?.label}
            value={item?.value}
            slug={slug}
            clickHandler={counter}
            setClickCount={setClickCount}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function CheckboxWithText({
  label,
  value,
  slug,
  clickHandler,
  setClickCount,
}: {
  label: string;
  value: string;
  slug: string;
  clickHandler: (params: URLSearchParams) => void;
  setClickCount: (arg: number) => void;
}) {
  const urlParams = new URLSearchParams(window.location.search);

  const handleClick = (paramName: string, paramValue: string) => {
    const urlParams = new URLSearchParams(window.location.search);

    const paramValues = urlParams.getAll(paramName);

    if (paramValues.includes(paramValue)) {
      urlParams.delete(paramName, paramValue);
    } else {
      urlParams.append(paramName, paramValue);
    }

    clickHandler(urlParams);
    // @ts-ignore
    setClickCount((prevClickCount) => prevClickCount + 1);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  return (
    <label
      htmlFor={value}
      className='location-filter-checkbox bg-primaryLightBorder/10 hover:bg-primaryLightBorder/30 items-top flex space-x-2 rounded-md border p-2 font-mono text-sm mb-2 transition-all cursor-pointer'
    >
      <Checkbox
        id={value}
        value={value}
        checked={urlParams?.getAll(slug).includes(value)}
        onClick={() => handleClick(slug, value)}
        // className="location-filter-checkbox"
      />
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
