'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useLoginAccount } from '@/store/accountsStore';
import { useVideoPopup } from '@/store/videoPopupStore';
import { useCurrentVideoIdAndType, useSimilarVideo } from '@/store/videoDataStore';
import { 
  getAllfavorites, 
  getSimilarTVorMovies,
  getTVorMovieDetailsByID 
} from '@/fetch';
import MuiModal from '@mui/material/Modal';
import ReactPlayer from 'react-player/lazy';
import VideoItem from './videoItem/VideoItem';

export default function VideoPopup() {
  const [key,setKey] = useState('');
  const [currentVidoInfo,setCurrentVidoInfo] = useState({name:'', overview: null!, title: null!});
  const {data: session} = useSession();
  const {loginAccount} = useLoginAccount();
  const {showVideoPopup,setShowVideoPopup} = useVideoPopup();
  const {similarVideo,setSimilarVideo} = useSimilarVideo();
  const {currentVideoIdAndType,setCurrentVideoIdAndType} = useCurrentVideoIdAndType();

  useEffect(() => {
    if(currentVideoIdAndType === null) return
    if(currentVideoIdAndType !== null) {
      const getMediaDetails = async ()=> {
        const [
          currentVideoDetails, VideoDetailsTW, similarVideo, allFavorites
        ] = await Promise.all([
          getTVorMovieDetailsByID(  //當前影片細節
            currentVideoIdAndType.type!,
            currentVideoIdAndType.id!,
            'en-US'
          ),
          getTVorMovieDetailsByID(  //當前影片中文細節
            currentVideoIdAndType.type!,
            currentVideoIdAndType.id!,
            'zh-TW'
          ),
          getSimilarTVorMovies(  //用當前影片id type 找類似電影資料
            currentVideoIdAndType.type!,
            currentVideoIdAndType.id!
          ),
          getAllfavorites(  //取得所有收藏影片資料
            session?.user?.uid!,
            loginAccount?._id
          )
        ])
        console.log(VideoDetailsTW)
        //找影片細節type ===  '預告片'的idx 找不到return -1
        const findIndexOfTrailer =
          currentVideoDetails.videos.results && currentVideoDetails.videos.results.length ?
            currentVideoDetails.videos.results.findIndex((item: {type: string})=> item.type === 'Trailer')
            : -1;
        //找影片細節type === '剪輯片'的idx 找不到return -1
        const findIndexOfClip =
          currentVideoDetails.videos.results && currentVideoDetails.videos.results.length ?
            currentVideoDetails.videos.results.findIndex((item: {type: string})=> item.type === 'Clip')
            : -1;
        //儲存當前影片相關中文資訊
        setCurrentVidoInfo(VideoDetailsTW);
        //對相似影片增加type & 收藏資訊
        setSimilarVideo(
          similarVideo?.map((item: any)=> ({
            ...item,
            type: currentVideoIdAndType.type === 'movie' ? 'movie' : 'tv',
            addedToFavorites: 
              allFavorites && allFavorites.length ?
                allFavorites.map((fav:{movieID: number})=> fav.movieID).indexOf(item.id) > -1
                : false,
          }))
        );
        //'預告片'的idx = -1的話換'剪輯片'的idx，如果idx還是-1 return 'T3-t2hjfujE'
        setKey( 
          findIndexOfTrailer === -1 ?
          ( findIndexOfClip === -1 ? 
            'T3-t2hjfujE' : currentVideoDetails.videos?.results[findIndexOfClip]?.key 
          )
          : currentVideoDetails.videos?.results[findIndexOfTrailer]?.key  
        );
      }

      getMediaDetails();
    }
  }, [currentVideoIdAndType, loginAccount?.name]);

  function closeVideoPopup() {
    setShowVideoPopup(false);
    setCurrentVideoIdAndType({type: null!, id: null!});
    setKey('');
  }

  return (
    <motion.div
      initial={{opacity: 0, scale: 0.5}}
      animate={{opacity: 1, scale: 1}}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <MuiModal
        open={showVideoPopup}
        onClose={closeVideoPopup}
        className='fixed z-50 w-full mx-auto max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'
      >
        <div>
          <button
            onClick={closeVideoPopup}
            className='modalButton flex items-center justify-center absolute top-5 right-5 !z-40 bg-[#000] border-none h-9 w-9'
          >
            <span className='text-[25px]'>❌</span>
          </button>
          <div className='relative pt-[56.25%]'>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${key!}&origin=${process.env.NEXT_PUBLIC_LOCAL_URL!}`}
              width={'100%'}
              height={'100%'}
              style={{position: 'absolute', top: '0', left: '0'}}
              playing
              controls
            />
          </div>
          <div className='rounded-b-md bg-[#181818] p-8 text-[#fff] font-bold cursor-default'>
            <h2 className='text-xl text-main-color md:text-[24px]'>
              {currentVidoInfo?.name || currentVidoInfo?.title}
              <span className='ml-2 text-[16px] text-[#fff] md:text-[20px]'>
                影片概述 ： 
              </span>
            </h2>
            <p className='mt-4 mb-8 md:text-[18px]'>
              {currentVidoInfo?.overview || '😔 暫無影片概述 ...'}
            </p>
            <h2 className='mt-2 mb-6 md:text-[20px]'>相關影片 ： </h2>
            <div className='grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2 md:text-xl'>
              {
                similarVideo && similarVideo.length
                ? similarVideo.filter((item) => //找尋有圖片的影片渲染
                    item.backdrop_path !== null && item.poster_path !== null
                  ).map((mediaItem) => (
                    <VideoItem key={mediaItem.id} media={mediaItem} similar={true}/>
                  ))
                : '😔 暫無相關影片 ...'
              }
            </div>
          </div>
        </div>
      </MuiModal>
    </motion.div>
  );
}
