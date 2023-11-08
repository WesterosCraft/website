"use client";

import React, { useEffect, useState } from "react";
import { TypographyP } from "@components/typography";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { camel2title } from "@lib/utils";
import { XSquare } from "lucide-react";
import { IS_BROWSER } from "@constants/index";

export function LocationFilterOptions({
  view,
  setView,
  setClickCount,
}: {
  view: "card" | "table";
  setView: (e: "card" | "table") => void;
  setClickCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [queryParamsCount, setQueryParamsCount] = useState(0);

  useEffect(() => {
    if (IS_BROWSER) {
      const queryString = window?.location.search;
      const urlParams = new URLSearchParams(queryString);

      const queryParamsKeysArray = [...urlParams.keys()];
      const queryParamsCount = queryParamsKeysArray.length;

      setQueryParamsCount(queryParamsCount);
    }
  }, [IS_BROWSER && window.location.search]);

  const clearButton = () => {
    if (IS_BROWSER) {
      const newUrl = `/locations`;
      window?.history.replaceState(null, "", newUrl);
      setClickCount((prevClickCount: number) => prevClickCount + 1);
    }
  };
  return (
    <div className='flex flex-row justify-between items-end mb-4'>
      <div>
        <TypographyP className='font-semibold text-sm'>Change View</TypographyP>
        <Select
          defaultValue='card'
          onValueChange={(value: "card" | "table") => setView(value)}
        >
          <SelectTrigger className='px-3 py-2 text-xs bg-transparent h-7 bg-primaryLightShade border-primaryLightBorder rounded-none w-[145px]'>
            <SelectValue placeholder={camel2title(view)} />
          </SelectTrigger>
          <SelectContent className='bg-primaryLightShade'>
            <SelectGroup>
              <SelectItem
                className='hover:bg-primaryLightBorder/20'
                value='card'
              >
                Card
              </SelectItem>
              <SelectItem
                className='hover:bg-primaryLightBorder/20'
                value='table'
              >
                Table
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        {queryParamsCount > 0 && (
          <Button
            onClick={clearButton}
            className='h-[28px] text-xs'
            variant='outline'
            size='xs'
          >
            <XSquare strokeWidth={1} size={16} />
            <span className='ml-1'>Clear</span>
          </Button>
        )}
      </div>
    </div>
  );
}
