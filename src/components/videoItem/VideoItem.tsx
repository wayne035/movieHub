'use client'
import { memo } from 'react';
import { motion } from 'framer-motion';
import { useCurrentVideoIdAndType } from '@/store/videoDataStore';
import { useVideoPopup } from '@/store/videoPopupStore';
import Image from 'next/image';
import FavoritesBtn from './FavoritesBtn';

interface Media{
  backdrop_path: string,
  poster_path: string,
  type: string,
  movieID?: number,
  id: number,
  addedToFavorites?: boolean,
  title?: string,
  name?: string,
  overview?: string,
}

interface mediaData{
  media: Media,
  title?: string,
  search?: boolean,
  similar?: boolean
}

const movieImgUrl = process.env.NEXT_PUBLIC_TMDB_MOVIE_IMAGE_URL!;

export default memo(function VideoItem({ media, title, search=false, similar=false}:mediaData){
  const {setShowVideoPopup} = useVideoPopup();
  const {setCurrentVideoIdAndType} = useCurrentVideoIdAndType();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className='text-center'
    >
      <div className='relative cardWrapper h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] top-[8px] hover:scale-[1.05] lg:opacity-[.7] hover:opacity-[1] text-[22px] hover:text-[26px] transform transition duration-500'>
        <h3 className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-shadow2 font-bold z-10 w-full'>
          {media?.name || media?.title}
        </h3>
        <Image
          src={`${movieImgUrl}${media?.backdrop_path || media?.poster_path}`}
          alt={`${media?.name || media?.title}`}
          fill
          sizes='100%'
          onClick={()=>{
            setShowVideoPopup(true);
            setCurrentVideoIdAndType({
              type: media?.type,
              id: media?.movieID || media?.id,
            });
          }}
          className='rounded sm object-cover md:rounded hover:rounded-sm'
        />
        <div className='space-x-3 hidden absolute p-2 bottom-0 buttonWrapper'>
          <FavoritesBtn
            toFavorites={media?.addedToFavorites} 
            media={media} 
            title={title}
            search={search}
            similar={similar}
          />
          <button  //playBtn
            onClick={()=> {
              setShowVideoPopup(true);
              setCurrentVideoIdAndType({
                type: media?.type,
                id: media?.movieID || media?.id,
              });
            }}
            className='cursor-pointer p-2 border flex items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90 border-white bg-[#000] opacity-75 '
          >
            <span className='h-7 w-7 text-xl'>📽️</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
})