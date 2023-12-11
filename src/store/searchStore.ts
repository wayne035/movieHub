'use client'
import {create} from 'zustand';

interface Media{
  backdrop_path: string,
  poster_path: string,
  type: string,
  movieID?: number,
  id: number,
  addedToFavorites?: boolean,
  title?: string,
  name?: string,
  overview?: string,
}

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