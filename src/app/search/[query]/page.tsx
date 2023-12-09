'use client';
import { useEffect } from 'react';
import { getAllfavorites, getTVorMovieSearchResults } from '@/fetch';
import { useSession } from 'next-auth/react';
import { useParams,useRouter } from 'next/navigation';
import { usePageLoading } from '@/store/pageLoadingStore';
import { motion } from 'framer-motion';
import { useLoginAccount } from '@/store/accountsStore';
import { useSearch } from '@/store/searchStore';
import Navbar from '@/components/navbar/Navbar';
import Loading from '@/app/loading';
import VideoItem from '@/components/videoItem/VideoItem';

interface ImgItem{
  backdrop_path: string,
  poster_path: string
}

export default function Search() {
  const {data: session} = useSession();
  const {pageLoading,setPageLoading} = usePageLoading();
  const {loginAccount} = useLoginAccount();
  const {searchResults,setSearchResults} = useSearch();
  const params = useParams();
  const router = useRouter();
  
  useEffect(() => {
    if(!loginAccount) router.push('/accounts-manage');
    async function getSearchResults() {
      const tvShows = await getTVorMovieSearchResults('tv', params.query);
      const movies = await getTVorMovieSearchResults('movie', params.query);
      const allFavorites = await getAllfavorites(
        session?.user?.uid!,
        loginAccount?._id!
      );
      setSearchResults([ //把搜尋後tv movie的影片放到setSearchResults
        ...tvShows
          .filter(  //找圖片不為空白的影片
            (item: ImgItem)=> item.backdrop_path !== null && item.poster_path !== null
          )
          .map((tvShowItem: {id: number})=> ({
            ...tvShowItem,
            type: 'tv',
            addedToFavorites: //判斷某些影片是否加入收藏夾
              allFavorites && allFavorites.length  
                ? allFavorites.map((fav: {movieID: number})=> fav.movieID).indexOf(tvShowItem.id) > -1 
                : false,
          })),
        ...movies
          .filter(
            (item: ImgItem)=> item.backdrop_path !== null && item.poster_path !== null
          )
          .map((movieItem: {id: number})=> ({
            ...movieItem,
            type: 'movie',
            addedToFavorites:
              allFavorites && allFavorites.length ? 
              allFavorites.map((fav: {movieID: number})=> fav.movieID).indexOf(movieItem.id) > -1
              : false,
          })),
      ]);
      setPageLoading(false);
    }
    getSearchResults();
  }, []);
  
  if (pageLoading) return <Loading/>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Navbar />
      <div className='mt-[100px] space-y-0.5 md:space-y-2 px-4 pb-14'>
        <h2 className='cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl'>
          顯示搜尋 {decodeURI(params.query as string)} 的結果
        </h2>
        <div className='grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2'>
          {searchResults && searchResults.length
            ? searchResults.map((searchItem: any) => (
                <VideoItem key={searchItem.id} media={searchItem} search={true}/>
              ))
            : null}
        </div>
      </div>
    </motion.div>
  );
}