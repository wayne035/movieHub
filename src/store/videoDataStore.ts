'use client'
import {create} from 'zustand';
//useVideoData=================================================
interface Medias{
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

interface VideoDataInfo{
  title: string,
  medias: Medias[]
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
interface SimilarInfo extends Medias{}

interface SimilarVideo{
  similarVideo: SimilarInfo[],
  setSimilarVideo: (data: SimilarInfo[]) => void,
}

export const useSimilarVideo = create<SimilarVideo>()((set)=>({
  similarVideo: []!,
  setSimilarVideo: (data)=>set(()=>({
    similarVideo : data,
  }))
}))