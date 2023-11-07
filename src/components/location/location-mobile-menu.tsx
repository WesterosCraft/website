"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible";
import { Button } from "@components/ui/button";
import { FILTER_ITEMS } from "./location-sidebar";
import { LocationFilter } from "./location-filter";
import { MatchSorterSearch } from "@components/match-sorter-search";
import { getSlug } from "@lib/utils";

export function LocationMobileMenu({ allLocations, setClickCount }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='mobile-menu block lg:hidden px-4 mb-8'>
      <MatchSorterSearch
        placeholder={"Search..."}
        directories={allLocations?.map((location) => ({
          title: location?.data?.title,
          route: `/locations/${getSlug(location?.data?.region)}/${
            location?.slug
          }`,
        }))}
      />
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='w-full border-b border-primaryLightBorder mt-4'
      >
        <CollapsibleTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className={`w-full flex items-center justify-between hover:bg-transparent py-8 ${
              isOpen ? "bg-primaryLightBorder/30" : ""
            }`}
          >
            <p className='text-lg font-semibold'>Filter By:</p>
            {isOpen ? <ChevronDown /> : <ChevronRight />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className='divide-y-2 divide-primaryLightBorder/70'>
          {FILTER_ITEMS?.map((item) => (
            <div className='py-3' key={item?.slug}>
              <LocationFilter
                title={item.name}
                items={item?.items}
                slug={item?.slug}
                setClickCount={setClickCount}
              />
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
