import clsx from "clsx";
import React, { useState, useCallback } from "react";

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

type PropType = {
  imgSrc: string;
  inView: boolean;
  className?: string;
  sizes?: string;
  alt?: string;
};

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView, className, sizes, alt } = props;

  const [hasLoaded, setHasLoaded] = useState(false);

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);

  return (
    <div className={className}>
      <div className={clsx(hasLoaded ? " opacity-100 overflow-hidden" : "")}>
        {!hasLoaded && (
          <span>
            <svg
              width='38'
              height='38'
              viewBox='0 0 38 38'
              xmlns='http://www.w3.org/2000/svg'
            >
              <defs>
                <linearGradient
                  x1='8.042%'
                  y1='0%'
                  x2='65.682%'
                  y2='23.865%'
                  id='a'
                >
                  <stop stopColor='#fff' stopOpacity='0' offset='0%' />
                  <stop stopColor='#fff' stopOpacity='.631' offset='63.146%' />
                  <stop stopColor='#fff' offset='100%' />
                </linearGradient>
              </defs>
              <g fill='none' fillRule='evenodd'>
                <g transform='translate(1 1)'>
                  <path
                    d='M36 18c0-9.94-8.06-18-18-18'
                    id='Oval-2'
                    stroke='url(#a)'
                    strokeWidth='2'
                  >
                    <animateTransform
                      attributeName='transform'
                      type='rotate'
                      from='0 18 18'
                      to='360 18 18'
                      dur='0.9s'
                      repeatCount='indefinite'
                    />
                  </path>
                  <circle fill='#fff' cx='36' cy='18' r='1'>
                    <animateTransform
                      attributeName='transform'
                      type='rotate'
                      from='0 18 18'
                      to='360 18 18'
                      dur='0.9s'
                      repeatCount='indefinite'
                    />
                  </circle>
                </g>
              </g>
            </svg>
          </span>
        )}
        <img
          className='object-cover bg-transparent'
          onLoad={setLoaded}
          src={inView ? imgSrc : PLACEHOLDER_SRC}
          alt={alt}
          data-src={imgSrc}
          sizes={sizes}
        />
      </div>
    </div>
  );
};
