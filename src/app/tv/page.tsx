'use client';
import { useEffect} from 'react';
import { getAllfavorites, getTVorMoviesType } from '@/fetch';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLoginAccount } from '@/store/accountsStore';
import { useVideoData } from '@/store/videoDataStore';
import VideoLayout from '@/components/VideoLayout';

export default function TV() {
  const {data: session} = useSession();
  const {loginAccount} = useLoginAccount();
  const {videoData,setVideoData} = useVideoData();
  const router = useRouter();

  useEffect(() => {
    if(!loginAccount) router.push('/accounts-manage');
    async function getAllMedias() {
      const [
        animation, comedy, crime, documentary, action, kids, news, fantasy, soap, talk, war, allFavorites
      ] = await Promise.all([
        getTVorMoviesType('tv', 16),     //animation
        getTVorMoviesType('tv', 35),     //comedy
        getTVorMoviesType('tv', 80),     //crime
        getTVorMoviesType('tv', 99),     //documentary
        getTVorMoviesType('tv', 10759),  //action
        getTVorMoviesType('tv', 10762),  //kids
        getTVorMoviesType('tv', 10763),  //news
        getTVorMoviesType('tv', 10765),  //fantasy
        getTVorMoviesType('tv', 10766),  //soap
        getTVorMoviesType('tv', 10767),  //talk
        getTVorMoviesType('tv', 10768),  //war
        getAllfavorites(session?.user?.uid!, loginAccount?._id!)
      ])
      
      setVideoData(
        [
          {
            title: '卡通',
            medias: animation,
          },
          {
            title: '紀錄片',
            medias: documentary,
          },
          {
            title: '犯罪',
            medias: crime,
          },
          {
            title: '喜劇',
            medias: comedy,
          },
          {
            title: '動作',
            medias: action,
          },
          {
            title: '兒童',
            medias: kids,
          },
          {
            title: '新聞',
            medias: news,
          },
          {
            title: '奇幻',
            medias: fantasy,
          },
          {
            title: '連續劇',
            medias: soap,
          },
          {
            title: '談話性',
            medias: talk,
          },
          {
            title: '戰爭與政治',
            medias: war,
          },
        ].map((item)=> ({  //影片增加type & 收藏資訊
          ...item,
          medias: item.medias.map((mediaItem: {id: string})=> ({
            ...mediaItem,
            type: 'tv',
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
      { loginAccount && (videoData.length > 1) && <VideoLayout/> }
    </main>
  );
}