'use client'
import {create} from 'zustand';

interface Favorites{
  favorites: [],
  setFavorites: (data: any)=> void,
}

export const useFavorites = create<Favorites>()((set)=>({
    favorites: [],
    setFavorites: (data)=>set(()=>({
        favorites : data,
    }))
}))