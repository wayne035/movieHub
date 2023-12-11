'use client'
import {create} from 'zustand';
import { FavoritesInfo } from '@/interface';

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