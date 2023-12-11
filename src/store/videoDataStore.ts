'use client'
import {create} from 'zustand';
import { Media } from '@/interface';
//useVideoData=================================================
interface VideoDataInfo{
  title: string,
  medias: Media[]
}

interface VideoData{
  videoData: VideoDataInfo[],
  setVideoData: (data: VideoDataInfo[]) => void,
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

interface SimilarVideo{
  similarVideo: Media[],
  setSimilarVideo: (data: Media[]) => void,
}

export const useSimilarVideo = create<SimilarVideo>()((set)=>({
  similarVideo: []!,
  setSimilarVideo: (data)=>set(()=>({
    similarVideo : data,
  }))
}))