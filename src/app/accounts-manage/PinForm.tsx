'use client';
import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePinContainer } from '@/store/pinContainerStore';
import { useLoginAccount } from '@/store/accountsStore';
import { usePageLoading } from '@/store/pageLoadingStore';
import { useRouter } from 'next/navigation';
import PinInput from 'react-pin-input';

export default function PinForm() {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const {data: session} = useSession();
  const {showPinContainer,setShowPinContainer} = usePinContainer();
  const {setLoginAccount} = useLoginAccount();
  const {setPageLoading} = usePageLoading();
  const router = useRouter();
  
  async function pinSubmit(value: string){
    try{
      const { data } = await axios.post('/api/login', {
        uid: session?.user?.uid!,
        accountId: showPinContainer.account._id,
        pin: value,
      });
      if(data.success){
        router.push('/browse');
        setPageLoading(true);
        setLoginAccount(showPinContainer.account);
        setShowPinContainer({...showPinContainer, show:false});
      }else{
        setPageLoading(false);
        setPinError(true);
        setPin('');
      }
    }catch(e){
      console.log((e as Error).message)
    }
  }

  return (
    showPinContainer.show &&
    <div className='z-[100] bg-[#141414] flex-col min-h-screen absolute left-0 top-0 justify-center flex items-center right-0'>
      <div>
        <span
          onClick={() => {
            setShowPinContainer({...showPinContainer, show: false});
            setPin('');
            setPinError(false);
          }}
          className='cursor-pointer absolute top-[20px] right-[20px] md:top-[50px] md:right-[50px] text-[30px]'
        >
          ❌
        </span>
      </div>
      {pinError ? (
          <h2 className='text-[#ff6666] font-bold text-[30px] px-5 text-center'>
            糟糕，PIN 碼錯誤。 請再試一次
          </h2>
        ) : (
          <h2 className='text-white font-bold text-[30px] px-5 text-center'>
            輸入您的 PIN 碼以存取此個人資料
          </h2>
        )
      }
      <PinInput
        length={4}
        initialValue={pin}
        secret
        focus
        secretDelay={100}
        onChange={(value) => setPin(value)}
        type='numeric'
        inputMode='number'
        inputFocusStyle={{ borderColor: '#ff5234' }}
        onComplete={(value) => pinSubmit(value)}
        autoSelect={true}
        inputStyle={{
          borderColor: 'white',
          height: '70px',
          width: '70px',
          fontSize: '40px',
          borderRadius:'5px',
          margin:'30px 10px',
        }}
      />
    </div>
  );
}