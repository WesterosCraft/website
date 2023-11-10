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
import { IS_BROWSER } from "@constants/index";
import { LocationCard } from "./location-card.tsx";

function getSlug(str: string) {
  return slugify(str.replace(/[A-Z]/g, "-$&"), { lower: true });
}

interface LocationCardsProps {
  filteredLocations: any[];
  allLocations: any[];
  clickCount: number;
  view: "card" | "table";
}

export function LocationCards({
  filteredLocations,
  clickCount,
  view = "card",
  allLocations,
}: LocationCardsProps) {
  const [locations, setLocations] = useState(filteredLocations || []);

  useEffect(() => {
    if (IS_BROWSER) {
      const searchParams = new URLSearchParams(window.location.search);

      // If the CLEAR button is hit, this useEffect triggers.
      if (searchParams?.size === 0) {
        setLocations(allLocations);
      } else {
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
    }
  }, [clickCount]);

  return view === "card" ? (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
      {locations?.map((location) => (
        <div
          key={location?.data?.title}
          className='flex items-center justify-center'
        >
          <LocationCard
            link={`/locations/${getSlug(location?.data?.region)}/${
              location?.slug
            }`}
            imageUrl={location?.data?.locationImages?.[0]?.src}
            title={location.data.title}
            region={camel2title(location.data.region)}
            projectStatus={camel2title(location.data?.projectStatus)}
            projectType={camel2title(location?.data?.projectType)}
          />
        </div>
      ))}
    </div>
  ) : (
    <Table>
      <TableHeader>
        <TableRow className='hover:bg-primaryLightBorder/20'>
          <TableHead className='w-[260px]'>Name</TableHead>
          <TableHead>Region</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations?.map((location) => (
          <TableRow
            key={location?.data?.title}
            className='hover:bg-primaryLightBorder/20'
          >
            <TableCellWithLink
              region={location?.data?.region}
              slug={location.slug}
            >
              {location?.data?.title}
            </TableCellWithLink>
            <TableCellWithLink
              region={location?.data?.region}
              slug={location.slug}
            >
              {camel2title(location?.data?.region)}
            </TableCellWithLink>
            <TableCellWithLink
              region={location?.data?.region}
              slug={location.slug}
            >
              {camel2title(location?.data?.projectStatus)}
            </TableCellWithLink>
            <TableCellWithLink
              region={location?.data?.region}
              slug={location.slug}
            >
              {camel2title(location?.data?.projectType)}
            </TableCellWithLink>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TableCellWithLink({ children, region, slug }: any) {
  return (
    <TableCell className='p-0'>
      <a
        className='block space-x-4 p-4'
        href={`/locations/${getSlug(region)}/${slug}`}
      >
        {children}
      </a>
    </TableCell>
  );
}
