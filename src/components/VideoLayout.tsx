'use client';
import { motion } from 'framer-motion';
import { useVideoData } from '@/store/videoDataStore';
import Navbar from './navbar/Navbar';
import Banner from './Banner';
import Footer from './Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function VideoLayout() {
  const {videoData} = useVideoData(); 

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div>
        <Navbar />
        <div className='overflow-hidden relative md:pl-4'>
          <Banner/>
          <section>
            {
              videoData.map(({title, medias})=> (
                <div 
                  key={crypto.randomUUID()} 
                  className=' space-y-0.5 md:space-y-2 px-4 md:pt-16'
                >
                  <h2 className='cursor-default text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl text-shadow2'>
                    {title}
                  </h2>
                  <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={15}
                    slidesPerView={4}
                    breakpoints={{
                      1440: {slidesPerView: 5},
                      1280: {slidesPerView: 4},
                      900: {slidesPerView: 3},
                      500: {slidesPerView: 2},
                      0: {slidesPerView: 1},
                    }}
                  >
                    {
                      medias && medias.length &&
                      medias.filter((item)=> //找尋有圖片的影片渲染
                        item.backdrop_path !== null && item.poster_path !== null
                      ).map((mediaItem) => (
                        <SwiperSlide key={crypto.randomUUID()}>
                          <div className='h-[160px]'>
                          </div>
                        </SwiperSlide>
                      ))
                    }
                  </Swiper>
                </div>
              ))
            }
          </section>
        </div>
        <Footer/>
      </div>
    </motion.div>
  );
}