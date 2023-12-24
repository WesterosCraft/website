import * as React from "react";

import {
  CarouselContent,
  Carousel,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@components/ui/carousel";
import { type CarouselApi } from "@components/ui/carousel";
import { LazyLoadImage } from "./lazy-load-image";

interface LocationCarouselProps {
  slides: { image: string; originalUrl: string; alt: string }[];
}

export function LocationCarousel({ slides }: LocationCarouselProps) {
  const images: string[] = slides.map((s) => s.image);
  const imageByIndex = (index: number): string => images[index % images.length];

  const [api, setApi] = React.useState<CarouselApi>();

  const [slidesInView, setSlidesInView] = React.useState<number[]>([]);

  const updateSlidesInView = React.useCallback((emblaApi: CarouselApi) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off("slidesInView", updateSlidesInView);
      }
      const inView = emblaApi
        .slidesInView()
        .filter((index) => !slidesInView.includes(index));
      return slidesInView.concat(inView);
    });
  }, []);

  React.useEffect(() => {
    if (!api) return;

    updateSlidesInView(api);
    api.on("slidesInView", updateSlidesInView);
    api.on("reInit", updateSlidesInView);
  }, [api, updateSlidesInView]);

  return (
    <Carousel setApi={setApi} className='relative'>
      <CarouselContent>
        {Array.from(Array(slides.length).keys())?.map((index, n) => (
          <CarouselItem key={n}>
            <LazyLoadImage
              imgSrc={imageByIndex(index)}
              inView={slidesInView.indexOf(index) > -1}
              sizes='60vw'
              alt={
                slides[index].alt ? `${slides[index].alt} Slide ${index}` : ""
              }
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {slides.length > 1 && (
        <>
          <CarouselPrevious className='bottom-2 left-2 bg-white/70 hover:bg-white' />
          <CarouselNext className='bottom-2 right-2 bg-white/70 hover:bg-white' />
        </>
      )}
    </Carousel>
  );
}
