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
import { camel2title } from "@lib/utils";
import slugify from "slugify";

function getSlug(str: string) {
  return slugify(str.replace(/[A-Z]/g, "-$&"), { lower: true });
}

export function LocationCards(props) {
  const [locations, setLocations] = useState(props?.filteredLocations || []);

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

      const filtered = props.filteredLocations.filter((location) => {
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
  }, [props?.clickCount]);

  return (
    <div className='grid gap-4 grid-cols-3'>
      {locations?.map((location) => (
        <Fragment key={location?.data?.title}>
          <Card>
            <a
              href={`/locations/${getSlug(location?.data?.region)}/${
                location?.slug
              }`}
            >
              <CardHeader>
                <CardTitle>{location.data.title}</CardTitle>
                <CardDescription>
                  {camel2title(location.data.region)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
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
  );
}
