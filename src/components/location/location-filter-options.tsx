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

export function LocationFilterOptions({
  view,
  setView,
}: {
  view: "card" | "table";
  setView: (e: "card" | "table") => void;
}) {
  const [queryParamsCount, setQueryParamsCount] = useState(0);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const queryParamsKeysArray = [...urlParams.keys()];
    const queryParamsCount = queryParamsKeysArray.length;

    setQueryParamsCount(queryParamsCount);
  }, [window.location.search]);

  const clearButton = () => {
    window.location.href = "/locations";
  };
  return (
    <>
      <div>
        {queryParamsCount > 0 && (
          <Button onClick={clearButton} variant='outline' size='sm'>
            Clear Filters
          </Button>
        )}
      </div>
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
              <SelectItem value='card'>Card</SelectItem>
              <SelectItem value='table'>Table</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
