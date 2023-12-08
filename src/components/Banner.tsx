'use client';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useVideoPopup } from '@/store/videoPopupStore';
import { useCurrentVideoIdAndType } from '@/store/videoDataStore';
import { getTWMovies } from '@/fetch';

const imgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL!;

interface RandomVedioData{
  backdrop_path: string,
  poster_path: string,
  title: string,
  overview?: string,
  id: number
}

export default memo(function Banner() {
  const [randomVedio,setRandomVedio] = useState<RandomVedioData>();
  const {setCurrentVideoIdAndType} = useCurrentVideoIdAndType();
  const {setShowVideoPopup} = useVideoPopup();

  useEffect(()=> {
    async function getVideo(){
      const video = await getTWMovies();
      const random = 
        await video && video.length ? 
        video[Math.floor(Math.random() * video.length)]
        : null
      setRandomVedio(random);
    } 
    getVideo();
  },[])

  return (
    <div className='flex flex-col space-y-2 py-20 px-6 lg:justify-end lg:pt-[123px] lg:pl-7 cursor-default'>
      <div className='absolute top-0 left-0 h-[95vh] w-screen z-[-10]'>
        <Image
          src={
            randomVedio?.backdrop_path || randomVedio?.poster_path ?
            `${imgUrl}/${randomVedio?.backdrop_path || randomVedio?.poster_path}` 
            :'/imgBG.png'
          }
          alt='Banner'
          fill
          placeholder='blur'
          blurDataURL={'/imgBG.png'}
          sizes='100vw'
          style={{objectFit: 'cover'}}
        />
        {/* 漸層 */}
        <div className='absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-[#141414,70%] to-transparent '/>
      </div>
      <h2 className='text-shadow text-2xl md:text-4xl lg:text-7xl font-bold lg:pb-10'>
        {randomVedio?.title}
      </h2>
      <p className='text-shadow2 max-w-[500px] font-bold text-xs md:max-w-lg md:text-lg lg:max-w-2xl line-clamp-5'>
        {randomVedio?.overview || '😔 暫無影片概述 ...' }
      </p>
      <div className='flex space-x-3 md:pt-6'>
        <button
          onClick={() =>{
            setCurrentVideoIdAndType({
              type: 'movie',
              id: randomVedio?.id!,
            });
            setShowVideoPopup(true);
          }}
          className='cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-bold transition md:py-2.5 md:px-8 md:text-xl lg:mt-5 bg-[#fff] text-[#000] border-2 hover:text-main-color'
        >
          <AiFillPlayCircle className='h-4 w-4 md:h-7 md:w-7 cursor-pointer'/>
          播放
        </button>
      </div>
    </div>
  );
})