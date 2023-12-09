'use client'
import {create} from 'zustand';

interface FavoritesInfo{
  backdrop_path: string,
  poster_path: string,
  movieID: number,
  _id: string,
  type: string,
  uid: string,
  accountID: string,
  name?: string,
  title?: string,
  overview?: string,
}

interface Favorites{
  favorites: FavoritesInfo[],
  setFavorites: (data: FavoritesInfo[])=> void,
}

export const useFavorites = create<Favorites>()((set)=>({
    favorites: []!,
    setFavorites: (data)=>set(()=>({
        favorites : data,
    }))
}))