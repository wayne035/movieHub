'use client';
import axios from 'axios';
import Image from 'next/image';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { getAllfavorites } from '@/fetch';
import { useLoginAccount } from '@/store/accountsStore';
import { useFavorites } from '@/store/favoritesStore';
import { useCurrentVideoIdAndType } from '@/store/videoDataStore';
import { useVideoPopup } from '@/store/videoPopupStore';
import { FavoritesInfo } from '@/interface';

interface FavInItem{
  favItem: FavoritesInfo
}

const movieImgUrl = process.env.NEXT_PUBLIC_TMDB_MOVIE_IMAGE_URL!;

export default memo(function FavoritesItem({favItem}: FavInItem) {
  const {data: session} = useSession();
  const {loginAccount} = useLoginAccount();
  const {setFavorites} = useFavorites();
  const {setShowVideoPopup} = useVideoPopup();
  const {setCurrentVideoIdAndType} = useCurrentVideoIdAndType();
  console.log(favItem)
  function openVideoPopup(){
    setShowVideoPopup(true);
    setCurrentVideoIdAndType({
      type: favItem?.type,
      id: favItem?.movieID,
    })
  }

  async function updateFavorites() {
    const res = await getAllfavorites(session?.user?.uid!, loginAccount?._id!);
    if(res)
      setFavorites(
        res.map((item: {addedToFavorites: boolean})=> ({
          ...item,
          addedToFavorites: true,
        }))
      );
  }

  async function removeFavorites(favItemID: string){
    try{
      const { data } = await axios.delete(`/api/favorites/${favItemID}`);
      if (data.success){
        updateFavorites();
      }
    }catch(e){
      console.log((e as Error).message);
    }
  }

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
        <h3 
          onClick={openVideoPopup}
          className='absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-shadow2 font-bold z-10 w-full'
        >
          {favItem?.name || favItem?.title}
        </h3>
        <Image
          src={`${movieImgUrl}${favItem?.backdrop_path || favItem?.poster_path}`}
          alt={`${favItem?.name || favItem?.title}`}
          fill
          sizes='100%'
          onClick={openVideoPopup}
          className='rounded sm object-cover md:rounded hover:rounded-sm'
        />
        <div className='space-x-3 hidden absolute p-2 bottom-0 buttonWrapper'>
          <button
            onClick={()=> removeFavorites(favItem._id) }
            className={'cursor-pointer border flex p-2 items-center gap-x-2 bg-[#000] rounded-full text-sm font-semibold transition hover:opacity-90 border-white opacity-75 text-black'}
          >
            <span className='h-7 w-7 text-xl'>❌</span>
          </button>
          <button  //playBtn
            onClick={openVideoPopup}
            className='cursor-pointer p-2 border flex items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90 border-white bg-[#000] opacity-75 '
          >
            <span className='h-7 w-7 text-xl'>📽️</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
})