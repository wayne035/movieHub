'use client';
import { useEffect} from 'react';
import { getAllfavorites, getTVorMoviesType } from '@/fetch';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLoginAccount } from '@/store/accountsStore';
import { useVideoData } from '@/store/videoDataStore';
import VideoLayout from '@/components/VideoLayout';

export default function Movies() {
  const {data: session} = useSession();
  const {loginAccount} = useLoginAccount();
  const {videoData,setVideoData} = useVideoData();
  const router = useRouter();

  useEffect(() => {
    if(!loginAccount) router.push('/accounts-manage');
    async function getAllMedias() {
      const [
        adventure, animation, horror, action, history, thriller, crime, documentary, scifiAndFantasy, romance, war, allFavorites
      ] = await Promise.all([
        getTVorMoviesType('movie', 12),     //adventure
        getTVorMoviesType('movie', 16),     //animation
        getTVorMoviesType('movie', 27),     //horror
        getTVorMoviesType('movie', 28),     //action
        getTVorMoviesType('movie', 36),     //history
        getTVorMoviesType('movie', 53),     //thriller
        getTVorMoviesType('movie', 80),     //crime
        getTVorMoviesType('movie', 99),     //documentary
        getTVorMoviesType('movie', 9648),   //scifiAndFantasy
        getTVorMoviesType('movie', 10749),  //romance
        getTVorMoviesType('movie', 10752),  //war
        getAllfavorites(session?.user?.uid!, loginAccount?._id!)
      ])
      
      setVideoData(
        [
          {
            title: '動作',
            medias: action,
          },
          {
            title: '冒險',
            medias: adventure,
          },
          {
            title: '犯罪',
            medias: crime,
          },
          {
            title: '紀錄片',
            medias: documentary,
          },
          {
            title: '動畫',
            medias: animation,
          },
          {
            title: '恐怖',
            medias: horror,
          },
          {
            title: '歷史',
            medias: history,
          },
          {
            title: '浪漫',
            medias: romance,
          },
          {
            title: '科幻與奇幻',
            medias: scifiAndFantasy,
          },
          {
            title: '驚悚',
            medias: thriller,
          },
          {
            title: '戰爭',
            medias: war,
          }
        ].map((item)=> ({
          ...item,
          medias: item.medias.map((mediaItem: {id: string})=> ({
            ...mediaItem,
            type: 'movie',
            addedToFavorites:
              allFavorites && allFavorites.length ? 
                allFavorites.map((fav: {movieID: number})=> fav.movieID).indexOf(mediaItem.id) > -1
                : false,
          })),
        }))
      );
    }
    getAllMedias();
  }, [loginAccount?.name]);

  return (
    <main className='flex min-h-screen flex-col'>
      {loginAccount && (videoData.length > 1) && <VideoLayout/>}
    </main>
  );
}