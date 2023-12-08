'use client';
import axios from 'axios';
import { useState,memo } from 'react';
import { useAccountForm } from '@/store/accountsStore';
import { useSession } from 'next-auth/react';

interface getAllAccounts{
  getAllAccounts: <Promise>() => void
}

export default memo(function AddAccount({ getAllAccounts }: getAllAccounts) {
  const [formData, setFormData] = useState({name: '', pin: ''});
  const {showAccountForm,setShowAccountForm} = useAccountForm();
  const {data: session} = useSession();

  async function createAccount(e: any) {
    try{
      if (e.key === 'Enter' || e.type === 'click'){
        const { data } = await axios.post('/api/account', {
          ...formData,
          uid: session?.user?.uid!,
        });
        if(data.success){
          setFormData({name: '', pin: ''});
          setShowAccountForm();
          getAllAccounts();
        }else{
          alert(data.message);
        }
      }
    }catch(e){
      console.log((e as Error).message)
    }
  }

  return (
    showAccountForm && 
    <div className='px-8 py-8 fixed gap-3 flex flex-col items-start bg-[#000] z-[999] border-2 border-[#fff] rounded-lg'>
      <span 
        className='cursor-pointer text-[20px]'
        onClick={()=>setShowAccountForm()}
      >
        ❌
      </span>
      <div className='flex flex-col gap-5'>
        <input
          name='name'
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
          onKeyUp={ createAccount }
          placeholder='輸入PIN碼(4碼)'
          className='px-5 py-3 rounded-lg text-lg text-[#000] outline-none focus:outline-none'
        />
        <button 
          onClick={(e)=> createAccount(e)}
          className='border p-4 bg-main-color outline-none rounded-lg text-black text-lg font-bold' 
        >
          新增
        </button>
      </div>
    </div>
  );
})