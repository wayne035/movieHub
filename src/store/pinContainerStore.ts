'use client'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Account{
  name: string,
  pin: string,
  uid: string,
  _id: string,
}[]

interface PinContainer{
  showPinContainer: { show: boolean, account: Account}
  setShowPinContainer: (data:{ show: boolean, account: Account})=> void
}

export const usePinContainer = create<PinContainer>()(
  persist(
    (set)=>({
      showPinContainer:{show: false, account: null!},
      setShowPinContainer: (data)=>set(()=>({
        showPinContainer : data
      }))
    }),
    {
      name: 'showPinContainer',
    }
  )
)