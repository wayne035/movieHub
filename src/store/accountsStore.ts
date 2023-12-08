'use client'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
//useLoginAccount=====================================
interface Account{
  name: string,
  pin: string,
  uid: string,
  _id: string,
}

interface LoginAccount{
  loginAccount: Account,
  setLoginAccount: (data: Account)=> void,
  setLogoutAccount: (data: Account)=> void,
}

export const useLoginAccount = create<LoginAccount>()(
  persist(
    (set)=>({
      loginAccount: null!,
      setLoginAccount: (data)=> set(()=>({loginAccount: data})),
      setLogoutAccount: (data)=> set(()=>({loginAccount: data})),
    }),
    {
      name: 'loginAccount',
    }
  ),
)
//useAccounts=====================================
interface Accounts{
  accounts: Account[],
  setAccounts: (data: Account[])=> void,
}

export const useAccounts = create<Accounts>()(
  persist(
    (set)=>({
      accounts: null!,
      setAccounts: (data)=> set(()=>({
        accounts : data,
      })),
    }),
    {
      name: 'accounts',
    }
  ),
);
//useAccountForm===================================
interface AccountForm{
  showAccountForm: boolean,
  setShowAccountForm: ()=> void,
  setOffAccountForm: ()=> void,
}

export const useAccountForm = create<AccountForm>()((set)=>({
  showAccountForm: false,
  setShowAccountForm: ()=>set((s)=>({
    showAccountForm: !s.showAccountForm,
  })),
  setOffAccountForm: ()=>set(()=>({
    showAccountForm: false,
  }))
}))