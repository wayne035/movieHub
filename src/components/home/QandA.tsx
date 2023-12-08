'use client';
import { useState } from 'react';

const questions = [
  {
    ques: '關於 Movie Hub',
    ans: 'Movie Hub 是一項串流媒體服務，可在數千種連網裝置上提供各種屢獲殊榮的電視節目、電影、動漫、紀錄片等，您可以隨時隨地隨心所欲地觀看，沒有任何廣告，每週都會增加新的電視節目和電影！',
  },
  {
    ques: 'Movie Hub 的費用是多少?',
    ans: '在您的智慧型手機、平板電腦、智慧型電視、筆記型電腦或串流媒體設備上觀免費看。',
  },
  {
    ques: '我可以在 Movie Hub 觀看什麼？',
    ans: 'Movie Hub 擁有豐富的劇情片、紀錄片、電視節目、動漫、原創作品等內容。 隨時隨地，想看多少就看多少。',
  }
];

export default function QandA(){
  const [currentAns, setCurrentAns] = useState<number|null>(null);
    
  return (
    <div className='h-[72vh]'>
      <div className='flex flex-col text-white px-8 sm:px-14 md:px-28 lg:px-48 xl:px-80 pt-6'>
        <h2 className='mb-5 text-xl sm:text-3xl md:text-4xl lg:text-5xl text-bold text-center px-14 md:px-0 sm:py-5'>
          常見問題
        </h2>
        {
          questions.map((item, index) => (
            <div className='flex flex-col gap-3' key={crypto.randomUUID()}>
              <div
                onClick={() => setCurrentAns(currentAns === index ? null : index)}
                className='flex justify-between p-3 lg:p-5 mt-2 bg-[#333] cursor-pointer'
              >
                <h2 className='text-[18px] font-bold'>
                  {item.ques}
                </h2>
                <span className='h-7 w-7 text-[20px]'>➕</span>
              </div>
              {
                currentAns === index && (
                  <p className='p-3 lg:p-5 mt-2 bg-[#666]'>
                    {item.ans}
                  </p>
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}