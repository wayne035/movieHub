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
      setPageLoading(true);
      const [ tv, movies ] = await Promise.all([
        getTVorMovieSearchResults('tv', params.query),
        getTVorMovieSearchResults('movie', params.query)
      ]);

      const allFavorites = await getAllfavorites(
        session?.user?.uid!,
        loginAccount?._id!
      );
      //把搜尋tv movie結果的影片放到setSearchResults 
      setSearchResults([ 
        ...tv.filter(  //找圖片不為空白的影片
            (item: ImgItem)=> item.backdrop_path !== null && item.poster_path !== null
          ).map((tvShowItem: {id: number})=> ({
            ...tvShowItem,
            type: 'tv',          //影片增加type & 收藏資訊
            addedToFavorites: 
              allFavorites && allFavorites.length  
                ? allFavorites.map((fav: {movieID: number})=> fav.movieID).indexOf(tvShowItem.id) > -1 
                : false,
          })),
        ...movies.filter(
            (item: ImgItem)=> item.backdrop_path !== null && item.poster_path !== null
          ).map((movieItem: {id: number})=> ({
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
      <Navbar/>
      <div className='mt-[100px] space-y-0.5 md:space-y-2 px-4 pb-14'>
        <h2 className='cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl'>
          顯示搜尋 {decodeURI(params.query as string)} 的結果
        </h2>
        <div className='grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2'>
          {searchResults && searchResults.length
            ? searchResults.map((searchItem)=> (
              <VideoItem key={searchItem.id} media={searchItem} search={true}/>
            ))
            : null
          }
        </div>
      </div>
    </motion.div>
  );
}