import * as React from "react";
import { motion } from "framer-motion";

export const AnimatedLetters = ({ text }: { text: string }) => {
  // splitting text into letters
  const letters = Array.from(text);

  // Variants for Container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.03,
        delayChildren: 0.04 * i,
      },
    }),
  };

  // Variants for each letter
  const child = {
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
  };

  return (
    <motion.div
      whileInView='visible'
      viewport={{ once: true }}
      variants={container}
      initial='hidden'
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};
