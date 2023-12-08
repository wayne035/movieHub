'use client'
import {create} from 'zustand';

interface Toggle{
  showVideoPopup: boolean,
  setShowVideoPopup: (state: boolean)=> void,
}

export const useVideoPopup = create<Toggle>()((set)=>({
    showVideoPopup: false,
    setShowVideoPopup: (state)=>set({
      showVideoPopup: state,
    })
}))