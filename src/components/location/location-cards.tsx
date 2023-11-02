"use client";

import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { camel2title } from "@lib/utils";
import slugify from "slugify";
import { LocationCard } from "./location-card.tsx";

function getSlug(str: string) {
  return slugify(str.replace(/[A-Z]/g, "-$&"), { lower: true });
}

interface LocationCardsProps {
  filteredLocations: any[];
  clickCount: number;
  view: "card" | "table";
}

export function LocationCards({
  filteredLocations,
  clickCount,
  view = "card",
}: LocationCardsProps) {
  const [locations, setLocations] = useState(filteredLocations || []);

  useEffect(() => {
    if (window) {
      const searchParams = new URLSearchParams(window.location.search);
      const filters = {};

      searchParams.forEach((value, key) => {
        if (!filters[key]) {
          filters[key] = [];
        }
        filters[key].push(value.toLowerCase());
      });

      const filtered = filteredLocations?.filter((location) => {
        let includeLocation = true;

        for (const key in filters) {
          if (Object.prototype.hasOwnProperty.call(filters, key)) {
            const filterValues = filters[key];

            if (!filterValues.includes(location.data[key]?.toLowerCase())) {
              includeLocation = false;
              break;
            }
          }
        }

        return includeLocation;
      });

      setLocations(filtered);
    }
  }, [clickCount]);

  return view === "card" ? (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
      {locations?.map((location) => (
        <LocationCard
          key={location?.data?.title}
          link={`/locations/${getSlug(location?.data?.region)}/${
            location?.slug
          }`}
          imageUrl={location?.data?.locationImages?.[0]?.src}
          title={location.data.title}
          region={camel2title(location.data.region)}
          projectStatus={camel2title(location.data?.projectStatus)}
          projectType={camel2title(location?.data?.projectType)}
        />
      ))}
    </div>
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[260px]'>Name</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations?.map((location) => (
          <TableRow key={location?.data?.title}>
            <TableCell>{location?.data?.title}</TableCell>
            <TableCell>{camel2title(location?.data?.region)}</TableCell>
            <TableCell>{camel2title(location?.data?.projectStatus)}</TableCell>
            <TableCell>{camel2title(location?.data?.projectType)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
