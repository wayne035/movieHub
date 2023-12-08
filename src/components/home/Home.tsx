'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import QandA from './QandA';
import Footer from '../Footer';

export default function Home() {
  const router = useRouter();

  return (
      <main>
        <div className='bg-[#000]'>
          <div className='h-[65vh] sm:h-[90vh] xl:h-[95vh] bg-cover bg-no-repeat bg-[url("https://assets.nflxext.com/ffe/siteui/vlv3/84526d58-475e-4e6f-9c81-d2d78ddce803/e3b08071-f218-4dab-99a2-80315f0922cd/LK-en-20221228-popsignuptwoweeks-perspective_alpha_website_small.jpg")]'
          >
            <div
              className='bg-black bg-opacity-70 h-[100vh]'
            >
              <div className='flex items-center justify-between'>
                <h1 
                  onClick={() => router.push('/')}
                  className='text-[40px] text-main-color font-bold title-shadow cursor-pointer px-10 hover:text-main-hover-color'
                >
                  Movie Hub
                </h1>
                <div className='flex mr-4 sm:mr-10'>
                  <button
                    onClick={() => signIn('google',{callbackUrl:'/accounts-manage'})}
                    className='h-10 px-2 sm:px-4 text-white bg-main-color rounded hover:bg-main-hover-color font-bold text-[20px] mt-2'
                  >
                    登入
                  </button>
                </div>
              </div>
              <div className='h-[55vh] sm:h-[80vh] w-[90%] mx-auto flex flex-col items-center justify-center text-[#fff] text-center font-bold'>
                <p className='text-xl sm:text-4xl lg:text-5xl xl:text-6xl'>
                Movie Hub 有大量電影、電視節目等等。
                </p>
                <p className='text-md sm:text-1xl lg:text-2xl m-3 sm:m-5'>
                  隨處觀看。 隨時取消。
                </p>
                <div className='flex  justify-center'>
                  <button
                    onClick={() => signIn('google',{callbackUrl:'/accounts-manage'})}
                    className='bg-main-color hover:bg-main-hover-color p-4 rounded-lg text-[20px]'
                  >
                    登入開始看
                  </button>
                </div>
              </div>
            </div>
          </div>
          <QandA/>
          <Footer/>
        </div>
      </main>
  );
}