"use client";

import React, { useState } from "react";
import { LocationCards } from "./location-cards";
import LocationSidebar from "./location-sidebar.astro";
import { LocationMobileMenu } from "./location-mobile-menu";

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
      <div className='flex flex-col space-y-4'>
        <LocationSidebar
          allLocations={allLocations}
          setClickCount={setClickCount}
          view={view}
          setView={setView}
        />
      </div>
      <div className='flex-1'>
        <LocationMobileMenu
          allLocations={allLocations}
          setClickCount={setClickCount}
        />

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
