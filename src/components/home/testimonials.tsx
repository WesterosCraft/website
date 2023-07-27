import * as React from "react";
import { motion } from "framer-motion";
import { container } from "@constants/index";
import { TypographyP } from "@components/typography";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    quote:
      "There’s a map of it in each book, but the scale is just mind-boggling. It’s 650 miles just from Castle Black to Winterfell, let alone all the way to King’s Landing (2110 miles). And they don’t even have cars!",
    author: "Alex Wiltshire1",
    position: "Mojang Publishing Editor",
  },
  {
    quote: `It's hard to watch videos from Westeroscraft—the stunningly ambitious project to re-create the entire world of Game of Thrones in Minecraft—and not be impressed.`,
    author: "Jason Schreier",
    position: "Bloomberg Journalist",
  },
  {
    quote:
      "WesterosCraft is, undeniably, a tremendous accomplishment, but not simply as a vast, intricate model or simulacrum of someone else’s world. Rather, it is an immense act of creativity in its own right, a story built upon a story that the WesterosCraft community is telling together, block by block.",
    author: "Laura Hudson",
    position: "Wired Senior Editor",
  },
];

const Testimonials = () => (
  <div className='bg-primaryRed w-full relative'>
    <div className='opacity-60 bg-square-pattern absolute top-0 left-0 w-full h-full'></div>
    <div className='mx-auto py-10 md:py-12 px-2 md:px-4'>
      <motion.div
        className='flex flex-col lg:flex-row w-full justify-between items-center divide-y lg:divide-y-0 lg:divide-x'
        variants={container}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.3 }}
      >
        {testimonials.map((testi) => (
          <motion.div
            key={testi.author}
            className='flex mx-auto flex-col gap-6 lg:gap-10 text-white w-full max-w-xl px-6 py-4 relative items-center justify-center'
          >
            <div className='relative'>
              <QuoteIcon className='rotate-180' />
              <TypographyP>{testi.quote}</TypographyP>
              <QuoteIcon className='ml-auto' />
            </div>
            <div className='text-center lg:text-right w-full'>
              <TypographyP className='font-medium'>{`- ${testi.author}`}</TypographyP>
              <p>{testi.position}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default Testimonials;
