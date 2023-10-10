import * as React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { AspectRatio } from "@components/ui/aspect-ratio";
import { Play } from "lucide-react";

interface VideoProps {
  data: {
    thumbnail?: string;
    videoUrl?: string;
  };
}

const Video = (props: VideoProps) => {
  const [isPlaying, setPlaying] = useState(false);
  const { data } = props;

  return (
    <div className='flex h-full w-full overflow-hidden mx-auto max-w-3xl'>
      <div className='w-full relative z-10'>
        <AspectRatio ratio={16 / 9}>
          {isPlaying && (
            <ReactPlayer
              width='100%'
              height='100%'
              controls={true}
              playing
              url={
                data?.videoUrl || "https://www.youtube.com/watch?v=fO_eKusKH60"
              }
              className='youtubeContainer'
            />
          )}
        </AspectRatio>
        <div
          onClick={() => setPlaying(!isPlaying)}
          className={`${
            isPlaying ? "hidden" : "flex"
          } absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] justify-center items-center rounded-full bg-white opacity-80 hover:opacity-100 inset-center mx-auto z-20 w-20 h-20 cursor-pointer transition-all 150ms linear 0s`}
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
              src={`../../src/assets/pages/home/${data?.thumbnail}` || ""}
              width={768}
              height={432}
              alt='Youtube Video'
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};

export default Video;
