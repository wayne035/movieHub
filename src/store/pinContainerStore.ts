'use client'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Account } from '@/interface';

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