import * as React from "react";

import Marquee from "react-fast-marquee";

const HeroMarquee = ({ children }: React.PropsWithChildren) => {
  return <Marquee className='py-16'>{children}</Marquee>;
};
export default HeroMarquee;
