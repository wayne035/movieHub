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
          let updatedSearchResults = [...searchResults]; 
          //找出當前加到favorites的影片在搜尋結果影片的第幾個idx
          const currentVideoIdx = updatedSearchResults.findIndex(
            (item)=> item.id === id 
          );
          //更新 search/[query] page搜尋後影片的愛心圖示
          updatedSearchResults[currentVideoIdx] = {
            ...updatedSearchResults[currentVideoIdx],
            addedToFavorites: true,
          };
          setSearchResults(updatedSearchResults);

        }else if(similar){
          let updatedSimilarVideo = [...similarVideo];
          //找出當前加到favorites的影片在 SimilarVideo裡的第幾個idx
          const currentVideoIdx = updatedSimilarVideo.findIndex(
            (item)=> item.id === id
          );
          //更新 videopopup page底下相似影片的愛心圖示
          updatedSimilarVideo[currentVideoIdx] = {
            ...updatedSimilarVideo[currentVideoIdx],
            addedToFavorites: true,
          };
          setSimilarVideo(updatedSimilarVideo);
        
        }else{  //VideoLayout 影片
          let updatedVideoData = [...videoData];
          //找出影片在哪一個title row 底下 返回該title row idx
          const TitleRowIdx = updatedVideoData.findIndex(
            (item)=> item.title === title
          );
          //找出當前 title row 所有 item
          let currentRowAllItem = updatedVideoData[TitleRowIdx].medias;
          //找出當前加到favorites的影片在 title row 底下的第幾個 idx
          const currentVideoIdx = currentRowAllItem.findIndex(
            (item)=> item.id === id
          );
          //更新當前影片的愛心圖示
          currentRowAllItem[currentVideoIdx] = {
            ...currentRowAllItem[currentVideoIdx],
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
