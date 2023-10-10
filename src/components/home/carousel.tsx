import React from "react";
import clsx from "clsx";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface Slide {
  image: string;
  alt: string;
}

export default function Carousel({ slides }: { slides: Slide[] }) {
  const [opacities, setOpacities] = React.useState<number[]>([]);
  const [loaded, setLoaded] = React.useState<boolean[]>([]);
  const [created, setCreated] = React.useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: slides.length,
      initial: 0,
      created() {
        setCreated(true);
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
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
    <div ref={sliderRef} className='keen-slider relative'>
      {slides.map((slide, idx) => (
        <div key={idx} className='keen-slider__slide lazy__slide relative'>
          <img
            className={clsx(
              "object-cover h-[var(--slideHeight)] bg-transparent",
              loaded[idx] ? "bg-transparent" : "hidden"
            )}
            sizes='60vw'
            src={loaded[idx] ? slide.image : ""}
            width={1100}
            height='var(--slideHeight)'
            alt={slide.alt || ""}
            style={{ opacity: opacities[idx] }}
          />
          <p className='font-esmeralda absolute text-3xl bottom-4 left-4 text-white'>
            {slide.alt || ""}
          </p>
        </div>
      ))}
      {created && instanceRef.current && (
        <div className='arrow-button absolute bottom-4 right-4 w-7 h-7 fill-white cursor-pointer'>
          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          />
        </div>
      )}
    </div>
  );
}

function Arrow(props: { disabled: boolean; onClick: (e: any) => void }) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow arrow--right ${disabeld}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
    </svg>
  );
}
