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
  setClickCount: React.Dispatch<React.SetStateAction<number>>;
  view: "card" | "table";
  setView: (e: "card" | "table") => void;
  clickCount: number;
}

export function LocationSidebar({
  allLocations,
  setClickCount,
  view,
  setView,
  clickCount,
}: LocationSidebarProps) {
  const calcCompletionPercentage = (
    completedLevel: number,
    inProgressLevel: number,
    notStartedLevel: number
  ) => {
    return Math.ceil(
      ((completedLevel + inProgressLevel / 2) /
        (completedLevel + inProgressLevel + notStartedLevel)) *
        100
    );
  };

  const numComplete = allLocations?.filter(
    (x) => x?.data?.projectStatus === "completed"
  )?.length;

  const numInProgress =
    allLocations?.filter((x) => x?.data?.projectStatus === "inProgress")
      ?.length +
    allLocations?.filter((x) => x?.data?.projectStatus === "redoInProgress")
      ?.length;

  const numNotStarted =
    allLocations?.filter((x) => x?.data?.projectStatus === "notStarted")
      ?.length +
    allLocations?.filter((x) => x?.data?.projectStatus === "abandoned")?.length;

  const percentageComplete = calcCompletionPercentage(
    numComplete,
    numInProgress,
    numNotStarted
  );

  return (
    <div className='sidebar hidden lg:block w-[222px] mr-12'>
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
      <LocationFilterOptions
        view={view}
        setView={setView}
        setClickCount={setClickCount}
      />
      <div className='my-4'></div>
      <div className='divide-y-2 divide-primaryLightBorder/60'>
        <div></div>
        {FILTER_ITEMS.map((item) => (
          <div className='py-3' key={item?.slug}>
            <LocationFilter
              title={item.name}
              items={item?.items}
              slug={item?.slug}
              setClickCount={setClickCount}
              clickCount={clickCount}
            />
          </div>
        ))}
      </div>
      <div className='border-t-2 border-primaryLightBorder/60 py-6 text-muted-foreground'>
        <p className='text-sm'>
          Westeros is an estimated{" "}
          <span className='text-primaryRed font-semibold'>
            {percentageComplete}%
          </span>{" "}
          complete
        </p>
        <div className='text-sm space-y-2 mt-4'>
          <p>
            Total Locations:{" "}
            <span className='font-semibold text-primaryDark'>
              {allLocations?.length}
            </span>
          </p>
          <p>
            Total Complete:{" "}
            <span className='font-semibold text-primaryDark'>
              {numComplete}
            </span>
          </p>
          <p>
            Total In Progress:{" "}
            <span className='font-semibold text-primaryDark'>
              {numInProgress}
            </span>
          </p>
          <p>
            Total Not Started:{" "}
            <span className='font-semibold text-primaryDark'>
              {numNotStarted}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
