import * as React from "react";
import { motion } from "framer-motion";
import { child, container } from "@constants/index";

const BannerGrid = ({ data: { items } }: any) => {
  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: "-100px" }}
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10'
    >
      {items.map((feature: any, index: number) => (
        <motion.div
          variants={child}
          viewport={{ once: true, margin: "-100px" }}
          key={index}
          className='p-6 text-center'
        >
          <img
            width={75}
            height={150}
            alt={feature.subheading}
            className='mx-auto'
            src={"../../src/assets/pages/home/" + feature.image}
          />
          <div className='text-white max-w-sm mt-0 sm:mt-4 md:mt-6 mx-auto'>
            <p className='text-primaryGold font-medium text-lg'>
              {feature.subheading}
            </p>
            <p className='mt-2'>{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BannerGrid;
