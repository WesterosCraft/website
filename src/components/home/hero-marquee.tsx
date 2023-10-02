import * as React from "react";

import Marquee from "react-fast-marquee";

const HeroMarquee = ({ children }) => {
  return (
    <Marquee className='py-16'>
      {/* <div className='mx-[30px] h-[240px] w-[340px] bg-primaryRed' />
      <div className='mx-[30px] h-[240px] w-[340px] bg-primaryRed' />
      <div className='mx-[30px] h-[240px] w-[340px] bg-primaryRed' />
      <div className='mx-[30px] h-[240px] w-[340px] bg-primaryRed' />
      <div className='mx-[30px] h-[240px] w-[340px] bg-primaryRed' />
      <div className='mx-[30px] h-[240px] w-[340px] bg-primaryRed' />
      <div className='mx-[30px] h-[240px] w-[340px] bg-primaryRed' />
      <div className='mx-[30px] h-[240px] w-[340px] bg-primaryRed' />
      <div className='mx-[30px] h-[240px] w-[340px] bg-primaryRed' />
      <div className='mx-[30px] h-[240px] w-[340px] bg-primaryRed' />
      <div className='mx-[30px] h-[240px] w-[340px] bg-primaryRed' /> */}
      {children}
    </Marquee>
  );
};
export default HeroMarquee;
