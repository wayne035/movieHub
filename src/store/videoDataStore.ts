'use client'
import {create} from 'zustand';
//useVideoData=================================================
interface VideoDataInfo{
  medias:{
    backdrop_path : string,
    poster_path : string,
    addedToFavorites?: boolean,
  }[]
}

interface VideoData{
  videoData: VideoDataInfo[],
  setVideoData: (data: any) => void,
}

export const useVideoData = create<VideoData>()((set)=>({
  videoData: []!,
  setVideoData: (data)=>set(()=>({
    videoData : data,
  }))
}))
//useCurrentVideoIdAndType========================================
interface IdAndType{
  type: string ,
  id: number
}

interface VideoIdAndType{
  currentVideoIdAndType: IdAndType,
  setCurrentVideoIdAndType: (data: IdAndType) => void,
}

export const useCurrentVideoIdAndType = create<VideoIdAndType>()((set)=>({
  currentVideoIdAndType: {type: null!, id: null!},
  setCurrentVideoIdAndType: (data)=>set(()=>({
    currentVideoIdAndType: data,
  }))
}))
//useSimilarVideo=================================================
interface SimilarVideoInfo{
  id: number,
  backdrop_path: string,
  poster_path: string,
  addedToFavorites?: boolean, 
}

interface SimilarVideo{
  similarVideo: SimilarVideoInfo[],
  setSimilarVideo: (data: any) => void,
}

export const useSimilarVideo = create<SimilarVideo>()((set)=>({
  similarVideo: []!,
  setSimilarVideo: (data)=>set(()=>({
    similarVideo : data,
  }))
}))