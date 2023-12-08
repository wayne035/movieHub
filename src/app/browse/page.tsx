'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLoginAccount } from '@/store/accountsStore';
import { useVideoData } from '@/store/videoDataStore';
import { 
  getAllfavorites, 
  getPopularVideo, 
  getTopratedVideo, 
  getTrendingVideo,
} from '@/fetch';
import VideoLayout from '@/components/VideoLayout';

export default function Browse() {
  const {data: session} = useSession();
  const {loginAccount} = useLoginAccount();
  const {videoData,setVideoData} = useVideoData();
  const router = useRouter();

  useEffect(() => {
    if(!loginAccount) router.push('/accounts-manage');
    async function getAllVideos() {
      const [
        trendingTvShows,
        popularTvShows,
        topratedTvShows,
        trendingMovieShows,
        popularMovieShows,
        topratedMovieShows,
        allFavorites
      ] = await Promise.all([
        getTrendingVideo('tv'),
        getPopularVideo('tv'),
        getTopratedVideo('tv'),
        getTrendingVideo('movie'),
        getPopularVideo('movie'),
        getTopratedVideo('movie'),
        getAllfavorites(session?.user?.uid!, loginAccount?._id!)
      ])
      setVideoData([
        ...[
          {
            title: '流行電視節目',
            medias: trendingTvShows,
          },
          {
            title: '熱門電視節目',
            medias: popularTvShows,
          },
          {
            title: '高評價電視節目',
            medias: topratedTvShows,
          },
        ].map((item)=> ({ //影片增加type & 收藏資訊
          ...item,
          medias: item.medias.map((mediaItem: {id: string}) => ({
            ...mediaItem,
            type: 'tv',
            addedToFavorites:
              allFavorites && allFavorites.length
                ? allFavorites.map((fav: {movieID: number})=> fav?.movieID).indexOf(mediaItem.id) > -1
                : false,
          })),
        })),
        ...[
          {
            title: '流行電影',
            medias: trendingMovieShows,
          },
          {
            title: '熱門電影',
            medias: popularMovieShows,
          },
          {
            title: '高評價電影',
            medias: topratedMovieShows,
          },
        ].map((item)=> ({ //影片增加type & 收藏資訊
          ...item,
          medias: item.medias.map((mediaItem: {id: string})=> ({
            ...mediaItem,
            type: 'movie',
            addedToFavorites:
              allFavorites && allFavorites.length
                ? allFavorites.map((fav: {movieID: number})=> fav.movieID ).indexOf(mediaItem.id) > -1
                : false,
          })),
        })),
      ]);
    }
    getAllVideos();
  }, [loginAccount?.name]);

  return (
    <main className='flex min-h-screen flex-col'>
      { loginAccount && (videoData.length > 1) && <VideoLayout/> }
    </main>
  );
}