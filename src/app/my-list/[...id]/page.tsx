'use client';
import { useEffect } from 'react';
import { getAllfavorites } from '@/fetch';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLoginAccount } from '@/store/accountsStore';
import { useFavorites } from '@/store/favoritesStore';
import Navbar from '@/components/navbar/Navbar';
import FavoritesItem from '@/components/FavoritesItem';

interface FavoritesInfo{
  backdrop_path: string,
  poster_path: string,
  movieID: number,
  _id: string,
  type: string,
  uid: string,
  accountID: string,
  name?: string,
  title?: string,
  overview?: string,
}

export default function MyList() {
  const {data: session} = useSession();
  const {loginAccount} = useLoginAccount();
  const {favorites,setFavorites} = useFavorites();
  const router = useRouter();

  useEffect(()=> {
    if(!loginAccount) router.push('/accounts-manage');
    async function getFavorites() {
      const data = await getAllfavorites(
        session?.user?.uid!,
        loginAccount?._id!
      );
      if(data){
        setFavorites(data.map((item: FavoritesInfo)=> ({
          ...item, addedToFavorites : true
        })));
      }
    }
    getFavorites();
  },[loginAccount?.name]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Navbar />
      <div className='mt-[90px] space-y-0.5 md:space-y-2 px-4 overflow-hidden pb-14'>
        <h2 className='cursor-default text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl'>
          收藏的影片
        </h2>
        <div className='grid grid-cols-5 gap-3 items-center md:p-2'>
          {favorites && favorites.length
            ? favorites.map((favItem)=> (
                <FavoritesItem 
                  key={crypto.randomUUID()} 
                  favItem={favItem} 
                />
              ))
            : null
          }
        </div>
      </div>
    </motion.div>
  );
}