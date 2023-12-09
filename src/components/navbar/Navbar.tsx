'use client';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, lazy, Suspense } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useLoginAccount } from '@/store/accountsStore';
import { useVideoData } from '@/store/videoDataStore';
import { useVideoPopup } from '@/store/videoPopupStore';
import { clsx } from 'clsx';
import AccountPopup from './AccountPopup';
import Search from './Search';
import Loading from '@/app/loading';
const VideoPopup = lazy(()=>import('../VideoPopup'));

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const {showVideoPopup} = useVideoPopup();
  const { data: session } = useSession();
  const {loginAccount} = useLoginAccount();
  const {setVideoData} = useVideoData();
  const router = useRouter();
  const pathName = usePathname();

  const menuItems = [
    {
      id: 'tv',
      title: '電視',
      path: '/tv',
    },
    {
      id: 'movies',
      title: '電影',
      path: '/movies',
    },
    {
      id: 'my-list',
      title: '收藏的影片',
      path: `/my-list/${session?.user?.uid!}/${loginAccount?._id!}`,
    },
  ];

  useEffect(()=> {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[]);

  return (
    <>
      <header
        className={clsx(
          isScrolled && 'bg-[#141414]',
          'header hover:bg-[#141414] lg:px-14 transition-all relative'
        )}
      >
        <div className='flex items-center'>
          <h1 
            onClick={()=> {
              if(pathName === '/browse') return ;
              setVideoData([]);
              router.push('/browse');
            }}
            className='text-[22px] md:text-[32px] font-bold title-shadow cursor-pointer md:pr-10 text-main-color hover:text-main-hover-color'
          >
            Movie Hub
          </h1>
          <ul className='hidden md:space-x-6 md:flex cursor-pointer'>
            {menuItems.map((item)=> (
              <li
                onClick={()=> {
                  if(pathName === item.path) return ;
                  setVideoData([]);
                  setSearchQuery('');
                  setShowSearchBar(false);
                  router.push(item.path);
                }}
                className={clsx(
                  pathName === item.path && 'text-main-color hover:text-main-color',
                  'text-shadow2 cursor-pointer text-[18px] font-bold text-[#fff] transition duration-[.4s] hover:text-[#b3b3b3]'
                )}
                key={item.id}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className='font-light flex items-center space-x-4 text-sm'>
          {showSearchBar ? (
              <Search
                pathName={pathName}
                router={router}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setShowSearchBar={setShowSearchBar}
              />
            ) : (
              <AiOutlineSearch
                onClick={()=> setShowSearchBar(true)}
                className='inline w-6 h-6 cursor-pointer hover:text-[#999]'
              />
            )
          }
          <div
            onClick={()=> setShowAccountPopup(!showAccountPopup)}
            className='flex gap-2 items-center cursor-pointer text-[18px] font-bold'
          >
            <img
              src={session?.user?.image!}
              alt='Current Profile'
              className='max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]'
            />
            <p>{loginAccount && loginAccount.name}</p>
          </div>
        </div>
      </header>
      <Suspense fallback={<Loading/>}>
        { showVideoPopup && <VideoPopup/> }
      </Suspense>
      { showAccountPopup && <AccountPopup/> }
    </>
  );
}
