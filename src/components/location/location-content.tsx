"use client";

import React, { useState } from "react";
import { LocationCards } from "./location-cards";
import { LocationFilterOptions } from "./location-filter-options";
import { LocationSidebar } from "./location-sidebar";

interface LocationContentProps {
  filteredLocations: any[];
  allLocations: any[];
}

export function LocationContent({
  filteredLocations,
  allLocations,
}: LocationContentProps) {
  const [view, setView] = useState<"card" | "table">("card");
  // Used to trigger useEffect inside LocationCards component to accurately get new filters
  const [clickCount, setClickCount] = useState(0);

  return (
    <>
      <LocationSidebar
        allLocations={allLocations}
        setClickCount={setClickCount}
      />
      <div className='flex-1'>
        <div className='flex flex-row justify-between mb-4 items-end'>
          <LocationFilterOptions view={view} setView={setView} />
        </div>
        <div className='cards-wrapper flex-1'>
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
