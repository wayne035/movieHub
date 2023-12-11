'use client'
import {create} from 'zustand';
import { Media } from '@/interface';

interface SearchData{
  searchResults: Media[],
  setSearchResults: (results: Media[])=> void,
}

export const useSearch = create<SearchData>()((set)=>({
  searchResults: []!,
  setSearchResults: (results)=>set(()=>({
    searchResults : results,
  }))
}))