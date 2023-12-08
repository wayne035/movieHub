'use client'
import { create } from 'zustand';

interface PageLoading{
  pageLoading: boolean,
  setPageLoading: (state:boolean)=> void,
}

export const usePageLoading = create<PageLoading>()((set)=>({
  pageLoading: true,
  setPageLoading: (state)=>set(()=>({
    pageLoading: state,
  }))
}))