import React from "react";
import clsx from "clsx";
import { useKeenSlider } from "keen-slider/react";
import { ExternalLink } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import { Button } from "@components/ui/button";

interface Slide {
  image: string;
  alt: string;
  slideText: string;
  originalUrl?: string;
}

interface CarouselProps {
  slides: Slide[];
  showDots?: boolean;
  slideHeight?: number;
  hideLeftArrow?: boolean;
  linkImageExternally?: boolean;
}

export default function Carousel({
  slides,
  showDots,
  slideHeight,
  hideLeftArrow,
  linkImageExternally,
}: CarouselProps) {
  const [opacities, setOpacities] = React.useState<number[]>([]);
  const [loaded, setLoaded] = React.useState<boolean[]>([]);
  const [created, setCreated] = React.useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: slides && slides.length,
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
    <div>
      <div
        ref={sliderRef}
        className={clsx(
          "keen-slider relative",
          slideHeight
            ? `min-h-[${slideHeight}px]`
            : "min-h-[var(--slideHeight)]"
        )}
      >
        {slides?.map((slide, idx) => (
          <div key={idx} className='keen-slider__slide lazy__slide relative'>
            <img
              className={clsx(
                `object-cover bg-transparent min-h-full min-w-full`,
                loaded[idx] ? "bg-transparent" : "hidden"
              )}
              sizes='60vw'
              src={loaded[idx] ? slide.image : ""}
              alt={slide.alt || ""}
              style={{ opacity: opacities[idx] }}
            />
            {slide?.slideText && (
              <p className='font-esmeralda absolute text-3xl bottom-4 left-4 text-white'>
                {slide.slideText || ""}
              </p>
            )}
            {linkImageExternally && (
              <div className='absolute top-2 right-2 fill-white'>
                <a href={slide?.originalUrl} target='_blank' rel='noreferrer'>
                  <Button
                    variant='ghost'
                    className='p-2 rounded-full h-auto hover:bg-slate-50/50 text-white'
                  >
                    <ExternalLink />
                  </Button>
                </a>
              </div>
            )}
          </div>
        ))}
        {created && instanceRef.current && slides?.length > 1 && (
          <>
            {!hideLeftArrow && (
              <div className='arrow-button absolute bottom-4 left-4 w-7 h-7 fill-white cursor-pointer'>
                <Arrow
                  left
                  onClick={(e: any) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={currentSlide === 0}
                />
              </div>
            )}
            <div className='arrow-button absolute bottom-4 right-4 w-7 h-7 fill-white cursor-pointer'>
              <Arrow
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  (instanceRef?.current?.track?.details?.slides &&
                    instanceRef.current.track.details.slides?.length - 1)
                }
              />
            </div>
          </>
        )}
      </div>
      {showDots && loaded && instanceRef.current && slides?.length > 1 && (
        <div className='dots'>
          {[
            ...Array(
              instanceRef.current.track.details.slides &&
                instanceRef.current.track.details.slides?.length
            ).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? "arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "left-[5px]" : "arrow--right"
      } ${disabeld}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      {props.left && (
        <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
      )}
      {!props.left && (
        <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
      )}
    </svg>
  );
}
