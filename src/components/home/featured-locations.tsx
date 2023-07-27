// import NextImage from 'next/image'
// import { ContainerBorder } from "./bordered-container";
import * as React from "react";
import { TypographyH2, TypographyP } from "@components/typography";
import { motion } from "framer-motion";
import { child, container } from "@constants/index";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";

const links = [
  {
    heading: "Locations",
    description:
      "View a single comprehensive list of every build we have to offer.",
    linkText: "Read More",
    link: "",
    isDisabled: false,
  },
  {
    heading: "Guides",
    description:
      "View a single comprehensive list of every build we have to offer.",
    linkText: "Read More",
    link: "",
    isDisabled: false,
  },
  {
    heading: "Blocks",
    description:
      "View a single comprehensive list of every build we have to offer.",
    linkText: "Read More",
    link: "",
    isDisabled: true,
  },
];

const images = [
  {
    src: "https://cdn.sanity.io/images/1as7cn02/production/71588b25aec5b038d5da477bdf1a17698c6157c1-1920x1017.png?w=384&h=355&q=100&fit=crop&crop=center",
  },
  {
    src: "https://cdn.sanity.io/images/1as7cn02/production/71588b25aec5b038d5da477bdf1a17698c6157c1-1920x1017.png?w=384&h=355&q=100&fit=crop&crop=center",
  },
  {
    src: "https://cdn.sanity.io/images/1as7cn02/production/71588b25aec5b038d5da477bdf1a17698c6157c1-1920x1017.png?w=384&h=355&q=100&fit=crop&crop=center",
  },
  {
    src: "https://cdn.sanity.io/images/1as7cn02/production/71588b25aec5b038d5da477bdf1a17698c6157c1-1920x1017.png?w=384&h=355&q=100&fit=crop&crop=center",
  },
];

const FeaturedLocations = () => {
  return (
    <>
      <div className='max-w-md'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
        >
          <TypographyH2>
            Over <span className='text-primaryRed'>400 locations</span> to
            discover
          </TypographyH2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5 }}
        >
          <TypographyP>
            Our community is well on our way to having a fully explorable map.
            You can keep up with our progress in game anytime, or start
            exploring our expansive Wiki.
          </TypographyP>
        </motion.div>

        <motion.div
          className='mt-12'
          variants={container}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
        >
          {links.map((link) => (
            <motion.div
              key={link.heading}
              variants={child}
              viewport={{ once: true, margin: "-100px" }}
              className='pt-4 border-t-[1px] border-gray-200'
            >
              <TypographyP className='font-medium'>{link.heading}</TypographyP>
              <TypographyP className='text-sm !mt-2'>
                {link.description}
              </TypographyP>
              <div className='flex mt-3 mb-2 justify-end sm:justify-start'>
                {link?.isDisabled ? (
                  <Button
                    variant='link'
                    className='p-0 text-primaryRed hover:text-red-800 hover:fill-red-800'
                    disabled
                  >
                    {link.linkText}
                    <ArrowRight size='18' />
                  </Button>
                ) : (
                  <Button
                    variant='link'
                    className='p-0 text-primaryRed hover:text-red-800 hover:fill-red-800'
                  >
                    {link.linkText}
                    <ArrowRight size='18' />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        className='grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8'
        variants={container}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.3 }}
      >
        {images.map((image, i) => (
          <motion.div
            variants={child}
            viewport={{ once: true, margin: "-100px" }}
            key={i}
          >
            <img
              key={image.src}
              width={355}
              height={355}
              src={image.src}
              alt='asd'
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default FeaturedLocations;
