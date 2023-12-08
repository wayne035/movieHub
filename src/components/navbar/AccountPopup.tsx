'use client';
import { memo } from 'react';
import { redirect } from 'next/navigation';
import { useAccounts,useLoginAccount } from '@/store/accountsStore';
import { signOut } from 'next-auth/react';

export default memo(function AccountPopup(){
  const {accounts,setAccounts} = useAccounts();
  const {loginAccount,setLogoutAccount} = useLoginAccount();

  return (
    <div className='p-6 fixed top-[68px] gap-3 flex flex-col items-start right-0 bg-[#000] opacity-[.85] z-[99]'>
      <div className='flex flex-col gap-3'>
        {accounts && accounts.length
          ? accounts
            .filter((item)=> item._id !== loginAccount?._id!)
            .map((account)=> (
              <div
                onClick={()=> {
                  setLogoutAccount(null!);
                  redirect('/accounts-manage');
                }}
                className='cursor-pointer flex gap-5'
                key={account._id}
              >
                <img
                  src='/avatar.png'
                  alt='Current Profile'
                  className='max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]'
                />
                <p className='mb-4'>{account.name}</p>
              </div>
            ))
          : null
        }
      </div>
      <div>
        <button
          onClick={()=> {
            signOut();
            setLogoutAccount(null!);
            setAccounts(null!);
          }}
          className='font-bold hover:text-[#999]'
        >
          登出 Movie Hub
        </button>
      </div>
    </div>
  );
})
