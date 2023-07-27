import * as React from "react";

import { motion } from "framer-motion";
// import NextImage from "next/image";
import { AspectRatio } from "@components/ui/aspect-ratio";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@components/typography";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";

const features = [
  {
    heading: "Tour Westeros from your browser",
    subheading:
      "View our custom live map of our server, with high resolution details a zoom away.",
    src: "https://westeroscraft.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F1as7cn02%2Fproduction%2F0e8b94bda8d0bd03b5e79d076c993064639f7d4a-1755x1251.png%3Fq%3D100&w=750&q=75",
    linkText: "View the Map",
    link: "",
  },
  {
    heading: "Keep up with the community",
    subheading:
      "The Rookery is a community created magazine that details all the latest happenings in the realm of WesterosCraft. Sign up to keep up to date with the server!",
    src: "https://westeroscraft.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F1as7cn02%2Fproduction%2F0e8b94bda8d0bd03b5e79d076c993064639f7d4a-1755x1251.png%3Fq%3D100&w=750&q=75",
    linkText: "Read the Rookery",
    link: "",
  },
];

const AlternatingFeature = () => {
  const getDirection = (i: number) =>
    i % 2 === 0
      ? "flex-col-reverse lg:flex-row"
      : "flex-col-reverse lg:flex-row-reverse";

  return (
    <>
      {features.map((feat, index) => (
        <div
          key={index}
          className={`flex ${getDirection(index)} gap-0 lg:gap-12`}
        >
          <motion.div
            className='w-full overflow-hidden'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
          >
            <div className='max-h-[280px] lg:max-h-[400px] pointer-events-none'>
              <AspectRatio ratio={16 / 9}>
                <img
                  src={feat.src}
                  alt={feat.subheading}
                  //   fill
                  style={{ objectFit: "cover" }}
                />
              </AspectRatio>
            </div>
          </motion.div>
          <div className='lg:w-[32rem] mx-6 md:mx-8 lg:mx-0 px-6 md:px-8 lg:px-0 py-6 md:py-8 lg:py-12'>
            <div className='flex flex-col gap-8 lg:gap-10'>
              <div className='flex flex-col gap-2 lg:gap-4'>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.3 }}
                >
                  <TypographyH2>{feat.heading}</TypographyH2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.5 }}
                >
                  <TypographyP>{feat.subheading}</TypographyP>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant='link'
                  className='p-0 text-lg text-primaryRed hover:text-red-800 hover:fill-red-800'
                >
                  {feat.linkText} <ArrowRight />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AlternatingFeature;
