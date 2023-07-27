import * as React from "react";
import { useState } from "react";
// import dynamic from 'next/dynamic'
import ReactPlayer from "react-player";
import { AspectRatio } from "@components/ui/aspect-ratio";
// import ContainerBorder from "../container-border.astro";
// import NextImage from 'next/image'
import { Play } from "lucide-react";

export const Video = ({ url }: any) => {
  const [isPlaying, setPlaying] = useState(false);
  return (
    // <ContainerBorder variant='dark' className='pb-24 px-4'>
    <div className='flex h-full w-full overflow-hidden mx-auto max-w-3xl'>
      <div className='w-full relative'>
        <AspectRatio ratio={16 / 9}>
          <ReactPlayer
            width='100%'
            height='100%'
            controls={true}
            playing={isPlaying}
            url={url ?? "https://www.youtube.com/watch?v=fO_eKusKH60"}
            className='youtubeContainer'
          />
        </AspectRatio>
        <div
          onClick={() => setPlaying(!isPlaying)}
          className={`${
            isPlaying ? "hidden" : "flex"
          } justify-center items-center rounded-full bg-white opacity-80 hover:opacity-100 inset-center mx-auto z-20 w-20 h-20 cursor-pointer transition-all 150ms linear 0s`}
        >
          <Play className='transition-all 150ms linear 0s' />
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full z-10 ${
            isPlaying ? "hidden" : "block"
          }`}
        >
          <AspectRatio ratio={16 / 9} className='max-h-[480px]'>
            <img
              src='https://cdn.sanity.io/images/1as7cn02/production/62c70d2b5aac288ea1f7dd3f5eb9818ed4f14773-1280x720.jpg?h=480&w=828&q=75'
              //  loader={thumbnailLoader}
              width={768}
              height={432}
              //  src={thumbnailUrl}
              // placeholder="blur"
              //  blurDataURL={thumbnailBlur}
              alt='Youtube Video'
            />
          </AspectRatio>
        </div>
      </div>
    </div>
    // </ContainerBorder>
  );
};
