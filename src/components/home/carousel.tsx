import React, { type PropsWithChildren } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module

export default function Carousel({ children }: PropsWithChildren) {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slideChanged() {
        console.log("slide changed");
      },
    },
    [
      // add plugins here
    ]
  );

  return (
    <div ref={sliderRef} className='keen-slider'>
      {children}
    </div>
  );
}
