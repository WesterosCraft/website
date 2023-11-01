"use client";

import React, { useState } from "react";
import { TypographyP } from "@components/typography";
import { Input } from "@components/ui/input";
import { LocationFilter } from "./location-filter";
import { LocationCards } from "./location-cards";
import { REGIONS, PROJECT_STATUS, PROJECT_TYPES } from "@constants/index";

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
}

export function LocationContent({ filteredLocations }: LocationContentProps) {
  // Used to trigger useEffect inside LocationCards component to accurately get new filters
  const [clickCount, setClickCount] = useState(0);

  return (
    <>
      <div className='sidebar block w-[222px] mr-8'>
        <div>
          <div className='mb-4'>
            <TypographyP className='font-semibold'>
              Filter Locations
            </TypographyP>
            <Input
              className='border border-primaryLightBorder bg-primaryLightShade focus-visible:ring-primaryRed'
              type='search'
              placeholder={"Search..."}
            />
          </div>
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
      <div className='cards-wrapper flex-1'>
        <LocationCards
          client:only
          filteredLocations={filteredLocations}
          clickCount={clickCount}
        />
      </div>
    </>
  );
}
