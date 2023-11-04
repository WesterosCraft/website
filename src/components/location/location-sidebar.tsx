"use client";

import React from "react";
import { TypographyP } from "@components/typography";
import { LocationFilter } from "./location-filter";
import { REGIONS, PROJECT_STATUS, PROJECT_TYPES } from "@constants/index";
import { MatchSorterSearch } from "../match-sorter-search";
import { getSlug } from "@lib/utils";
import { LocationFilterOptions } from "./location-filter-options";

export const FILTER_ITEMS = [
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

interface LocationSidebarProps {
  allLocations: any[];
  setClickCount: (el: number) => void;
  view: "card" | "table";
  setView: (e: "card" | "table") => void;
}

export function LocationSidebar({
  allLocations,
  setClickCount,
  view,
  setView,
}: LocationSidebarProps) {
  return (
    <div className='sidebar hidden lg:block w-[222px] mr-12'>
      <LocationFilterOptions view={view} setView={setView} />
      <div>
        <div className='flex flex-row justify-between space-x-4'>
          <TypographyP className='font-semibold text-sm'>
            Find Location
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
      <div className='divide-y-2 divide-primaryLightBorder'>
        <div></div>
        {FILTER_ITEMS.map((item) => (
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
  );
}
