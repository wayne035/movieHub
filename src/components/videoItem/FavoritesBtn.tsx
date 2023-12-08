'use client'
import axios from 'axios';
import {memo} from 'react';
import { useVideoData,useSimilarVideo } from '@/store/videoDataStore';
import { useLoginAccount } from '@/store/accountsStore';
import { useSession } from 'next-auth/react';
import { useSearch } from '@/store/searchStore';

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
  toFavorites?: boolean,
  media: Media,
  title?: string,
  search?: boolean,
  similar?: boolean,
}

export default memo(function FavoritesBtn({toFavorites, media, title, search, similar}: mediaData) {
  const {data: session} = useSession();
  const {loginAccount} = useLoginAccount();
  const {videoData,setVideoData} = useVideoData();
  const {similarVideo,setSimilarVideo} = useSimilarVideo();
  const {searchResults,setSearchResults} = useSearch();

  async function addFavorites(item: Media) {
    try{
      const {backdrop_path, poster_path, id, type, name, overview} = item;
      const { data } = await axios.post('/api/favorites',{
        backdrop_path,
        poster_path,
        movieID: id,
        type,
        uid: session?.user?.uid!,
        accountID: loginAccount?._id!,
        name,
        title: item.title,
        overview,
      });
  
      if (data && data.success) {
        if(search){
          // search/[query] page搜尋後的結果
          let updatedSearchResults = [...searchResults]; 
          //把搜尋結果影片的id 與 當前點擊addFavorites的影片id 做比對回傳相同資料的idx
          const indexOfCurrentAddedMedia = updatedSearchResults.findIndex(
            (item:{id:number}) => item.id === id 
          );
          //更新 search/[query] page搜尋後影片的愛心圖示
          updatedSearchResults[indexOfCurrentAddedMedia] = {
            ...updatedSearchResults[indexOfCurrentAddedMedia],
            addedToFavorites: true,
          };
          setSearchResults(updatedSearchResults);
  
        }else if(similar){
          let updatedSimilarMedias = [...similarVideo];
          //把相似電影的影片id 與 當前點擊addFavorites的影片id 做比對回傳相同資料的idx
          const indexOfCurrentAddedMedia = updatedSimilarMedias.findIndex(
            (item:{id:number}) => item.id === id
          );
          //更新 videopopup.jsx 相似影片的愛心圖示
          updatedSimilarMedias[indexOfCurrentAddedMedia] = {
            ...updatedSimilarMedias[indexOfCurrentAddedMedia],
            addedToFavorites: true,
          };
          setSimilarVideo(updatedSimilarMedias);
  
        }else{
          //  VideoLayout 影片
          let updatedVideoData = [...videoData];
          //把 VideoLayout 每個 VideoRow 影片title 與 當前點擊addFavorites的影片title 做比對回傳相同資料的idx
          const findIndexOfRowItem = updatedVideoData.findIndex(
            (item:any) => item.title === title
          );
          //把 VideoLayout 影片id 與 當前點擊addFavorites的影片id 做比對回傳相同資料的idx
          let currentMovieArrayFromRowItem =
              updatedVideoData[findIndexOfRowItem].medias;
          const findIndexOfCurrentMovie = currentMovieArrayFromRowItem.findIndex(
            (item:any) => item.id === id
          );
          //更新 VideoLayout 影片的愛心圖示
          currentMovieArrayFromRowItem[findIndexOfCurrentMovie] = {
            ...currentMovieArrayFromRowItem[findIndexOfCurrentMovie],
            addedToFavorites: true,
          };
          setVideoData(updatedVideoData);
        }
      }
    }catch(e){
      console.log((e as Error).message)
    }
  }

  return (
    <>
      <button
        onClick={()=> { if (toFavorites === false) addFavorites(media) }}
        className={'cursor-pointer border flex p-2 items-center gap-x-2 bg-[#000] rounded-full text-sm font-semibold transition hover:opacity-90 border-white opacity-75 text-black'}
      >
        {
          toFavorites ? 
          <span className='h-7 w-7 text-xl cursor-not-allowed'>✔️</span>
          : <span className='h-7 w-7 text-xl'>❤️</span>
        }
      </button>
    </>
  )
})
