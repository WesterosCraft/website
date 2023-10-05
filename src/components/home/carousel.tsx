import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module
import heroImage from "../../assets/pages/home/hero/heroImage.webp";
import pykeImage from "../../assets/pages/home/hero/pyke.webp";

const SLIDES = [
  { img: heroImage, name: "Kings Landing1" },
  { img: pykeImage, name: "Pyke" },
  { img: heroImage, name: "Kings Landing3" },
  { img: heroImage, name: "Kings Landing4" },
  { img: pykeImage, name: "Pyke" },
  { img: heroImage, name: "Kings Landing5" },
];

export default function Carousel() {
  const [opacities, setOpacities] = React.useState<number[]>([]);
  const [loaded, setLoaded] = React.useState<boolean[]>([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: SLIDES.length,
      initial: 0,
      animationEnded(s) {
        setCurrentSlide(s.track.details.rel);
      },
      detailsChanged(s) {
        const new_opacities = s.track.details.slides.map(
          (slide) => slide.portion
        );
        setOpacities(new_opacities);
      },
    },
    [
      // add plugins here
    ]
  );

  React.useEffect(() => {
    const new_loaded = [...loaded];
    new_loaded[currentSlide] = true;
    setLoaded(new_loaded);
  }, [currentSlide]);

  return (
    <div ref={sliderRef} className='keen-slider'>
      {SLIDES.map((slide, idx) => (
        <div key={idx} className='keen-slider__slide lazy__slide relative'>
          <img
            className='object-cover h-[660px]'
            sizes='60vw'
            src={loaded[idx] ? slide.img.src : ""}
            width={912}
            height={660}
            alt={slide.name}
            style={{ opacity: opacities[idx] }}
          />
          <p className='absolute text-2xl bottom-4 left-4 text-white'>
            {slide.name}
          </p>
        </div>
      ))}
    </div>
  );
}
