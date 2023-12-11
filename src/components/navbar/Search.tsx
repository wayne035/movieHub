'use client';
import { KeyboardEvent,MouseEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { usePageLoading } from '@/store/pageLoadingStore';

type Event = 
  | KeyboardEvent<HTMLInputElement> 
  | MouseEvent<HTMLButtonElement> ;

interface SearchData{
  pathName: string,
  searchQuery: string,
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  router: {
    replace: (path: string)=> void,
    push: (path: string)=> void
  }
}

export default function Search({pathName, router, searchQuery, setSearchQuery, setShowSearchBar}: SearchData) {
  const {setPageLoading} = usePageLoading();

  function handleSubmit(e: Event) {
    if(searchQuery === '') return ;
    if ((e as KeyboardEvent).key === 'Enter' || e.type === 'click'){
      setPageLoading(true);
      if(pathName.includes('/search')){
        router.replace(`/search/${searchQuery}`);
      }else{
        router.push(`/search/${searchQuery}`);
      } 
    }
  }

  return (
    <div className='flex justify-center items-center text-center text-[#000]'>
      <div className='bg-[rgba(0,0,0,0.75)] border border-[hsla(0,0%,100%,0.85)] sm:px-4 items-center text-center flex'>
        <AiOutlineSearch
          onClick={() => setShowSearchBar(false)}
          className='sm:mr-4 inline w-6 h-6 cursor-pointer text-[#fff] hover:text-[#999]'
        />
        <input
          name='search'
          value={searchQuery}
          onKeyUp={handleSubmit}
          onChange={(e)=> setSearchQuery(e.target.value.trim())}
          placeholder='搜尋電影、電視劇名'
          className='h-[34px] font-bold sm:px-4 py-2 outline-none w-[100px] sm:w-[156px]'
        />
        <button 
          onClick={(e)=> handleSubmit(e)}
          className='px-1 sm:px-0 sm:ml-4 text-[#fff] font-bold border-[#fff] text-[12px] sm:text-[18px] hover:text-[#999]'
        >
          送出
        </button>
      </div>
    </div>
  );
}
