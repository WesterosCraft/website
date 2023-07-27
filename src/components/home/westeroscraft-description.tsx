import * as React from "react";
import { motion } from "framer-motion";
import { TypographyP } from "@components/typography";
import { container } from "@constants/index";

const WesteroscraftDescription = () => (
  <div className='text-center max-w-2xl mx-auto mb-24 px-4'>
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: "-100px" }}
    >
      <TypographyP className='text-white text-lg'>
        <span className='text-primaryGold'>WesterosCraft</span> is a modded
        server where visitors can explore the entire continent of Westeros and
        are free to join the community of builders bringing it to life. Wander
        the streets of King’s Landing or the fields of Highgarden. Take a flight
        through the deadly Moon Door, or even retrace the steps of your favorite
        character.
      </TypographyP>
    </motion.div>
  </div>
);

export default WesteroscraftDescription;
