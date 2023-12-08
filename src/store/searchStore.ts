'use client'
import {create} from 'zustand';

interface SearchInfo{
  id: number,
  addedToFavorites?: boolean, 
}

interface SearchData{
  searchResults: SearchInfo[],
  setSearchResults: (results: any)=> void,
}

export const useSearch = create<SearchData>()((set)=>({
  searchResults: []!,
  setSearchResults: (results)=>set(()=>({
    searchResults : results,
  }))
}))