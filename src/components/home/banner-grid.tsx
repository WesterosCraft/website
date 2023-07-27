import * as React from "react";

import { motion } from "framer-motion";
// import Image from 'next/image'
import { child, container } from "@constants/index";

const features = [
  {
    banner:
      "https://westeroscraft.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F1as7cn02%2Fproduction%2Fd50e9ca6ce0a227c9146c2e5d9a2e309de8f0939-96x192.png&w=96&q=75",
    heading: "Powered By Minecraft",
    copy: "WesterosCraft is free to explore, and always will be! All you need is the Java edition of Minecraft.",
  },
  {
    banner:
      "https://westeroscraft.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F1as7cn02%2Fproduction%2Fd50e9ca6ce0a227c9146c2e5d9a2e309de8f0939-96x192.png&w=96&q=75",

    heading: "Always Evolving",
    copy: "As Minecraft updates and evolves, so too does our server! From simple cobblestone shacks in 2011, to ornate cities in 2022, we have come a long way from our humble beginnings.",
  },
  {
    banner:
      "https://westeroscraft.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F1as7cn02%2Fproduction%2Fd50e9ca6ce0a227c9146c2e5d9a2e309de8f0939-96x192.png&w=96&q=75",

    heading: "Crafting Connections",
    copy: `We're a truly global community, united by a common goal of creating one of the most detailed Minecraft worlds ever built.`,
  },
];

const BannerGrid = () => {
  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: "-100px" }}
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10'
    >
      {features.map((feature, index) => (
        <motion.div
          variants={child}
          viewport={{ once: true, margin: "-100px" }}
          key={index}
          className='p-6 text-center'
        >
          <img
            width={75}
            height={150}
            alt={feature.heading}
            className='mx-auto'
            src={feature.banner}
          />
          <div className='text-white max-w-sm mt-0 sm:mt-4 md:mt-6 mx-auto'>
            <p className='text-primaryGold font-medium text-lg'>
              {feature.heading}
            </p>
            <p className='mt-2'>{feature.copy}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BannerGrid;
