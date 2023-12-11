'use client';
import axios from 'axios';
import { useState,memo,useEffect,MouseEvent,KeyboardEvent } from 'react';
import { useAccountForm } from '@/store/accountsStore';
import { useSession } from 'next-auth/react';

type Event = 
  | KeyboardEvent<HTMLInputElement> 
  | MouseEvent<HTMLButtonElement> ;

interface getAllAccounts{
  method: string,
  editData?: {
    name: string,
    pin: string,
    uid: string,
    _id: string,
  }
  getAllAccounts: () => void,
}

export default memo(function AccountForm({ 
    getAllAccounts, editData, method
  }: getAllAccounts ) {
  const {showAccountForm,setShowAccountForm} = useAccountForm();
  const {data: session} = useSession();
  const [formData,setFormData] = useState({name: '', pin: ''});

  async function accountManage(e: Event, method: string) {
    try{
      if ((e as KeyboardEvent).key === 'Enter' || e.type === 'click'){

        let fetchData = {success: null!, message: null!};

        if(method === 'create'){
          const { data } = await axios.post('/api/account', {
            ...formData,
            uid: session?.user?.uid!,
          });
          fetchData = data
        }

        if(method === 'edit'){
          const { data } = await axios.patch(`/api/account/${editData?._id}`,{
            ...formData,
            uid: session?.user?.uid!,
          });
          fetchData = data
        }

        if(fetchData.success){
          setShowAccountForm();
          getAllAccounts();
        }else{
          alert(fetchData.message);
        }
      }
    }catch(e){
      console.log((e as Error).message)
    }
  }

  useEffect(()=>{
    if(method === 'edit'){
      setFormData(prev => prev = {...prev, name: `${editData?.name}`})
    }
    if(method === 'create'){
      setFormData(prev => prev = {...prev, name:''})
    }
  },[editData?.name])


  return (
    showAccountForm && 
    <div className='px-8 py-8 fixed gap-3 flex flex-col items-start bg-[#000] z-[999] border-2 border-[#fff] rounded-lg'>
      <span
        className=' absolute cursor-pointer text-[24px] right-[20px] top-[20px]'
        onClick={()=>{
          setShowAccountForm();
        }}
      >
        ❌
      </span>
      <h2 className='w-full text-center font-bold text-[24px]'>
        {method === 'create' ? '創建用戶': '修改用戶資訊'}
      </h2>
      <div className='flex flex-col gap-5'>
        <input
          name='name'
          value={formData.name}
          onChange={(e)=>
            setFormData({
              ...formData,
              [e.target.name]: e.target.value.trim(),
            })
          }
          placeholder='輸入用戶名'
          maxLength={9}
          className='px-5 py-3 rounded-lg text-lg text-[#000] outline-none focus:outline-none'
        />
        <input
          name='pin'
          type='password'
          onChange={(e)=>
            setFormData({
              ...formData,
              [e.target.name]: e.target.value.trim(),
            })
          }
          maxLength={4}
          onKeyUp={(e)=> method === 'create' ? accountManage(e,'create') : accountManage(e,'edit') }
          placeholder={method === 'create' ? '輸入PIN碼(4碼)' : '輸入新PIN碼(4碼)'}
          className='px-5 py-3 rounded-lg text-lg text-[#000] outline-none focus:outline-none'
        />
        <button 
          onClick={(e)=> method === 'create' ? accountManage(e,'create') : accountManage(e,'edit')}
          className='border p-4 bg-main-color outline-none rounded-lg text-black text-lg font-bold' 
        >
          {method === 'create' ? '新增' : '修改'}
        </button>
      </div>
    </div>
  );
})