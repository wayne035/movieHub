'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { MdDeleteForever } from 'react-icons/md';
import { CiEdit } from "react-icons/ci";
import { useAccounts,useAccountForm } from '@/store/accountsStore';
import { usePinContainer } from '@/store/pinContainerStore';
import { usePageLoading } from '@/store/pageLoadingStore';
import Loading from '../loading';
import AccountForm from './AccountForm';
import PinForm from './PinForm';

interface UserItem{
  name: string,
  pin: string,
  uid: string,
  _id: string,
}

export default function ManageAccounts() {
  const {data: session} = useSession();
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [method,setMethod] = useState('');
  const [editData,setEditData] = useState({} as UserItem);
  const {pageLoading,setPageLoading} = usePageLoading();
  const {setShowPinContainer} = usePinContainer();
  const {accounts,setAccounts} = useAccounts();
  const {setShowAccountForm,setOffAccountForm} = useAccountForm();

  function showIcon(value: string){
    if(value === 'delete'){
      setShowDeleteIcon(!showDeleteIcon)
      setShowEditIcon(false)
    }else{
      setShowEditIcon(!showEditIcon)
      setShowDeleteIcon(false)
    }
  }

  async function getAllAccounts(){
    try{
      setPageLoading(true)
      const {data} = await axios.post('/api/account/all',{
        uid: session?.user?.uid!,
      })
      setAccounts(data.data);
      setPageLoading(false);
    }catch(e){
      console.log((e as Error).message);
    }
  }

  async function removeAccount(item: UserItem) {
    try{
      let removeAccount = confirm('你確定要刪除？');
      if(removeAccount){
        const {data} = await axios.delete(`/api/account/${item._id}`);
        if(data.success){
          setShowDeleteIcon(false);
          getAllAccounts();
        }
      }
      return setShowDeleteIcon(false);
    }catch(e){
      console.log((e as Error).message);
    }
  }

  useEffect(()=>{
    getAllAccounts();
  },[session?.user.name])
  
  if(pageLoading) return <Loading/>

  return (
    session?.user.name &&
    <div className='min-h-screen flex justify-center flex-col items-center relative overflow-x-hidden'>
      <div className='flex justify-center flex-col items-center'>
        <p className='text-white font-bold text-[54px] my-[36px]'>
          選擇觀看用戶
        </p>
        <ul className='flex my-[25px] flex-wrap justify-center'>
          {accounts?.map((item: UserItem)=> (
              <li
                className='max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]'
                key={item._id}
                onClick={()=> {
                  showDeleteIcon || showEditIcon 
                  ? null 
                  : setShowPinContainer({show: true, account: item})
                }}
              >
                <div className='relative'>
                  <img
                    src='/avatar.png'
                    alt='Account'
                    onClick={()=> setOffAccountForm()}
                    className='max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px]'
                  />
                  {showDeleteIcon ? (
                    <div
                      onClick={()=> removeAccount(item)}
                      className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer'
                    >
                      <MdDeleteForever className='bg-[#f82020] text-[40px] rounded-[9px]'/>
                    </div>
                    ) 
                    : null
                  }
                  {showEditIcon ? (
                    <div
                      onClick={() =>{
                        setEditData(item);
                        setMethod('edit');
                        setShowEditIcon(false);
                        setShowAccountForm();
                      }}
                      className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer'
                    >
                      <CiEdit className='bg-[#3852ff] text-[40px] rounded-[9px]'/>
                    </div>
                    ) 
                    : null
                  }
                </div>
                <span className='mb-4 font-bold'>{item.name}</span>
              </li>
            ))
          }
          {accounts && accounts.length < 4 ? (
              <li
                onClick={()=> {
                  setShowAccountForm();
                  setMethod('create');
                  setEditData({} as UserItem);
                  setShowDeleteIcon(false);
                  setShowEditIcon(false);
                }}
                className='border text-[#fff] bg-main-color font-bold text-2xl border-black max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center mx-4 hover:bg-main-hover-color'
              >
                新增用戶
              </li>
            ) : null
          }
        </ul>
        <div className='text-center'>
          <button
            onClick={()=> {
              showIcon('edit');
              setOffAccountForm();
            }}
            className='mx-3 border text-md px-[16px] py-[10px] mb-10 hover:border-[#999] hover:text-[#999]'
          >
            更改用戶資料
          </button>
          <button
            onClick={()=> {
              showIcon('delete');
              setOffAccountForm();
            }}
            className='mx-3 border border-[#fff] text-md px-[16px] py-[10px] mb-10 text-main-color hover:text-[#d53030] hover:border-[#999]'
          >
            刪除用戶資料
          </button>
        </div>
      </div>
      <PinForm/>
      <AccountForm getAllAccounts={getAllAccounts} editData={editData} method={method}/>
    </div>
  );
}