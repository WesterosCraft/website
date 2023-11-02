"use client";

import React, { useEffect, useState } from "react";
import { TypographyP } from "@components/typography";
import { LocationFilter } from "./location-filter";
import { LocationCards } from "./location-cards";
import { REGIONS, PROJECT_STATUS, PROJECT_TYPES } from "@constants/index";
import { MatchSorterSearch } from "./match-sorter-search";
import slugify from "slugify";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { camel2title } from "@lib/utils";

const filterItems = [
  {
    name: "Region",
    slug: "region",
    items: REGIONS,
  },
  {
    name: "Status",
    slug: "projectStatus",
    items: PROJECT_STATUS,
  },
  {
    name: "Type",
    slug: "projectType",
    items: PROJECT_TYPES,
  },
];

interface LocationContentProps {
  filteredLocations: any[];
  allLocations: any[];
}

function getSlug(str: string) {
  return slugify(str.replace(/[A-Z]/g, "-$&"), { lower: true });
}

export function LocationContent({
  filteredLocations,
  allLocations,
}: LocationContentProps) {
  const [view, setView] = useState<"card" | "table">("card");
  // Used to trigger useEffect inside LocationCards component to accurately get new filters
  const [clickCount, setClickCount] = useState(0);
  const [queryParamsCount, setQueryParamsCount] = useState(0);
  const clearButton = () => {
    window.location.href = "/locations";
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const queryParamsKeysArray = [...urlParams.keys()];
    const queryParamsCount = queryParamsKeysArray.length;

    setQueryParamsCount(queryParamsCount);
  }, [window.location.search]);

  return (
    <>
      <div className='sidebar block w-[222px] mr-12'>
        <div>
          <div>
            <div className='flex flex-row justify-between space-x-4'>
              <TypographyP className='font-semibold text-sm'>
                Find Locations
              </TypographyP>
            </div>
            <MatchSorterSearch
              placeholder={"Search..."}
              directories={allLocations?.map((location) => ({
                title: location?.data?.title,
                route: `/locations/${getSlug(location?.data?.region)}/${
                  location?.slug
                }`,
              }))}
            />
          </div>
          <div className='my-4'></div>
          <div className='divide-y-2'>
            <div></div>
            {filterItems.map((item) => (
              <div className='py-3' key={item?.slug}>
                <LocationFilter
                  title={item.name}
                  items={item?.items}
                  slug={item?.slug}
                  setClickCount={setClickCount}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=' w-full flex-1'>
        <div className='flex flex-row justify-between mb-4 items-end'>
          <div>
            {queryParamsCount > 0 && (
              <Button onClick={clearButton} variant='outline' size='sm'>
                Clear Filters
              </Button>
            )}
          </div>
          <div>
            <TypographyP className='font-semibold text-sm'>
              Change View
            </TypographyP>
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
        </div>
        <div className='cards-wrapper w-full flex-1'>
          <LocationCards
            view={view}
            filteredLocations={filteredLocations}
            clickCount={clickCount}
          />
        </div>
      </div>
    </>
  );
}

export function LocationContentFallback() {
  return <div className='h-20 w-20 bg-red-500'></div>;
}
