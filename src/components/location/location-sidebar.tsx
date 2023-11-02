"use client";

import React from "react";
import { TypographyP } from "@components/typography";
import { LocationFilter } from "./location-filter";
import { REGIONS, PROJECT_STATUS, PROJECT_TYPES } from "@constants/index";
import { MatchSorterSearch } from "../match-sorter-search";
import slugify from "slugify";

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

function getSlug(str: string) {
  return slugify(str.replace(/[A-Z]/g, "-$&"), { lower: true });
}

export function LocationSidebar({ allLocations, setClickCount }: any) {
  return (
    <div className='sidebar hidden md:block w-[222px] mr-12'>
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
  );
}
