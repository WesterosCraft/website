"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import squares from "../../assets/bright-squares.png";

export function LocationCard({
  link,
  imageUrl,
  title,
  region,
  projectStatus,
  projectType,
}) {
  return (
    <Card className='max-w-[340px] w-full hover:shadow-md overflow-hidden rounded-none bg-primaryLightShade border-primaryDark hover:border-primaryLightBorder'>
      <a href={link}>
        <CardHeader className='pl-0 pr-0 pt-0'>
          <div className='relative flex h-[180px]'>
            <img
              decoding='async'
              loading='lazy'
              src={imageUrl || squares.src}
              sizes='25vw'
              className='absolute h-full w-full left-0 top-0 right-0 bottom-0 object-cover text-transparent'
            />
          </div>
        </CardHeader>
        <CardContent className='pt-0 px-6 pb-3'>
          <CardTitle>{title}</CardTitle>
          <CardDescription className='mt-1'>{region}</CardDescription>
        </CardContent>

        <CardFooter>
          <div className='flex flex-row justify-between w-full'>
            <p>{projectStatus}</p>
            <p>{projectType}</p>
          </div>
        </CardFooter>
      </a>
    </Card>
  );
}
