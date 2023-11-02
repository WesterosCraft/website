"use client";

import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
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
import squares from "../assets/bright-squares.png";

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
    <div className='grid gap-4 grid-cols-3'>
      {locations?.map((location) => (
        <Fragment key={location?.data?.title}>
          <Card className='hover:shadow-md overflow-hidden rounded-none bg-primaryLightShade border-primaryLightBorder'>
            <a
              href={`/locations/${getSlug(location?.data?.region)}/${
                location?.slug
              }`}
            >
              <CardHeader className='pl-0 pr-0 pt-0 '>
                <div className='relative flex h-[180px]'>
                  <img
                    decoding='async'
                    loading='lazy'
                    src={
                      location?.data?.locationImages?.[0]?.src || squares.src
                    }
                    sizes='25vw'
                    className='absolute h-full w-full left-0 top-0 right-0 bottom-0 object-cover text-transparent'
                  />
                </div>
              </CardHeader>
              <CardContent className='pt-0 px-6 pb-3'>
                <CardTitle>{location.data.title}</CardTitle>
                <CardDescription>
                  {camel2title(location.data.region)}
                </CardDescription>
              </CardContent>

              <CardFooter>
                <div className='flex flex-row justify-between w-full'>
                  <p>{camel2title(location.data?.projectStatus)}</p>
                  <p>{camel2title(location?.data?.projectType)}</p>
                </div>
              </CardFooter>
            </a>
          </Card>
        </Fragment>
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
