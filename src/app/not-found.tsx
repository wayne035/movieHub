'use client'
import { useRouter } from 'next/navigation';
 
export default function NotFound() {
  const router = useRouter();

  return (
    <div className='w-full h-screen flex justify-center content-center flex-wrap text-center text-[25px] font-bold cursor-default bg-[url("/error404.png")] bg-cover'>
      <h2 className='w-full text-[144px] text-main-color text-shadow'>Error 404</h2>
      <button onClick={()=>router.push('/')}
              className='hover:text-[#999] border-2 px-7 py-3 rounded-md'
      >
        回首頁
      </button>
    </div>
  )
}